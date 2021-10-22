1. let 和 const     
2. globalThis为了统一不同环境顶层对象 (浏览器，web worker，node)

### 解构赋值
1. 数组解构赋值  （只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。）
  ```
    let [a,b,c] = [1,2,3]
    let [a, ...b] = [1,2,3,4,5]   //  b = [2，3，4，5]
    let [a,b] = [1]    //结构不成功，值为undefined
    let [a,b] = [1,2,3]  //不完全解构赋值  a=1,b=2
    //等号右边不是数组将会报错
    let [a = 1] = [undefined]   //es6中使用===，只有值为undefined时，才会使用默认值1
    function f() {
      console.log('aaa');
    }
    let [x = f()] = [1];
    //如果默认值是表达式，那么该表达式是惰性的，只有值为undefined时，才会执行
  ```
2. 对象解构赋值
  ```
    let { bar:bar, foo:foo } = { foo: 'aaa', bar: 'bbb' }
    //简写
    let { bar, foo } = { foo: 'aaa', bar: 'bbb' }
    //变量必须与属性同名
  ```
3. 字符串的解构赋值
  ```
    let [a,b,c,d,e] = 'hello'    // a= 'h'  ......
    let {length : len} = 'hello';   // len = 5
  ```
4. 数字和布尔值的解构赋值
  ```
    let {toString: s} = 123;
    s === Number.prototype.toString // true

    let {toString: s} = true;
    s === Boolean.prototype.toString // true
    // 解构赋值时，等号右边是数字或者布尔值时，则会先转为对象。数值和布尔值对象都有toString属性，所以s可以取到值
  ```
5. 函数的参数解构赋值

### 字符串的扩展
1. 字符的Unicode表示法，
  + 只限于\u0000~\uFFFF之间的字符，超出该范围需要用双字节表示
  + 将码点放入大括号中，就能正确读出该字符
2. 字符串的遍历器
  + es6添加遍历接口，是的字符串可以背for....of循环遍历
  + 该遍历器还可以识别大于0xFFFF的码点，传统的for循环无法识别
3. 允许直接输入U+2028（行分隔符）和U+2029（段分隔符）
4. JSON.stringify()的改造
  + 标准规定，json数据必须是utf-8编码，，，，utf-8规定0xD800到0xDFFF的码点不能单独使用，必须配合使用。
  + 改版后，如果遇到0xD800到0xDFFF的码点或者不存在的匹配形式，它会返回转义字符串，留给应用去决定下一步处理。
5. 字符串模板
  + 使用 `` ,${} ,支持嵌套，函数调用，
6. 模板编译  <% %>用来放置js代码， <%=  %>用来输出js表达式
7. 标签模板  
  + 模板字符串如果有变量，会先处理成参数
  + 标签模板重要应用就是过滤html字符串，防止用户恶意输入
### 字符串新增方法
  #### js内部字符以utf-16存储，每个字符固定两个字节，4个字节的字符（Unicode码点大于0xFFFF），js会认为是两个字符
1. String.fromCharCode()用于从Unicode码点返回对应字符，不能识别大于0xFFFF的码点 *** String.fromCodePoint(),在string对象上  ***可以识别大于0xFFFF的码点，如果有多个参数会被合并成一个字符串返回，与String.codePointAt()作用相反
2. String.raw() 该方法返回一个斜杠被转义的字符串
3. String.charCodeAt()用于从字符到码点(十进制，可用toString 进行转换进制)， *** String.codePointAt()，实例上 ***能够正确处理4个字节存储的字符，发布会一个字节码点
4. String.normalize(参数) 将用来提供重音符号的不同表示方法统一为同样的形式，称为Unicode正规化。
  + 参数'NFC'(表示参数返回字符的合成形式),'NFD'(参数返回字符的分解形式),'NFKC','NFKD'
  + 目前normalize方法不能识别三个或三个以上的字符合成，还是只能用正表达式
