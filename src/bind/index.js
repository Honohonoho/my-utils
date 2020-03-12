// 如果浏览器都不支持bind了，那么es6里 const(用 var), ...也不能用
// 写个slice 代替
var slice = Array.prototype.slice
function bind (asThis) {
  // 取剩下的参数, 第一个参数是asThis
  var args = slice.call(arguments, 1)
  var fn = this
  if (typeof fn !== 'function') {
    throw new Error('bind should be called as a function')
  }
  return function () {
    var args2 = slice.call(arguments, 0)
    var allArgs = args.concat(args2)
    return fn.apply(asThis, allArgs) // .call 要用 ...展开参数，so sad， 只能用 .apply
  }
}

module.exports = bind
if(!Function.prototype.bind) {
  Function.prototype.bind = bind 
}


function bind1 (outThis) {
  const self = outThis
  return function () {
    return self.call(outThis)
  }
}