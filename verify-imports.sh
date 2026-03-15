#!/bin/bash
# verify-imports.sh - Check for broken imports

echo "🔍 Verifying imports..."

# Check for common broken import patterns
grep -r "from ['\"]\.\./utils/" --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx" . 2>/dev/null
if [ $? -eq 0 ]; then
  echo "❌ Found problematic relative imports!"
  exit 1
else
  echo "✅ No broken relative imports found"
fi

# Check that all import targets exist
echo "Checking that all imported files exist..."
node -e "
const fs = require('fs');
const path = require('path');

function checkImports(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory() && !file.name.startsWith('node_modules') && !file.name.startsWith('.')) {
      checkImports(fullPath);
    } else if (file.name.match(/\.(js|jsx|ts|tsx)$/)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const importMatches = content.match(/from ['"]([^'"]+)['"]/g) || [];
      for (const match of importMatches) {
        const importPath = match.replace(/from ['"]|['"]/g, '');
        if (importPath.startsWith('.')) {
          const resolvedPath = path.resolve(path.dirname(fullPath), importPath);
          const extensions = ['.js', '.jsx', '.ts', '.tsx', ''];
          const exists = extensions.some(ext => {
            try {
              fs.accessSync(resolvedPath + ext);
              return true;
            } catch {
              return false;
            }
          });
          if (!exists && !importPath.includes('node_modules')) {
            console.log(`❌ Broken import in ${fullPath}: ${importPath}`);
          }
        }
      }
    }
  }
}

checkImports('.');
"
echo "✅ Import verification complete"
