# C:\Users\Administrator\myApp\add_shared_dependency.ps1
#
# Adds the shared package dependency to the root package.json.
# This prepares the monorepo for linking the package.

Write-Host "1/3: Reading existing package.json..."

# Load the current package.json content
$packagePath = ".\package.json"
$packageJson = Get-Content -Path $packagePath -Raw | ConvertFrom-Json

Write-Host "2/3: Adding @app/ui-ux-design-system dependency..."

# Add or update the dependency
if (-not $packageJson.dependencies) {
    $packageJson | Add-Member -MemberType NoteProperty -Name "dependencies" -Value @{}
}

$packageJson.dependencies."@app/ui-ux-design-system" = "1.0.0"

# Optional: Update description text (fixing markdown format)
$packageJson.description = "This is an Expo project created with create-expo-app. See: https://www.npmjs.com/package/create-expo-app"

Write-Host "3/3: Saving updated package.json..."
$packageJson | ConvertTo-Json -Depth 100 | Out-File -FilePath $packagePath -Encoding UTF8

Write-Host "✅ Dependency added successfully!"
