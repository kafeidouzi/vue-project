declare namespace umdLib {
  const version: string
  function dosomething():void
}

//umd这步的是不可或缺的
export as namespace umdLib

export = umdLib