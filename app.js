'use strict';

const BornRpcServer = require('./lib/rpc/server');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    console.log('will ready');
    await new BornRpcServer(this.app, this.app.config);
  }
}

module.exports = AppBootHook;
