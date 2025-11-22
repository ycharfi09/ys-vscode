# Ypsilon Script for Visual Studio Code

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Language support for [Ypsilon Script](https://github.com/ycharfi09/ypsilon-script) - A modern, easy-to-use alternative to C++ and Arduino for robotics projects.

## Features

This extension provides comprehensive language support for Ypsilon Script (.ys files):

### 🎨 Syntax Highlighting
- Keywords: `fn`, `class`, `struct`, `enum`, `on`, `match`, `switch`
- Control flow: `if`, `else`, `while`, `for`, `repeat`, `until`, `times`, `return`, `break`, `continue`
- Storage modifiers: `const`, `mut`, `react`
- Events: `on start`, `on loop`, `interrupt`
- Modern features: `task`, `atomic`, `signal`, `emit`, `load`, `alias`
- Directives: `@main`, `@cpp`
- Types: `int`, `float`, `bool`, `string`, and width-specific types (`i8`, `u32`, `f64`, etc.)
- Arduino functions: `pinMode`, `digitalWrite`, `analogRead`, `delay`, etc.
- Time literals: `500ms`, `2s`, `100us`

### 📝 Intelligent Code Snippets
Type these prefixes and press Tab to expand:

**Program Structure:**
- `@main` - Main entry point directive
- `onstart` - Event handler for startup
- `onloop` - Event handler for main loop
- `ysbasic` - Complete basic program template

**Variables:**
- `const` - Constant declaration
- `mut` - Mutable variable
- `react` - Reactive (volatile) variable

**Functions & Classes:**
- `fn` - Function with return type
- `fnvoid` - Void function
- `class` - Class definition
- `enum` - Enumeration
- `struct` - Struct definition

**Control Flow:**
- `if` / `ifelse` - Conditional statements
- `while` - While loop
- `for` - For loop
- `repeat` - Repeat N times loop
- `repeatuntil` - Repeat-until (do-while) loop
- `match` - Pattern matching
- `switch` - Switch statement

**Modern Features:**
- `interrupt` - Interrupt handler
- `task` - Periodic task
- `taskbg` - Background task
- `atomic` - Atomic block
- `config` - Configuration block
- `load` / `loadmod` - Load library or module
- `alias` - Create alias
- `signal` / `emit` - Signal declaration and emission

**Arduino Functions:**
- `pinMode` - Set pin mode
- `digitalWrite` / `digitalRead` - Digital I/O
- `analogWrite` / `analogRead` - Analog I/O
- `delay` / `wait` - Timing functions
- `print` - Serial output

**Complete Examples:**
- `ysblinkexample` - Full LED blink example

### 🛠️ YS CLI Integration

Execute Ypsilon Script CLI commands directly from VS Code:

**Available Commands:**
- `YS: Build/Compile` - Build the current YS file
- `YS: Upload to Board` - Upload compiled code to the target board
- `YS: Clean Build Artifacts` - Clean build directory
- `YS: Show CLI Version` - Display installed YS CLI version

**Access Commands:**
- Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open Command Palette
- Type "YS:" to see all available commands
- Or right-click in a `.ys` file to access Build and Upload commands from context menu

### 🔧 Smart Editing Features
- **Auto-closing pairs** for brackets, parentheses, and quotes
- **Bracket matching** with `{`, `[`, `(`
- **Auto-indentation** inside blocks
- **Comment toggling** with `#` (line comments)
- **Code folding** for blocks and regions

### 📚 Language Features
- File extension: `.ys`
- Single-line comments with `#`
- Braces required for all blocks
- No semicolons needed
- Static typing with explicit type annotations

## Example Code

```ypsilon-script
@main

alias LED_PIN = 13
enum Mode { AUTO, MANUAL }

mut Mode currentMode = AUTO

on start {
    pinMode(LED_PIN, OUTPUT)
    print("System initialized")
}

on loop {
    match currentMode {
        AUTO => digitalWrite(LED_PIN, HIGH),
        MANUAL => digitalWrite(LED_PIN, LOW)
    }
    wait 1s
}

task blink every 500ms {
    digitalWrite(LED_PIN, HIGH)
    wait 250ms
    digitalWrite(LED_PIN, LOW)
}
```

## Installation

### From VS Code Marketplace (Coming Soon)
1. Open VS Code
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (Mac)
3. Type `ext install ycharfi09.ypsilon-script`
4. Press Enter

### From Source

#### Quick Install (Recommended)

**Linux/macOS:**
```bash
git clone https://github.com/ycharfi09/ys-vscode.git
cd ys-vscode
./install.sh
```

**Windows:**
```cmd
git clone https://github.com/ycharfi09/ys-vscode.git
cd ys-vscode
install.bat
```

Then reload VS Code.

#### Manual Install

1. Clone this repository
2. Copy the folder to your VS Code extensions directory:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\ypsilon-script`
   - **macOS**: `~/.vscode/extensions/ypsilon-script`
   - **Linux**: `~/.vscode/extensions/ypsilon-script`
3. Reload VS Code

### For Development
1. Clone this repository
2. Open the folder in VS Code
3. Press `F5` to launch a new VS Code window with the extension loaded

## Requirements

- Visual Studio Code 1.74.0 or higher
- [Ypsilon Script Compiler](https://github.com/ycharfi09/ypsilon-script) (optional, for syntax highlighting and snippets)
- [YS CLI](https://github.com/ycharfi09/ypsilon-script) (required for Build/Upload commands)

## Language Overview

Ypsilon Script is designed for robotics and embedded systems with:

- **Modern syntax** with braces and no semicolons
- **Strong static typing** with explicit type annotations
- **`@main` directive** for entry point declaration
- **Event-driven programming** with `on start` and `on loop`
- **Pattern matching** with `match` expressions
- **Interrupt handling** with dedicated syntax
- **Tasks** for periodic and background execution
- **Reactive variables** for interrupt-safe state
- **Time literals** like `500ms`, `2s`
- **Classes and OOP** with `self` keyword
- **Enums and structs** for data modeling

## Snippets Quick Reference

| Prefix | Description |
|--------|-------------|
| `@main` | Main entry point |
| `onstart` | Startup event |
| `onloop` | Main loop event |
| `const` | Constant variable |
| `mut` | Mutable variable |
| `fn` | Function |
| `class` | Class definition |
| `enum` | Enumeration |
| `struct` | Struct definition |
| `if` | If statement |
| `for` | For loop |
| `repeat` | Repeat N times |
| `repeatuntil` | Repeat-until loop |
| `match` | Pattern matching |
| `interrupt` | Interrupt handler |
| `task` | Periodic task |

## Contributing

Contributions are welcome! Please visit the [GitHub repository](https://github.com/ycharfi09/ys-vscode) to report issues or submit pull requests.

## Related Projects

- [Ypsilon Script Compiler](https://github.com/ycharfi09/ypsilon-script) - The official compiler
- [Language Reference](https://github.com/ycharfi09/ypsilon-script/blob/main/LANGUAGE_REFERENCE.md) - Complete language documentation

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits

Created by [Youssef Charfi](https://github.com/ycharfi09)

---

**Enjoy coding with Ypsilon Script!** 🚀
