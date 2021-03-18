const path = require('path');
const { sassBuild } = require('../../src/build/sass-build');
const { jsonBuild } = require('../../src/build/json-build');

function build(args = {}) {
    const fileExt = args.file ? path.extname(args.file) : '.js';

    switch (fileExt) {
        case '.scss':
            sassBuild(args);
            break;
        case '.less':
            //TODO: create Less build
            console.log('less'); // eslint-disable-line no-console
            break;
        case '.js':
            //TODO: create kendoTheme.config.js build
            console.log('building kendoTheme.config.js'); // eslint-disable-line no-console
            break;
        case '.json':
            jsonBuild(args);
            break;
        default:
            throw 'Unsupported file type!';
    }
}

module.exports.build = build;