5. String.includes(),String.startsWith(),endsWith()
    + includes()返回布尔值，表示是否找到参数字符串
    + startsWith()返回布尔值，表示字符串是否在源字符串头部
    + endsWith()返回布尔值，表示字符串是否在源字符串尾部
    + 以上三个方法都接受第2个参数，endsWith与其他两个不同，它针对前几个字符，其他俩是从第几个开始
    + String.repeat(参数)返回一个新字符串，表示将原字符串重复几次   ，，，参数如果是小数会被取整，是负数或Infinity会报错
    + String.padStart(长度，‘不全用的字符串’)，String.padEnd()两个方法用于头部或尾部补齐
    + String.trim(),String.trimStart(),String.trimEnd()用于消除空格
    + String.matchAll()返回一个正则表达式在当前字符串的所有匹配 
### 正则表达式


### 数值的扩展
  #### js能够准确的表示整数范围在-2^53至2^53之间（不含两个端点），这个区间的整数称为安全整数
  + 二进制和八进制的新写法，分别在开头加上0b(0B)和0o(0O)表示
  + Number.isFinite()判断是否是有限的，不是数字返回false。  Number.isNaN()检查是否为NaN,不是nan返回false
  + Number.parseInt()取整,Number.parseFloat()解析字符串，返回浮点数
  + Number.isInteger()判断一个数值是否为整数
  + Number.EPSILON === Math.pow(2,-52) 表示1与大于1的最小浮点数之间的差
  + Number.isSafeInteger()用来判断是否是安全整数    Number.MAX_SAFE_INTEGER最大整数        Number.MIN_SAFE_INTEGER最小整数
  + Math对象上新增了17个方法，都是静态方法
    1. Math.trunc() 用于去除一个数的小数部分，返回整数部分。（不是整数会转成整数，无法转换的返回NaN）
    2. Math.sign() 用来判断一个数到底是正数，负数，0  （会返回5种值，正数1，负数-1，零0，负零-0，其他值NaN）
    3. Math.cbrt() 计算一个数的立方根
  
  + 对数方法
  + 指数运算符 **     多个指数运算时，从右往左进行计算
  + bigInt 数据类型   js表示数只存在一定限制，大于2的1024次方后会显示Infinity，bigint（大整数）不会，无论数据多大都会显示，
    1. 语法在数字后加个n
    2. js原生提供BigInt对象，与Number一样，可用来转换数据类型

### 函数的扩展
  + 函数参数的默认值  ，参数部分还可以与解构赋值一起使用
    1. 参数默认值的位置一般都放在末尾
    2. 函数的length属性，将返回没有设置默认值的参数个数，有默认值不算
    3. 一旦设置了默认值，函数进行初始化声明时就会形成一个单独的作用域，结束作用域消失
  + rest参数 形式为（...变量名）
    1. rest参数后不能再有其他参数
    2. 函数的length属性不包括rest参数
  + 严格模式  'use strict'
    1. es2016规定，函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显示设定为严格模式，否则会报错
    2. 两种方法可以规避上边的限制，（1）设定全局性的严格模式 （2）把函数包在一个无参数的立即执行函数里
  + name属性    函数.name 返回函数名
    1. 构造函数返回的实例 name属性值为  anonymous
    2. bind返回函数name属性值会加上  bound 前缀
  + 箭头函数  （本身没有this）
    1. 函数体内的this对象，就是定义时躲在的对象，是固定不变的
    2. 不可做构造函数
    3. 不可以用arguments对象，可用rest参数代替
    4. 不可以使用yield命令，箭头函数不能用作Generator
  + 尾调用优化  （仅在严格模式下生效）
    1. 啥是尾调用，尾调用时函数式编程的一个概念，指函数的最后一步调用一个函数
    2. 函数调用时会在内存上形成一个调用记录（调用帧），调用完成调用帧才会消失，使用尾调用可以可以让上一个函数的调用帧完成消失，节省内存
    3. 啥是尾递归，尾部调用自身称尾递归    如：降低阶乘函数复杂度

