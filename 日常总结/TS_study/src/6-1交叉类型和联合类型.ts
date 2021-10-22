
//  交叉类型，其实取得是并集      继承可以有自己的属性，但是煎炒类型不能有
interface Dog {
  wang() :void
}
interface Brid {
  ji(): void
}

let pet: Dog & Brid = {
  wang() {},
  ji() {}
} 

//联合类型
 let leaves: number | string
    //字面量类型，可以规定必须从哪些区间中选取值(string,number)
 let leaf : 1 | 2 | 3
let leas : 'a' | 'b' | 'c'
//联合类型对于对象来说，在未确定类型的情况下会执行共有的属性
class D0 implements Dog {
  wang() {}
  eat(){}
}
class B0 implements Brid {
  ji() {}
  eat() {}
}
enum Arg { og  , id}
function getArg(rg: Arg) {
  let pet =  rg === Arg.og ? new D0() : new B0()
  pet.eat()

  return pet
}

///////////////  可区分的联合类型   本质上讲  世界结合了联合类型和字面量类型的一种类型保护方法

      //简单讲就是一个类型是多个类型的联合类型，并且每个类型之间有一个公共的属性，可以通过这个公共属性创建类型保护区块

interface Square {
  kind: 'square'
  size:number
}
interface Rectangle {
  kind:'rectangle'
  width:number
  height:number
}
interface Circle {
  kind:'circle'
  r: number
}
//类型别名  type  xxx =  xx |  xx
//当给Shape新加circle类型时，但具体函数里并没有去实现，有两种方法来规范约束
    //一种是约束函数area的返回值
    //另一种是设置default 如下边代码
type Shape = Square | Rectangle | Circle
function area(s:Shape): number {
  switch(s.kind) {
    case "square":
      return s.size * s.size
    case "rectangle":
      return s.height * s.width
    case 'circle':
      return 1
    //含义是 s是不是never类型，如果是，那表明前边的分支都覆盖到了；如果不是，说明前边分支有遗漏，并没有覆盖全，，，，就如上circle的情况没有考虑到，有遗漏
    default:
      return ((e:never)=>{throw new Error(e)})(s)
  }
}






