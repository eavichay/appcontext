import { AppContext } from '../index';
import assert from 'assert';

describe('AppContext', () => {
  describe('get/set', () => {
    it('Should work synchronous', () => {
      assert.strictEqual(typeof AppContext.get('sync1'), 'undefined');
      AppContext.set('sync1', 'hello');
      assert.strictEqual(AppContext.get('sync1'), 'hello');
    });
    it('Allows ovrride of values', () => {
      AppContext.set('sync2', 'hello');
      assert.strictEqual(AppContext.get('sync2'), 'hello');
      AppContext.set('sync2', 'hello again');
      assert.strictEqual(AppContext.get('sync2'), 'hello again');
    });
  });
  describe('require/provide', () => {
    it('Should wait for resolution', (done) => {
      AppContext.require('test1').then((value) => {
        assert.strictEqual(value, 42);
        done();
      });
      AppContext.provide('test1', 42);
    });
    it('Should get already resolved value', (done) => {
      AppContext.require('test1').then((value) => {
        assert.strictEqual(value, 42);
        done();
      });
    });
    it('Should wait for multiple resolutions', (done) => {
      Promise.all([
        AppContext.require('test2_1'),
        AppContext.require('test2_2')
      ]).then((values) => {
        assert.strictEqual(values[0], 'TEST2_1');
        assert.strictEqual(values[1], 'TEST2_2');
        done();
      }).catch(done);
      AppContext.provide('test2_1', 'TEST2_1');
      AppContext.provide('test2_2', 'TEST2_2');
    });
  });
});