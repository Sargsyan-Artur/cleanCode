const secret = require("yargs").argv.secret;
const confidential = require("yargs").argv.confidential;

const classificationLevel  = {
    UNCLASSIFIED: 'Unclassified',
    CONFIDENTIAL: 'Confidential',
    SECRET: 'Secret',
    TOP_SECRET: 'Top_secret'
};

module.exports =  classificationLevel;
