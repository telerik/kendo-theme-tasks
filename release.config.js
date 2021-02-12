function getArg(key) {
    let index = process.argv.indexOf(key);
    let next = process.argv[index + 1];

    return (index < 0) ? null : (!next || next[0] === '-') ? true : next; // eslint-disable-line no-nested-ternary
}
const isNightly = getArg( 'nightly' );


const configNightly = {
    branches: [
        'master',
        {
            name: 'develop',
            channel: 'dev',
            prerelease: 'dev'
        }
    ],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/npm'
    ]
};

const configStable = {
    branches: [
        'master'
    ],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/npm',
        '@semantic-release/git',
        '@semantic-release/github'
    ]
};

module.exports = isNightly ? configNightly : configStable;
