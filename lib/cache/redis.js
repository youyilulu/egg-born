'use strict';
const assert = require('assert');
const redis = require('redis');
const is = require('is-type-of');

const { CacheStrategy } = require('egg-born-core');
const { Util } = require('egg-born-core');

const METHOD_GET = Symbol('RedisCacheStrategy#get');
const METHOD_SET = Symbol('RedisCacheStrategy#set');

class RedisCacheStrategy extends CacheStrategy {
  constructor(options) {
    const client = options.client;
    const clients = options.clients;
    assert(
      !client || !clients,
      '[egg-born] client configuration missing, require either client or clients'
    );

    assert(
      client.host && client.port,
      `[egg-born] 'host: ${client.host}', 'port: ${
        client.port
      }' are required on config.redis`
    );
    const redisClient = redis.createClient(client);
    super(redisClient);
    this[METHOD_GET] = Util.promisify(redisClient.get).bind(redisClient);
    this[METHOD_SET] = Util.promisify(redisClient.set).bind(redisClient);
  }
  /**
   * get value of key
   * @param {String} key cachekey
   * @return {Object|String} cache data
   */
  async get(key) {
    const value = await this[METHOD_GET](key);
    return this.formatGetValue(value);
  }
  /**
   * set cache
   * @param {String} key cachekey
   * @param {Object|String} value cache value
   * @param {*} expireSeconds exipre time(s),default 0
   */
  async set(key, value, expireSeconds = 0) {
    if (expireSeconds > 0) {
      this[METHOD_SET](key, this.formatSetValue(value), 'EX', expireSeconds);
      return;
    }
    this[METHOD_SET](key, this.formatSetValue(value));
  }

  formatSetValue(value) {
    assert(!is.nullOrUndefined(value), 'param value must have a value');

    if (is.object(value) || is.array(value)) {
      return JSON.stringify(value);
    }
    return value.toString();
  }

  formatGetValue(value) {
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  }
}

module.exports = RedisCacheStrategy;
