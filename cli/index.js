const argv = require('yargs-parser');
const { commandsList } = require('./commandsList');
const { yargsOpts } = require('./yargsParserConfig');

function cli(args) {
    const commandName = args[2];

    if (commandName in commandsList) {
        const command = commandsList[commandName];
        const opts = argv(process.argv.slice(2), yargsOpts);

        command(opts);
    } else {
        throw 'Unknown command';
    }
}

module.exports.cli = cli;
module.exports.commands = commandsList;
