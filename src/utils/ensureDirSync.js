const fs = require( 'fs' );
const path = require( 'path' );

function ensureDirSync( dir ) {
    let resolvedPath = path.resolve( dir );

    if ( fs.existsSync( resolvedPath ) === false ) {
        try {
            fs.mkdirSync( resolvedPath, { recursive: true });
        } catch ( err ) {
            console.log( 'Failed to create dir:', err ); // eslint-disable-line no-console
        }
    }
}

module.exports.ensureDirSync = ensureDirSync;
