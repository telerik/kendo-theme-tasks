const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

function createComponent(args) {
    const componentName = args.name;
    const templatesDir = path.resolve(__dirname, 'templates/create-component/node-sass');
    const templatesDirDart = path.resolve(__dirname, 'templates/create-component/dart-sass');
    const themes = [ 'default', 'bootstrap', 'material', 'classic', 'fluent' ];

    if (typeof componentName !== 'string') {
        throw 'Pass the component name as a parameter!';
    }

    function getTemplates(dir) {
        nunjucks.configure(dir, { autoescape: false });

        return fs.readdirSync(dir);
    }

    themes.forEach((theme) => {
        const dist = `./packages/${theme}/scss/`;
        const data = {
            componentName: componentName,
            theme: theme
        };
        const files = theme === 'fluent'
            ? getTemplates(templatesDirDart)
            : getTemplates(templatesDir);

        fs.mkdirSync(path.resolve(dist, componentName), { recursive: true });

        files.forEach((file) => {
            const output = nunjucks.render(file, data);
            const outputFile = path.join(dist, componentName, path.basename(file, path.extname(file)));

            if (!fs.existsSync(outputFile)) {
                fs.writeFileSync(outputFile, output);
            }
        });
    });
}

module.exports.createComponent = createComponent;
