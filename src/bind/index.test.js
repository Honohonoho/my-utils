const bind = require('./index')

Function.prototype.bind2 = bind
console.assert(Function.prototype.bind2 !== undefined)

const fn1 = function() {
  return this
}

const fn2 = function(p1, p2) {
  return [this, p1, p2]
}

// 基本
const newFn1 = fn1.bind2({name: 'li'})
console.assert(newFn1().name === 'li')

// 多个参数，添加args
const newFn2 = fn2.bind2({name: 'li'}, '123', '456')
console.assert(newFn2()[0].name === 'li')
console.assert(newFn2()[1] === '123')
console.assert(newFn2()[2] === '456')

// 连续传参数, 添加args2
const newFn3 = fn2.bind2({name: 'li'})
console.assert(newFn3(1)[0].name === 'li')
console.assert(newFn3(2)[1] === 2)
console.assert(newFn3(3)[1] === 3)


