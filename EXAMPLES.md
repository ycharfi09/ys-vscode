# VS Code Extension Examples

This document demonstrates how the VS Code extension enhances your Ypsilon Script coding experience.

## Features Showcase

### 1. Syntax Highlighting

Open any `.ys` file and see:

**Keywords** are highlighted:
- Control flow: `if`, `else`, `while`, `for`, `match`, `switch`
- Storage: `const`, `mut`, `react`
- Types: `fn`, `class`, `struct`, `enum`
- Events: `on`, `interrupt`, `task`

**Constants** have distinct colors:
- Boolean: `true`, `false`
- Arduino: `HIGH`, `LOW`, `INPUT`, `OUTPUT`
- Self reference: `self`, `this`

**Special syntax**:
- Comments start with `#`
- Time literals: `500ms`, `2s`, `100us`
- Directives: `@main`, `@cpp`

### 2. Code Snippets

Type these prefixes and press `Tab` to expand:

#### Program Structure

**@main** - Main entry point
```ypsilon-script
@main

```

**onstart** - Startup handler
```ypsilon-script
on start {
    
}
```

**onloop** - Main loop handler
```ypsilon-script
on loop {
    
}
```

**ysbasic** - Complete basic program
```ypsilon-script
@main

const int LED_PIN = 13

on start {
    pinMode(LED_PIN, OUTPUT)
}

on loop {
    
}
```

#### Variables

**const** - Constant variable
```ypsilon-script
const int VARIABLE_NAME = value
```

**mut** - Mutable variable
```ypsilon-script
mut int variableName = 0
```

**react** - Reactive variable (for interrupts)
```ypsilon-script
react mut int variableName = 0
```

#### Functions

**fn** - Function with return type
```ypsilon-script
fn functionName(int param) -> int {
    return param
}
```

**fnvoid** - Void function
```ypsilon-script
fn functionName(int param) {
    
}
```

#### Classes and Types

**class** - Class definition
```ypsilon-script
class ClassName {
    mut int property
    
    constructor(int initial) {
        self.property = initial
    }
    
    fn methodName() -> int {
        return self.property
    }
}
```

**enum** - Enumeration
```ypsilon-script
enum EnumName {
    VARIANT1,
    VARIANT2,
    VARIANT3
}
```

**struct** - Struct definition
```ypsilon-script
struct StructName {
    int field1
    int field2
}
```

#### Control Flow

**if** - If statement
```ypsilon-script
if (condition) {
    
}
```

**ifelse** - If-else statement
```ypsilon-script
if (condition) {
    
} else {
    
}
```

**for** - For loop
```ypsilon-script
for (mut i: int = 0; i < 10; i = i + 1) {
    
}
```

**repeat** - Repeat N times
```ypsilon-script
repeat 10 times {
    
}
```

**repeatuntil** - Repeat-until loop (do-while style)
```ypsilon-script
repeat {
    
} until (condition)
```

**match** - Pattern matching
```ypsilon-script
match value {
    pattern1 => action1,
    pattern2 => action2,
    _ => default
}
```

#### Modern Features

**interrupt** - Interrupt handler
```ypsilon-script
interrupt handlerName on PIN rising {
    
}
```

**task** - Periodic task
```ypsilon-script
task taskName every 500ms {
    
}
```

**atomic** - Atomic block
```ypsilon-script
atomic {
    
}
```

**config** - Configuration block
```ypsilon-script
config {
    board: arduino_uno,
    clock: 16MHz,
    uart: on,
    port: auto
}
```

#### Arduino Functions

**pinMode** - Set pin mode
```ypsilon-script
pinMode(pin, OUTPUT)
```

**digitalWrite** - Digital write
```ypsilon-script
digitalWrite(pin, HIGH)
```

**analogRead** - Analog read
```ypsilon-script
mut value: int = analogRead(pin)
```

**delay** - Delay milliseconds
```ypsilon-script
delay(1000)
```

**wait** - Wait with time literal
```ypsilon-script
wait 100ms
```

#### Complete Example

**ysblinkexample** - Full blink LED example
```ypsilon-script
@main

alias LED_PIN = 13

on start {
    pinMode(LED_PIN, OUTPUT)
}

on loop {
    digitalWrite(LED_PIN, HIGH)
    wait 1s
    digitalWrite(LED_PIN, LOW)
    wait 1s
}
```

### 3. Auto-Completion Features

#### Auto-Closing Pairs

When you type:
- `{` → automatically adds `}`
- `(` → automatically adds `)`
- `[` → automatically adds `]`
- `"` → automatically adds `"`
- `'` → automatically adds `'`

#### Bracket Matching

Click on any bracket to see its matching pair highlighted.

#### Smart Indentation

Press `Enter` inside a block:
```ypsilon-script
on start {
    |  # Cursor automatically indents here
}
```

### 4. Comments

Toggle line comments with `Ctrl+/` (Windows/Linux) or `Cmd+/` (Mac):

```ypsilon-script
# This is a comment
const int LED_PIN = 13  # Inline comment
```

### 5. Code Folding

Click the arrow next to line numbers to fold/unfold code blocks:

```ypsilon-script
on start {
    pinMode(13, OUTPUT)
    pinMode(12, OUTPUT)
    # ... many lines ...
}  # ← Click arrow here to fold
```

### 6. YS CLI Integration

Use built-in commands to build and upload your code:

**Command Palette (Ctrl+Shift+P / Cmd+Shift+P):**
- Type "YS: Build/Compile" to build the current file
- Type "YS: Upload to Board" to upload to your Arduino/board
- Type "YS: Clean Build Artifacts" to clean the build directory
- Type "YS: Show CLI Version" to check your YS CLI version

**Right-Click Context Menu:**
- Right-click in any `.ys` file
- Select "YS: Build/Compile" or "YS: Upload to Board"

**Requirements:**
- YS CLI must be installed and available in your PATH
- For upload commands, ensure your board is connected

## Tips for Maximum Productivity

### 1. Use Snippets Liberally

Instead of typing everything:
- Type `fn` + Tab for quick function templates
- Type `class` + Tab for class templates
- Type `if` + Tab for conditional blocks

### 2. Let Auto-Complete Help

- Type opening brackets and let them close automatically
- Use Tab to move between snippet placeholders
- Press `Ctrl+Space` to trigger IntelliSense

### 3. Navigate with Keyboard

- `Ctrl+]` / `Cmd+]` - Indent line
- `Ctrl+[` / `Cmd+[` - Outdent line
- `Ctrl+/` / `Cmd+/` - Toggle comment
- `Alt+Up/Down` - Move line up/down

### 4. Organize Your Code

- Use code folding for large blocks
- Keep related code in separate `.ys` modules
- Use comments with `#` to explain complex logic

### 5. Use CLI Commands

- Build your code with "YS: Build/Compile" before testing
- Upload directly to board with "YS: Upload to Board"
- Keep your build clean with "YS: Clean Build Artifacts"

### 6. Quick Examples

For learning or testing, use the complete example snippets:
- `ysblinkexample` - Simple LED blink
- `ysbasic` - Basic program structure

## Next Steps

1. Install the extension
2. Create a new `.ys` file
3. Try typing some snippet prefixes + Tab
4. Start coding your robotics project!

## Resources

- [Ypsilon Script Documentation](https://github.com/ycharfi09/ypsilon-script)
- [Language Reference](https://github.com/ycharfi09/ypsilon-script/blob/main/LANGUAGE_REFERENCE.md)
- [Example Projects](https://github.com/ycharfi09/ypsilon-script/tree/main/examples)

---

Happy Coding! 🚀
