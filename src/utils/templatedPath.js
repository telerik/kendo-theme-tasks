// Like https://github.com/webpack/webpack/blob/master/lib/TemplatedPathPlugin.js but simpler
const path = require( 'path' );
const { replacer } = require('./replacer');

const REGEXP = /\[([\w]+)\]/gi;

/** @typedef { import('../types').PathData } PathData */

/**
 * @param {string} filePath path to file
 * @returns {PathData} parsed parts
 */
function parsePath( filePath ) {

    /** @type {PathData} */
    const pathData = {};

    pathData.file = filePath.startsWith('./') ? filePath.slice(2) : filePath;
    pathData.ext = path.extname( pathData.file );
    pathData.base = path.basename( pathData.file );
    pathData.name = pathData.base.slice( 0, pathData.base.length - pathData.ext.length );
    pathData.path = pathData.file.slice( 0, pathData.file.length - pathData.base.length );

    return pathData;
}

/**
 * @param {string | (options: PathData) => string} template the raw path template
 * @param {string | PathData } filePath path to file or path data
 * @returns {string} the interpolated path
 */
function replacePathVariables( template, filePath ) {

    /** @type {Map<string, Function>} */
    const replacements = new Map();

    let result = template;
    let pathData = filePath;

    if (filePath) {

        if (typeof filePath === 'string') {
            pathData = parsePath(filePath);
        }

        replacements.set('file', replacer(pathData.file));
        replacements.set('path', replacer(pathData.path, true));
        replacements.set('base', replacer(pathData.base));
        replacements.set('name', replacer(pathData.name));
        replacements.set('ext', replacer(pathData.ext, true));
    }

    if (typeof template === 'function') {
        result = result(filePath);
    }

    result = result.replace( REGEXP, ( match, content ) => {
        const replacer = replacements.get( content );

        if (replacer !== undefined) {
            return replacer( content, result );
        }

        return match;
    });

    return result;
}

module.exports.parsePath = parsePath;
module.exports.replacePathVariables = replacePathVariables;
