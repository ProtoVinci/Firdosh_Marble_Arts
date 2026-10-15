@echo off
setlocal enabledelayedexpansion
title Firdosh Marble Arts - Local Server

rem ---------------------------------------------------------------------------
rem  Starts the site on this machine.
rem    1 = Production   (build once, then serve fast - use this normally)
rem    2 = Development  (live reload while editing)
rem    3 = Reinstall dependencies
rem    0 = Quit
rem ---------------------------------------------------------------------------

cd /d "%~dp0"

set "PORT=3000"

echo.
echo   Firdosh Marble Arts - local server
echo   ---------------------------------
echo.
echo   Folder: %CD%
echo   Port:   %PORT%
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo   [X] Node.js was not found on this machine.
  echo.
  echo       Install the LTS build from https://nodejs.org and run this
  echo       file again. Nothing else is needed.
  echo.
  pause
  exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set "NODEVER=%%v"
echo   [ok] Node !NODEVER!
echo.

if not exist "node_modules" (
  echo   [..] Installing dependencies. This takes a minute on first run.
  echo.
  call npm install
  if errorlevel 1 (
    echo.
    echo   [X] npm install failed. Check your internet connection.
    echo.
    pause
    exit /b 1
  )
  echo.
)

:menu
echo   1. Start production build
echo   2. Start development server
echo   3. Reinstall dependencies
echo   0. Quit
echo.
set "CHOICE="
set /p "CHOICE=Choose an option: "

rem An empty answer means either a bare Enter or end-of-input. Leave now
rem instead of looping the menu forever.
if "%CHOICE%"=="" goto quit

if "%CHOICE%"=="1" goto production
if "%CHOICE%"=="2" goto development
if "%CHOICE%"=="3" goto reinstall
if "%CHOICE%"=="0" goto quit

echo.
echo   That is not one of the options.
echo.
goto menu

rem ---------------------------------------------------------------------------
rem  Production: build once, then serve the optimised output.
rem ---------------------------------------------------------------------------
:production
call :killprevious
if not exist ".next" goto buildfirst

echo.
echo   [..] Starting production server on http://localhost:%PORT%
echo       Close this window, or press Ctrl+C, to stop it.
echo.
start "" "http://localhost:%PORT%"
call npm run start -- -p %PORT%
goto quit

:buildfirst
echo.
echo   [..] No production build found. Building first, about 30 seconds.
echo.
call npm run build
if errorlevel 1 (
  echo.
  echo   [X] The build failed. The error is printed above.
  echo.
  pause
  exit /b 1
)
echo.
goto production

rem ---------------------------------------------------------------------------
rem  Development: live reload, for editing the site.
rem ---------------------------------------------------------------------------
:development
call :killprevious
echo.
echo   [..] Starting development server on http://localhost:%PORT%
echo       Close this window, or press Ctrl+C, to stop it.
echo.
start "" "http://localhost:%PORT%"
call npm run dev -- -p %PORT%
goto quit

rem ---------------------------------------------------------------------------
rem  Dependencies
rem ---------------------------------------------------------------------------
:reinstall
echo.
echo   [..] Removing node_modules and reinstalling. This takes a few minutes.
echo.
if exist "node_modules" rmdir /s /q "node_modules"
call npm install
echo.
pause
goto menu

rem ---------------------------------------------------------------------------
rem  Free the port if an earlier run is still holding it.
rem ---------------------------------------------------------------------------
:killprevious
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":%PORT%" ^| findstr LISTENING') do (
  echo   [..] Stopping the server already on port %PORT% ^(pid %%p^).
  taskkill /f /pid %%p >nul 2>&1
)
timeout /t 1 /nobreak >nul
exit /b 0

rem ---------------------------------------------------------------------------
rem  Single exit point.
rem ---------------------------------------------------------------------------
:quit
echo.
echo   Stopped.
echo.
pause
exit /b 0