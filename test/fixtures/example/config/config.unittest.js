'use strict';

module.exports = {
  keys: '123456',
  middleware: [ 'report' ],
  redis: {
    client: {
      host: '127.0.0.1',
      port: 6379,
    },
  },
};
