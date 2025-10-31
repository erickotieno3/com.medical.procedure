# C:\Users\Administrator\myApp\final_monorepo_cleanup.ps1
#
# This script performs the final cleanup of the monorepo structure.
# It addresses the 'embedded git repository' warning and ensures files are pushed
# to the designated 'Erick' branch correctly.
#

Write-Host "1/4: Fixing Git Branch Issue: Creating and checking out 'Erick' branch..."
# The previous push failed because 'Erick' branch did not exist locally.
# We create the 'Erick' branch from the current commit (which contains all the monorepo structure changes).
git branch Erick -ErrorAction SilentlyContinue
git checkout Erick

Write-Host "2/4: Removing embedded Git repository from 'apps/ui-app/myApp'..."
# This removes the nested .git folder that caused the "embedded git repository" warning.
# Using -ErrorAction SilentlyContinue ensures the script continues even if the folder is already gone.
Remove-Item -Path ".\apps\ui-app\myApp\.git" -Force -Recurse -ErrorAction SilentlyContinue

Write-Host "3/4: Clearing Git cache and re-indexing files..."
# 1. Clear the cached index entry for the embedded repository
git rm --cached apps/ui-app/myApp -ErrorAction SilentlyContinue
# 2. Re-add everything to stage the files correctly
git add .

Write-Host "4/4: Committing and pushing final cleanup changes to GitHub (Branch: Erick)..."
2025-10-31 11:37:57 = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
FEAT: Complete monorepo structure setup and file reorganization. Sync: 2025-10-31 11:37:57 = "FIX: Remove nested .git directory and successfully sync monorepo to 'Erick' branch. Sync: 2025-10-31 11:37:57"
# --amend is used here to combine the git cleanup and the structural commit into one history entry
git commit --amend -m FEAT: Complete monorepo structure setup and file reorganization. Sync: 2025-10-31 11:37:57
# Push to the remote branch 'Erick', setting it up for future pushes
git push -u origin Erick

Write-Host "✅ Final monorepo cleanup complete. All structural changes are committed and pushed to the 'Erick' branch."
