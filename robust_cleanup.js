const fs = require('fs');
const path = require('path');

function getAllFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, allFiles);
    } else if (file.endsWith('.js')) {
      allFiles.push(filePath);
    }
  });
  return allFiles;
}

const files = getAllFiles('src');

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove "interface ... { ... }"
  content = content.replace(/interface\s+\w+\s*(extends\s+[\w\.]+)?\s*\{[\s\S]*?\}/g, '');
  
  // 2. Remove "type ... = ...;" (multiline)
  content = content.replace(/type\s+\w+\s*=\s*[\s\S]*?;/g, '');

  // 3. Remove type annotations in function parameters and variable declarations
  // Targets: ": React.ComponentProps<...>", ": string", ": any", etc.
  // We use a lookbehind/lookahead strategy to avoid matching colons in objects or ternaries
  // Simple version: remove everything between : and the next , or ) or =
  // But shadcn uses complex types like React.ComponentProps<typeof ...> & { ... }
  
  // Remove ": React.ComponentProps<...>" and variations
  content = content.replace(/:\s*React\.(ComponentProps|HTMLAttributes|ComponentPropsWithoutRef)<[\s\S]*?>(?=\s*[\),=])/g, '');
  
  // Remove simple types like ": string", ": number", ": boolean", ": any"
  content = content.replace(/:\s*(string|number|boolean|any|unknown|void|object|Symbol|ClassValue|ClassValue\[\])\b/g, '');

  // 4. Remove generic parameters from function definitions: function Name<T>(...) -> function Name(...)
  content = content.replace(/function\s+(\w+)\s*<.*?>/g, 'function $1');

  // 5. Remove "as" type assertions
  // We must be careful not to match "import * as"
  // Assertions usually look like "value as Type" or "(value as Type)"
  // The regex matches " as " followed by word characters or types, but not at the start of a line (imports)
  content = content.replace(/(?<!import\s+\*)\s+as\s+[\w\<\>\[\]\|]+/g, (match) => {
    if (match.includes('import')) return match; // fallback
    return '';
  });

  // 6. Clean up trailing commas and double spaces that might be left behind
  // content = content.replace(/,\s*\)/g, ')'); // Careful with this one

  fs.writeFileSync(filePath, content);
});
