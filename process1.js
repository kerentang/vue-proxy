/**
 * @author keren
 * @class Observer
 * Reflect:Proxy方法拦截target对象的属性赋值行为。它采用Reflect.set方法将值赋值给对象的属性，确保完成原有的行为，然后再部署额外的功能
 * @see {@link http://es6.ruanyifeng.com/#docs/proxy}
 * @see {@link http://es6.ruanyifeng.com/#docs/reflect}
 * 如果不配合Reflect使用，'use strict'模式下set拦截后会报错
 * process1.js不能监听数组
 */
'use strict'
class Observer {
  constructor (data) {
    this.data = new Proxy(data, {
      get: (target, name) => {
        let success = Reflect.get(target,name);
        if ((name in target) && success) {
          console.log(`你访问了 ${name}`)
        };
        return target[name];
      },
      set: (target, name, value, receiver) => {
        let success = Reflect.set(target,name, value, receiver);
        if (success) {
          console.log(`设置了 ${name}，新的值为 ${value}`);
          return target[name] = value;
        }
      }
    });
  }
}
let app2 = new Observer({
  name: "keren",
  age: "27"
});
let name = app2.data.name
console.log(name)
app2.data.name = 'tangxf';
console.log(app2)