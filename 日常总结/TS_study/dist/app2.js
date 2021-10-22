"use strict";
//接口
//ts的接口可以对类的行为进行抽象，也可以对对象形状进行描述
let obj1 = {
    name: 'tom',
    height: 134,
    age: 34,
    from: 'ddddddddd'
};
//类    静态属性，。。。。
class Animal {
    //可以通过public正方法来定义一个变量而且不用赋初值
    constructor(name) {
        this.name = name;
        this.name = name;
    }
    sayName() {
        return this.name;
    }
    //静态属性，静态方法（要直接在类上调用，其他的要在实例上调用）
    static isAnimal(ani) {
        return ani instanceof Animal; //判断a是不是animal的实例
    }
    //存取器   类似于vue里的计算属性
    get sur() {
        return this.name;
    }
    set sur(value) {
        this.name = value;
    }
}
//类的继承
class Cat extends Animal {
    constructor(name) {
        super(name);
        this.name = name;
    }
    sayHi() {
        console.log(this.name);
    }
}
//类
// let ani = new Animal('tom')
// console.log(ani.name)
//继承
// let cat = new Cat('tom')
// console.log(cat.name)
//存取器
// let ani = new Animal('tom')
// ani.sur = 'jerry'
// console.log(ani.sur)
//     //静态方法    需要直接在类上边调用
// console.log(Animal.isAnimal(ani))
//类的修饰符    
//public   private（实例，子类不能访问）    protected （子类可以，实例不行）
//   readonly    只读
//抽象类    该类中只定义，具体在子类中实现
//抽象类不能实例化
class Door {
    getProps() {
        return 'oyo';
    }
}
class MuDoor extends Door {
    sayHi() {
        return 'oooo';
    }
}
let mu = new MuDoor();
//  类的类型
// let s : Door = new Door()     父类自己的
// let s : MuDoor = new MuDoor()     子类自己的
// let s : MuDoor = new Door()    子类和父类都可以
// let s : Door = new MuDoor()     这种只能调用父类的方法