### 数组的扩展
  + ... 扩展运算符
  + Array.from()将两类对象转为真正数组：1类似于数组的对象         2.可遍历的对象    iterator
  + Array.of()该方法将一组数值，转换为数组
  + copyWithin()将数组指定位置的元素复制到目标位置（会替换掉该位置原来的元素），返回当前数组
    1. 接受三个参数（从哪开始赋值，从哪开始选取，从哪选取结束）
  + find()和findIndex()
    1. 找出第一个符合条件的数组成员，它的参数是一个回调函数，找到后会返回true，然后返回该成员，没找到返回undefind
      + find的回调函数接受三个参数
      + find()和findIndex()都接受第二个参数用来绑定this
  + fill(给定的值，开始位置，结束位置)  用给定的值去填充数组   
  + entries(),keys(),values()   键值对，健名，健值
  + includes()返回一个布尔值，表示某个数组是否包含某个给定的值
  + flat(),flatMap()
    1. flat()用于将嵌套的数组‘拉平’，变成一位数组，该方法返回一个新数组，对原数组不会影响，数组扁平化，
    2. flatMap()方法对原数组每个成员执行一个函数，然后对其返回值执行falt(),返回新数组，不改原数组。。flatMap()只能展开一层数组
  + sort()排序是稳定的

### 对象的扩展
  + 属性的简洁表示法
  + 属性名表达式    eg:    obj['a' + 'bc'] = 123
  + 链判断运算符 (?.)    如果左侧的对象为null或者undefind就不在往下执行
  + Null判断运算符 (??)  只有左侧为null或者undefind时，右侧才会生效，如果多个元素安抚一起喝它使用时，要用括号加以区分

### 对象新增方法
  + Object.is()
    1. es5中比较两个值是否相等，只有 ‘==’ 和 ‘===’ ，都有缺点。
    2. Object.is()就是严格相等，与严格比较基本一致，不同在于  (+0 不等于 -0 ，NaN等于NaN)
  + Object.assign()
  + Object.getOwnPropertyDescriptors()用来弥补Object.assign()不能正确拷贝get和set属性
  + Object.keys(),Object.values(),Object.entries()
  + Object.fromEntries()与Object.entries()正好相反
### Symbol  表示独一无二的
  + js中原始数据类型：undefined，null,number,string,object,boolean,symbol,bigInt
  + 对象的属性也可以用symbol表示，symbol为属性名时不能用点运算符
  + Symbol（参数），symbol可以接受一个参数，参数为字符串。。主要是为了控制台显示时加以区分
  + Symbol的值不能与其他类型进行运算，可以显式转为字符串，布尔值。不能转为数值
  + Symbol值.description()读取symbol描述
  + 属性名的遍历
    1. for... in 和for... of,Object.keys(),JSON.stringify(),Object.getOwnPropertyNames() 在遍历对象时，symbol作为属性名都不会返回
    2. Object.getOwnPropertySymbols()可以返回指定对象的所有Symbol属性名。
    3. Reflect.ownKeys()方法可以返回所有类型的属性名（常规健名和Symbol健名）
  + Symbol.for() 和Symbol.keyFor()
    1. Symbol.for()和Symbol()都会生成新的symbol，但是区别是，前者会被登记在全局环境中供搜索(全局登记特性)，他会先检查给定的key是否存在，不存在才会新建一个值
    2. Symbol.keyFor()方法返回一个已登记的Symbol类型值的key。没登记的会返回undefind
    3. 内置的11个Symbol值
