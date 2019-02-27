'use strict';

const Service = require('egg').Service;

class RpcBar extends Service {
  async bar(greet) {
    return `${greet} bar`;
  }
}

module.exports = RpcBar;
