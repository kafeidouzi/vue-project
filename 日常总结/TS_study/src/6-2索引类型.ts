let ob = {
  a:1,
  b:2,
  c:3
}

function getValue(obj:any,keys:string[]) {
  return keys.map(key => obj[key])
}
console.log(getValue(ob,['a']))
//此时，虽然ob中没有【‘d’】，但ts也没有报错，此时就需要索引类型来约束
console.log(getValue(ob,['d']))

//认识三个概念
  //1   keyof T  索引类型查询操作符    表示T的所有公有属性的类型的字面量联合类型
  interface Ob {
    a:number
    b:string
  }
  let bj: keyof Ob    //此时bj的类型就是一个碎银查询操作符

    //2 T[K]   索引类型访问操作符   
  let value: Ob['a']   //此时value的类型就是一个碎银查询操作符

    //3  T extends U  泛型约束    泛型可以继承某种类型，从而拥有某些属性

//对象上边函数进行改造
function getValue1<T,K extends keyof T>(obj:T,keys:K[]):T[K][] {
  return keys.map(key => obj[key])
}   //此时该函数在调用时就会准确判断