'use strict';

const { RpcClient } = require('sofa-rpc-node').client;
const { ZookeeperRegistry } = require('sofa-rpc-node').registry;
const logger = console;

class BornRpcClient {
  constructor(options = {}) {
    options.address = options.address || '127.0.0.1:2181';
    this.registry = new ZookeeperRegistry({
      logger,
      address: options.address,
    });
  }

  /**
   * 调用服务
   * @param {String} interfaceName 服务名
   * @param {String} method 方法名
   * @param {Array} args 参数列表
   * @return {any} 远程调用返回
   */
  async invoke(interfaceName, method, args) {
    const client = new RpcClient({
      logger,
      registry: this.registry,
    });

    const consumer = client.createConsumer({
      interfaceName,
    });

    await consumer.ready();

    return consumer.invoke(method, args, { responseTimeout: 3000 });
  }
}

module.exports = BornRpcClient;
