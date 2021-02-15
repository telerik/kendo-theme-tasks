const { ensureDirSync } = require('./utils/ensureDirSync');
const { replacePathVariables } = require('./utils/templatedPath');
const { logger } = require('./utils/logger');

module.exports.logger = logger;
module.exports.ensureDirSync = ensureDirSync;
module.exports.replacePathVariables = replacePathVariables;
