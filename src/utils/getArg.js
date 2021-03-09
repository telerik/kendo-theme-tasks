function getArg(key, argsArr) {
    const args = argsArr || process.argv;
    const index = args.indexOf(key);
    const next = args[index + 1];

    return (index < 0) ? null : (!next || next[0] === '-') ? true : next; // eslint-disable-line no-nested-ternary
}

module.exports.getArg = getArg;
