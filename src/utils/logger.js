const colors = require('ansi-colors');
const gulplogger = require('gulplog');

const colorTheme = {
    error: colors.red,
    info: colors.magentaBright
};

const logger = {
    info: ( message, ...args ) => {
        gulplogger.info( colors.gray(message), ...args );
    },
    error: ( message, ...args ) => {
        gulplogger.error( message, ...args );
    }
};

module.exports.logger = logger;
module.exports.colorTheme = colorTheme;
