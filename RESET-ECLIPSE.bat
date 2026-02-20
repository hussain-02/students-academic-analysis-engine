@echo off
cls
echo ========================================
echo   COMPLETE ECLIPSE RESET
echo ========================================
echo.
echo This will delete Eclipse's old configuration
echo and force it to rebuild everything fresh.
echo.
echo YOU MUST CLOSE ECLIPSE BEFORE RUNNING THIS!
echo.
pause

cd /d "%~dp0"

echo.
echo Deleting old Eclipse configuration...
if exist .classpath del .classpath
if exist .project del .project
if exist .settings rmdir /s /q .settings

echo Deleting old compiled classes...
if exist target rmdir /s /q target

echo Deleting annotation processing files...
if exist .apt_generated rmdir /s /q .apt_generated
if exist .apt_generated_tests rmdir /s /q .apt_generated_tests

echo.
echo ========================================
echo   DONE!
echo ========================================
echo.
echo Now do this:
echo.
echo 1. OPEN ECLIPSE
echo.
echo 2. Click: File -^> Import
echo.
echo 3. Expand "Maven" -^> Select "Existing Maven Projects"
echo.
echo 4. Click Browse -^> Select this folder:
echo    %CD%
echo.
echo 5. Make sure pom.xml is CHECKED
echo.
echo 6. Click FINISH
echo.
echo 7. WAIT for the progress bar in bottom-right corner
echo    (Eclipse is downloading Spring Boot libraries)
echo.
echo 8. When done, right-click SaaeApplication.java
echo    -^> Run As -^> Java Application
echo.
echo ========================================
pause
