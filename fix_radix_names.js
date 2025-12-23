const fs = require('fs');
const path = require('path');

const dir = 'src/components/ui';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix Radix imports to match common usage in shadcn components
  content = content.replace(/import\s+\*\s+as\s+React([\w-]+)Primitive\s+from\s+"@radix-ui\/react-([\w-]+)"/g, (match, p1, p2) => {
    // p2 is something like "checkbox" or "dialog"
    const name = p2.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Primitive';
    return `import * as ${name} from "@radix-ui/react-${p2}"`;
  });

  // Specifically fix the ones that might have been broken by the previous script
  // e.g. import * as ReactCheckboxPrimitive from "@radix-ui/react-checkbox"
  // should be import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
  
  // Also fix import * from broken by the first script
  content = content.replace(/import\s+\*\s+from\s+("@radix-ui\/react-[\w-]+")/g, (match, p1) => {
    const name = p1.split('/').pop().replace(/"|'/g, '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Primitive';
    return `import * as ${name} from ${p1}`;
  });

  fs.writeFileSync(filePath, content);
});
