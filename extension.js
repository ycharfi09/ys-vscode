// This extension provides language support and CLI integration for Ypsilon Script.

const vscode = require('vscode');
const { spawn } = require('child_process');
const path = require('path');

// Language data for IntelliSense
const KEYWORDS = [
    'if', 'else', 'while', 'for', 'repeat', 'until', 'times', 'match', 'switch',
    'case', 'default', 'return', 'break', 'continue', 'on', 'interrupt', 'task',
    'every', 'background', 'atomic', 'signal', 'emit', 'wait', 'timeout', 'load',
    'use', 'config', 'alias', 'react', 'start', 'loop', 'rising', 'falling',
    'change', 'new'
];

const STORAGE_KEYWORDS = ['fn', 'class', 'struct', 'enum', 'const', 'mut'];

const TYPES = [
    'int', 'float', 'bool', 'string', 'void', 'char', 'byte',
    'i8', 'i16', 'i32', 'i64', 'u8', 'u16', 'u32', 'u64',
    'f32', 'f64'
];

const CONSTANTS = [
    'true', 'false', 'HIGH', 'LOW', 'INPUT', 'OUTPUT', 'INPUT_PULLUP',
    'self', 'this'
];

const ARDUINO_FUNCTIONS = [
    { name: 'pinMode', params: ['pin: int', 'mode: int'], returns: 'void', doc: 'Configures the specified pin to behave either as an input or an output.' },
    { name: 'digitalWrite', params: ['pin: int', 'value: int'], returns: 'void', doc: 'Write a HIGH or LOW value to a digital pin.' },
    { name: 'digitalRead', params: ['pin: int'], returns: 'int', doc: 'Reads the value from a specified digital pin, either HIGH or LOW.' },
    { name: 'analogWrite', params: ['pin: int', 'value: int'], returns: 'void', doc: 'Writes an analog value (PWM wave) to a pin.' },
    { name: 'analogRead', params: ['pin: int'], returns: 'int', doc: 'Reads the value from the specified analog pin.' },
    { name: 'delay', params: ['ms: int'], returns: 'void', doc: 'Pauses the program for the amount of time (in milliseconds) specified.' },
    { name: 'delayMicroseconds', params: ['us: int'], returns: 'void', doc: 'Pauses the program for the amount of time (in microseconds) specified.' },
    { name: 'millis', params: [], returns: 'int', doc: 'Returns the number of milliseconds since the program started.' },
    { name: 'micros', params: [], returns: 'int', doc: 'Returns the number of microseconds since the program started.' },
    { name: 'print', params: ['value: any'], returns: 'void', doc: 'Prints data to the serial port as human-readable ASCII text.' },
    { name: 'println', params: ['value: any'], returns: 'void', doc: 'Prints data to the serial port as human-readable ASCII text followed by a newline.' },
    { name: 'map', params: ['value: int', 'fromLow: int', 'fromHigh: int', 'toLow: int', 'toHigh: int'], returns: 'int', doc: 'Re-maps a number from one range to another.' },
    { name: 'constrain', params: ['value: int', 'min: int', 'max: int'], returns: 'int', doc: 'Constrains a number to be within a range.' },
    { name: 'abs', params: ['x: int'], returns: 'int', doc: 'Returns the absolute value of a number.' },
    { name: 'min', params: ['x: int', 'y: int'], returns: 'int', doc: 'Returns the smaller of two numbers.' },
    { name: 'max', params: ['x: int', 'y: int'], returns: 'int', doc: 'Returns the larger of two numbers.' },
    { name: 'pow', params: ['base: float', 'exponent: float'], returns: 'float', doc: 'Calculates the value of a number raised to a power.' },
    { name: 'sqrt', params: ['x: float'], returns: 'float', doc: 'Calculates the square root of a number.' },
    { name: 'random', params: ['min: int', 'max: int'], returns: 'int', doc: 'Generates pseudo-random numbers.' },
    { name: 'randomSeed', params: ['seed: int'], returns: 'void', doc: 'Initializes the pseudo-random number generator.' }
];

const DIRECTIVES = [
    { name: '@main', doc: 'Marks the file as the main entry point of the program.' },
    { name: '@cpp', doc: 'Inline C++ code block.' },
    { name: '@ininterrupt', doc: 'Marks function as interrupt-safe.' }
];

/**
 * Completion provider for Ypsilon Script
 */
class YpsilonCompletionProvider {
    provideCompletionItems(document, position, token, context) {
        const completions = [];
        
        // Add keywords
        KEYWORDS.forEach(keyword => {
            const item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
            item.detail = 'Ypsilon Script keyword';
            completions.push(item);
        });
        
        // Add storage keywords
        STORAGE_KEYWORDS.forEach(keyword => {
            const item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword);
            item.detail = 'Storage/Declaration keyword';
            completions.push(item);
        });
        
