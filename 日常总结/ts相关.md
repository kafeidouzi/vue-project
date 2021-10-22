### 基础
JS:bom,dom,esMCscript


## typescript   从三个方面看    
  1. 数据类型检查   编译代码时可以进行严格的静态类型检查
  2. 语言扩展       会包括未来es的各种特性以及别的特性接口，泛型
  3. 工具属性       可以编译为纯javascript，可以再任何浏览器，操作系统上运行，无任何开销



### 各个语言类型图
![B`3TQ{PUY${VJT_{I}3QNMQ.png](https://upload-images.jianshu.io/upload_images/18473143-179da93f81e2ddc4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

es6数据类型：boolean，number，string，symbol，undefined，null 引用类型（array，function，object）
ts数据类型：以上6，void，any，never，元组，枚举，高级类型

ts:微软开发     阿帕奇授权

### 基础：  TS： 基础类型（基础），函数，接口，类，类和接口，泛型
### 进阶：  基础类型（高级），Symbols，迭代器和生成器，装饰器，声明文件，声明合并，变量声明


yarn global  add  typescript     安装ts

tsc  源文件路径   --outfile    编译后的文件路径
eg： tsc  ./src/app.ts   --outfile ./dist/app.js    输出文件（file）

    tsc   ./src/*   --outDir  ./dist    --watch     时时监听,输出文件夹（dir）

    tsc --init    类似于webpack可配置文件

###    ——————————————————————————————————————————————————————————————————————————
ts:基础类型  

###  string  number   boolean
###   string[]  Array<string>   数组两种声明方式

### [string,number]    元组   和数组差不多，规定属组内每个元素的类型

###  enum list {a= 3,b = 6,c= 9}  枚举    app2.ts
可以自定义每个元素的下标值
  1. 数字枚举的实现原理，反向映射。
  2. 字符串枚举   非反向映射，仅仅是key --> value
  3. 异构枚举，成员既有数字枚举，又有字符串枚举
  4. 枚举成员   const  （在编译阶段就已经计算）   和       computed （保留到执行阶段执行）
        在computed成员后的成员必须要有初始值
  ```
  enum Asdf {
    //const类型
    a
    b=Char.a
    c= 1+3
    //computed类型
    d= Math.random()
    e= '123'.length
  }
  ```
  5. 常量枚举    const enum Ass {}  常量枚举编译时会去除掉，如果需要声明固定常量是可以使用
  6. 定义变量的类型是不同的枚举类型时，两个变量不可比较。

###   any   任何类型


###   void   不能有类型或者undefined

### 联合类型
  let a : number |string | boolean

### never类型  通常用语抛出错误    标识死循环不知何时返回什么类型

### null  undefinded   是其他类型的子类

### symbol 类型     es6的   可以作为类和对象的唯一标识

https://www.jianshu.com/p/f24158d937ef   此链接可以了解symbol

###   ————————————————————————————————————————————————————————————————————————
### 函数
  函数的定义：
    1.ts标准定义 
    2.使用接口定义
    3.函数的可选参数?    
    4.参数可以设置默认值
    5.参数可以设置为只读属性     readonly
    6.剩余参数    ...aaa:any[]
    7.函数的重载（多个名称相同参数不同的函数，可以消除一些歧义，如传入值和输出值的类型的一致性）  函数重载可以使用泛型解决
###  接口   interface   名{}
    1.可以描述对象的形状，即规定对象中的属性的个数，类型等
    2.可以对类的行为进行抽象
### 类
    1.类的声明    可以利用public来声明变量而不用赋值    class
    2.类的继承    extends     继承后就有了父类的
    3.构造函数   constructor   super
    4.类的静态方法 静态属性     static
    5.存取器，类似于vue得计算属性computed        get    set
    6.类的修饰符   public    private（子类，实例都不能访问） protected（子类可以，实例不行）
    7.抽象类  abstract
        类内可以定义抽象方法和非抽象方法   
        抽象类不能实例化
        抽象类中的抽象方法只定义，子类去实现
    8.类的类型   父类 Door    子类MuDoor
         let s : Door = new Door()     父类自己的
         let s : MuDoor = new MuDoor()     子类自己的
         let s : MuDoor = new Door()    子类和父类都可以
         let s : Door = new MuDoor()     这种只能调用父类的方法
    9.es7里新提出了属性，可以直接定义属性
### 接口可以规范类    implements关键字      class 类名  implements  接口名 ｛｝
  接口里的所有规定，类中都要实现。类中也可以实现额外的方法或属性
  接口只能约束类的公有成员
  接口不能约束构造函数
  接口可以多继承
  接口可以继承接口
  ***接口也可以继承类    并且可以继承类的所有成员包括（公有，私有，受保护）  ****
  implements ===>实现的意思

### 泛型  
    1.泛型函数与泛型接口
      泛型函数（泛型函数，泛型类型）
    2.泛型类（不能约束静态方法静态属性）与泛型约束

### 泛型的优点
    1.函数可以轻松支持多种类型，增强程序的扩展性
    2.不必写多条函数重载，冗长的联合类型声明，增强代码可读性
    3.灵活控制类型之间的约束

###    ——————————————————————————————————————————————————————

### ts的类型检查机制
      typeScript编译器在做类型检查时，所秉承的一些原则，以及表现出的一些行为。
      作用：辅助开发，提高开发效率

  * 类型推断
  * 类型兼容性
  * 类型保护

###   类型推断
        有时候不需要指定变量的类型（函数返回的类型），typescript会根据某些规则自动的为其推断一个类型
  * 基础类型推断    从右往左
  * 最佳类型推断   类型复杂时推断出更多的符合全部类型   从右往左
  * 上下文类型推断     如：根据事件函数，退出它所对应的属性值     从左往右

### 类型兼容
  * 接口直接    少的兼容多的
  * 函数
        参数   个数多兼容少   类型不同不兼容
            参数是对象的话，对象个数多的兼容对象个数少的
        返回值  少的兼容多的
        重载  目标函数参数要多于具体实现函数
  * 枚举  枚举和number是兼容的，枚举之间是不兼容的
  * 类   类的构造函数和静态成员不参与比较；当类中有私有成员时，两个类不兼容，类与子类可以兼容的
  * 泛型  
        泛型接口   两个泛型参数只有在类型不相同时，只有在泛型参数使用时才会影响（不兼容）
        泛型函数   和泛型接口差不多
### 类型保护

  * ts能够在特定的区块中保证变量属于某种确定的类型，可以在此区块中放心的引用此类型的属性，或者调用此类型方法
  * 四种方式来创建区块
    1）  instanceof    它可以判断实例是不是属于某个类
    2） in   可以判断某个属性是不是  某个对象
    3） typeof   判断基本类型
    4） 创建一个类型保护函数
      *   typeof：判断一个变量的类型
          instanceof：判断一个实例是否属于某个类
          in：判断一个属性是否属于某个对象
          类型保护函数：某些判断可能不是一条语句能够搞定的，需要更多复杂的逻辑，适合封装到一个函数内   返回值是一个类型位次  
          * 类型位次，mark

### +++++++++++++++++++++++++++++++++++++++++++++++++

 ### 高级类型

### 交叉类型和联合类型

  ### 交叉类型：并集
  ### 联合类型： 对于普通的变量来说，可以定义多个类型用  |   隔开，当让也可以规定其范围；  对于一个对象来说（该对象是由两个对象组成的联合类型），如果在类型没有确定的情况下，该对象只能访问那两个对象的公共属性

### 索引类型    可以实现  对对象的查询和访问

  * keyof T
      索引类型的查询操作符    表示对象T所有公共属性的字面量联合类型
  * T[K]
      索引访问操作符      表示对象T的属性K所代表的类型
  * T extends U
    泛型约束        表示泛型可以通过继承某个类型，获得某些属性

### 映射类型

  ### Readonly<obj>,Partial<obj>,Pick<obj, 'a' | 'b'>   ab是obj中的某些属性
  * 以上三种被官方称为  同态    ，意思是他们只会所用于object属性，不会产生新的属性 

  * 非同态，会产生新的属性
  ### Record<'x' | 'y', obj>  第一个参数为新增属性，第二个参数为已知属性，xy的类型为obj

### 条件类型   6-4
  
  * Exclude<T,U>  过滤掉t类型中可以赋值给u类型的类型
  * NonNullable<T>   过滤掉T类型中的null和undefined
  * Extact<T,U> 抽离出t类型中可以赋值给u类型的类型
  * ReturnType<函数> 可以判断函数的返回值类型

### es6和commonJs
  ts-node   模块可以让ts文件直接node执行

### 命名空间  namespace   本质就是一个闭包，用来隔离作用域的，避免全局污染
  * 注意命名空间不要和模块使用，最好全局使用
  * 如果命名空间要全局使用，要用export导出
  * 调用直接 空间名.方法 
  * 首先要编译成js文件，在html文件中引入
  * 在不同文件中，同一命名空间，可以使用三杠     /// <reference path="路径">
  * 别名     使用import关键字    eg:  import a = 命名空间.a    后边调用a就可以

### 声明合并  
  * 接口的合并  
      非函数成员要其保证唯一性，
      函数成员实现了函数的重载，实现时类型要更加宽泛一些，在接口内，按顺序。接口之间后边的接口在排在前边。（如果函数的参数为一个字面量类型，则该函数会被提到第一位）
  * 命名空间的合并 
      自个之间：  导出的不能重复定义
      和函数  ：  相当于给函数加了个属性
      和类：
      和枚举：
  ### 注意： 函数和类要放在命名空间前边，枚举则无所谓
  原因是：
      class在后会产生重复声明报错，function是可能会产生内容覆盖，枚举则是创建对象并添加属性，命名空间也是创建对象并添加属性，所以枚举可以在命名空间后面，因为他们本质上都是看全局是否有同名对象，如果没有就创建并添加属性，如果有直接添加属性

### 编写声明文件
  * 安装需要的包，然后安装类型声明包（让ts得以解读）  @type/包名
  * types Search  该网站查看包是否有声明文件
  * DefinitelyTyped   可以查看声明如何编写
  * declare 关键字可以为外部变量提供声明    


  * umd库也可以通过全局引入
  * tscconfig的allowUmdGlobalAcess配置项可以设置umd在全局引入报错问题


###  +++++++++++++++++++++++++++++++++++++++++++++++
## 配置之间是可以继承的  
    1. 可以把基础的配置放在tsconfig.base.json文件中，在tsconfig.json中用 关键字extends来继承  
    ｛
      "extends":"tsconfig.json的路径"
    ｝
    2. 当然在tsconfig.json中也可以覆盖base文件中的配置

##  配置tscconfig.json         文件选项
  *  files    数组格式    指定编译文件   
  *  include  数组格式    指定编译文件或文件夹
  *  exclude  数组格式    排除不需要编译的文件
```
  {
    "files":[           
      //"文件路径"
    ],
    "include":[
      // "文件路径"   ，支持*  eg：/*  只编译一级目录    /*/* 只编译二级目录
    ],
    "exclude":[
      // "文件路径"  
    ],
    "compileOnSave":true   //表示在保存文件时自动编译文件，目前vscode不支持
  }
```

## 配置tsconfig.json   编译选项
  - incremental   增量编译，可以提升编译的效率50%左右
  - diagnostics   打印诊断信息，从这里就可以看到具体的效率提升数据
  - tsBuildInfoFile   可以自定义增量编译的存储位置
  - target    目标语言的版本
  - module   生成代码的模块标砖
  - outFile  将多个相互依赖的文件生成一个文件，可以用在AMD模块中
  - lib  需要导入的类库声明文件   es5 默认会导入 “dom” "es5"  "scripthost" 
  - allowJs  允许编译js，jsx文件
  - checkJs  允许在js文件中报错，通常与allowjs一起使用
  - outDir  文件输出目录
  - rootDir 文件输入目录
  - declaration  生成声明文件
  - declarationDir  声明文件路径
  - emitDeclarationOnly   只生成声明文件（编译后不会生成js文件）
  - soucreMap   生成scoureMap文件
  - inlineScoureMap  生成inline scoureMap格式的scoureMap  会在编译的js文件中
  - declarationMap   给生明文件生成一个map
  - typeRoots  []  声明文件目录，默认node_moudles/@types
  - types []    声明文件包   写了后默认会从上述文件中查找
  - removeComments   删除注释
  - noEmit // 等于true表示不输出文件
  - noEmitOnError  发生错误不输出文件
  - noEmitHelpers  不生成helpers函数，但需要ts-helpers  （现在不用了，配合下边这个就可以）
  - importHelpers  通过tslib引入helper函数，文件必须是模块
  -  downlevelIteration    降级遍历器的实现（es3/5） 目标版本过低时会使用更低的实现方法
  - strict  开启所有严格类型检查     它为true，以下7个都默认为true
  - alwaysStrict    在代码中注入   "use strict"
  - noImplicitAny   不允许隐式的 any类型
  - strictNullChecks  不允许吧nul，undefined赋值给别的类型
  - strictPropertyInitialozation  类的实例属性必须初始化
  - strictFunctionTypes  不允许函数参数双向协定
  - strictBindCallApply   严格的bind/call/apply的检查
  - noImplicitThis   不允许this有隐式的any类型
  -   以上7个在strict开启时，根据需求设为false即可

  ### 函数相关只会提醒不会影响编译
  - noUnusedLocals    检查只声明，未使用的局部变量
  - noUnuseParameters   检查为使用的函数参数
  - noFalllthroughCasesInSwitch   防止switch语句贯穿
  - noImplicitReturns  每个分支都要有返回值

  - esModuleInterop   允许  export = 导出，由import from导入
  - allowUmdGlobalAccess   允许在模块中访问 umd 的全局变量
  - moduleResolution     模块解析策略，默认是node      ts，tsx，d.ts，从当前目录的node_modules找，找不到就到上级的node_modules中找，网上逐级找知道根目录
  -  注意：解析策略还有classic  
  - baseUrl    解析非相对模块的基础地址
  - paths：｛｝  路径映射，相对于baseUrl
  - rootDirs:[]  将多个目录放在一个虚拟目录下，用于运行时
  - 应用场景，比如未编译前和位编译后路径不同，但不想改路径，此时就可以吧两个目录放在相对录下
  - listEmittedFiles   打印输出文件
  - listFiles    打印编译文件（包括编译时的声明文件等） 
```
  {
    "incremental":true,
    "tsBuildInfoFile":"路径",
    "diagnostics":true,
    "target":"es5",
    "module":"commonjs",
    "outFile":"文件路径及名",
    "lib":["dom"],
    "allowJs":true,
    "checkJs":true,
    "outDir":"路径",
    "rootDir":"路径",

  }
```
### 配置tsconfig.json   工程引用   可以参照typescript的工程引用
  #### 工程引用解决相关问题
  1. 大工程中单个小工程构件问题
  2. 解决输出目录的结构问题
  3. 增量编译，提升编译效率
*  composite:true   工程可以被引用 ，可以增量编译
* declaration:true   声明文件，工程被引用的必备条件

详见ts_study/src/tsconfig工程引用
 * 命令1     tsc -b  路径   --verbose    
      1. 注意-b  是tsc的一个构建工程的buildmingling
      2. --verbose可以打印出构建的详细信息
 * 命令2     tsc -b  路径   --clean
      清除构建文件

## 编译工具   从ts-loader到babel

* ts-loader 的配置项中  
  transpileOnly   为true时只进行语言转换，不进行类型检查

* fork-ts-checker-webpack-plugin  这个插件配合上边的配置项使用，在不影响编译速度的情况下进行类型检查

* awesome-typescript-loader   
  1. 更适合babel集成，使用babel的转译和转存
  2. 不需要安装额外的插件，***就可以把类型检查放到独立的进程中进行***
  3.  类型检查有遗漏，建议使用ts-loader就可以

### TSC和babel对比  
  1. 二者都可以吧ts，js转为es3/4/5....
  2. tsc有类型检查，babel没有
  3. tsc没有相关插件，而Babel有丰富的插件，生态繁荣
  4. babel7之前是不支持ts的

### 注意：创建babel项目，使用ts做类型检查
  1. babel中不要使用命名空间 namespace   不识别
  2. 类型断言 let s = {} as xxx     
  3. 常亮枚举  const enum DD {ss}
  4. 默认导出   export= xxx


## +++++++++++++

###  TSLint和ESLint的区别  
  1. tslint存在一些架构问题，如果要修改可能对现有的规则造成破坏
  2. eslint性能更好，并且社区用户通常用有eslint配置，但没有tslink
  3. 官方准备向eslink迁移
  4. typescript-eslint  会把ts的ast（抽象语法树）转向eslint识别的ast
  5. 三个包： @typescript-eslint/eslint-plugin 让eslint识别一些ts语法
            @typescript-eslint/parser   为eslint提供解析器
            eslint
  6.  babel-eslint 不支持类型检查，支持ts语法
      typescript-eslint   基于ast，支持一些类型规则（tsconfig.json）

###  jest单元测试   math文件
  1.  jest   ts-jest   @type/jest
  2. 可以在测试用例中进行类型检查
  3. 高阶组价。。。背告高阶组件包裹的组件的默认类型是不能透传的，所以可能会报错
  4. React.ComponentType  是默认的一个组件类型
  5. 目前对于高阶组件来说，使用过程中的问题较多（不易解决，且有已知的bug），是因为react声明组件没有更好的兼容高阶组件的类型检查  推荐使用hooks
  6. 


### 用ts结合react开发
1. 与传统开发相比
  函数组件：给属性设定类型
  类组件：给属性和状态设置相应来兴

2. React.FormEvent  官方提供的事件e的类型

