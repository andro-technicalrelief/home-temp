const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (f !== 'node_modules' && f !== '.git' && f !== 'docs') {
                walkDir(dirPath, callback);
            }
        } else if (f.endsWith('.html')) {
            callback(path.join(dir, f));
        }
    });
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replacements for logical Blesta links
    content = content.replace(/href="login\.html"/g, 'href="https://www.technicalrelief.co.za/admin/login/"');
    content = content.replace(/href="register\.html"/g, 'href="https://www.technicalrelief.co.za/admin/login/client_main"'); // Assume main client area for register if custom isn't known
    content = content.replace(/href="client-area\.html"/g, 'href="https://www.technicalrelief.co.za/admin/"');
    content = content.replace(/href="forgot-password\.html"/g, 'href="https://www.technicalrelief.co.za/admin/login/reset/"');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated Blesta links in: ${filePath}`);
    }
}

walkDir(__dirname, processFile);
console.log('Blesta Link Update Complete!');
