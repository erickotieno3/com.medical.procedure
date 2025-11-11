Write-Host "--------------------------------------" -ForegroundColor Cyan
Write-Host "Starting Unified Medical App (Clean Mode)..." -ForegroundColor Green
Write-Host "--------------------------------------`n"

# Set working directory
Set-Location "C:\Users\Administrator\myApp"

# Kill existing Node/Expo processes
Write-Host "Cleaning up previous Node & Expo processes..." -ForegroundColor Yellow
Get-Process node, expo -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "Old processes terminated.`n"

# Clear Metro bundler cache
Write-Host "Clearing Metro Bundler cache..." -ForegroundColor Cyan
if (Test-Path ".\node_modules\.cache") {
    Remove-Item -Recurse -Force ".\node_modules\.cache"
}
Write-Host "Metro cache cleared.`n"

# Find first available port starting from 8081
$port = 8081
do {
    $connection = Test-NetConnection -ComputerName "localhost" -Port $port
    if ($connection.TcpTestSucceeded) {
        Write-Host ("Port " + $port + " in use - trying next port...") -ForegroundColor Yellow
        $port++
    }
} while ($connection.TcpTestSucceeded)

Write-Host ("Using available port: " + $port + "`n") -ForegroundColor Green

# Launch Expo dev server
Write-Host "Launching Expo Dev Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList @('-NoExit', '-Command', "npx expo start --port $port --clear")

Write-Host ("Expo started successfully on port " + $port + " (Clean Mode). You can close this window.") -ForegroundColor Green
