// This extension provides language support and CLI integration for Ypsilon Script.

const vscode = require('vscode');
const { execFile } = require('child_process');
const path = require('path');

function activate(context) {
    console.log('Ypsilon Script extension is now active!');

    // Command: Build/Compile YS file
    let buildCommand = vscode.commands.registerCommand('ypsilon-script.build', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active YS file to build');
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

        vscode.window.showInformationMessage('Building Ypsilon Script file...');

        // Execute ysc build command with proper argument handling
        execFile('ysc', ['build', filePath], { cwd }, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Build failed: ${stderr || error.message}`);
                console.error('Build error:', error);
                return;
            }
            vscode.window.showInformationMessage('Build successful!');
            if (stdout) {
                console.log('Build output:', stdout);
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

    // Command: Clean build artifacts
    let cleanCommand = vscode.commands.registerCommand('ypsilon-script.clean', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder open');
            return;
        }

        const cwd = workspaceFolders[0].uri.fsPath;
        vscode.window.showInformationMessage('Cleaning build artifacts...');

        // Execute ysc clean command
        execFile('ysc', ['clean'], { cwd }, (error, stdout, stderr) => {
            if (error) {
                vscode.window.showErrorMessage(`Clean failed: ${stderr || error.message}`);
                console.error('Clean error:', error);
                return;
            }
            vscode.window.showInformationMessage('Clean successful!');
            if (stdout) {
                console.log('Clean output:', stdout);
            }
        });
    });

    // Command: Show YS CLI version
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
    context.subscriptions.push(cleanCommand);
    context.subscriptions.push(versionCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
