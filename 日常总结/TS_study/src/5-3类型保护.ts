enum Type {Strong, Week }

class Jaaa {
  helloJaaa() {
    console.log('ja')
  }
  ja:string = ''
}
class Java {
  helloJava() {
    console.log('jv')
  }
  jv:any = []
}


function logJ (type: Type,x:string | number): {} {
  let lang = type === Type.Strong ? new Jaaa() :new Java()


      //这是使用类型断言，过于冗余
  // if((lang as Jaaa).helloJaaa ) {
  //   (lang as Jaaa).helloJaaa()
  // }else {
  //   (lang as Java).helloJava()
  // }

  //使用类型保护，简单说就是在某个区块内，有着某种特定的类型，可以在这个区块内使用这个类型的属性和方法

  // instanceof     用来判断实例是不是属于某个类
  if (lang instanceof Jaaa){
    lang.helloJaaa()
  } else {
    lang.helloJava()
  }
  //  in   用来判断某个属性是不是属于对象的
  if ('ja' in lang) {
    lang.helloJaaa()
  } else {
    lang.helloJava()
  }

  // typeof   用来判断基本类型
  if (typeof x === 'string') {
    x.split('')
  } else {
    x.toString()
  }
  // 类型保护函数     类型位次，mark
  function isJaaa (lang:Java | Jaaa):lang is Jaaa {
    return (lang as Jaaa).helloJaaa !== undefined
  }
  if (isJaaa(lang)) {
    lang.helloJaaa()
  } else {
    lang.helloJava()
  }

  return lang 
}