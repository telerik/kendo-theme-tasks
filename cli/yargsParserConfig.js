const yargsOpts = {
    alias: {
        'file': [ 'f' ],
        'output.filename': [ 'output-filename' ],
        'output.path': [ 'output-path' ]
    },
    default: {
        'file': 'kendoTheme.config.js'
    }
};

module.exports.yargsOpts = yargsOpts;
