'use strict';

const Service = require('egg').Service;

class TestService extends Service {
  constructor(ctx) {
    super(ctx);
    this.config = this.app.config.test;
  }

  async set(key, value) {
    return this.app.cache.retrieve('redis').set(key, value, 30);
  }
  async get(key) {
    return this.app.cache.retrieve('redis').get(key);
  }
}

module.exports = TestService;
