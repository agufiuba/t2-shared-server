var log = require('winston');
log.level = process.env.LOG_LEVEL || 'debug';

module.exports = log;
