declare function globalLib(options: globalLib.Options): void

declare namespace globalLib {
  const version : string
  function doSomething():void
  interface Options {    //可以放在外边，
    [key:string]:any
  }
}