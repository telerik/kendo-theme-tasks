const {
    sassBuild,
    sassCompile,
    sassFlatten,
    jsonBuild,
    jsonCompile,
    jsonTransform,
    kendoSassBuild,
    kendoSassCompile,
    kendoJsonBuild,
    kendoJsonCompile
} = require('./src/build');

const {
    generateSassConfig,
    generateThemeChooserConfig
} = require('./src/meta');

const {
    processConfig,
    processConfigFile
} = require('./src/config');

module.exports = {
    sassBuild,
    sassCompile,
    sassFlatten,
    jsonBuild,
    jsonCompile,
    jsonTransform,
    kendoSassBuild,
    kendoSassCompile,
    kendoJsonBuild,
    kendoJsonCompile,
    generateSassConfig,
    generateThemeChooserConfig,
    processConfig,
    processConfigFile
};
