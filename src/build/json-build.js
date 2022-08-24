const fs = require('fs');
const path = require('path');
const merge = require('lodash.merge');
const { sassBuild, sassCompile } = require('./sass-build');

const overrides = {
    sassOptions: {
        sourceMap: false
    }
};

function identityTransformer( data ) {
    return data;
}

function parseOptions( options, jsonValidator ) {
    let jsonData = {};

    const { data, file } = options;

    if ( data === undefined && file === undefined ) {
        throw new TypeError( 'Provide either options.data or options.file' );
    }

    if ( file && fs.existsSync( path.resolve( file ) ) ) {
        jsonData = JSON.parse( fs.readFileSync( path.resolve( file ), 'utf-8' ) );
    }

    if ( data ) {
        jsonData = data;
    }

    if ( typeof jsonValidator === 'function' ) {
        jsonValidator( jsonData );
    }

    return jsonData;
}

function jsonTransform( data, transformer ) {
    if ( typeof transformer !== 'function' ) {
        throw TypeError( 'Invalid arguments: transformer must be function!' );
    }

    return transformer( data );
}

function jsonCompile( options ) {
    let transformer = options.transformer || identityTransformer;
    let data = parseOptions( options );
    let sassContent = jsonTransform( data, transformer );
    const opts = merge( {}, options, overrides );

    return sassCompile({
        ...opts,
        data: sassContent
    });
}

function jsonBuild( options ) {
    let transformer = options.transformer || identityTransformer;
    let data = parseOptions( options );
    let sassContent = jsonTransform( data, transformer );
    const opts = merge( {}, options, overrides );

    sassBuild({
        ...opts,
        data: sassContent
    });
}

module.exports.jsonBuild = jsonBuild;
module.exports.jsonCompile = jsonCompile;
module.exports.jsonTransform = jsonTransform;
