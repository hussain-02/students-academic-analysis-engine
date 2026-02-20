@echo off
echo ========================================
echo  FIX: Regenerating Eclipse Configuration
echo ========================================
echo.
echo This will regenerate Eclipse's project files from your pom.xml
echo.
pause

cd /d "%~dp0"

echo Step 1: Deleting old Eclipse configuration...
if exist .classpath del .classpath
if exist .settings rmdir /s /q .settings
if exist .project del .project

echo.
echo Step 2: Regenerating Eclipse project files from Maven...
echo.

REM Check if mvn is available
where mvn >nul 2>nul
if %errorlevel% equ 0 (
    echo Using system Maven...
    mvn eclipse:clean eclipse:eclipse
) else (
    echo Maven not found in PATH!
    echo.
    echo Please do this manually in Eclipse:
    echo 1. Close Eclipse
    echo 2. Delete .classpath, .settings, and .project from project folder
    echo 3. Reopen Eclipse
    echo 4. File -^> Import -^> Maven -^> Existing Maven Projects
    echo 5. Select this folder
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo  Done! Now do this in Eclipse:
echo ========================================
echo.
echo 1. Right-click the project -^> Refresh (F5)
echo 2. Right-click the project -^> Maven -^> Update Project
echo 3. Check "Force Update" and click OK
echo.
pause
