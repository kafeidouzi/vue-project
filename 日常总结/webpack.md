js本来是没有模块的思想的

commonJS： node.js搭载v8引擎的  export.modules
node中使用
只执行一次，有缓存


AMD：  异步模块定义     define    require  
需要引入require.js文件    使用jsonp对模块进行异步加载
浏览器端项目
只执行一次

会以字符串路径找到相应文件，在其外边加一个函数用以识别执行，runInNewContext用来执行字符串相关代码

bundle打包原理

会有一个样板代码，将文们的打包文件放进替换的地方

在打包好的文件中先用立即执行函数整出一个作用域
在作用于立会有一个函数取包裹打包的模块，该函数有三个参数（require，module，exports）
其次会将各个内容放进moudlelist中，webpack会自己编译一遍给每个模块加上一个id，在执行时会根据id找到对应的模块去执行
对应该id时会生明一个变量moduleDeplist数组，其中会放值很多对象，形式如｛模块名：id｝
最后通过闭包的形式将对应的模块的id当做require的参数传进去，
require函数：
  确定模块对应id，
  声明mudule
  mudule函数就是通过id在modulelist中找到模块

异步部分：
  ensure
  通过异步拿到包
  promise的resolve的状态存储，去过状态为true时，表示promise还在进行中，此时将promise返回
  会将其存在全局cahe中，执行jsonp时去resolve
  递归




##   基础
###     在scripts中命令：
  1.  --open   构建完成自动打开浏览器 
###   常见loader和plugins
    MiniCssExtractPlugin   将css单独提取出来成一个文件，的一个插件提取出来
    MiniCssExtractPlugin.loader  和 style-loader是冲突的，二者只能选其一
见图
  ![![VK60K{[Z[H~4XQQA7(%I[Y6.png](https://upload-images.jianshu.io/upload_images/18473143-ba933cbca1ff77e1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
](https://upload-images.jianshu.io/upload_images/18473143-ee8cba820f2dbbec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 监听
  1. 直接在webpack.config.js中配置  watch：true
  见图：
   ![LA[PV{ZBYLNBNPQ5J8OUD]K.png](https://upload-images.jianshu.io/upload_images/18473143-4850b80bf54e7615.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  2. package。json中添加命令时  加上 --watch

### 热更新
  1. WDS: 不刷新浏览器，不输出文件，而是放在内存中
  使用HotModuleReplacementPlugin插件
  2. 使用webpack-dev-middleware
    WDM 将输出文件传输给服务器，使用场景灵活，需要使用express或koa自启服务
    详见：
    ![P1RBVD[@BFX9$OMU(M}04IT.png](https://upload-images.jianshu.io/upload_images/18473143-1720b6ef7fbb7865.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    热更新原理：webpack.compile将js编译成bundle，
    HMR server：将热更新的文件输出给HMR Runtime
    Bundle server：提供文件在浏览器的访问
    HMR Runtime: 会被注入到浏览器，更新文件的变化
    bundle.js: 构建输出的文件
#### 通常bundle.js与服务器之间的连接使用webscoket，数据包更新，浏览器更新
    见图：
    [[0WREO7I]8)ZXX})_`_}[YQ.png](https://upload-images.jianshu.io/upload_images/18473143-06198b95b9aaa8b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 两个阶段  
  1. 启动阶段  12ad
  2. 更新阶段  12345   以json数据传输

###  文件指纹（打包输出文件的后缀，版本管理）
  1. hash：和整个项目构建相关，只要有文件修改，整个项目构建的hash就会更改
  2. Chunkhash： 和webpack打包的chunk又换，不同entry会生成不同的chunkhash值
  3. Contenthash：根据文件内容来定义hash，文件内容不变，则contenthash不变
  
图片文件指纹：见图
![5D7ES[VTFHANC5JC%YPS$@B.png](https://upload-images.jianshu.io/upload_images/18473143-96aca3f5fe90ac41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 代码压缩
  html：html-webpack-plugin   设置minify参数
  css：optimize-css-assets-webpack-plugin     
      css预处理器：cssnano
  js：webpack自带，默认压缩，可以自行安装配置具体参数

### 清理打包文件    cleanwebpackplugin
### css3的针对不同浏览器前缀自动补全功能
  postcss-loader    和 autoprefixer插件
  ```
  {
    loader:'postcee-loader',
    options:{
      plugins:()=> {
        require('autoprefixer')({
          browsers:['last 2 version','>1%','ios7']
        })
      }
    }
  }
  ```

### 移动端css，，px自动转换成rem
  1. w3c对rem的定义： font-size of the root  element   即根元素的大小
  2. lib-flexible库可以自动取读取根节点字体的大小
#### px2rem-loader  和 lib-flexible库   -S（意思是直接用，安装到依赖里）
```
  {
    loader:'px2rem-loader',
    options:{
      remUnit: 75,  // 一rem代表多少px
      remPrecision:8   // px转rem时小数点保留几位
    }
  }
```

### 静态资源内联
  1. 代码层面
      避免页面闪动，页面框架初始化脚本，上报相关打点
  1. 请求层面
      减少http网络请求（小字体或小图片的内敛）
raw-loader   记得使用0.5的版本，新版本有问题
如果代码片段有es6的还可以在其后加上babel-loader
#### mate信息
  
css内联两种方法：
  1. 借助style-loader  
```
{
  loader:'style-loader',
  options:{
    inserAt:'top',      //样式插入到head标签内
    singleton:true        //将所有的style标签合成一个
  }
}
```
2. html-inline-css-webpack-plugin
![N`~}Q$AHPIZGIE%[8PH65$9.png](https://upload-images.jianshu.io/upload_images/18473143-e19ea7d565dcf13e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 多页面打包方案
1. 优点： （1）功能解耦  （2层级较浅，利于seo优化）
2. 为了不在页面改变时，手动添加或删除webpack配置此时需要用到一个库
#### glob     
  利用同步方法： entry:glob.sync(path.join(__dirname,'./src/*/index.js'))
  ```
  const setMPA= ()=> {
    const entry = {}
    const htmlWebpackPlugins = []

    const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))
    Object.keys(entryFiles).map((index)={
      const entryFile = entryFiles[index]

      const match = entryFile.match(/src\(.*)\/index\.js/)
      const pageName = match && match[1]

      entry[pageName] = entryFile
      htmlWebpackPlugins.push(
        new htmlWebpackPlugins({
          template:path.hoin(__dirname, `src/${pageName}.js`),
          filename:`${pageName}.html`,
          chunks:[pageName],
          inject:true,
          minify:{
            html5:true,
            coll
          }
        })
      )
    })
  }
  
  ```

