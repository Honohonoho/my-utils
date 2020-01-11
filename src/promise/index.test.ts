import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import Promise from './index';

chai.use(sinonChai)
const assert = chai.assert

describe('Promise', ()=> {
  it('is a class', ()=> {
    assert.isFunction(Promise)
    assert.isObject(Promise.prototype)
  })
  it('new Promise() 接受的不是一个函数就报错', ()=> {
    assert.throw(()=> {
      // @ts-ignore
      new Promise();
    })
    assert.throw(()=> {
      new Promise(1);
    })
    assert.throw(()=> {
      new Promise(false);
    })
  })
  it('new Promise() have a method named then', ()=> {
    const promise = new Promise(()=>{})
    assert.isFunction(promise.then)
  })
  it('new Promise(fn) 中的 fn 立即执行', ()=> {
    let fn = sinon.fake()
    new Promise(fn)
    assert(fn.called)
  })
  it('new Promise(fn) fn 执行时接受 resolve 和 reject 两个函数',(done)=> {
    new Promise((resolve, reject)=>{
      assert.isFunction(resolve)
      assert.isFunction(reject)
      done()
    })
  })
  it('promise.then(success) 中的 success 会在 resolve 时被调用时执行', (done)=> {
    let success = sinon.fake()
    const promise = new Promise((resolve, reject)=>{
      // 现在没执行
      assert.isFalse(success.called)
      resolve()
      //执行了
      setTimeout(()=>{
        assert.isTrue(success.called)
        done()
      })
    })
    // @ts-ignore
    promise.then(success)
  })
  it('promise.then(success) 中的 fail 会在 reject 时被调用时执行', (done)=> {
    let fail = sinon.fake()
    const promise = new Promise((resolve, reject)=>{
      // 现在没执行
      assert.isFalse(fail.called)
      reject()
      //执行了
      setTimeout(()=>{
        assert.isTrue(fail.called)
        done()
      })
    })
    // @ts-ignore
    promise.then(null, fail)
  })
  it('success, fail 必须是个函数,且可选', ()=> {
    const promise = new Promise((resolve, reject)=>{
      resolve()
    })
    promise.then(false, null)
    assert(1===1)
  })
  it('promise.then(success) 时，状态变为 fulfilled, 且把 promise 的值作为第一个参数', (done)=> {
    let succeed = sinon.fake()
    const promise = new Promise((resolve, reject)=>{
      assert.isFalse(succeed.called)
      resolve(123)
      setTimeout(()=>{
        assert(promise.state === 'fulfilled')
        assert.isTrue(succeed.called)
        assert(succeed.calledWith(123))
        done()
      })
    })
    promise.then(succeed, null)
  })
  it('resolve 只能被调用一次', (done)=> {
    let succeed = sinon.fake()
    const promise = new Promise((resolve, reject)=>{
      assert.isFalse(succeed.called)
      resolve(123)
      resolve(233)
      setTimeout(()=>{
        assert(promise.state === 'fulfilled')
        assert.isTrue(succeed.calledOnce)
        assert(succeed.calledWith(123))
        done()
      }, 0)
    })
    promise.then(succeed, null)
  })
  it('reject 只能被调用一次', (done)=> {
    let fail = sinon.fake()
    const promise = new Promise((resolve, reject)=>{
      assert.isFalse(fail.called)
      reject(123)
      reject(233)
      setTimeout(()=>{
        assert(promise.state === 'rejected')
        assert.isTrue(fail.calledOnce)
        assert(fail.calledWith(123))
        done()
      }, 0)
    })
    promise.then(null, fail)
  })
  it('在我的代码执行完之前， 不得调用 then 后面的函数', (done)=> {
    let succeed = sinon.fake()
    const promise = new Promise((resolve, reject)=>{
      assert.isFalse(succeed.called)
      resolve(123)
    })
    promise.then(succeed)
    assert.isFalse(succeed.called)
    setTimeout(()=>{
      assert.isTrue(succeed.called)
      done()
    }, 0)
  })
  it('promise this 绑定正确', (done)=> {
    const promise = new Promise((resolve, reject)=>{
      resolve()
    })
    promise.then(function(){
      "use strict"
      assert(this === undefined)
      done()
    })
  })
  it('then 可以在 promise 里多次调用', (done)=> {
    const promise = new Promise((resolve, reject)=>{
      resolve()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(callbacks[0])
    promise.then(callbacks[1])
    promise.then(callbacks[2])
    setTimeout(()=> {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      done()
    })
  })
  it('reject 可以在 promise 里多次调用', (done)=> {
    const promise = new Promise((resolve, reject)=>{
      reject()
    })
    const callbacks = [sinon.fake(), sinon.fake(), sinon.fake()]
    promise.then(null, callbacks[0])
    promise.then(null, callbacks[1])
    promise.then(null, callbacks[2])
    setTimeout(()=> {
      assert(callbacks[0].called)
      assert(callbacks[1].called)
      assert(callbacks[2].called)
      done()
    })
  })
})
