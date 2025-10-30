while ($true) {
    cd "C:\Users\Administrator\myApp"
    git add .
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "UI Auto-sync: $timestamp" --allow-empty
    git push origin ui-dev
    Start-Sleep -Seconds 300
}
while ($true) {
    git add .
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "UI Auto-sync: $timestamp" --allow-empty
    git push origin ui-dev
    Start-Sleep -Seconds 300  # every 5 minutes
}
# Auto Git Sync Script for UI updates
while ($true) {
    try {
        Set-Location "C:\Users\Administrator\myApp"
        git add .
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        git commit -m "UI Auto-sync: $timestamp" --allow-empty
        git push origin ui-dev
        Write-Host "✅ Auto-sync completed at $timestamp"
    } catch {
        Write-Host "⚠️ Sync error: $($_.Exception.Message)"
    }
    Start-Sleep -Seconds 180   # Run every 3 minutes
}
# ===============================
# AUTO-SYNC GIT WATCHER SCRIPT
# ===============================
# Path to your project folder
$projectPath = "C:\Users\Administrator\myApp"
Set-Location $projectPath

# Create a watcher for the folder
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $projectPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Debounce time to prevent multiple rapid commits
$lastChange = Get-Date
$cooldownSeconds = 10

# Function to sync changes
function Sync-ToGitHub {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "`n[INFO] Detected file change at $timestamp. Syncing..."
    
    git add .
    git commit -m "UI Auto-sync: $timestamp" --allow-empty
    git push origin ui-dev
    Write-Host "[DONE] Synced successfully at $timestamp.`n"
}

# Define what happens on file change
$action = {
    $global:lastChange = Get-Date
}

# Register events
Register-ObjectEvent $watcher Changed -Action $action | Out-Null
Register-ObjectEvent $watcher Created -Action $action | Out-Null
Register-ObjectEvent $watcher Deleted -Action $action | Out-Null
Register-ObjectEvent $watcher Renamed -Action $action | Out-Null

Write-Host "🚀 Auto Git Sync is now running. Monitoring changes in:"
Write-Host "$projectPath"
Write-Host "-------------------------------------------"

# Main loop — checks every few seconds for changes
while ($true) {
    $now = Get-Date
    if (($now - $lastChange).TotalSeconds -lt $cooldownSeconds) {
        Start-Sleep -Seconds $cooldownSeconds
        Sync-ToGitHub
        $lastChange = (Get-Date).AddSeconds(-9999)
    }
    Start-Sleep -Seconds 3
}
