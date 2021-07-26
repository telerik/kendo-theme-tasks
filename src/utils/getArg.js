function getArg(key, argsArr) {
    const args = argsArr || process.argv;
    const index = args.indexOf(key);
    const next = args[index + 1];

    return (index < 0) ? null : (!next || next[0] === '-') ? true : next; // eslint-disable-line no-nested-ternary
}

function getEnvArg(key) {
    let name = `npm_config_${key}`;
    let arg = process.env[name];

    return arg;
}

module.exports.getArg = getArg;
module.exports.getEnvArg = getEnvArg;
