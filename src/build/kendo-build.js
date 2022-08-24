const { getDefaults } = require('./kendo-defaults');
const { sassCompile, sassBuild } = require('./sass-build');
const { jsonCompile, jsonBuild } = require('./json-build');
const { kendoTransformer } = require('../../lib/jsonTransformers/kendo-transformer');

const merge = require('lodash.merge');

function kendoSassCompile( options ) {
    const defaults = getDefaults();
    const buildOptions = merge( {}, defaults, options );

    return sassCompile( buildOptions );
}

function kendoSassBuild( options ) {
    const defaults = getDefaults();
    const buildOptions = merge( {}, defaults, options );

    sassBuild( buildOptions );
}

function kendoJsonCompile( options ) {
    const defaults = getDefaults();
    const buildOptions = merge( {}, defaults, options );

    buildOptions.transformer = options.transformer || kendoTransformer;

    return jsonCompile( buildOptions );
}

function kendoJsonBuild( options ) {
    const defaults = getDefaults();
    const buildOptions = merge( {}, defaults, options );

    buildOptions.transformer = options.transformer || kendoTransformer;

    jsonBuild( buildOptions );
}

module.exports.kendoSassCompile = kendoSassCompile;
module.exports.kendoSassBuild = kendoSassBuild;

module.exports.kendoJsonCompile = kendoJsonCompile;
module.exports.kendoJsonBuild = kendoJsonBuild;
