const baka = require( '@joneff/baka' );
const merge = require( 'lodash.merge' );

const defaults = {
    nodeModules: './node_modules'
};

function sassFlatten( file, outFile, options ) {
    const opts = merge( {}, defaults, options );

    baka.compile(
        file,
        outFile,
        opts
    );
}

module.exports.sassFlatten = sassFlatten;
