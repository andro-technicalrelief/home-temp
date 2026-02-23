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

const logoPattern = /<a\s+href="([^"]+)"\s+class="([^"]*logo[^"]*)">[\s\S]*?<img\s+src="([^"]*headericon-white\.svg)"[\s\S]*?Technical\s*Relief\s*<\/a>/g;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let matchCount = 0;

    let newContent = content.replace(logoPattern, (match, href, className, imgSrc) => {
        matchCount++;
        return `<a href="${href}" class="${className}" style="display: flex; align-items: center; text-decoration: none; color: white;">
        <img src="${imgSrc}" alt="Technical Relief Icon" style="height: 48px; margin-right: 10px; object-fit: contain;">
        <div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.1;">
          <span style="font-weight: 800; font-size: 21px; letter-spacing: -0.5px; color: white; margin-bottom: -1px;">Technical</span>
          <span style="font-weight: 800; font-size: 21px; letter-spacing: -0.5px; color: white;">Relief</span>
        </div>
      </a>`;
    });

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${matchCount} logos in: ${filePath}`);
    }
}

walkDir(__dirname, processFile);
console.log('Update Complete!');