### Set和Map数据结构
  + Set数据结构类似于数组，但是成员的值都是唯一的，没有重复的值。  Set本身是一个构造函数，用来生成Set数据结构
  + add()方法可以向Set数据结构中添加数据
  ```
  [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
  ```
  + Set函数可以接受一个数组（或者具有iterable接口的其他数据结构）作为参数，用来初始化，会去掉重复的(可用于数组，字符串去重)
  ```
  const set = new Set([1, 2, 3, 4, 4]);
  ```
  + Set加入值时，不会发生类型转换，其内部有一个比较机智，类似于“===”，但是Set加入值时认为NaN等于自身， “===”认为NaN不相等
  + Set实例的属性和方法
    1. constructor 构造函数，默认就是Set函数
    2. size 返回Set实例的成员总数
    3. add() 添加某个值，返回Set结构本身
    4. delete() 删除某个值
    5. has()返回布尔值，表示是否有该成员
    6. clear() 清除所有成员
  + Set结构的实例方法有四个遍历方法，用于遍历成员
    1. keys(),values(),entries(),forEach()
    2. Set也可以使用扩展运算符
  + WeakSet结构与set结构类似，也是不重复。但其有两个不同之处
    1. WeakSet的成员只能是对象
    2. WeakSet中的对象时弱引用，即不考虑对象在不在WeakSet中，如果该对象不再被引用就会被垃圾机制回收内存
    3. add() 添加某个值，返回Set结构本身，，，delete() 删除某个值，， has()返回布尔值，表示是否有该成员
  + Map （值-值）的集合
    1. 实例的属性和方法
      + size属性  返回map结构的成员总数
      + set(key,value)  设置健名key对应的健值value，，如果key已经有值，健值会被更新，否则就生成该健
      + get(key)读取key对应的值，找不到返回undefind
      + has（key）
      + delete(key)
      + clear()
    2. 遍历方法  keys(),values(),entries(),forEach()
    3. map转为数组，比较快的方法是适用扩展运算符  [...map]，，可以结合map,filter实现Map的遍历和过滤
    4. Map与其他数据结构的转换
       + 数组转Map，new Map()  ,Map转数组， ...扩展运算符
       + 如果Map所有键都是字符串，可以无损转对象，如果不是转为字符串后转对象
       + 
  + WeakMap结构，与Map结构类似。也是用于生成键值对的集合。
    1. WeakMap只接受对象作为健名（null除外），WeakMap的健名不计入垃圾回收机制（弱引用，不再使用垃圾回收机制会回收内存）
    2. 只支持这四个方法 get()、set()、has()、delete()
### Proxy    用于修改某些操作的默认行为，等同于在语言层面作出了一些修改，所以属于元编程，，即对编程语言进行编程
  + 语法：
  ```
  var proxy = new Proxy(target,handler)
  // target:表示要拦截的目标对象
  // handler：表示用来指定拦截的行为
  //二者皆是对象
  ```
  + proxy的拦截有13中之多

### Reflect 对象和proxy对象一样
  + Reflect设计的目的主要由以下几个
    1. 将Object对象一些明显属于内部语言的方法放到Reflect对象上，未来新方法支部数在Reflect对象上，也就是说Reflect可以拿到语言内部的方法
    2. 修改某些Object方法的返回结果，让其更加合理
    3. 让Object操作都变成函数式的
    4. Reflect对象上的方法与Proxy一一对应，只要是proxy上的方法都可以在reflect对象上找到，这就让Proxy对象方便的调用对应的Reflect对象上的方法，完成默认行为，作为修改行为的基础。。也就是说Proxy不管怎么修改默认行为，你总可以在Reflect上获取默认行为。
    （采用Reflect.set方法将值赋值给对象的属性，确保原有的行为，然后再部署额外的功能）

### Promise 对象 
  + 建议使用catch来捕获错误，catch返回哟个promise，后便可以跟then或catch用来执行活不活错误
  + Promise.prototype.finally()方法是es9（ES2018）提出的，该方法的回调函数不接受任何参数，在then或catch方法执行完毕后都会执行。它的执行不依赖Promise返回的状态，本质上就是then方法的特例
  + Promise.all(),参数是一个数组或者有Iterator，数组中每一项都成功或者有意向rejected，才会触发后边的方法。若该项rejected并且有catch，Promise.all()的catch方法就不会执行
  + Promise.race()参数和Promise.all()一样，数组中哪项先返回，promise的状态就会改变，就会将优先返回的的Promise实例的返回值传递给回调函数，如果在指定时间内没有返回，将状态变为reject。
  + Promise.allSettled(),参数为一个数组，只有等所有的参数实例返回结构（不管是fulfilled或者是rejected），才会结束。该方法有ES2020（es11），*** 可以确保所有请求都结束 ***
  + Promise.any()  接收一组参数，有一个状态变为fulfilled，包装实例就会变为fulfilled。如果所有实例都变成rejected状态，包装实例状态就会变成rejected  *** 该方法是第三阶段的一个提案  ***
  + Promise.resolve()
  + Promise.reject()
  + Promise.try()
  + Promise.catch()

