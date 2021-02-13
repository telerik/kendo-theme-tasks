const colors = require('ansi-colors');
const gulplogger = require('gulplog');

const logger = {
    info: ( message, ...args ) => {
        gulplogger.info( colors.gray( `Info: ${message}`), ...args );
    },
    warn: ( message, ...args ) => {
        gulplogger.warn( colors.gray(`Warn: ${colors.dim.yellow(message)}`), ...args );
    },
    error: ( message, ...args ) => {
        gulplogger.error( `Error: ${colors.red( message )}`, ...args );
    }
};

module.exports.logger = logger;
