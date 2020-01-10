import * as chai from 'chai'
import Promise from './index';
import { createTrue } from 'typescript';

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
  it('new Promise(fn) fn 执行时接受 resolve 和 reject 两个函数', ()=> {
    const promise = new Promise((resolve, reject)=>{
      assert.isFunction(resolve)
      assert.isFunction(reject)
    })
  })
  it('promise.then(success) 中的 success 会在 resolve 时被调用时执行', (done)=> {
    let called = false
    const promise = new Promise((resolve, reject)=>{
      // 现在没执行
      assert(called === false)
      resolve()
      //执行了
      setTimeout(()=>{
        assert(called === true)
        done()
      })
    })
    // @ts-ignore
    promise.then(()=> {
      called = true
    })
  })
})
