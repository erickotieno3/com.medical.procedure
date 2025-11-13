# ============================
# SAFE FAMOUS AI IMPORT SCRIPT
# ============================

# Adjust these paths if needed
$projectPath = "C:\Users\Administrator\myApp"
$famousSource = "C:\Users\Administrator\Desktop\famous ai source codes"
$importFolder = "$projectPath\_famous-ai-import"

Write-Host "🚀 Starting safe Famous AI import..." -ForegroundColor Cyan

# 1️⃣ Verify directories
if (-not (Test-Path $projectPath)) {
    Write-Host "❌ Project path not found: $projectPath" -ForegroundColor Red
    exit
}
if (-not (Test-Path $famousSource)) {
    Write-Host "❌ Famous AI source path not found: $famousSource" -ForegroundColor Red
    exit
}

# 2️⃣ Create import folder if not exists
if (-not (Test-Path $importFolder)) {
    New-Item -Path $importFolder -ItemType Directory | Out-Null
    Write-Host "📁 Created folder: $importFolder" -ForegroundColor Green
} else {
    Write-Host "⚠️ Folder already exists, files will be merged but not overwritten." -ForegroundColor Yellow
}

# 3️⃣ Copy files safely (no overwrite)
Write-Host "📦 Copying Famous AI source files..."
Copy-Item -Path "$famousSource\*" -Destination $importFolder -Recurse -Force -ErrorAction SilentlyContinue

Write-Host "✅ Copy complete. All files placed in: $importFolder" -ForegroundColor Green

# 4️⃣ Clear npm & expo cache
Write-Host "🧹 Clearing caches..."
Set-Location $projectPath
npm cache clean --force
npx expo start -c

# 5️⃣ Optional: Git branch for merge
if (Test-Path "$projectPath\.git") {
    git checkout -b feature/famous-ai-merge
    git add .
    git commit -m "Add Famous AI source codes (safe import)"
    Write-Host "🌿 Created branch: feature/famous-ai-merge and committed import." -ForegroundColor Cyan
} else {
    Write-Host "⚠️ No Git repository found. Skipping Git step." -ForegroundColor Yellow
}

Write-Host "`n🎉 Done! Famous AI code safely imported. Review _famous-ai-import and test components before merging." -ForegroundColor Cyan