        // Add types
        TYPES.forEach(type => {
            const item = new vscode.CompletionItem(type, vscode.CompletionItemKind.Class);
            item.detail = 'Type';
            completions.push(item);
        });
        
        // Add constants
        CONSTANTS.forEach(constant => {
            const item = new vscode.CompletionItem(constant, vscode.CompletionItemKind.Constant);
            item.detail = 'Constant';
            completions.push(item);
        });
        
        // Add Arduino functions
        ARDUINO_FUNCTIONS.forEach(func => {
            const item = new vscode.CompletionItem(func.name, vscode.CompletionItemKind.Function);
            item.detail = `${func.name}(${func.params.join(', ')})`;
            item.documentation = new vscode.MarkdownString(func.doc);
            item.insertText = new vscode.SnippetString(`${func.name}($1)`);
            completions.push(item);
        });
        
        // Add directives
        DIRECTIVES.forEach(directive => {
            const item = new vscode.CompletionItem(directive.name, vscode.CompletionItemKind.Keyword);
            item.detail = 'Directive';
            item.documentation = new vscode.MarkdownString(directive.doc);
            completions.push(item);
        });
        
        return completions;
    }
}

/**
 * Hover provider for Ypsilon Script
 */
class YpsilonHoverProvider {
    provideHover(document, position, token) {
        const range = document.getWordRangeAtPosition(position);
        if (!range) return null;
        
        const word = document.getText(range);
        
        // Check if it's an Arduino function
        const func = ARDUINO_FUNCTIONS.find(f => f.name === word);
        if (func) {
            const signature = `${func.returns} ${func.name}(${func.params.join(', ')})`;
            const contents = new vscode.MarkdownString();
            contents.appendCodeblock(signature, 'ypsilon-script');
            contents.appendMarkdown('\n\n' + func.doc);
            return new vscode.Hover(contents);
        }
        
        // Check if it's a keyword
        if (KEYWORDS.includes(word)) {
            return new vscode.Hover(new vscode.MarkdownString(`**Keyword:** \`${word}\``));
        }
        
        // Check if it's a type
        if (TYPES.includes(word)) {
            return new vscode.Hover(new vscode.MarkdownString(`**Type:** \`${word}\``));
        }
        
        // Check if it's a constant
        if (CONSTANTS.includes(word)) {
            return new vscode.Hover(new vscode.MarkdownString(`**Constant:** \`${word}\``));
        }
        
        // Check if it's a directive
        const directive = DIRECTIVES.find(d => d.name === word);
        if (directive) {
            const contents = new vscode.MarkdownString();
            contents.appendMarkdown(`**Directive:** \`${directive.name}\`\n\n`);
            contents.appendMarkdown(directive.doc);
            return new vscode.Hover(contents);
        }
        
        return null;
    }
}

/**
 * Signature help provider for Ypsilon Script
 */
class YpsilonSignatureHelpProvider {
    provideSignatureHelp(document, position, token, context) {
        const line = document.lineAt(position.line).text;
        const beforeCursor = line.substring(0, position.character);
        
        // Find the most recent function call by searching backwards
        let funcName = null;
        let parenIndex = -1;
        
        // Look for function name before the last opening paren
        for (let i = beforeCursor.length - 1; i >= 0; i--) {
            if (beforeCursor[i] === '(') {
                parenIndex = i;
                // Extract function name before the paren
                const beforeParen = beforeCursor.substring(0, i);
                const match = beforeParen.match(/(\w+)\s*$/);
                if (match) {
                    funcName = match[1];
                }
                break;
            }
        }
        
        if (!funcName) return null;
        
        const func = ARDUINO_FUNCTIONS.find(f => f.name === funcName);
        if (!func) return null;
        
        const signatureHelp = new vscode.SignatureHelp();
        const signature = new vscode.SignatureInformation(
            `${func.name}(${func.params.join(', ')})`,
            new vscode.MarkdownString(func.doc)
        );
        
        // Add parameter information
        func.params.forEach(param => {
            signature.parameters.push(new vscode.ParameterInformation(param));
        });
        
        signatureHelp.signatures = [signature];
        signatureHelp.activeSignature = 0;
        
        // Simple comma counting from the opening paren to cursor
        // This is a basic implementation - more sophisticated parsing would handle nested calls
        if (parenIndex >= 0) {
            const afterParen = beforeCursor.substring(parenIndex + 1);
            // Count commas, being aware this is simplified
            const commaCount = (afterParen.match(/,/g) || []).length;
            signatureHelp.activeParameter = Math.min(commaCount, func.params.length - 1);
        }
        
        return signatureHelp;
    }
}

