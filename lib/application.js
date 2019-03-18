'use strict';

const path = require('path');

const EggApplication = require('egg').Application;
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');
const RedisStrategy = require('./cache/redis');
const EggBornLoader = require('./loader');

const BornRpcClient = require('./rpc/client');

class Application extends EggApplication {
  constructor(options = {}) {
    super(options);
    const redisStrategy = new RedisStrategy(this.config.redis);
    this.cache.use('redis', redisStrategy);
    this.rpcClient = new BornRpcClient();
  }
  get [EGG_PATH]() {
    return path.join(__dirname, '..');
  }
  get [EGG_LOADER]() {
    return EggBornLoader;
  }
}

module.exports = Application;
