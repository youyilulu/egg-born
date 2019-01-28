'use strict';
const assert = require('assert');
const redis = require('redis');

const { CacheStrategy } = require('egg-born-core');

class RedisCacheStrategy extends CacheStrategy {
  constructor(options) {
    const client = options.client;
    const clients = options.clients;
    assert(!client || !clients, '[egg-born] client configuration missing, require either client or clients');

    assert(client.host && client.port,
      `[egg-born] 'host: ${client.host}', 'port: ${client.port}' are required on config.redis`);
    super(redis.createClient(client));
  }
}

module.exports = RedisCacheStrategy;