/**
 * Document symbol provider for Ypsilon Script
 */
class YpsilonDocumentSymbolProvider {
    // Helper function to create a symbol
    createSymbol(name, detail, kind, lineIndex, text) {
        const range = new vscode.Range(lineIndex, 0, lineIndex, text.length);
        return new vscode.DocumentSymbol(name, detail, kind, range, range);
    }
    
    provideDocumentSymbols(document, token) {
        const symbols = [];
        
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            const text = line.text;
            
            // Match function declarations: fn functionName(...)
            const fnMatch = text.match(/fn\s+(\w+)\s*\(/);
            if (fnMatch) {
                symbols.push(this.createSymbol(fnMatch[1], 'Function', vscode.SymbolKind.Function, i, text));
            }
            
            // Match class declarations: class ClassName
            const classMatch = text.match(/class\s+(\w+)/);
            if (classMatch) {
                symbols.push(this.createSymbol(classMatch[1], 'Class', vscode.SymbolKind.Class, i, text));
            }
            
            // Match struct declarations: struct StructName
            const structMatch = text.match(/struct\s+(\w+)/);
            if (structMatch) {
                symbols.push(this.createSymbol(structMatch[1], 'Struct', vscode.SymbolKind.Struct, i, text));
            }
            
            // Match enum declarations: enum EnumName
            const enumMatch = text.match(/enum\s+(\w+)/);
            if (enumMatch) {
                symbols.push(this.createSymbol(enumMatch[1], 'Enum', vscode.SymbolKind.Enum, i, text));
            }
            
            // Match constants: const Type NAME = value
            const constMatch = text.match(/const\s+\w+\s+(\w+)\s*=/);
            if (constMatch) {
                symbols.push(this.createSymbol(constMatch[1], 'Constant', vscode.SymbolKind.Constant, i, text));
            }
            
            // Match mutable variables: mut Type varName = value
            const mutMatch = text.match(/mut\s+\w+\s+(\w+)\s*=/);
            if (mutMatch) {
                symbols.push(this.createSymbol(mutMatch[1], 'Variable', vscode.SymbolKind.Variable, i, text));
            }
            
            // Match event handlers: on start/loop
            const eventMatch = text.match(/on\s+(start|loop)/);
            if (eventMatch) {
                symbols.push(this.createSymbol(`on ${eventMatch[1]}`, 'Event Handler', vscode.SymbolKind.Event, i, text));
            }
            
            // Match tasks: task taskName every ...
            const taskMatch = text.match(/task\s+(\w+)\s+/);
            if (taskMatch) {
                symbols.push(this.createSymbol(taskMatch[1], 'Task', vscode.SymbolKind.Function, i, text));
            }
            
            // Match interrupts: interrupt handlerName on ...
            const interruptMatch = text.match(/interrupt\s+(\w+)\s+/);
            if (interruptMatch) {
                symbols.push(this.createSymbol(interruptMatch[1], 'Interrupt Handler', vscode.SymbolKind.Event, i, text));
            }
        }
        
        return symbols;
    }
}

/**
 * Helper function to execute ysc commands via npx
 * @param {string[]} args - Command arguments for ysc
 * @param {string} cwd - Working directory
 * @param {Function} callback - Callback function (error, stdout, stderr)
 */
function executeYscCommand(args, cwd, callback) {
    // Use npx to run ysc, which handles npm-installed packages
    const isWindows = process.platform === 'win32';
    const command = isWindows ? 'npx.cmd' : 'npx';
    
    // On Windows, npx requires the .cmd extension and shell mode for proper PATH resolution
    // On Unix-like systems, spawn can directly execute npx without shell mode
    const child = spawn(command, ['ysc', ...args], { 
        cwd,
        shell: isWindows
    });
    
    let stdout = '';
    let stderr = '';
    let callbackCalled = false;
    
    function invokeCallback(error, out, err) {
        if (!callbackCalled) {
            callbackCalled = true;
            callback(error, out, err);
        }
    }
    
    if (child.stdout) {
        child.stdout.on('data', (data) => {
            stdout += data.toString();
        });
    }
    
    if (child.stderr) {
        child.stderr.on('data', (data) => {
            stderr += data.toString();
        });
    }
    
    child.on('close', (code) => {
        if (code !== 0) {
            invokeCallback(new Error(`Command exited with code ${code}`), stdout, stderr);
        } else {
            invokeCallback(null, stdout, stderr);
        }
    });
    
    child.on('error', (error) => {
        invokeCallback(error, stdout, stderr);
    });
}

