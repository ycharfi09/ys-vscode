// This extension is primarily declarative - it provides language support through
// the package.json contributions (language configuration, grammar, and snippets).
// No activation logic is required for basic language features.

const vscode = require('vscode');

function activate(context) {
    console.log('Ypsilon Script extension is now active!');
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
