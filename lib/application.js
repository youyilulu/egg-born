'use strict';

const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');
const RedisStrategy = require('../lib/cache/redis');
const EggBornLoader = require('./loader');

class Application extends egg.Application {
  constructor(options = {}) {
    super(options);
    const redisStrategy = new RedisStrategy(this.config.redis);
    this.cache.use('redis', redisStrategy);
  }
  get [EGG_PATH]() {
    return path.join(__dirname, '..');
  }
  get [EGG_LOADER]() {
    return EggBornLoader;
  }
}

module.exports = Application;
