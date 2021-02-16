const fs = require('fs');
const path = require('path');
const dss = require('@progress/dss');
const nunjucks = require('nunjucks');

const templatesDir = path.resolve(__dirname, 'templates/utils-docs');

nunjucks.configure(templatesDir, { autoescape: false });

function utilsDocs() {
    const utilsDir = path.resolve('./packages/default/scss/utils/');
    const files = fs.readdirSync(utilsDir);
    const data = {
        groupNames: [],
        groups: {}
    };
    let fileContents = null;
    let output = null;

    files.forEach(file => {
        fileContents = fs.readFileSync(path.resolve(utilsDir, file));

        dss.parse(fileContents, {}, (parsedObject) => {
            parsedObject.blocks.forEach(item => {
                item.group = (item.group) ? item.group : 'common';

                if (!(item.group in data.groups)) {
                    data.groupNames.push(item.group);
                    data.groups[item.group] = [];
                }

                data.groups[item.group].push(item);
            });
        });
    });

    output = nunjucks.render('README.md.njk', data);
    fs.writeFileSync(path.join(utilsDir, 'README.md'), output);
}

module.exports.utilsDocs = utilsDocs;
