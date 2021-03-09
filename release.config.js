const { getArg } = require('./src/utils/');
const isNightly = getArg( '--nightly' );


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
