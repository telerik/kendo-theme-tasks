const fs = require('fs');
const path = require('path');
const merge = require('lodash.merge');
const { sassBuild } = require('./sass-build');
const { replacePathVariables } = require('../utils');

const kendoSchemasPath = '@progress/kendo-theme-tasks/lib/schemas/';
const defaults = {
    output: {
        // The filename as relative path inside the output.path directory.
        filename: '[name].css',
        // The output directory.
        path: './dist'
    }
};

function verifySchema( schema ) {
    if ( !schema || !schema.startsWith(kendoSchemasPath) ) {
        throw 'Invalid Schema!';
    }
}

function themebuilder( options, data ) {
    const opts = merge( {}, defaults, options );
    const fileArr = [];
    const outFile = data.name ? data.name : replacePathVariables( opts.output.filename, opts.file );
    const cssOutFIle = path.basename(outFile, path.extname(outFile)) + '.css';
    const scssOutFile = path.basename(outFile, path.extname(outFile)) + '.scss';
    const scssOutput = path.resolve( opts.output.path, scssOutFile );

    data.themeBuilder.forEach( (e) => {
        for ( const [ key, value ] of Object.entries(e.variables) ) {
            fileArr.push(`$${key}: ${value.value};\n`);
        }
    });

    fileArr.push('\n');

    if ( data.components.length === 0 ) {
        fileArr.push(`@import "~${data.base}/scss/all.scss";\n`);
    } else {
        data.components.forEach( (e) => {
            fileArr.push(`@import "~${data.base}/scss/${e}/_index.scss";\n`);
        });
    }

    fs.writeFileSync( scssOutput, fileArr.join('') );

    sassBuild({
        ...opts,
        file: scssOutput,
        output: {
            filename: cssOutFIle,
            path: opts.output.path
        }
    });
}

function jsonBuild( options ) {
    const jsonData = JSON.parse( fs.readFileSync( path.resolve(options.file) ) );

    verifySchema(jsonData.$schema);

    const currentSchema = jsonData.$schema.split(kendoSchemasPath)[1];

    switch (currentSchema) {
        case 'themebuilder-swatch.json':
            themebuilder( options, jsonData );
            break;
        default:
            throw 'Unsupported Schema!';
    }
}

module.exports.jsonBuild = jsonBuild;
