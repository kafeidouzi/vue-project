//泛型    不预先确定的数据类型，，具体的类型在使用时才能确定。


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//声明一个泛型函数
 function log<T>(value:T):T {
    console.log(value)
    return value
 }

// 两种调用方法    
    //1
log<string[]>(['a','c'])
    //2    ts会自动类型推断
log(['a','c'])


//定义一个函数类型
type Log = <D>(value: D) => D
//定义一个变量，类型是Log，用log函数去实现
let myLog: Log = log


//+++++++++++++++++++++++++++++++++

///泛型定义接口

interface Aug {
  <T>(value: T): T
}
////Aug变成Bug，此时可以约束接口里的所有参数，但是用时需要规定传入参数类型
//注意BUg后边的T，可以设置默认的参数类型
// interface Bug<T> {
//   (value: T): T
// }
// let myBug : Bug<number> =log
// myBug(1)
interface Bug<T = string> {
  (value: T): T
}
let myBug : Bug =log
myBug('')

//++++++++++++++++++++++++++++++++++++++

//泛型类  不能约束静态方法，静态属性
 class Gem<T> {
   run(value:T) {
     console.log(value)
     return value
   }
 }

 let gem1 = new Gem<string>()
 gem1.run('')
 //不加任何类型时什么类型都可以
 let gem2 = new Gem()
 gem2.run([])


 //+++++++++++++++++++++++++++

 //泛型约束
function boom <T>(value:T):T{
  console.log(value,value.length)
  return value
}
//让T继承length，以次来约束传入的value必须有length属性才阔以
interface length {
  length:number
}
function boom1 <T extends length>(value:T):T{    
  console.log(value,value.length)
  return value
}