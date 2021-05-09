process.env.LAMBDA = true;

const serverless = require('serverless-http');
const server = require('./server');
const binaryMimeTypes = ['*/*'];

module.exports.handler = serverless(server, {
    binary: binaryMimeTypes,
});
