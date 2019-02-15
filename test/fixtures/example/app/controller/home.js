'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const key = 'greet';
    await this.service.test.set(key, { hello: 'cache redis' });
    const data = await this.service.test.get(key);
    this.ctx.body = data.hello;
  }
}

module.exports = HomeController;
