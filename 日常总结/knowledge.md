####filter用法
***传入两个参数 <van-col>{{第一个参数|formatVisitTime(第二个参数)}}</van-col> 使用**
**两个filters<van-tag plain :color="item.CreateTime（参数）|formatVisitDate（filters方法）|formatVisitDateColor（filters方法）">{{item.CreateTime|**formatVisitDate}}</van-tag>

版权声明：本文为CSDN博主「勋勋勋勋小勋勋」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_34607371/article/details/86318149

***vue使用CDN使用，使用vant组件库***
全局的，直接写组件就ok
***canvas的一个库  fabric***
https://blog.csdn.net/happydecai/article/details/81216419    简单上手
https://www.cnblogs.com/aaron911/p/11949928.html    详细api介绍用法

_this.myCanvas.setBackgroundImage('./img/tou2.png', _this.myCanvas.renderAll.bind(_this.myCanvas));     fabric.js给canvas添加背景图片
oImg.set('selectable',false)    fabric.js禁止选中


***vue鼠标事件控制台警告 （可能导致页面崩溃）***
https://www.cnblogs.com/yck123/p/11212979.html

***微信小程序***
校验文件，，，，，，，webview用业务域名


***axios的请求方式 post和get***
https://www.cnblogs.com/mmzuo-798/p/9284545.html


上传图片时，使用form-data
使用 append以键值对的形式添加
***idea编辑器激活码（有效期半年）***
http://idea.medeming.com/code


### echarts的教程
https://www.echartsjs.com/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts

### box-shadow  设置元素阴影
box-shadow  ： x方向偏移量  y轴方向偏移量 模糊程度  阴影部分长度  颜色

### 关于小程序正确的样式在苹果部分系统出现样式错乱的问题
可能是 1rpx的问题,无法识别.5px（将父元素高度或宽度设置为奇数货奇数.5），  有可能是兼蓉性问题  

###  去掉input选中时或button选中时的外边框
 outline:medium 或者 outline:none 的时候，蓝色边框去掉了
 方法：#search4:focus{ border:1px solid red; }  获取焦点时边框是什么颜色

### 百度富文本编辑器的引入
https://blog.csdn.net/qq_43258252/article/details/87859547

xxxxx.all.js需要安装grunt之后   ，执行grunt  default   在打包的dist文件中会自动生成

https://blog.csdn.net/qq_34354426/article/details/76699206    引入后报错处理


###   lottie动画        uni-app  的插件    lottie-miniprogram
   可以对接js和json文件，对接json时要注意图片的路径（绝对路径和相对路径），可以再xxx.json中找到图片修改路径

### 关于运行项目时报错   node-pre-gyp之类的
   1. npm install --global --production windows-build-tools
   2. npm install -g node-gyp
### 下载elexc表格
   1. 需要注意jquery的ajax是没有bolb格式的返回数据格式
   2. 使用原生ajax 导出表格
```
toExport(params) {
                var _this = this;
                var xhr = new XMLHttpRequest()
                var fileName = params.fileName + '.xlsx'; // 文件名称
                xhr.open('POST', `/ysd/warehousing/exportInventoryWaresList/${this.showInputNum}`, true);
                xhr.responseType = 'blob';
                // xhr.setRequestHeader("Authorization","Basic a2VybWl0Omtlcm1pdA=="); // 请求头中的验证信息等（如果有）
                xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
                xhr.onload = function(res) {
                    if (this.status === 200) {
                        console.log(res)
                        var type = xhr.getResponseHeader('Content-Type');
                        var blob = new Blob([res.target.response], {type: res.target.response.type});
                        if (typeof window.navigator.msSaveBlob !== 'undefined') {
                            /*
							 * For IE
							 * >=IE10
							 */
                            window.navigator.msSaveBlob(blob, fileName);
                        } else {
                            /*
							 * For Non-IE (chrome, firefox)
							 */
                            var URL = window.URL || window.webkitURL;
                            var objectUrl = URL.createObjectURL(blob);
                            if (fileName) {
                                var a = document.createElement('a');
                                if (typeof a.download === 'undefined') {
                                    window.location = objectUrl;
                                } else {
                                    a.href = objectUrl;
                                    a.download = fileName;
                                    document.body.appendChild(a);
                                    a.click();
                                    a.remove();
                                }
                            } else {
                                window.location = objectUrl;
                            }
                        }
                    }
                }
                xhr.send(JSON.stringify(params))
            },
```
###  sass和css区别：
    嵌套，变量，扩展/继承，计算,mixin
