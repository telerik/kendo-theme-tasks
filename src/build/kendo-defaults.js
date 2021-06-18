const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const calc = require('postcss-calc');

const aioImporterFactory = require('../../lib/sassImporters/aio-importer');

function getDefaults( options = { cache: false, nodeModules: false } ) {

    const sassCache = options.cache;
    const nodeModules = options.nodeModules;

    const defaults = {

        sassOptions: {
            importer: [
                aioImporterFactory({
                    cache: sassCache,
                    nodeModules: nodeModules
                })
            ]
        },

        postcssOptions: {
            implementation: postcss,
            plugins: [
                calc({
                    precision: 10
                }),
                autoprefixer()
            ]
        }
    };

    return defaults;

}

module.exports.getDefaults = getDefaults;
