interface On {
  a:number
  b:string
  // c:number |string
  // [aaa: string]: any
}
type ReadonlyOn = Readonly<On>     //只读

type PartialOn = Partial<On>    //可选

type PickOn = Pick<On, 'a' | 'b'>  //  ac是on的属性，意为可以从on中筛选出来某些属性
//以上三种成为同态，只能作用于On，而下边的成为非同态，可以产生新的属性

type RecordOn = Record<'x'|'y' ,On>  //xy为新声明的属性，类型为已知的On类型


let s: RecordOn = {
  x:{
    a:2,
    b:'d'
  },
  y:{
    a:1,
    b:'a'
  }
}