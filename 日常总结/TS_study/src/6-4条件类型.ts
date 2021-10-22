
//  T  extends U ? X : Y

type  TypeName<T> =
  T  extends string ? 'string' : 
  T  extends number ? 'number' :
  T  extends boolean ? 'boolean' :
  T  extends undefined ? 'undefined' :
  T  extends Function ? 'function' :
  'object'

  type T1 = TypeName<string>

  type T2 = TypeName<number>

  //(A | B) extends U ? X : Y    等价于
  //  (A extends U ? X : Y) | (B extends U ? X : Y )

  type T3 = TypeName<string | any[]>


  type Dif<T,U> = T extends U ? never : T

  type T4 = Dif<'a'|'b'| 'c','a' | 'd'>
  //结果为    ‘b’| 'c'
  //  Dif<'a'|'b'| 'c','a' | 'd'>
  //相当于  ( Dif<'a','a' | 'd'>) | ( Dif<'b','a' | 'd'>) | ( Dif<'c','a' | 'd'>)
  // never | 'b' | 'c'
  // 'b' | 'c'

  type NotNull<T> = Dif<T, undefined | null>
  type T5 = NotNull<number | null | undefined>

  //以上的DIF和notnull 官方已经做了内置，方法名如下

  //Exclude<T,U>  过滤掉可以类型t中可以赋值给u的类型
  // NonNullable<T>    过滤掉T类型中的null和undefined

  //此外官方还内置了一些别的方法
  //Extract<T,U>  抽取类型t中可以赋值给类型u的类型
  type T6 = Extract<'a'|'b'| 'c','a' | 'd'>    // 'a'

  //ReturnType<函数>  会返回函数的返回值类型   
  //在基础类库中他的实现是   infer 表示  延迟推断或待推断
  type  T7 = ReturnType<()=>string>