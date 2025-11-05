Write-Host "--------------------------------------" -ForegroundColor Cyan
Write-Host "? Starting Unified Medical App (Fast Mode)..." -ForegroundColor Green
Write-Host "--------------------------------------`n"

Set-Location "C:\Users\Administrator\myApp"

# Auto-detect open port (8081 ? 8082 ? 8083 ? 8085)
$basePort = 8081
$maxAttempts = 5
$availablePort = $null

for ($i = 0; $i -lt $maxAttempts; $i++) {
    $port = $basePort + $i
    $connection = Test-NetConnection -ComputerName "localhost" -Port $port
    if (-not $connection.TcpTestSucceeded) {
        $availablePort = $port
        break
    }
}

if ($null -eq $availablePort) {
    Write-Host "? No available ports found between 8081?8085!" -ForegroundColor Red
    exit 1
}

Write-Host "?? Using available port: $availablePort" -ForegroundColor Yellow
Write-Host "?? Launching Expo Dev Server instantly..." -ForegroundColor Cyan

Start-Process powershell -ArgumentList @('-NoExit', '-Command', "npx expo start --port $availablePort")

Write-Host "`n? Expo started successfully on port $availablePort (Fast Mode). You can close this window." -ForegroundColor Green
