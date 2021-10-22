//复杂类型

//联合类型
let Day: string | number      //一般用于函数参数

Day = 'aaa'
Day = 2222

//Never类型   表示死循环，没有返回类型或者说不知何时返回

function infiniteLoop(): never {
  while(true) {
    console.log(2)
  }
}

//Null  Udefinded    特殊值,   是所有类型的子类型    strictNullChecks在配置里

null   //空指针

//symbol
//https://www.jianshu.com/p/f24158d937ef    ES6的symbol详细介绍
let sym1 = Symbol('key')    //配置里改为es6,symbol是es6的
let sym2 = Symbol('key')   
  sym1 !== sym2      //类似于immutable
//作为对象唯一标识
 const sym = Symbol()

let obj = {
  [sym]:'aaaa'
}
// console.log(obj[sym])

//作为类的唯一标识
const getClass = Symbol()

class D {
  [getClass]() {
    return 'ooooo'
  }
}
let d = new D
// console.log(d[getClass]())


//++++++++++++++++++++++++++++++++++++++++++

//函数
function poo(x:number,y:number) {
  return x+y
}

let sum = function(x:number,y:number) {
  return x+y
}

let suum = function(x:number,y:number) {
  return x+y
}

//上边的匿名函数使用ts标准定义如下

let smm : (x:number,y:number) =>number = function(x:number,y:number):number {
  return x+y
}
 //let到function之前代表规定smm是一个函数，并规定其返回值;等号后边是函数注意参数要与前边对应

//通过接口定义函数
interface sumFunc {    //作用是给函数定义一个范式
  (sco:string,sea:string): boolean
}

let mySum : sumFunc = function (sco:string,sea:string) :boolean{
  return sco ===sea
}

//可选参数        在参数后冒号前添加一个   ？  表示可有可无
  //注意可选参数一般放在最后边比较好，，，，参数可以设置默认值
function mySu (x?:string, y:string='p') {
    console.log(x,y)
}
// mySu ()  

// 剩余参数
function boo (arr:Array<any>,...items:any[]) {
  items.forEach((item)=>{
    arr.push(item)
  })
  // console.log(arr)
  return arr
}

let aa:any[] = []
boo(aa,1,2,3,3,"ss")

//重载     多个重名，但是参数类型，个数不同。调用时会根据参数寻找对应的函数执行
         //之后可以使用泛型解决这个问题
function func (x:number):number
function func (x:string): string    //以上两个函数可以消除歧义，另返回值和输入值类型一致
function func(x:number | string): number | string {   //函数返回的类型不确定
  if(typeof x === 'number') {
    return Number(x.toString().split('').join(''))
  } else {
    return x.split('').join('')
  }
}






