const colors = require('ansi-colors');
const log = require('fancy-log');

const logger = {
    info: ( message, ...args ) => {
        log.info( colors.gray( `Info: ${message}`), ...args );
    },
    warn: ( message, ...args ) => {
        log.warn( colors.gray(`Warn: ${colors.dim.yellow(message)}`), ...args );
    },
    error: ( message, ...args ) => {
        log.error( `Error: ${colors.red( message )}`, ...args );
    }
};

module.exports.logger = logger;
