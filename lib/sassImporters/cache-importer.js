const path = require('path');

const EMPTY_IMPORT = {};

function cacheImporterFactory(options = { cache: false }) {

    const imported = options.cache instanceof Set
        ? options.cache
        : new Set();

    function cacheImporter(url, prev) {

        if (prev === 'stdin') {
            return null;
        }

        let file = path.resolve(path.join(
            path.dirname(prev),
            url
        ));

        if (options.cache && imported.has(file)) {
            return EMPTY_IMPORT;
        }

        imported.add(file);

        return { file };
    }

    return cacheImporter;
}

module.exports = cacheImporterFactory;
