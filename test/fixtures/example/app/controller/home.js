'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const key = 'greet';
    await this.service.test.set(key, 'cache redis');
    const data = await this.service.test.get(key);
    this.ctx.body = data;
  }
}

module.exports = HomeController;
