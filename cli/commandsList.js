const commands = require('./commands/index');

const commandsList = {
    'init': commands.init,
    'build': commands.build,
    'flatten': commands.flatten,
    'docs': commands.docs,
    'new-component': commands.newComponent
};

module.exports.commandsList = commandsList;
