const { colors } = require('./colors');
const { ensureDirSync } = require('./ensureDirSync');
const { logger } = require('./logger');
const { replacer } = require('./replacer');
const { replacePathVariables } = require('./templatedPath');

module.exports.colors = colors;
module.exports.ensureDirSync = ensureDirSync;
module.exports.logger = logger;
module.exports.replacer = replacer;
module.exports.replacePathVariables = replacePathVariables;
