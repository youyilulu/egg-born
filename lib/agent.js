'use strict';

const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');

class Agent extends egg.Agent {
  constructor(options = {}) {
    super(options);
  }
  get [EGG_PATH]() {
    return path.join(__dirname, '..');
  }
}

module.exports = Agent;