### Iterator (遍历器) 
  + 它是一种接口，为不同数据结构提供统一的访问机制。任何数据结构只要部署了Iterator接口，就可以完成遍历操作。
  + Iterator的三个作用：
    1. 为各个数据结构提供统一的，简便的访问接口。
    2. 使得数据结构的成员能够按某种次序排列
    3. ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费
  + Iterator遍历过程   *** 遍历器对象其实就是一个指针对象 ***
    1. 首先创建一个指针对象，指向当前数据结构起始位置。
    2. 然后调用next方法，指向第一个成员，返回一个包含value和done的对象。value是成员的值，done是一个布尔值，表示遍历是否结束。
  + 具有iterator接口的数据结构：
    1. Array,Map,Set,String,TypedArray,函数的arguments对象，NodeList对象
  + for...of
    1. for...in 循环主要是为遍历对象而设计的，不适用遍历数组。
    2. for...of 可以与break，continue，return使用

### ArrayBuffer   
  1. ArrayBuffer对象，TypedBuffer试图，和DataView视图是js操作二进制数据的一个接口。它们都是以数组的语法处理二进制数据，统称二进制数组。它允许开发者以数组下表去操作内存，增强了js处理二进制的能力，使得开发者可以通过js与操作系统的原生接口进行二进制通信。
  2. 二进制数组有三类对象组成：
    + ArrayBuffer对象：  代表内存中的一段二进制数据。可以通过“视图”进行操作。“视图”部署了数组接口，这意味着可以通过数组的方法操作内存。
      1. ArrayBuffer对象代表存储二进制的一段内存，它不能直接读写，只能通过视图来读写，视图的作用就是以指定格式解读二进制数据
      2. 是一个构造函数
      3. ArrayBuffer.prototype.slice() 将内存的一部分拷贝生成新的ArrayBffer对象。除了slice()方法，ArrayBuffer对象不提供任何直接写内存的方法，只允许在其上方建立视图，然后通过视图读写。
    + TypedArray视图： 共包括9种类型的视图（如Uint8Array无符号8位整数，Int16Array 16位整数，Float32Array 32位浮点数）
      1. 一组构造函数，代表不同的数据格式
      2. 参数可以是ArrayBuffer，或是普通数组。
      3. 9种类型（8位有符号整数，8位无符号整数，8位无符号整数（与前者溢出处理不同），16位有符号整数，16位无符号整数，32位有符号整数，32位无符号整数，32位浮点数，64位浮点数）
      4.         Int8Array， Uint8Array， Unit8ClampedArray， Int16Array， Uint16Array， Int32Array， Uint32Array， Float32Array, Float64Array
      5. 普通数组的方法对TypedArray同样适用
    + DataView视图： 可以自定义符合格式视图，如第一字节是Uint8，第二字节是Int16
      1. 是一个构造函数

### async函数
  +  async函数的实现原理，其实就是将Generator函数和自动执行器，包装在一个函数里
  +  await原来是不允许单独使用的，现在为了解决模块异步加载的问题，允许其在模块顶层独自使用。
    1. await一般配合async使用，用作异步处理

### Generator函数   (生成器)
  + Generator函数的理解：它就是一个状态机，内部封装了多个状态。执行Generator函数返回的是一个遍历器对象。需要用遍历器的next()方法去遍历，内部yield表达式表示暂停标记，next()可以恢复执行（next方法会使指针向下一个状态移动）
  + Generator函数两个特征：
    1. function关键字后紧跟 *（星号）
    2. 内部使用yield表达式
  ```
    function* foo(x,y){.....}
  ```
  + yield表达式与return相比
    1. 二者都可以返回紧跟在语句后边的表达式的值
    2. 区别在于每次遇到yield，函数会暂停执行，下次从该位置继续执行，儿return不具有记忆位置的功能
    3. 一个函数内可以有多个yield，只能有一个return
    4. 用法：
      - yield只能在Generator函数使用，否则会报错
      - yield表达式如果在另一个表达式中使用，一定要用圆括号包裹
      - yield表达式作为函数参数或在赋值表达式右边时可以不加括号
    + Generator.prototype.return()会返回给定的值，并且结束遍历Generator函数
    ```
      function* gen() {
        yield 1;
        yield 2;
        yield 3;
      }

      var g = gen();
      g.return('foo')  // { value: "foo", done: true }
    ```