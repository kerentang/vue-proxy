/**
 * @author keren
 * @class Observer
 * process2可以设置深层对象数据
 * @see {@link http://es6.ruanyifeng.com/#docs/proxy}
 * @see {@link http://es6.ruanyifeng.com/#docs/reflect}
 * @function walk 遍历深层数据
 * @param {Object} obj
 * 由于深层递归new出来的子对象实例无法操作，所以在process2.js中换一种写法尝试一下
 */
'use strict'
class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
  }
  proxy() {
    let handler = {
      get: (target, name) => {
        let success = Reflect.get(target,name);
        if (success) {
          console.log(`你访问了 ${name}`)
          return target[name]
        }
      },
      set: (target, name, value, receiver) => {
        let success = Reflect.set(target,name, value, receiver);
        if (success) {
          console.log(`设置了 ${name}，新的值为 ${value}`);
          return target[name] = value
        }
      }
    }
  }
  walk(obj) {
    let val
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        val = obj[key]
        if (typeof val === 'object') {
          new Observer(val)
        }
      }
    }
  }
}
let app2 = new Observer({
  user: {
    name: "keren",
    age: "18"
  }
});

let initData = app2.data.user.name
console.log(initData)
app2.data.user.name = {firstname: 'tang'};
console.log(app2)