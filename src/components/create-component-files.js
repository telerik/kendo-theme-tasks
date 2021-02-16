const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

function createComponentFiles(name) {
    const componentName = name;
    const templatesDir = path.resolve(__dirname, 'templates/create-component-files');
    const themes = [ 'default', 'bootstrap', 'material', 'classic' ];
    const files = fs.readdirSync(templatesDir);

    nunjucks.configure(templatesDir, { autoescape: false });

    if (!componentName) {
        throw 'Pass the component name as a parameter!';
    }

    themes.forEach((theme) => {
        const dist = `./packages/${theme}/scss/`;
        const data = {
            componentName: componentName,
            theme: theme
        };

        fs.mkdirSync(path.resolve(dist, componentName), { recursive: true });

        files.forEach((file) => {
            const output = nunjucks.render(file, data);

            fs.writeFileSync(path.join(dist, componentName, path.basename(file, path.extname(file))), output);
        });
    });
}

module.exports.createComponentFiles = createComponentFiles;
