const { defaults } = require('sass-build/lib/sass-build-recommended');

const output = {
    path: 'dist',
    filename: '[name].css',
};

function getDefaults() {
    return Object.assign( {}, { output }, defaults.build );
}

module.exports.getDefaults = getDefaults;
