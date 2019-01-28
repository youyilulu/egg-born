'use strict';
const assert = require('assert');
const redis = require('redis');

const { CacheStrategy } = require('egg-born-core');
const { Util } = require('egg-born-core');

const METHOD_GET = Symbol('DefaultStrategy#get');

class RedisCacheStrategy extends CacheStrategy {
  constructor(options) {
    const client = options.client;
    const clients = options.clients;
    assert(!client || !clients, '[egg-born] client configuration missing, require either client or clients');

    assert(client.host && client.port,
      `[egg-born] 'host: ${client.host}', 'port: ${client.port}' are required on config.redis`);
    const redisClient = redis.createClient(client);
    super(redisClient);
    this[METHOD_GET] = Util.promisify(redisClient.get).bind(redisClient);
  }
  async get(...args) {
    return this[METHOD_GET](...args);
  }
}

module.exports = RedisCacheStrategy;