###  前端通过拿到json数据后生成导出excel表格（.xls/.cvs）
    https://blog.csdn.net/hhzzcc_/article/details/80419396
### 使用组件不用其action自动上传的方法
    https://www.cnblogs.com/liuruolin/p/7517470.html
```
<!-- 放弃action，在找了好多资料后发现可以不使用action，而是用before-upload属性，这是一个function类型的属性，默认参数是当前文件，只要能传递这个文件也能实现效果要传递这个方法就需要new一个formdata对象，然后对这个对象追加key和value -->

```
### can i use   一款可以测试浏览器兼容问题

## 前端导出宽度自适应excel

 1. 导出多个表格
 >https://blog.csdn.net/csl125/article/details/90318432?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-7&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-7
 2. 导出一个表格
 >https://blog.csdn.net/hgh_1997/article/details/89240925

 ## git add -A 和 git add .  git add -u
1. git add -A  提交所有变化
2. git add . 提交新文件和被修改的文件，不包括删除的文件
3. git add -u 提交被修改和被删除的文件，不包括新文件

## 前段导出pdf的方法    自己github的vue项目  testStudy

1. html2canvas + jspdf    会图片pdf，会失真
2. window.print()

## Nprogress  是页面跳转时出现在浏览器顶部的进度条
    在router.js中
```
//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
```
## sass的基本操作
+ 变量
+ 嵌套
+ minix混合   可以将诸多地方常用的样式写在一起，引用调用即可
+ function函数   可以自定义一些函数
+ 插值 例如可以使用 #{} 插值语句在选择器或属性名中使用变量  @if，@each，@while
### 注意
1. @mixin来定义一个函数，@include来引用  （传参时可以设置默认值）
2. sass本身自带的一些内置函数，如rgba，percetage等

### vue不常用指令
1. v-cloak  可以解决闪屏问题，大型项目用webpack和vue-router
https://www.jianshu.com/p/f56cde007210?utm_source=oschina-app
2. v-pre  一些静态的资源不需要编译，这个指令可以跳过
eg:  <span v-pre>{{ this will not be compiled }}</span>   显示的是{{ this will not be compiled }}
3. v-once  只渲染一次。一般别使用会带来很多困惑
4. v-text  可以解决插值表达式闪烁问题  ```<p v-text="msg"></p>```
5. v-html  可以解析代码     
6. v-text和v-html的区别，v-text只是渲染标签，v-html可以解析HTML代码


### v-for和 ref配合使用时，this.$refs.***  获得的是数组，
1. 在表格从0开始，不间断时，可以这样获取对应的节点  this.$refs.***[scope.$index]
2. 有间断时，自定义ref时，需要取数组第一项 this.$refs.***[0]

### 表格与from表单配合使用时
```
//dom节点
<el-form label-width = "85px" :model = "addData" :rules = "rules" ref = "addData">
    <el-table :data = "addData.paramslist" id = "noData">
              <el-table-column :label = "item" v-for = "(item,index) in paramsName" :key = "index">
                <template slot-scope = "scope">
                  <el-form-item
                    class = "noML"
                    :key = "scope.row.key"
                    :prop = "'paramslist.' + scope.$index + '.'+index"      //重点在此处
                    :rules = "{required: true, message: '值不能为空', trigger: 'blur'}">
                    <el-input size = "mini" v-model = "scope.row[index]"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
</el-form>

//数据格式

addData: {
          paramsName: ['第一组', '第二组'],
          paramslist: [['']],
        }
```

### window.onload 和$(document).ready
[https://upload-images.jianshu.io/upload_images/18473143-793c8e4736e035b2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240]

