const path = require('path');

const EMPTY_IMPORT = {};

function aioImporterFactory(options = { cache: false, nodeModules: false }) {

    const imported = options.cache instanceof Set
        ? options.cache
        : new Set();

    let _nodeModules = options.nodeModules || 'node_modules';

    function aioImporter(url, prev) {
        let file;
        let nodeModules = _nodeModules;

        if (typeof nodeModules === 'function') {
            nodeModules = nodeModules();
        }

        if (url.startsWith('~')) {
            file = path.resolve(
                nodeModules,
                url.slice(1)
            );
        } else if (prev !== 'stdin') {
            file = path.resolve(path.join(
                path.dirname(prev),
                url
            ));
        }

        if (options.cache && imported.has(file)) {
            return EMPTY_IMPORT;
        }

        imported.add(file);

        return { file };
    }

    return aioImporter;
}

module.exports = aioImporterFactory;
