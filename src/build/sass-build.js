const path = require('path');
const { sassBuild, sassCompile, sassCompileString } = require('sass-build');
const { replacePathVariables } = require('../utils');


function wrappedSassCompile( options ) {
    const { file, data, ...opts } = options;

    if ( file === undefined ) {
        return sassCompileString( data, opts );
    }

    return sassCompile( file, opts );
}


function wrappedSassBuild( options ) {
    const { file, output, ...opts } = options;

    let outFile = path.resolve(
        output.path,
        replacePathVariables( output.filename, file )
    );

    sassBuild( file, outFile, opts );
}

module.exports.sassBuild = wrappedSassBuild;
module.exports.sassCompile = wrappedSassCompile;
