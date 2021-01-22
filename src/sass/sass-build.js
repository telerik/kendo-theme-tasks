const fs = require('fs');
const path = require('path');

const glob = require('glob');
const merge = require('lodash.merge');
const colors = require('ansi-colors');
const postcss = require('postcss');

const sassImporterFactory = require('./sass-importer');
const {
    logger,
    colorTheme,
    ensureDirSync,
    replacePathVariables
} = require('../utils');

colors.theme(colorTheme);

const defaults = {
    cwd: process.cwd(),

    output: {
        // The filename as relative path inside the output.path directory.
        filename: '[name].css',
        // The output directory.
        path: './dist'
    },

    dryRun: false,

    // Determines which compiler of Sass to use. Prefer `node-sass`
    compiler: require('node-sass'),

    // Options for Sass
    sassOptions: {
        importer: sassImporterFactory( { cache: true } ),
        functions: [],
        indentType: 'space',
        indentWidth: 4,
        linefeed: 'lf',
        outputStyle: 'expanded',
        precision: 10,
    },

    // postcss plugins
    postcssPlugins: []
};

function sassCompile( options ) {

    const { file, compiler, sassOptions } = options;

    try {
        return compiler.renderSync({ file, ...sassOptions }).css.toString('utf-8');
    } catch (error) {
        logger.error(`Error: ${colors.error(error.formatted)}`);
        logger.info(`File: ${error.file}:${error.line}:${error.column}`);

        throw new Error( error.message, error.file, error.line );
    }

}


function sassBuild( options ) {

    let files, importer, result, outFile;

    const opts = merge( {}, defaults, options );
    const {
        cwd,

        file,
        output,

        dryRun,

        compiler,
        sassOptions,

        postcssPlugins
    } = opts;

    files = glob.sync( path.resolve( cwd, file ) );

    if ( files.length === 0 ) {
        logger.info( 'Provide a Sass file to render' );
        return;
    }

    output.path = path.resolve( cwd, output.path );

    importer = sassOptions.importer;
    importer.setCwd( cwd );

    files.forEach(file => {
        importer.clearImported();

        outFile = path.resolve(
            output.path,
            replacePathVariables( output.filename, { filename: file } )
        );

        logger.info(`Compiling ${colors.info(file)} to ${colors.info(outFile)}`);

        result = sassCompile({ file, compiler, sassOptions });

        if ( postcssPlugins.length > 0 ) {
            result = postcss(postcssPlugins).process( result ).css;
        }

        if ( dryRun === false ) {
            ensureDirSync( path.dirname( outFile ) );
            fs.writeFileSync( outFile, result );
        }

    });
}

module.exports.sassBuild = sassBuild;
module.exports.sassCompile = sassCompile;
