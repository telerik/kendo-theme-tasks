const { ensureDirSync } = require('./ensureDirSync');
const { replacer } = require('./replacer');
const { replacePathVariables } = require('./templatedPath');
const { getArg, getEnvArg } = require('./getArg');

module.exports.ensureDirSync = ensureDirSync;
module.exports.replacer = replacer;
module.exports.replacePathVariables = replacePathVariables;
module.exports.getArg = getArg;
module.exports.getEnvArg = getEnvArg;
