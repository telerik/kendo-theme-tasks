// Like https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js but simpler
const { basename, extname } = require( 'path' );
const { replacer } = require('./replacer');

const REGEXP = /\[([\w]+)\]/gi;

/** @typedef {{ path: string, base: string, name: string, ext: string }} ParsedPathData */
/** @typedef {{ filename: string }} FileInfo */

/**
 * @param {string} filePath path to file
 * @returns {ParsedPathData} parsed parts
 */
function parsePath( filePath ) {

    const file = filePath.startsWith('./') ? filePath.slice(2) : filePath;
    const ext = extname( file );
    const base = basename( file );
    const name = base.slice( 0, base.length - ext.length );
    const path = file.slice( 0, file.length - base.length );

    return { file, path, base, name, ext };
}

/**
 * @param {string | (options: FileInfo) => string} path the raw path
 * @param {FileInfo} fileInfo options affecting the output of the compilation
 * @returns {string} the interpolated path
 */
function replacePathVariables( path, fileInfo ) {

    /** @type {Map<string, Function>} */
    const replacements = new Map();

    let { filename } = fileInfo;

    if (filename && typeof filename === 'string') {

        const { file, path, base, name, ext } = parsePath(filename);

        replacements.set('file', replacer(file));
        replacements.set('path', replacer(path, true));
        replacements.set('base', replacer(base));
        replacements.set('name', replacer(name));
        replacements.set('ext', replacer(ext, true));
    }

    if (typeof path === 'function') {
        path = path(fileInfo); // eslint-disable-line no-param-reassign
    }

    path = path.replace( REGEXP, ( match, content ) => { // eslint-disable-line no-param-reassign
        const replacer = replacements.get( content );

        if (replacer !== undefined) {
            return replacer( content, path );
        }

        return match;
    });

    return path;
}

module.exports.parsePath = parsePath;
module.exports.replacePathVariables = replacePathVariables;
