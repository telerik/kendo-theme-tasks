const {
    processConfig: _processConfig,
    processConfigFile: _processConfigFile
} = require('sass-build');

function processConfig(config) {
    _processConfig(config);
}

function processConfigFile(configPath) {
    _processConfigFile(configPath);
}

module.exports = {
    processConfig,
    processConfigFile
};
