const { defaults } = require('sass-build/lib/sass-build-recommended');

function getDefaults() {
    return defaults.build;
}

module.exports.getDefaults = getDefaults;
