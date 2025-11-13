# =============================================
# 🚀 Expo/React Native Full Update + Clean Script
# =============================================

Write-Host "`n🧹 Step 1: Cleaning caches and node processes..." -ForegroundColor Cyan

# Kill any node or metro processes
taskkill /F /IM node.exe /T > $null 2>&1

# Remove old cache and temp data
npm cache clean --force
Remove-Item -Recurse -Force .expo, .expo-shared, node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

Write-Host "`n✅ Cache cleaned successfully!" -ForegroundColor Green

# =============================================
# Update/Install Dependencies
# =============================================

Write-Host "`n📦 Step 2: Updating packages..." -ForegroundColor Cyan

# Uninstall legacy expo-cli if exists
npm uninstall -g expo-cli

# Install new local CLI
npm install @expo/cli@latest --save-dev

# Install/Update other important dependencies
npm install @types/react@latest react-native-screens@latest --save

# Optional: Update Expo SDK to latest version if used in your project
npm install expo@latest --save

Write-Host "`n✅ Packages updated successfully!" -ForegroundColor Green

# =============================================
# Reinstall Node Modules
# =============================================

Write-Host "`n📦 Step 3: Reinstalling node modules..." -ForegroundColor Cyan
npm install
Write-Host "`n✅ Node modules installed successfully!" -ForegroundColor Green

# =============================================
# Start Project
# =============================================

Write-Host "`n🚀 Step 4: Starting your Expo project..." -ForegroundColor Cyan
npx expo start -c
