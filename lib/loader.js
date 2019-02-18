'use strict';

const AppWorkerLoader = require('egg').AppWorkerLoader;

class EggBornLoader extends AppWorkerLoader {
  load() {
    super.load();
    this.loadExtend('filter', this.app);
  }
}

module.exports = EggBornLoader;