function activate(context) {
    console.log('Ypsilon Script extension is now active!');

    // Register IntelliSense providers for Ypsilon Script
    const ysSelector = { scheme: 'file', language: 'ypsilon-script' };
    
    // Register completion provider
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        ysSelector,
        new YpsilonCompletionProvider(),
        '.' // Trigger on dot for potential member access
    );
    
    // Register hover provider
    const hoverProvider = vscode.languages.registerHoverProvider(
        ysSelector,
        new YpsilonHoverProvider()
    );
    
    // Register signature help provider
    const signatureHelpProvider = vscode.languages.registerSignatureHelpProvider(
        ysSelector,
        new YpsilonSignatureHelpProvider(),
        '(', ',' // Trigger on opening parenthesis and comma
    );
    
    // Register document symbol provider (for outline view)
    const symbolProvider = vscode.languages.registerDocumentSymbolProvider(
        ysSelector,
        new YpsilonDocumentSymbolProvider()
    );
    
    context.subscriptions.push(completionProvider);
    context.subscriptions.push(hoverProvider);
    context.subscriptions.push(signatureHelpProvider);
    context.subscriptions.push(symbolProvider);

    // Command: Compile YS file
    let buildCommand = vscode.commands.registerCommand('ypsilon-script.build', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active YS file to compile');
            return;
        }

        const document = editor.document;
        if (document.languageId !== 'ypsilon-script') {
            vscode.window.showErrorMessage('Current file is not a Ypsilon Script file');
            return;
        }

        const filePath = document.uri.fsPath;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const cwd = workspaceFolder ? workspaceFolder.uri.fsPath : path.dirname(filePath);

        vscode.window.showInformationMessage('Compiling Ypsilon Script file...');

        // Execute ysc compile command with proper argument handling
        executeYscCommand(['compile', filePath], cwd, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Compilation failed: ${stderr || error.message}`);
                console.error('Compilation error:', error);
                return;
            }
            vscode.window.showInformationMessage('Compilation successful!');
            if (stdout) {
                console.log('Compilation output:', stdout);
            }
        });
    });

    // Command: Upload to board
    let uploadCommand = vscode.commands.registerCommand('ypsilon-script.upload', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active YS file to upload');
            return;
        }

        const document = editor.document;
        if (document.languageId !== 'ypsilon-script') {
            vscode.window.showErrorMessage('Current file is not a Ypsilon Script file');
            return;
        }

        const filePath = document.uri.fsPath;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const cwd = workspaceFolder ? workspaceFolder.uri.fsPath : path.dirname(filePath);

        vscode.window.showInformationMessage('Uploading to board...');

        // Execute ysc upload command with proper argument handling
        executeYscCommand(['upload', filePath], cwd, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Upload failed: ${stderr || error.message}`);
                console.error('Upload error:', error);
                return;
            }
            vscode.window.showInformationMessage('Upload successful!');
            if (stdout) {
                console.log('Upload output:', stdout);
            }
        });
    });

    // Command: Run YS file
    let runCommand = vscode.commands.registerCommand('ypsilon-script.run', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active YS file to run');
            return;
        }

        const document = editor.document;
        if (document.languageId !== 'ypsilon-script') {
            vscode.window.showErrorMessage('Current file is not a Ypsilon Script file');
            return;
        }

        const filePath = document.uri.fsPath;
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const cwd = workspaceFolder ? workspaceFolder.uri.fsPath : path.dirname(filePath);

        vscode.window.showInformationMessage('Running Ypsilon Script file...');

        // Execute ysc run command with proper argument handling
        executeYscCommand(['run', filePath], cwd, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Run failed: ${stderr || error.message}`);
                console.error('Run error:', error);
                return;
            }
            vscode.window.showInformationMessage('Run completed!');
            if (stdout) {
                console.log('Run output:', stdout);
            }
        });
    });

    // Command: Show YSC CLI version
    let versionCommand = vscode.commands.registerCommand('ypsilon-script.version', async () => {
        executeYscCommand(['--version'], process.cwd(), (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage('Ypsilon Script CLI not found. Please install it first.');
                console.error('Version check error:', error);
                return;
            }
            vscode.window.showInformationMessage(`Ypsilon Script: ${stdout.trim()}`);
        });
    });

    context.subscriptions.push(buildCommand);
    context.subscriptions.push(uploadCommand);
    context.subscriptions.push(runCommand);
    context.subscriptions.push(versionCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
