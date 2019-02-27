'use strict';

const { RpcServer } = require('sofa-rpc-node').server;
const { ZookeeperRegistry } = require('sofa-rpc-node').registry;
const BornRpcClient = require('./client');
const logger = console;

const LOAD_SERVICE = Symbol('BornRpcServer#LoadService');
const RPC_SERVER = Symbol.for('BornRpcServer#Server');

class BornRpcServer {
  constructor(app, options) {
    const rpcOptions = options.rpc || {};
    rpcOptions.logger = rpcOptions.logger || logger;
    rpcOptions.address = rpcOptions.address || '127.0.0.1:2181';
    rpcOptions.port = rpcOptions.port || 12200;

    const registry = new ZookeeperRegistry({
      logger: rpcOptions.logger,
      address: rpcOptions.address,
    });

    this.app = app;

    this[RPC_SERVER] = new RpcServer({
      logger,
      registry,
      port: rpcOptions.port,
    });

    this.rpcClient = new BornRpcClient(rpcOptions);

    this.startRpc();
  }

  /**
   * TODO:计划是直接继承service，但是因为service是延迟加载的，这里获取不到service实例，需要再研究研究
   */
  [LOAD_SERVICE]() {
    for (const service in this.app.serviceClasses) {
      this[RPC_SERVER].addService(
        {
          interfaceName: `com.egg.born.service.${service}`,
        },
        {
          async bar(greet) {
            return `${greet} bar`;
          },
        }
      );
    }
  }

  startRpc() {
    this[LOAD_SERVICE]();

    this[RPC_SERVER].start().then(() => {
      this[RPC_SERVER].publish();
    });
  }
}

module.exports = BornRpcServer;
