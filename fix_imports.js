const fs = require('fs');
const path = require('path');

const dir = 'src/components/ui';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix "import * from" to "import * as"
  // It should be "import * as Name from '...'"
  // The previous regex might have messed up names too if they followed 'as'
  
  // Actually, let's look for common broken import patterns
  content = content.replace(/import\s+\*\s+from\s+("react"|'react')/g, 'import * as React from $1');
  content = content.replace(/import\s+\*\s+from\s+("@radix-ui\/react-[\w-]+")/g, (match, p1) => {
    const name = p1.split('/').pop().replace(/"|'/g, '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Primitive';
    return `import * as ${name} from ${p1}`;
  });

  fs.writeFileSync(filePath, content);
});
