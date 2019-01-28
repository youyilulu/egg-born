'use strict';

module.exports = appInfo => {
  const config = {};

  /**
   * some description
   * @member Config#test
   * @property {String} key - some description
   */
  config.test = {
    key: appInfo.name + '_123456',
  };
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
    },
  };

  return config;
};
