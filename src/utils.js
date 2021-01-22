const { ensureDirSync } = require('./utils/ensureDirSync');
const { replacePathVariables } = require('./utils/templatedPath');
const { logger, colorTheme } = require('./utils/logger');

module.exports.colorTheme = colorTheme;
module.exports.logger = logger;
module.exports.ensureDirSync = ensureDirSync;
module.exports.replacePathVariables = replacePathVariables;
