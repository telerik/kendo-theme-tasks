function replacer(value, allowEmpty) {

    function fn(match, input) {

        if (typeof value === 'function') {
            value = value(); // eslint-disable-line no-param-reassign
        }

        if (value === null || value === undefined) {
            if (!allowEmpty) {
                throw new Error(
                    `Variable ${match} not implemented in this context: ${input}`
                );
            }
            return '';
        }

        return `${value}`;
    }

    return fn;
}

module.exports.replacer = replacer;
