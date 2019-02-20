'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/framework.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'example',
      framework: true,
    });
    return app.ready();
  });

  after(() => app.close());

  afterEach(mock.restore);

  it('should GET /', () => {
    return app
      .httpRequest()
      .get('/')
      .expect('cache redis')
      .expect(200);
  });

  describe('cache.redis', () => {
    it('set/get string', done => {
      const key = 'cache.redis.string';
      const value = 'test string';
      app.cache
        .retrieve('redis')
        .set(key, value, 30)
        .then(() => {
          return app.cache
            .retrieve('redis')
            .get(key)
            .then(result => {
              assert.equal(result, value);
            });
        })
        .then(done)
        .catch(err => {
          done(err);
        });
    });
    it('set/get object', done => {
      const key = 'cache.redis.object';
      const value = { value: 'test object' };
      app.cache
        .retrieve('redis')
        .set(key, value, 30)
        .then(() => {
          return app.cache
            .retrieve('redis')
            .get(key)
            .then(result => {
              assert.deepEqual(result, value);
            });
        })
        .then(done)
        .catch(err => {
          done(err);
        });
    });
    it('set/get array', done => {
      const key = 'cache.redis.array';
      const value = [{ value: 'test object' }];
      app.cache
        .retrieve('redis')
        .set(key, value, 30)
        .then(() => {
          return app.cache
            .retrieve('redis')
            .get(key)
            .then(result => {
              assert.deepEqual(result, value);
            });
        })
        .then(done)
        .catch(err => {
          done(err);
        });
    });
    it('set/get null', done => {
      const key = 'cache.redis.null';
      const value = null;
      app.cache
        .retrieve('redis')
        .set(key, value, 30)
        .then(() => {
          assert.fail('set null should not success');
        })
        .catch(err => {
          assert.equal(err.message, 'param value must have a value');
        })
        .finally(done);
    });
  });

  describe('extend', () => {
    it('filter.auth', () => {
      assert(!!app.auth);
    });
  });
});
