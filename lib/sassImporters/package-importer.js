const path = require('path');

function packageImporterFactory(options = { nodeModules: false }) {

    let _nodeModules = options.nodeModules || 'node_modules';

    function packageImporter(url) {
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

            return { file };
        }

        return null;
    }

    return packageImporter;
}

module.exports = packageImporterFactory;
