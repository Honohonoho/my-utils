// 什么是深拷贝
// b是a的一份拷贝，b中没有对a中对象的引用
// 思考：数据类型 数据规模 性能要求 运行环境 其他...

// 1.JSON
(function () {
  var a = {
    b: 1,
    c: [1, 2, 3],
    d: { d1: '111', d2: '2222' }
  }
  var a2 = JSON.parse(JSON.stringify(a))
  a.b = 2
  console.log(a2.b)
})()
// 缺点: 1.不支持function
//       2.不支持undefined
//       3.不支持引用(闭环), Date(), 正则
// href: json.org

// 2.递归克隆
/** 思路
 * 看节点类型，基本类型就直接拷贝，object分情况讨论
 * object: 普通object => for...in
 * array: new Array() 同上
 * 递归爆栈：把deepClone的递归改为Array.push(source[key]),
 * 相当于把对象拍平...
 */
class DeepClone {
  constructor() {
    this.cache = []
  }
  deepClone(source) {
    if (source instanceof Object) {
      let cacheOutput = this.findCache(source)
      if(cacheOutput) {
        // console.log('has cache')
        return cacheOutput
      } else {
        // console.log('no cache')
        let output
        if (source instanceof Array) {
          output = new Array()
        } else if (source instanceof Function) {
          output = function () {
            return source.apply(this, arguments)
          }
        } else if (source instanceof RegExp) {
          output = new RegExp(source.source, source.flags)
        } else if (source instanceof Date) {
          output = new Date(source)
        } else {
          // 最后才返回普通 Object
          output = new Object()
        }
        this.cache.push([source, output])
        // for...in 会遍历原型上的属性
        for (let key in source) {
          if(source.hasOwnProperty(key)) {
            output[key] = this.deepClone(source[key])
          }
        }
        return output
      }
    }
    return source
  }

  findCache(source) {
    for (let i = 0; i < this.cache.length; i++) {
      if(this.cache[i][0] === source) {
        return this.cache[i][1]
      }
    }
    return undefined
  }
}

let cache = [] // this.cache 每次clone 玩完要清空，所以用面向对象来写

module.exports = DeepClone;
