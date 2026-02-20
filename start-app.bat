@echo off
echo ========================================
echo Starting SAAE Application on Port 8081
echo ========================================
echo.
echo NOTE: This app runs on PORT 8081 (not 8080)
echo After starting, open your browser to:
echo http://localhost:8081/
echo.
echo ========================================
echo.
echo Checking if MySQL is running...
tasklist | findstr /I "mysql" >nul
if %errorlevel% neq 0 (
    echo WARNING: MySQL may not be running!
    echo Please start MySQL before running this app.
    echo.
    pause
)

echo.
echo Starting Spring Boot Application...
echo Please wait...
echo.

cd /d "%~dp0"
mvn spring-boot:run

pause
