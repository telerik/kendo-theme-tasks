const fs = require('fs');
const path = require('path');

const merge = require('lodash.merge');
const colors = require('ansi-colors');

const {
    logger,
    ensureDirSync,
    replacePathVariables
} = require('../utils');

const defaults = {
    cwd: process.cwd(),

    output: {
        // The filename as relative path inside the output.path directory.
        filename: '[name].css',
        // The output directory.
        path: './dist'
    },

    // Options for Sass
    sassOptions: {
        importer: [],
        functions: [],
        indentType: 'space',
        indentWidth: 4,
        linefeed: 'lf',
        outputStyle: 'expanded',
        precision: 10,
        sourceMaps: false
    },

    // Options for postcss
    postcssOptions: {
        plugins: []
    },

    logLevel: 1
};

function logFile( file ) {
    return colors.magentaBright( file.replace( `${process.cwd()}/`, '' ) );
}

function sassCompile( options ) {

    const opts = merge( {}, defaults, options );

    const {
        file,
        data,
        sassOptions,
        postcssOptions,
        logLevel
    } = opts;

    if ( data === undefined && file === undefined ) {
        throw new TypeError( 'Provide either options.data or options.file' );
    }

    let rawResult;
    let result = '';
    const sassCompiler = sassOptions.implementation;
    delete sassOptions.implementation;

    /** @type {import('postcss').default} */
    const postcss = postcssOptions.implementation;
    /** @type {import('postcss').AcceptedPlugin[]} */
    const postcssPlugins = postcssOptions.plugins;

    if (logLevel !== 0) {
        logger.info( `Compiling ${logFile( file || 'data' )}` );
    }

    try {
        rawResult = sassCompiler.renderSync({ file, data, ...sassOptions });
        result = rawResult.css.toString('utf-8');

        if ( typeof postcss === 'function' && postcssPlugins.length > 0 ) {
            result = postcss(postcssPlugins).process( result ).css;
        }

        return result;

    } catch (error) {
        logger.error(`Error in ${error.file}:${error.line}:${error.column}`);
        throw new Error( error.message, error.file, error.line );
    }

}


function sassBuild( options ) {

    const opts = merge( {}, defaults, options );
    const {
        file,
        output
    } = opts;

    let outFile = path.resolve(
        output.path,
        replacePathVariables( output.filename, file )
    );

    logger.info( `Compiling ${logFile( file )} to ${logFile( outFile )}` );

    let result = sassCompile({ ...opts, logLevel: 0 });

    ensureDirSync( path.dirname( outFile ) );
    fs.writeFileSync( outFile, result );
}

module.exports.sassBuild = sassBuild;
module.exports.sassCompile = sassCompile;
