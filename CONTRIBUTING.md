# Contributing to Ypsilon Script VS Code Extension

Thank you for your interest in contributing to the Ypsilon Script VS Code extension! This document provides guidelines and instructions for contributing.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists in [GitHub Issues](https://github.com/ycharfi09/ys-vscode/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs. actual behavior
   - VS Code version
   - Extension version
   - Sample code that demonstrates the issue

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:

1. Check existing issues and pull requests first
2. Provide a clear use case
3. Explain why this enhancement would be useful
4. Include examples if possible

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the coding guidelines below
3. **Test your changes** thoroughly:
   - Install the extension locally
   - Test with various `.ys` files
   - Verify all features work as expected
4. **Update documentation** if needed (README, CHANGELOG)
5. **Submit a pull request** with:
   - Clear description of changes
   - Link to related issues
   - Screenshots/examples if applicable

## Development Setup

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed setup instructions.

Quick start:
```bash
git clone https://github.com/ycharfi09/ys-vscode.git
cd ys-vscode
code .
# Press F5 to launch extension development host
```

## Coding Guidelines

### JSON Files

- Use 2-space indentation
- Validate JSON syntax before committing
- Keep entries sorted alphabetically where appropriate

### TextMate Grammar

When adding to `syntaxes/ypsilon-script.tmLanguage.json`:

- Use descriptive pattern names
- Follow TextMate scope naming conventions
- Test with various code samples
- Add comments for complex patterns

**Standard Scopes:**
- `keyword.control.*` - Control flow keywords
- `storage.type.*` - Type declarations
- `entity.name.function.*` - Function names
- `variable.*` - Variables
- `constant.*` - Constants
- `comment.*` - Comments
- `string.*` - Strings

### Snippets

When adding snippets to `snippets/ypsilon-script.json`:

- Use clear, descriptive names
- Choose intuitive prefixes (short but meaningful)
- Include helpful descriptions
- Use tab stops (`$1`, `$2`, etc.) effectively
- Place final cursor position (`$0`) appropriately
- Test snippets work correctly

**Snippet Best Practices:**
```json
{
  "Descriptive Name": {
    "prefix": "shortTrigger",
    "body": [
      "line with ${1:placeholder}",
      "${2:another placeholder}",
      "$0"
    ],
    "description": "Clear explanation of what this does"
  }
}
```

### Language Configuration

When modifying `language-configuration.json`:

- Test auto-closing pairs thoroughly
- Verify bracket matching works
- Check indentation rules with various code structures
- Ensure comment toggling works correctly

## Testing

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] **Syntax highlighting**: All keywords, types, and constructs highlight correctly
- [ ] **Snippets**: All snippets expand properly with correct tab stops
- [ ] **Auto-closing**: Brackets, parentheses, and quotes close automatically
- [ ] **Auto-indent**: Code indents correctly when pressing Enter
- [ ] **Comment toggle**: `Ctrl+/` or `Cmd+/` adds/removes `#` comments
- [ ] **Code folding**: Blocks can be folded/unfolded
- [ ] **Bracket matching**: Matching brackets are highlighted
- [ ] **Works with example files**: Test with files from ypsilon-script repository

### Test Files

Use the test file at `test-files/example.ys` or create your own covering:
- All language constructs
- Edge cases
- Nested structures
- Comments
- Strings with escape sequences
- Various number formats

## What to Contribute

### Ideas for Contributions

**High Priority:**
- More comprehensive syntax highlighting patterns
- Additional useful code snippets
- Better support for nested structures
- Improved error detection patterns
- Language server protocol support (advanced)

**Documentation:**
- More examples in README
- Tutorial videos or GIFs
- Better installation instructions
- More detailed feature documentation

**Testing:**
- Automated testing setup
- More test cases
- Performance testing

**Features:**
- Code formatting support
- Linting integration
- Debugging support
- IntelliSense improvements
- Hover information
- Definition provider
- Symbol provider

### Out of Scope

Please don't submit PRs for:
- Changes to Ypsilon Script language itself (submit to ypsilon-script repo)
- Compiler functionality (belongs in ypsilon-script repo)
- Platform-specific hacks (should work cross-platform)
- Breaking changes without discussion first

## Commit Messages

Use clear, descriptive commit messages:

**Good:**
```
Add syntax highlighting for interrupt handlers
Fix auto-closing pairs for string literals
Update README with installation instructions
```

**Bad:**
```
Update
Fix bug
Changes
```

Format:
```
<type>: <short summary>

<optional longer description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Code Review Process

1. Maintainers will review your PR
2. Address any feedback or requested changes
3. Once approved, your PR will be merged
4. Your contribution will be included in the next release

## Release Process

Version numbering follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Incompatible changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

Releases include:
1. Version bump in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag
4. Publish to VS Code Marketplace

## Community

- **Issues**: Use for bug reports and feature requests
- **Pull Requests**: Use for code contributions
- **Discussions**: Use for questions and general discussion

## Recognition

Contributors will be recognized in:
- CHANGELOG.md
- GitHub contributors list
- Release notes

## Questions?

If you have questions about contributing:

1. Check [DEVELOPMENT.md](DEVELOPMENT.md) for technical details
2. Review existing issues and PRs
3. Open a new issue with the `question` label

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Ypsilon Script! 🚀
