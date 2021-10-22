interface AA {
  x:number
  y:number
  foo (bar: string):string    //5
  foo (bar: 'a'):number  //2
}
            //函数类型要注意顺序，函数参数为字面量类型的优先排在第一位。
            //接口内，顺序从上到下
            //接口之间，从下往上
interface BB {
  y:number     //注意非函数类型，类型要一致
  foo (bar: string):string    //4
  foo (bar: string[]):string[]  //3
  foo (bar: 'b'):number   // 1
}


//命名空间的合并
//注意函数和类要放在命名空间前边，枚举则无所谓
function Lib () {}
namespace Lib {
  export let version = '1.0'
}

class C {}
namespace C {
  export let state = 1
}
console.log(C.state)

enum Color {
  qqq,
  yellow
}
namespace Color {
  export function mix() {}
}//相当于给枚举加了个函数
