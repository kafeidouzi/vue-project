### redux 原理：
1. 在index钟会先进行判断非生产环境redux是否被压缩了，如果压缩了会给一个warning

2. 其后会暴露   createStore，combineReducers，bindActionCreators,applyMiddleWare,compose  这几个常用api以共使用。


3. createStore 函数接受三个参数：
      reducer：是个函数，接受两个参数，state和action，根据action去执行不同的操作
      preloadedState:初始状态可以随意指定,不传该参数时默认为undefind，如果用conbineReducers来 
            生成reducer，必须保持对象中的key和conbineReducers中的key一致。
      ```
      const store = createStore(reducer1,{open:55555},composeEnhancers(
        applyMiddleware(thunk)
        ));
        reducer1 = （state={count:0},action）=>{
        }
      ```
      enhancer：是store的增强函数，需要用applymiddleware来生成
4. subscribe函数，会给store中的state添加一个订阅监听，一旦调用dispatch来分发action，所有监听函数就会执行。而nextListeners就是储存当前监听函数列表的，当调用subscribe时，传入一个函数作为参数时，就会把这个函数push进nextListeners列表。同时也会返回一个unsubscribe函数，用来解绑当前传入的函数，同时在subscribe函数中定义isSubscribed用来标识当前的订阅是否已经被解绑，解绑的意思是从nextLineners中移除

5. compose.js
可以接受一组函数，从右往左组合多个函数，然后返回一个函数。
#### 这样做可以避免代码向右偏移
```
compose(funcA,funcB,funcC)
相当于
compose(funcA(funcB(funcC())))
```
6. applyMiddleWare
  applyMiddleWare利用createStore和reducer创建了一个store，store的getState和dispatch方法又被分别的赋值给middleWareAPI变量
7. combineReducers
  将多个reducer合并成一个总的reducer，用合成的reducer去调用createStore方法
  每个reducer都会作为value并且有一一对应的key，
  合成的总的reducer会将所有reducer的state合成一个，每个reducer返回的state也都会与每个key一一对应

### HOOKS
 #### 使用hook的动力
 1. 组件的服用药使用props和高阶组件，较为麻烦
 2. providers，consumers，高阶组件，render props抽象的组件会形成“地狱嵌套”
 3. 为的共享状态逻辑提供更好的原生途径
 #### hook是什么
  1. hook是一个特殊的函数，他可以让你“钩入”react特性
 #### hook的使用规则
  1. 只能在最外层调用hook。。不要再循环，条件判断或者子函数中调用
  2. 只能在函数组件中调用hook （或者自定义的hook中）
 #### useState
 1. 基本语法 ：
 ```
 const [count ,setCount] = useState(0)    //这里的state可以是数组或对象
 ```
 2. 与class中不同，在函数组件中不需要使用this，直接可以拿到count，setCount。
 3. 与this.setState不同，this.setState更新state变量总完全替换它，而setCount是合并它
 4. 当有多个useState时，react怎么知道是对应哪个组件？？？
  + +   每个组件内部都会有一个记忆单元格列表，他们其实就是用来存储数据的js对象，当你用useSatate调用一个hook时，他会读取当前单元格（或首次渲染时将其初始化），然后吧指针移动到下一个
 #### useEffect
  1. effect 分为两种，一种是不需要清除的effect，另一种是需要清除的effect（返回一个函数，会在组件卸载时执行，这是hook的内部机制）
  2. 相比于class组件，class组件实现更新需要将相同的逻辑在componentDidMount和componentDidUpdate中同时写相同的逻辑，
    而effect只需要一个，它会在首次渲染和每次更新都会执行，且每次都是一个新的effect，避免了componentDidUpdate使用不当产生的bug，
  3. class与effect还有一点，即是effect可以将有关联的逻辑卸载一个effect中，可以写多个effect，将不同逻辑进行分离
  4. 有些时候effect每次更新可能会影响性能，可以设置effect的第二个参数，它是一个数组。不管数组内的参数是一个或者多个，只要有一个变化它都会执行。当数组为空时，effect只执行一次（意为它不依赖任何props或state的变化）
  5. 与componentDidMount和componentDidUpdate不同，useEffect的函数会在浏览器完成布局与绘制之后，延迟调用。
  6. 并非所有的effect都会被延迟调用，当在用户可见的界面更新dom时，就要同步，这样才不会给用户视觉上的不一致。react提供了一个额外的hook，
  useLayoutEffect，它与useEffect结构一样，只是调用时机不一样
  
 