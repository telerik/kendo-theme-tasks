const path = require('path');
const {
    sassBuild,
    jsonBuild
} = require('../../src/build');

function build(options) {
    const fileExt = options.file ? path.extname(options.file) : '.js';

    switch (fileExt) {
        case '.scss':
            sassBuild(options);
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
            jsonBuild(options);
            break;
        default:
            throw 'Unsupported file type!';
    }
}

module.exports.build = build;
