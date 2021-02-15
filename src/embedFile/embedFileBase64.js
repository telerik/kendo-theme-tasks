const fs = require('fs');
const path = require('path');

const mime = require('mime');
const merge = require('lodash.merge');

const { ensureDirSync } = require('../utils/ensureDirSync');
const { replacer } = require('../utils/replacer');
const { replacePathVariables } = require('../utils/templatedPath');

const REGEXP = /<([\w]+)>/gi;
const cwd = process.cwd();

/** @typedef { import('../types').FileData } FileData */
/** @typedef { import('../types').OutputOptions } OutputOptions */
/** @typedef { import('../types').EmbedFileOptions } EmbedFileOptions */

/** @type {EmbedFileOptions} */
const defaults = {
    cwd: cwd,

    output: {
        // The filename as relative path inside the output.path directory.
        filename: '[name].[ext].txt',
        // The output directory.
        path: path.join( cwd, 'dist' )
    },

    template: 'data:<mime>;base64,<base64>',

    dryRun: false
};

/**
 * @param {string} filePath path to file
 * @returns {FileData} parsed parts
 */
function parseFile( filePath ) {

    /** @type {FileData} */
    const fileData = {};
    const fileStats = fs.statSync( filePath );

    fileData.file = filePath.startsWith('./') ? filePath.slice(2) : filePath;
    fileData.ext = path.extname( fileData.file );
    fileData.base = path.basename( fileData.file );
    fileData.name = fileData.base.slice( 0, fileData.base.length - fileData.ext.length );
    fileData.path = fileData.file.slice( 0, fileData.file.length - fileData.base.length );
    fileData.mime = mime.getType( fileData.file );
    fileData.base64 = fs.readFileSync( filePath ).toString( 'base64' );
    fileData.size = fileStats.size;
    fileData.created = fileStats.birthtime;
    fileData.accessed = fileStats.birthtime;
    fileData.changed = fileStats.birthtime;
    fileData.modified = fileStats.birthtime;

    return fileData;
}

/**
 * @param {string} template the raw template
 * @param {string} file path to file
 * @returns {string} the interpolated template
 */
function replaceFileVariables( template, file ) {

    /** @type {Map<string, Function>} */
    const replacements = new Map();

    let result = template;
    const fileData = parseFile(file);

    replacements.set('file', replacer(fileData.file));
    replacements.set('path', replacer(fileData.path, true));
    replacements.set('base', replacer(fileData.base));
    replacements.set('name', replacer(fileData.name));
    replacements.set('ext', replacer(fileData.ext, true));
    replacements.set('mime', replacer(fileData.mime));
    replacements.set('size', replacer(fileData.size));
    replacements.set('base64', replacer(fileData.base64));
    replacements.set('created', replacer(fileData.created));
    replacements.set('accessed', replacer(fileData.accessed));
    replacements.set('changed', replacer(fileData.changed));
    replacements.set('modified', replacer(fileData.modified));

    result = result.replace( REGEXP, ( match, content ) => {
        const replacer = replacements.get( content );

        if (replacer !== undefined) {
            return replacer( content, result );
        }

        return match;
    });

    return result;
}


/**
 * @param {EmbedFileOptions} options
 */
function embedFileBase64( options ) {

    /** @type {EmbedFileOptions} */
    const opts = merge( {}, defaults, options );
    /** @type {OutputOptions} */
    const output = opts.output;

    output.path = path.resolve( opts.cwd, output.path );

    let outFile = path.resolve(
        output.path,
        replacePathVariables( output.filename, { filename: opts.file } )
    );

    let result = replaceFileVariables( opts.template, opts.file );

    if ( opts.dryRun === false ) {
        ensureDirSync( path.dirname( outFile ) );
        fs.writeFileSync( outFile, result );
    }

}

module.exports.parseFile = parseFile;
module.exports.replaceFileVariables = replaceFileVariables;
module.exports.embedFileBase64 = embedFileBase64;
