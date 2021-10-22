class D {
  a:number = 1
}

let { x,y,...z} = {x:1,y:2,z:3,f:4}

let n = { x,y,...z}
let a:number|string = 'a'
document.querySelectorAll('.app')[0].innerHTML = a
console.log(a)
