import fs from 'fs';
import path from 'path';

function getFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const fullPath = path.join(dir, item);
    if (fs.statSync(fullPath).isDirectory()) {
      if (item !== 'node_modules' && item !== 'build' && item !== '.git') {
        getFiles(fullPath, files);
      }
    } else if (item.endsWith('.js') || item.endsWith('.jsx')) {
      files.push(fullPath);
    }
  }
  return files;
}

function convertImports(content) {
  // Regex to match: import { ... } from '@mui/icons-material';
  // It handles multi-line blocks.
  const regex = /import\s*\{([^}]+)\}\s*from\s*['"]@mui\/icons-material['"];?/g;
  
  return content.replace(regex, (match, importsStr) => {
    // Split by comma to get individual icon specs
    const parts = importsStr.split(',').map(p => p.trim()).filter(Boolean);
    const newImports = [];
    
    for (const part of parts) {
      // Check for: IconName as AliasName
      if (part.includes(' as ')) {
        const [original, alias] = part.split(/\s+as\s+/).map(x => x.trim());
        newImports.push(`import ${alias} from '@mui/icons-material/${original}';`);
      } else {
        newImports.push(`import ${part} from '@mui/icons-material/${part}';`);
      }
    }
    
    return newImports.join('\n');
  });
}

function main() {
  const srcDir = './client/src';
  console.log(`📂 Scanning directory: ${srcDir}...`);
  const files = getFiles(srcDir);
  console.log(`✓ Found ${files.length} JavaScript files.`);
  
  let modifiedCount = 0;
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes("@mui/icons-material")) {
      console.log(`📝 Processing: ${file}...`);
      const updatedContent = convertImports(content);
      if (updatedContent !== content) {
        fs.writeFileSync(file, updatedContent, 'utf8');
        console.log(`  ✅ Successfully updated icon imports!`);
        modifiedCount++;
      } else {
        console.log(`  ℹ️ No changes needed.`);
      }
    }
  }
  
  console.log(`\n🎉 Completed! Refactored ${modifiedCount} files.`);
}

main();
