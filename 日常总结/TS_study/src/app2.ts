//接口
  //ts的接口可以对类的行为进行抽象，也可以对对象形状进行描述

//规定对象的形状（就是规定一些数据类型，个数等）

//任意类型    索引签名
interface Person {
  name:string
  readonly height:number    //只读属性readonly
  age?:number    //可有可无
  [fff: string]:any      // 索引签名  可以定义任意多个属性
}
let obj1 : Person = {
  name:'tom',
  height:134,
  age:34,
  from:'ddddddddd'
}

//类    静态属性，。。。。
class Animal {
  //可以通过public正方法来定义一个变量而且不用赋初值
  constructor(public name:string){   //构造函数
    this.name= name
  }
  sayName() {
    return this.name
  }

  //静态属性，静态方法（要直接在类上调用，其他的要在实例上调用）
  static isAnimal (ani:any) {
    return ani instanceof Animal   //判断a是不是animal的实例
  }

   //存取器   类似于vue里的计算属性
   get sur() {
    return this.name
  }
  set sur(value:string) {
     this.name = value
  }
}

//类的继承
class Cat extends Animal {
  constructor(public name :string) {   //不写的话会自动生成
    super(name)
  }

  sayHi() {
    console.log(this.name)
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
abstract  class Door {
    public abstract  sayHi():void    //只负责定义
    public getProps () {
      return 'oyo'
    }  
}

class MuDoor  extends Door {  
  sayHi () {         //子类中必须实现父类中定义抽象方法
    return 'oooo'
  }
}

let mu = new MuDoor()


//  类的类型
 
// let s : Door = new Door()     父类自己的
// let s : MuDoor = new MuDoor()     子类自己的
// let s : MuDoor = new Door()    子类和父类都可以
// let s : Door = new MuDoor()     这种只能调用父类的方法


// 枚举类型
enum G {a, b}
enum H {a=0, b= 1}
enum I {a='tel',b='phone'}

let e: G = 2
let f: H = 3

let e1: G.a
let e2: G.b
let e3: G.a

//字符串类型对于赋值限制较多
let hi: I = I.b  // 赋值可在I 中选择
let ht: I.a = I.a   // 赋值固定
