@echo off
echo ========================================
echo Running SAAE Application (Port 8081)
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Java installation...
java -version
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Checking if port 8081 is already in use...
netstat -ano | findstr :8081
if %errorlevel% equ 0 (
    echo WARNING: Port 8081 is already in use!
    echo Please close the application using port 8081 or change the port.
    pause
    exit /b 1
)

echo.
echo Checking MySQL connection...
echo.

echo.
echo Compiling the project...
call mvn clean compile
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Compilation failed!
    echo Please check the errors above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Starting Spring Boot Application...
echo ========================================
echo Once you see "Started SaaeApplication", open your browser to:
echo.
echo    http://localhost:8081/
echo.
echo Press Ctrl+C to stop the application
echo ========================================
echo.

call mvn spring-boot:run

pause
