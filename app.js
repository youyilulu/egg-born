'use strict';

const BornRpcServer = require('./lib/rpc/server');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    await new BornRpcServer(this.app, this.app.config);
  }
}

module.exports = AppBootHook;
