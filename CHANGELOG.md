# Change Log

All notable changes to the Ypsilon Script VS Code extension will be documented in this file.

## [0.1.0] - 2025-11-22

### Added
- Initial release of Ypsilon Script language support
- Syntax highlighting for all Ypsilon Script keywords and constructs
- Support for `.ys` file extension
- Comprehensive code snippets for:
  - Program structure (`@main`, `on start`, `on loop`)
  - Variables (`const`, `mut`, `react`)
  - Functions and classes (`fn`, `class`, `struct`, `enum`)
  - Control flow (`if`, `for`, `while`, `match`, `switch`)
  - Modern features (`interrupt`, `task`, `atomic`, `signal`)
  - Arduino functions (`pinMode`, `digitalWrite`, etc.)
  - Complete example programs
- Language configuration with:
  - Auto-closing pairs for brackets and quotes
  - Bracket matching
  - Auto-indentation
  - Comment support (`#`)
  - Code folding
- TextMate grammar for accurate syntax highlighting
- Support for Ypsilon Script features:
  - Directives (`@main`, `@cpp`)
  - Event handlers (`on start`, `on loop`)
  - Interrupt handlers with modes
  - Pattern matching with `match`
  - Time literals (`ms`, `s`, `us`, `min`, `h`)
  - Type system (primitive types and width-specific types)
  - Keywords (`self`, `this`, `new`)
  - Configuration blocks
  - Module loading

### Features
- Single-line comments with `#`
- Brace-based block structure
- No semicolon required
- Static typing support
- Arduino/embedded-specific highlighting
