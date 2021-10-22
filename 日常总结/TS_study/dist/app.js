"use strict";
let title = "物理挖   扣你急哇  精神小伙";
console.log(title);
//
let isGo = false;
let dec = 0;
//数组定义
let arr = [1, 2]; //利用泛型 eg: Array<>
let list = [2, 3];
//元组  访问规则和数组一样
let a;
a = ['a', 1];
console.log();
//枚举
var Color;
(function (Color) {
    Color[Color["red"] = 2] = "red";
    Color[Color["white"] = 5] = "white";
    Color[Color["blue"] = 9] = "blue";
})(Color || (Color = {}));
let c = Color.red; //2,会输出下标，下标可以自定义
let str = Color[5]; // white
//自动类型推断   和   any(任何类型)
let notSure = 5; //自动推断为number
let y = 'dddd'; //赋值为任何都可以
let x = [1, 'aaa'];
//void （不能有任何类型）
javascript: void (0); //让某些元素的默认时间消失
function foo() {
} //无返回值或undefined
