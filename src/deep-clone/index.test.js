const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const DeepClone = require('./index')

chai.use(sinonChai)
const assert = chai.assert
describe('deep-clone', () => {
  it('is a function', () => {
    assert.isFunction(DeepClone)
  })
  it('can copy basic type', () => {
    const a1 = 123
    const b1 = new DeepClone().deepClone(a1)
    assert(a1 === b1)
    const a2 = '123'
    const b2 = new DeepClone().deepClone(a2)
    assert(a2 === b2)
    const a3 = true
    const b3 = new DeepClone().deepClone(a3)
    assert(a3 === b3)
    const a4 = undefined
    const b4 = new DeepClone().deepClone(a4)
    assert(a4 === b4)
    const a5 = null
    const b5 = new DeepClone().deepClone(a5)
    assert(a5 === b5)
    const a6 = Symbol()
    const b6 = new DeepClone().deepClone(a6)
    assert(a6 === b6)
  })
  describe('object', ()=> {
    it('can copy normal object', ()=> {
      const a1 = {
        name: 'xxx',
        child: {
          name: 'yyy'
        }
      }
      const b1 = new DeepClone().deepClone(a1)
      assert(a1 !== b1)
      assert(a1.name === b1.name)
      assert(a1.child !== b1.child)
      assert(a1.child.name === b1.child.name)
    })
    it('can copy complex object', ()=> {
      const a1 = [[11,12], [21,22], [31, 32]]
      const b1 = new DeepClone().deepClone(a1)
      assert(a1[0] !== b1[0])
      assert(a1[1] !== b1[1])
      assert(a1[2] !== b1[2])
      assert.deepEqual(a1, b1)
    })
    it('can copy function', ()=> {
      const a = function () {
        return 1
      }
      a.xxx = { a: {b: 1} }
      const b = new DeepClone().deepClone(a)
      assert(a !== b)
      assert(a.xxx.a.b === b.xxx.a.b)
      assert(a.xxx.a !== b.xxx.a)
      assert(a.xxx !== b.xxx)
      assert(a()=== b())
    })
    it("can copy even it's a circle", ()=> {
      const a1 = { name: 'li'}
      a1.self = a1 
      const b1 = new DeepClone().deepClone(a1)
      assert(a1 !== b1)
      assert(a1.name === b1.name)
      assert(a1.self !== b1.self)
    })
    xit('will not stack overflow', ()=> {
      const a = {child: null}
      let b = a
      for (let i = 0; i < 20000; i++) {
        b.child = {
          child: null
        }
        b = b.child
      }
      const b1 = new DeepClone().deepClone(a)
      assert(a !== b1)
      assert(a.child !== b1.child)
    })
    it('can copy Regx', ()=> {
      const a = new RegExp("hi/d+", "gi")
      const b = new DeepClone().deepClone(a)
      assert(a.source === b.source)
      assert(a.flags === b.flags)
      assert(a !== b)
    })
    it('can copy Date', ()=> {
      const a = new Date()
      const b = new DeepClone().deepClone(a)
      assert(a.getTime() === b.getTime())
      assert(a !== b)
    })
    it('skip prototype', ()=> {
      const a = Object.create({name: 'a'})
      a.xxx = { yyy: {zzz: 1} }
      const b = new DeepClone().deepClone(a)
      assert(a !== b)
      assert.isFalse('name' in b)
    })
    it('final strict test', () => {
      const a ={
        b: NaN,
        c: Infinity,
        d: '',
        e: false,
        null: null,
        undefined: undefined,
        f: Symbol(),
        g: {
          b: NaN,
          c: Infinity,
          d: '',
          e: false,
          null: null,
          f: Symbol()
        },
        h: [
          {
            b: NaN,
            c: Infinity,
            d: '',
            e: false,
            null: null,
            f: Symbol()
          }
        ],
        i: function () {
          console.log('i')
        },
        date: new Date(),
        reg: /test/gi
      }
      const b = new DeepClone().deepClone(a)
      assert(b !== a)
      assert.isNaN(b.b)
      assert(a.c === b.c)
      assert(a.d === b.d)
      assert(a.e === b.e)
      assert(a.null === b.null)
      assert(a.undefined === b.undefined)
      assert(a.f === b.f)
      assert(a.g !== b.g)
    })
  })
})