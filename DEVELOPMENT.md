# Development and Testing Guide

This guide explains how to develop and test the Ypsilon Script VS Code extension.

## Prerequisites

- Visual Studio Code (version 1.74.0 or higher)
- Node.js (for packaging, optional)
- Git

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ycharfi09/ys-vscode.git
cd ys-vscode
```

### 2. Install the Extension Locally

#### Method A: Copy to Extensions Folder

Copy the entire folder to your VS Code extensions directory:

**Windows:**
```cmd
xcopy /E /I . "%USERPROFILE%\.vscode\extensions\ypsilon-script"
```

**macOS/Linux:**
```bash
cp -r . ~/.vscode/extensions/ypsilon-script/
```

Then reload VS Code.

#### Method B: Development Mode (Recommended for Testing)

1. Open the extension folder in VS Code:
   ```bash
   code .
   ```

2. Press `F5` to launch a new VS Code window with the extension loaded in development mode.

3. In the new window, open or create a `.ys` file to test the extension.

### 3. Test the Extension

1. Create a test file with `.ys` extension
2. Open it in VS Code
3. Verify the following features:

#### Syntax Highlighting
- Keywords should be colored (e.g., `fn`, `class`, `on`, `match`)
- Comments (starting with `#`) should be styled differently
- Strings should be highlighted
- Numbers and constants should be distinct

#### Code Snippets
- Type `@main` and press Tab - should expand to the @main directive
- Type `onstart` and press Tab - should create an `on start {}` block
- Type `fn` and press Tab - should create a function template
- Try other snippets from the README

#### Auto-Features
- Type `{` - should auto-close with `}`
- Type `(` - should auto-close with `)`
- Type `"` - should auto-close with another `"`
- Press Enter inside braces - should auto-indent

#### Comment Toggle
- Select a line and press `Ctrl+/` (Windows/Linux) or `Cmd+/` (Mac)
- Should add/remove `#` at the beginning

## File Structure

```
ys-vscode/
├── extension.js                    # Extension entry point
├── package.json                    # Extension manifest
├── language-configuration.json     # Language features (brackets, comments, etc.)
├── README.md                       # User documentation
├── CHANGELOG.md                    # Version history
├── LICENSE                         # MIT License
├── .gitignore                      # Git ignore rules
├── .vscodeignore                   # Extension package ignore rules
├── images/
│   ├── icon.png                   # Extension icon (128x128)
│   └── icon.svg                   # Icon source (SVG)
├── syntaxes/
│   └── ypsilon-script.tmLanguage.json  # TextMate grammar for syntax highlighting
├── snippets/
│   └── ypsilon-script.json        # Code snippets
└── test-files/
    └── example.ys                 # Test file with all features
```

## Making Changes

### Modifying Syntax Highlighting

Edit `syntaxes/ypsilon-script.tmLanguage.json`:

1. Add new patterns to the `patterns` array
2. Define rules in the `repository` section
3. Use TextMate scope names (e.g., `keyword.control`, `entity.name.function`)
4. Test changes by reloading the window (`Ctrl+R` or `Cmd+R`)

### Adding Snippets

Edit `snippets/ypsilon-script.json`:

```json
{
  "Snippet Name": {
    "prefix": "triggerText",
    "body": [
      "line 1",
      "line 2 with ${1:placeholder}",
      "$0"
    ],
    "description": "What the snippet does"
  }
}
```

- `prefix`: What to type to trigger the snippet
- `body`: Lines of code (array of strings)
- `$1`, `$2`, etc.: Tab stops
- `$0`: Final cursor position
- `${1:text}`: Tab stop with placeholder text

### Updating Language Configuration

Edit `language-configuration.json` to change:

- Comment syntax
- Bracket pairs
- Auto-closing pairs
- Indentation rules
- Folding markers

## Testing Checklist

Before releasing, test:

- [ ] Syntax highlighting for all keyword types
- [ ] All code snippets expand correctly
- [ ] Auto-closing brackets work
- [ ] Auto-indentation works
- [ ] Comment toggling works
- [ ] Code folding works
- [ ] Extension icon displays
- [ ] README displays correctly in Extensions view
- [ ] Test with various `.ys` files from ypsilon-script examples

## Packaging the Extension

### Install vsce (VS Code Extension Manager)

```bash
npm install -g @vscode/vsce
```

### Create Package

```bash
vsce package
```

This creates a `.vsix` file that can be:
- Installed locally: `code --install-extension ypsilon-script-0.1.0.vsix`
- Published to VS Code Marketplace
- Shared with others

## Publishing to Marketplace

### Prerequisites

1. Create a [Visual Studio Marketplace](https://marketplace.visualstudio.com/) account
2. Create a Personal Access Token (PAT) in Azure DevOps
3. Create a publisher: `vsce create-publisher <publisher-name>`
4. Login: `vsce login <publisher-name>`

### Publish

```bash
vsce publish
```

Or specify a version bump:

```bash
vsce publish patch  # 0.1.0 -> 0.1.1
vsce publish minor  # 0.1.0 -> 0.2.0
vsce publish major  # 0.1.0 -> 1.0.0
```

## Troubleshooting

### Extension Not Loading

1. Check the VS Code Developer Tools:
   - Open Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
   - Run "Developer: Reload Window"
   - Check "Developer: Toggle Developer Tools" for errors

2. Verify file paths in `package.json` are correct

3. Ensure all JSON files are valid (no syntax errors)

### Syntax Highlighting Not Working

1. Verify the file has `.ys` extension
2. Check the language ID matches in:
   - `package.json` (contributes.languages[].id)
   - `syntaxes/ypsilon-script.tmLanguage.json` (scopeName)
3. Reload the window

### Snippets Not Appearing

1. Verify the language ID in `package.json` matches
2. Check snippet syntax is correct
3. Try typing the prefix and pressing `Ctrl+Space` to trigger suggestions

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to this project.

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Language Extensions Guide](https://code.visualstudio.com/api/language-extensions/overview)
- [TextMate Grammar](https://macromates.com/manual/en/language_grammars)
- [Snippet Syntax](https://code.visualstudio.com/docs/editor/userdefinedsnippets)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## License

MIT License - see [LICENSE](LICENSE) file for details.
