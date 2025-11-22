// This extension provides language support and CLI integration for Ypsilon Script.

const vscode = require('vscode');
const { execFile } = require('child_process');
const path = require('path');

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
        execFile('ysc', ['compile', filePath], { cwd }, (error, stdout, stderr) => {
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
        execFile('ysc', ['upload', filePath], { cwd }, (error, stdout, stderr) => {
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
        execFile('ysc', ['run', filePath], { cwd }, (error, stdout, stderr) => {
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
        execFile('ysc', ['--version'], (error, stdout, stderr) => {
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
