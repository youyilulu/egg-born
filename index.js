'use strict';

const egg = require('egg');

Object.assign(exports, egg);

exports.Application = require('./lib/application');
exports.Agent = require('./lib/agent');
exports.AppWorkerLoader = require('./lib/loader');
