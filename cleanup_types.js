const fs = require('fs');
const path = require('path');

const dir = 'src/components/ui';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove type annotations in function parameters: (props: Type) -> (props)
  // This is a simplified approach and might need refinement
  
  // Remove "interface ... { ... }" blocks (multiline)
  content = content.replace(/interface\s+\w+\s*(extends\s+[\w\.]+)?\s*\{[\s\S]*?\}/g, '');
  
  // Remove "type ... = ...;" blocks
  content = content.replace(/type\s+\w+\s*=\s*[\s\S]*?;/g, '');

  // Remove ": React.ComponentProps<...>"
  content = content.replace(/:\s*React\.ComponentProps<[\s\S]*?>/g, '');
  
  // Remove ": React.ComponentPropsWithoutRef<...>"
  content = content.replace(/:\s*React\.ComponentPropsWithoutRef<[\s\S]*?>/g, '');

  // Remove ": React.HTMLAttributes<...>"
  content = content.replace(/:\s*React\.HTMLAttributes<[\s\S]*?>/g, '');

  // Remove generic parameters from function definitions: function Name<T>(...) -> function Name(...)
  content = content.replace(/function\s+(\w+)\s*<.*?>/g, 'function $1');

  // Remove "as ..." type assertions
  content = content.replace(/\s+as\s+[\w\<\>\[\]\|]+/g, '');

  // Remove remaining simple type annotations like ": string", ": number", ": any" in parameters
  // Careful not to match colons in objects or ternary operators
  // This regex matches colon followed by a type name before a comma, closing paren, or assignment
  content = content.replace(/:\s*(string|number|boolean|any|unknown|void|object|Symbol)\b/g, '');

  fs.writeFileSync(filePath, content);
});
