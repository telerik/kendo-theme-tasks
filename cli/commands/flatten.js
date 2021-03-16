const path = require('path');
const { sassFlatten } = require('../../src/build/sass-flatten');

function flatten(args = {}) {
    const file = args.file ? args.file : 'kendoTheme.config.js';
    const fileExt = path.extname(args.file);
    const outFileName = args.outputFilename ? args.outputFilename : file;
    const outFile = args.outputPath ? path.resolve(args.outputPath, outFileName) : path.resolve('./dest', outFileName);
    const opts = args.opts ? args.opts : {};

    switch (fileExt) {
        case '.scss':
            sassFlatten(file, outFile, opts);
            break;
        case '.js':
            //TODO: create kendoTheme.config.js flatten
            console.log('fatten kendoTheme.config.js'); // eslint-disable-line no-console
            break;
        default:
            throw 'Unsupported file type!';
    }
}

module.exports.flatten = flatten;
