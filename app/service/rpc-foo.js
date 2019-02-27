'use strict';

const Service = require('egg').Service;

class RpcFoo extends Service {
  async foo() {
    return this.app.rpcClient.invoke('com.egg.born.service.rpcBar', 'bar', [ 'hi' ]);
  }
}

module.exports = RpcFoo;
