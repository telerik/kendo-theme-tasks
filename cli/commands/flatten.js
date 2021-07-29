const path = require('path');
const { sassFlatten } = require('../../src/build');

function flatten(options) {
    const fileExt = path.extname( options.file );

    switch (fileExt) {
        case '.scss':
            sassFlatten( options );
            break;
        default:
            throw 'Unsupported file type!';
    }
}

module.exports.flatten = flatten;
