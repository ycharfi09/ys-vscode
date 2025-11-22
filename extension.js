// This extension provides language support and CLI integration for Ypsilon Script.

const vscode = require('vscode');
const { spawn } = require('child_process');
const path = require('path');

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
