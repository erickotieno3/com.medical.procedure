# ==========================
# 🌍 Unified Medical App Starter
# Version: Stable Dev Launcher
# ==========================

Write-Host "--------------------------------------" -ForegroundColor Cyan
Write-Host "🚀 Starting Unified Medical App..." -ForegroundColor Green
Write-Host "--------------------------------------`n" -ForegroundColor Cyan

# Navigate to project root
Set-Location "C:\Users\Administrator\myApp"

# Step 1: Kill any leftover Node/Expo processes
Write-Host "🧹 Cleaning up previous Node & Expo processes..." -ForegroundColor Yellow
try {
    Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
    Get-Process expo -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 2
    Write-Host "✅ Old processes terminated." -ForegroundColor Green
} catch {
    Write-Host "⚠️ No processes to kill or already clean." -ForegroundColor DarkYellow
}

# Step 2: Clear Metro cache (optional but recommended)
Write-Host "`n🧠 Clearing Metro Bundler cache..." -ForegroundColor Yellow
npx expo start -c --offline | Out-Null
Write-Host "✅ Metro cache cleared." -ForegroundColor Green

# Step 3: Ensure dependencies match Expo SDK
Write-Host "`n🔍 Verifying dependency compatibility..." -ForegroundColor Yellow
npx expo install --fix
Write-Host "✅ Dependencies checked and fixed." -ForegroundColor Green

# Step 4: Start the Expo Dev Server on a free port
Write-Host "`n🚀 Launching Expo Dev Server..." -ForegroundColor Cyan
Start-Process "powershell" -ArgumentList "npx expo start" -NoNewWindow
Write-Host "`n✅ Expo is starting... Open Expo Go on your phone and scan the QR code." -ForegroundColor Green
Write-Host "🌐 Web version: http://localhost:8081 (auto-adjusts if port is in use)" -ForegroundColor Yellow
Write-Host "`n--------------------------------------"
Write-Host "✔ All systems go! Happy coding 👨‍⚕️💻"
Write-Host "--------------------------------------"
