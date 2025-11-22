@echo off
REM Quick install script for Ypsilon Script VS Code Extension (Windows)

echo Installing Ypsilon Script VS Code Extension...
echo.

set "VSCODE_EXT_DIR=%USERPROFILE%\.vscode\extensions"
set "TARGET_DIR=%VSCODE_EXT_DIR%\ypsilon-script"

REM Check if VS Code extensions directory exists
if not exist "%VSCODE_EXT_DIR%" (
    echo ERROR: VS Code extensions directory not found: %VSCODE_EXT_DIR%
    echo Please make sure VS Code is installed.
    pause
    exit /b 1
)

echo Installing to: %TARGET_DIR%

REM Create target directory
if not exist "%TARGET_DIR%" mkdir "%TARGET_DIR%"

REM Copy extension files
xcopy /E /I /Y extension.js "%TARGET_DIR%\" >nul
xcopy /E /I /Y package.json "%TARGET_DIR%\" >nul
xcopy /E /I /Y language-configuration.json "%TARGET_DIR%\" >nul
xcopy /E /I /Y README.md "%TARGET_DIR%\" >nul
xcopy /E /I /Y CHANGELOG.md "%TARGET_DIR%\" >nul
xcopy /E /I /Y LICENSE "%TARGET_DIR%\" >nul
xcopy /E /I /Y images "%TARGET_DIR%\images\" >nul
xcopy /E /I /Y syntaxes "%TARGET_DIR%\syntaxes\" >nul
xcopy /E /I /Y snippets "%TARGET_DIR%\snippets\" >nul

echo.
echo Extension installed successfully!
echo.
echo Next steps:
echo 1. Restart VS Code (or run 'Developer: Reload Window')
echo 2. Open or create a .ys file
echo 3. Start coding with Ypsilon Script!
echo.
echo For more information, see:
echo   - README.md for features and usage
echo   - EXAMPLES.md for snippet examples
echo   - DEVELOPMENT.md for development setup
echo.
pause
