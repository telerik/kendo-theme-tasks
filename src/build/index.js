const { jsonBuild, jsonCompile, jsonTransform } = require('./json-build');
const { sassBuild, sassCompile } = require('./sass-build');
const { sassFlatten } = require('./sass-flatten');
const { kendoSassBuild, kendoSassCompile, kendoJsonBuild, kendoJsonCompile } = require('./kendo-build');

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
    kendoJsonCompile
};
