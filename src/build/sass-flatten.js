const path = require('path');
const baka = require( '@joneff/baka' );
const merge = require( 'lodash.merge' );
const { replacePathVariables } = require('../utils');

const defaults = {
    output: {
        filename: '[name][ext]',
        path: path.resolve( process.cwd(), 'dist' )
    },
    nodeModules: path.resolve( process.cwd(), 'node_modules' )
};

function sassFlatten( options ) {
    const { file, output, ...opts } = merge( {}, defaults, options );

    const outFile = path.resolve(
        output.path,
        replacePathVariables( output.filename, file )
    );

    baka.build( file, outFile, opts );
}

module.exports.sassFlatten = sassFlatten;
