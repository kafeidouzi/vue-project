interface  Boody {
  name:string,
  eat():void
}

class Person1  implements Boody {
  // constructor (name:string) {
  //   this.name='狗子'
  // }
  name = ''
  eat() {}
  sleep() {}
}

//接口可以集成多个接口，逗号隔开
interface  A extends Boody {
  age:number
}

interface B {
  height: number
}

interface  sum extends  A,B {

}

let ss :sum = {
    name:'',
    age:2,
    height:23,
    eat() {}
}


//接口还可以继承类
class  Auto {
  state = 1
  // private aa = ''     因为Zero不是Auto的子类，所以也不能包含Auto的私有成员
}
  //接口继承类，相当于抽离了类的所有成员（包括私有成员，公有，受保护成员）
interface AutoInterface extends Auto {

}
//继承  继承了类的接口
class Zero  implements AutoInterface {
  state =3
}

//因为子类已经具有父类的state属性，所以继承接口时就不用声明了
// 让Zero的子类继承接口
class ZeroChild extends Zero  implements AutoInterface {

}



