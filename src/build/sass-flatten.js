const path = require('path');
const baka = require( '@joneff/baka' );
const merge = require( 'lodash.merge' );

const defaults = {
    output: {
        filename: '[name][ext]',
        path: path.resolve( process.cwd(), 'dist' )
    },
    nodeModules: path.resolve( process.cwd(), 'node_modules' )
};

function sassFlatten( options ) {
    const opts = merge( {}, defaults, options );

    baka.build( opts );
}

module.exports.sassFlatten = sassFlatten;
