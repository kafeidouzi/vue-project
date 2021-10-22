"use strict";
//复杂类型
//联合类型
let Day; //一般用于函数参数
Day = 'aaa';
Day = 2222;
//Never类型   表示死循环，没有返回类型或者说不知何时返回
function infiniteLoop() {
    while (true) {
        console.log(2);
    }
}
//Null  Udefinded    特殊值,   是所有类型的子类型    strictNullChecks在配置里
null; //空指针
//symbol
//https://www.jianshu.com/p/f24158d937ef    ES6的symbol详细介绍
let sym1 = Symbol('key'); //配置里改为es6,symbol是es6的
let sym2 = Symbol('key');
sym1 !== sym2; //类似于immutable
//作为对象唯一标识
const sym = Symbol();
let obj = {
    [sym]: 'aaaa'
};
// console.log(obj[sym])
//作为类的唯一标识
const getClass = Symbol();
class D {
    [getClass]() {
        return 'ooooo';
    }
}
let d = new D;
// console.log(d[getClass]())
//++++++++++++++++++++++++++++++++++++++++++
//函数
function poo(x, y) {
    return x + y;
}
let sum = function (x, y) {
    return x + y;
};
let suum = function (x, y) {
    return x + y;
};
//上边的匿名函数使用ts标准定义如下
let smm = function (x, y) {
    return x + y;
};
let mySum = function (sco, sea) {
    return sco === sea;
};
//可选参数        在参数后冒号前添加一个   ？  表示可有可无
//注意可选参数一般放在最后边比较好，，，，参数可以设置默认值
function mySu(x, y = 'p') {
    console.log(x, y);
}
// mySu ()  
// 剩余参数
function boo(arr, ...items) {
    items.forEach((item) => {
        arr.push(item);
    });
    // console.log(arr)
    return arr;
}
let aa = [];
boo(aa, 1, 2, 3, 3, "ss");
function func(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').join(''));
    }
    else {
        return x.split('').join('');
    }
}
