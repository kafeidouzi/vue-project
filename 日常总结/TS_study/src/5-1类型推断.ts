//定义变量时
let num = '2'
let arrr = ['1',null]
//函数默认值，返回值
let fo = (x = 1) => x + 1

//以上都是从右往左推断

//下边是从左往右推断

window.onkeydown = (event:KeyboardEvent)=>{
  // console.log(event.CAPTURING_PHASE)
}

//类型断言      不要乱用，它增加了代码的灵活性，改造代码时方便进行

interface Goo {
  bar:string
}
let goo = {} as Goo

goo.bar = '1'         //不复制也不会报错，但是为了严谨最好在声明对象时，直接约束其类型
