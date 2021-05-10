const argv = require('yargs-parser');
const commands = require('./commands');

const yargsOpts = {
    alias: {
        'f': [ 'file' ],
        'o': [ 'output.path' ],
        'output-path': [ 'output.path' ],
        'output-filename': [ 'output.filename' ]
    },
    default: {
        'file': 'kendoTheme.config.js',
        'output-path': 'dist'
    },
    configuration: {
        'strip-dashed': true
    }
};

function cli() {

    const commandName = process.argv[2];
    const command = commands[commandName];
    const opts = argv( process.argv.slice(2), yargsOpts );

    if (typeof command === 'function') {
        command(opts);
    } else {
        throw TypeError( `Unknown command: ${commandName}` );
    }
}

module.exports = cli;
