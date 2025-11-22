#!/bin/bash
# Quick install script for Ypsilon Script VS Code Extension

set -e

echo "🚀 Installing Ypsilon Script VS Code Extension..."
echo ""

# Detect OS
if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
    VSCODE_EXT_DIR="$HOME/.vscode/extensions"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    VSCODE_EXT_DIR="$USERPROFILE/.vscode/extensions"
else
    echo "❌ Unsupported OS: $OSTYPE"
    exit 1
fi

# Check if VS Code extensions directory exists
if [ ! -d "$VSCODE_EXT_DIR" ]; then
    echo "❌ VS Code extensions directory not found: $VSCODE_EXT_DIR"
    echo "   Please make sure VS Code is installed."
    exit 1
fi

# Create target directory
TARGET_DIR="$VSCODE_EXT_DIR/ypsilon-script"
echo "📁 Installing to: $TARGET_DIR"

# Copy extension files
mkdir -p "$TARGET_DIR"
cp -r extension.js package.json language-configuration.json README.md CHANGELOG.md LICENSE images syntaxes snippets "$TARGET_DIR/"

echo ""
echo "✅ Extension installed successfully!"
echo ""
echo "Next steps:"
echo "1. Restart VS Code (or run 'Developer: Reload Window')"
echo "2. Open or create a .ys file"
echo "3. Start coding with Ypsilon Script!"
echo ""
echo "For more information, see:"
echo "  - README.md for features and usage"
echo "  - EXAMPLES.md for snippet examples"
echo "  - DEVELOPMENT.md for development setup"
echo ""
