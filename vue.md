## vue初体验
### vue的简单案例
1.  案例1:展示数据到页面
    - 先导入vue.js
    - 声明式编程(函数式编程)
    ```js
    //html代码
    <div id="app">{{message}}</div>
    //js代码
    const app= new Vue({
        el:"#app" //用于挂载要管理的元素
        data:{//定义数据
            message :"第一个vue"
        }
    })
    ```
    - vue是响应式的,当数据发生改变,页面的数据也跟着改变了
2. 案例2:列表展示
    ```js
    //html代码
    <ul>
        <li v-for="item in movies">{{item}}</li>
    </ul>
    //js代码
    const app= new Vue({
        el:"#app" //用于挂载要管理的元素
        data:{//定义数据
            movies:["星际穿越","大话西游","少年派的奇幻漂流","盗梦空间"]
        }
    })
    ```
    - 写完上面代码就可以自动在页面上展示数据了
    - 列表也是响应式的
3. 案例3 : 计数器
    ```js
    //html代码
    <div id="app">{{count}}</div>
    <button v-on:click="add"> + </button>
    <button v-on:click="minus"> - </button>
    //js代码
    const app = new Vue({
        el:"#app",
        data:{
            count:0
        },
        methods:{
            add:function(){
                this.count++
            },
            minus:function(){
                this.count--
            }
        }
    })
    ```
    - v-on:click 为vue的事件指令,也可以用@click
4. vue实例中的传入的options值
    - el :可以去string ,HTMLelment
    - data :可以是obj,func
    - methods : {key:func}

### vue的MVVM
1.  概念图
![20200506122519](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20200506122519.png)
2. 代码上的MVVM划分
![20200506122755](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20200506122755.png)
 
### vue的生命周期
![lifecycle](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/lifecycle.png)
1. 在实例对象参数中可以传钩子函数,来根据生命周期调用函数

## 基本语法
### 插值操作
1. 用Mustache`{{}}`
    - `{{}}`中可以使用表达式(加减乘除之类的)
2. `v-once`的使用
    - 后面不需要任何表达式,直接加在标签上
    - 表示该标签的数据不会通过响应式改变
3. `v-html`
    - 如果服务器返回的是一个带标签的字符串的话,不能直接用{{}},用`v-html`才能渲染字符串中的标签
4. `v-text`: 跟`{{}}`差不多,但是不灵活,不怎么用
5. `v-pre` : 将标签的内容原封不动显示,跟Pre标签很像
6. `v-cloak`
    - 在vue解析之前,div中有这个属性
    - 在Vue解析之后,div中的这个属性就没了.
    - 配合`[v-cloak]{display:none}`,就可以在vue解析之前隐藏某个元素

### 动态绑定属性
1. `v-bind:属性名`
    ```js
    //html
    <img v-bind:src("imgUrl") alt>

    //js
    const app =new Vue({
        ...
        data:{
            ..
            imgUrl:"http://xxxx"
        }
    })
    ```
2. `v-bind`语法糖: `:`
    ```js
     <img :src("imgUrl") alt>
    ```
3. v-bind动态绑定`class`
    - 对象class,一次性设置多个class
        ```js
            <p :class="{active:true, line : false}"></p>
        ```
        - 当是true的时候有此class,当时false的时候没有此class
        - 可以配合methods返回一个对象时直接调用
            ```js
            <p :class="getClasses()"></p>
            methods:{
                getclasses :function(){return 
                ...
                {active ,line}}
            }
            ```
    - 数组class
        ```js
            <p :class="[active,line]"></p>
        ```
        - 无法判断true,false,所以用的很少
    - *实战:做一个列表,点击列表的某一项时,该项文字变颜色*
4. `v-bind` 动态绑定style
    - 对象style,一次性设置多个style
        ```js
        <p :style="{fontSize : size,color : 'red'}">
        new Vue({
            ...
            data:{
                Size :'100px'
            }
        })
        ```
    - 数组style
        ```js
        <p :style="[]">
        ```
### 计算属性
1. 基本使用
    ```js
    <p>{{fullName}}</p> //虽然是方法,但其实是带有get set属性的简写.所以末尾不加()
    new Vue({
        ...
        data:{
            name1:"ka",
            name2:"ki"
        },
        computed:{
            fullName:function(){
                return this.name1 +" "+ this.name2
            }
        }
    })
    ```
2. 完整的计算属性其实是下面的带有getter和setter的,因为一般计算属性没有set方法,只有get,所以缩写成了上面这种情况
    ```js
    ...
    fullName :{
        set:function(){
            ...
        },
        get:function(){
            ...
        }
    }
    ```
3. 计算属性的缓存
    - 因为vue内部给计算属性(computed的属性)进行了缓存,所以计算属性建议用computed而不是methods
        ```js
        computed:{
            fullName :function(){...} //多次 渲染也只执行一次
        },
        methods:{
            getFullName :function(){...} //几次渲染就执行几次
        }
        ```
### 事件监听
1.  在标签上加`v-on:事件名`
    - 语法糖:`@事件名`
2. 事件的回调函数参数的几种形式
    - 如果view上`@click="callback"`没有写小括号时,默认传event对象到model
    - 如果需要自己的参数,`@click="cllback(xxx)"`
    - 如果需要自己的参数,也需要event对象时,用`$event`表示浏览器的event对象`@click="callback(xxx,$event)"`
3. `v-on`的修饰符
    - `.stop`修饰符:阻止事件冒泡
        ```js
        <div @click="divClicked">
            <button @click.stop="btnClicked">按钮</button> //点击按钮时,只会触发btnClicked
        </div>
        ```
    - `.prevent`修饰符: 阻止事件的默认行为
    - `.[keyCode|keyAlias]` :监听某个键盘的键帽,如`keyup.enter`,按enter时才会触发事件
    - `.once` : 事件只会触发一次
### 条件判断
1. `v-if` : 为true时view中标签显示,否则隐藏
2. `v-if v-else`的结合 : 当`v-if`显示时,`v-else`隐藏,反则相反
    - 两个互斥的标签,因为不会同时出现在页面上,所以vue在后面其实是复用了同一个标签的,而不是创建了两个标签,所以可能会有Input输入值后再切换另一个input时,输入的值没有清空的问题
    - 解决: 给每个Input加一个唯一标识属性`key="xx"`
3. `v-else-if` :满足条件的时候显示(不推荐使用)
    - 条件很多的时候,在标签进行逻辑太麻烦,推荐在计算属性(computed)中操作
4. `v-if="isShow"`与`v-show="isShow"`的区别
    - 前者删除DOM
    - 后者加行内样式`style = "display:none"`
    - 当需要多次显示隐藏频率的时候,用`v-show`
    - 当只有一次切换时,通过`v-if` (用得比较多)

### 循环遍历
1. `v-for = "item in info"`
    - v-for可以遍历数组也可以遍历对象
    - 遍历对象还可以写成下面类型
        ```js
        <li v-for="(value[,key[,index]]) in info">{{value key}}</li>//key属性名,value属性值
        <li v-for="item in info">{{item}}</li> //如果只取item,会取属性值
        ```
    - 官方推荐使用`v-for`的时候,给对应的元素加上一个`:key`,保证虚拟DOM和页面DOM一一对应,当进行插入,更新操作时,就能更高效的更新虚拟DOM

### 数组与响应式
1. 数组中可以做到响应式的方法
    - `pop()`
    - `shift()`
    - `unshift()`
    - `splice()`
    - `sort()`
    - `reverse()`
2. 通过索引值修改数组的值,并**不是响应式**
    - `arr[0] = "xxx"`  如果需要替换某个元素,用`splice()`
3. 通过`vue.set(arr,index,value)`来修改某个元素,也是响应式

### 阶段案例:图书购物车
![20200506185709](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20200506185709.png)

### v-model使用
1. v-model具有双向绑定功能,`value、checked、selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源
    ```js
    <input type="text" v-model="msg">
    ...
    data:{
        msg:"kaki"
    }
    ```
    - input的值修改,data中的值也会改,反则反之
    - `v-bind`和`{{}}`都是单向绑定,只能从model传到view
2. v-model本质是语法糖,相当于下面两个相加
    - v-bind单向model->view
    - 事件绑定监听view输入值,传回给model
3. v-model绑定在`<input type="radio">`时,单选框就不需要加name属性来互斥,两个单选框设置同一个v-model的值也有互斥的效果
4. v-model在checkbox的使用时,可以直接将选中的多选框的值加进`v-model`的同名数组中
    ```js
    <input type="checkbox" value="a" v-model="letters">a
    <input type="checkbox" value="b" v-model="letters">a
    <input type="checkbox" value="c" v-model="letters">a

    data:{
        letters:[]
    }
    ```
    - 上面代码,如果多选框被选中,`letters`数组中就会加进该多选框的value
5. v-model用在单选框,一般设置值为布尔类型,如果用在多选框,一般设置值为数组
6. v-model用在`select`标签中
    - 当select只能选择一个时,v-model的值为字符串类型,值为选中的option的值
    - 当select能选择多个时(`select`标签加`mutiple`属性),v-model的值未数组类型,数组内未选中的option的值
7. 通常复选框,单选框,选择框的value不是静态的,是从服务器传过来的,此时`v-model`可以配合`v-bind`一起使用
    ```js
    <select name="hobbies" id="hobbies" v-model="newHobbies" multiple>
    <option v-for="item in hobbies" :value="item">{{item}}</option>
    </select>
    ```
8. 修饰符
    - `.lazy` : 加此修饰符时,input失去焦点才更新
    - `.number` : 指定输入的值传到model是number
    - `.trim` : 去掉用户输入值的空格


## 组件化开发
### 1. 基本使用(已经过时,不使用了)
1. 基本用法
    - 创建组件的构造器对象
        ```js
        const myCom = Vue.extend({
            template :`<div>
                        <h2>组件1</h2>
                        <p>组件1</p>
                        </div>`
        })
        ```
    - 注册组件:
        ```js
        //注册全局组件,意味着可以在多个Vue的实例下面使用
        Vue.component("com1",myCom)

        //注册局部组件,只能在当前vue实例下使用
        const app = new Vue({
            ...
            components :{
                com1 : myCom
            }
        })
        ```
    - 使用组件
        ```js
        <div>
        <com1></com1>
        </div>
        ```
### 2. 父子组件
1. 父子组件
    - 两个组件可以相互为父子组件
        ```js
        //定义子组件
        const c1 = Vue.extend({...})

        //定义父组件
        const c2 = Vue.extend({
            template:...,//template中可以直接调用c1组件
            components:{
                c1 : c1
            }
        })
        //可以继续在vue实例中,包含c2父组件,此时vue实例就是c1的爷爷组件了

        
        ```
    - 子组件必须在父组件之前定义,渲染
### 3. 组件注册的语法糖(推荐)
1. 语法糖
    - 将创建组件构造器与注册组件合并一起:
        ```js
        Vue.component("c1",{template:"<div><p>我是语法糖创建的组件</p></div>"})
        ```
    - 直接template所在的对象给自定义标签
    - 此语法糖也可以用在局部组件或者父子组件
### 4. 组件模板分离:
1. 组件模板分离
    - 使用`<script type="text/x-template" id="template1">`,然后将此标签赋值给`template`属性
    - 使用`<template id="template1"></template>`,然后将此标签赋值给`template`属性
        ```js
        Vue.component("c1",{template:"#template1"})
        ```
### 5. 组件中的数据存放
1. 组件中的数据存放
    - 不像vue实例一样,data属性是对象
    - 组件中的`data`是函数,且必须返回对象,返回的对象中放数据
        ```js
        Vue.component({
            template:"#template1",
            data(){
                return {
                    data1:"aaaa",
                    data2:"bbbb"
                }
            }
        })
        ```
        - 组件把数据保存在函数中,是为了保证同一个组件被复用时,数据不共享(如果数据在对象中就会被共享)

### 6. 父子组件的通信
1. 父子组件的通信
    1. 父组件通过`子组件的props`向子组件传递数据
        ```js
        <div id="app">
        //通过v-bind将父组件的data传给子组件的props
        <c1 v-bind:FtherLetters="letters"></c1>
        </div>

        //子组件模板
        <template id="template">...</template>

        //子组件
        Vue.component("c1",{
            template :"#template1",
            props:["FatherLetters","xxx"]
        })

        //父组件
        const app = new Vue({
            el:"#app",
            data:{
                letters:["a","b","c"]
            }
        })
        ```
        - `props属性`除了可以用数组还可以用对象(常用)
            - 正常单层对象来限制props的类型
                ```js
                props:{FatherLetters:Array}
                ```
            - 多层对象来给props添加更多选项
                ```js
                props:{
                    FatherLetters:
                    {
                        type:Array,
                        default(){ //类型时对象或者数组时,default必须是函数
                            return [...]
                        },
                        require:true
                    }}
                ```
            - 除了上面常用的对象类型的props以外,`props`还有很多用法
            ![20200508002550](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20200508002550.png)
        -  props最好不要设置驼峰,否则在用 `v-bind:`绑定的时候驼峰`xxxYyy`需要改成`xxx-yyy`
     1. 子组件通过自定义事件向父组件发送数据
        - 第一步:子组件模板定义事件
        - 第二步:子组件实例定义事件回调函数,函数中绑定`this.$emit(事件名,数据)`
        - 第三步: 父组件中的子组件标签调用$emit中传递的事件
        - 第四步 :父组件实例中定义自定义事件的回调函数,形参默认就是子组件传过来的数据
            ```js
            //view
            //父组件
            <div>
                <c1 @sub-click="fatherClick"></c1>
            </div>
            //子组件模板
            <div>
                <button @click="btnClick(item)"></button>
            </div>

            //model
            //子组件发射自定义事件
            Vue.component("c1",{
                ...,
                methods:{
                    btnClick(item){
                        this.$emit("sub-click",item)
                    }
                }
            })

            const app = new Vue({
                el:"#app",
                methods:{
                    fatherClick(item){
                        ...
                    }
                }
            })
            ```
    3. **实战案例**:实现父组件向子组件传递数据后,子组件修改这份数据后还能传回给父组件的数据同时也修改
### 7.父子组件引用
1. 父访问子
    1. 用`$children`拿子组件实例(**不推荐**)
        - `$children`返回所有子组件的数组(不好维护)
    1. 用`&ref`拿子组件实例(**推荐**)
        - 子组件调用时,必须在标签中声明`ref="sub"`属性来制造一个标识
        - 父组件调用`$ref.sub`获取子组件实例
2. 子访问父
    1. 用`$parent`拿父组件实例(**几乎不使用**)
        - 因为子组件经常被复用,所以返回的父组件都是不同的,所以**不推荐**适用
    2. 用`$root` 拿Vue实例(**几乎不使用**)
        - 还是
    

## 组件化高级
### 1. 插槽
1. 同一个组件需要不同的拓展时,就需要用插槽(有点像interface)
2. 子组件模板上定义`slot`
    ```html
    <template>
        <div>
        ...
        <slot></slot>
        </div>
    </template>
    ```
    - 上面代码插槽还能直接在`slot`中写元素设定默认值
        ```js
        //子组件模板内
        <slot><button></button></slot>
        ```
    - 如果有多个插槽,可以设置`name`属性,方便父组件调用具名插槽
        ```js
        //子组件模板内
        <slot name="slot1"></slot>
        <slot name="slot2"></slot>
        <slot></slot>
        ```
3. 当父组件调用子组件时,在子组件标签内部添加的标签就是插槽
    - 如果是有多个具名插槽,在向具名插槽提供内容的时候，我们可以在一个`<template>`元素上使用 `v-slot 指令`，并以 `v-slot` 的参数的形式提供其名称：
        ```js
        <div>
            <childCom>
                <template v-slot:slot1>
                   //然后这边写内容
                </template>
                <template v-slot:slot2>
                   //然后这边写内容
                </template>
                <template v-slot:default>
                </template>
            </childCom>
        </div>
        ```
        - **注意**:具名插槽的调用必须使用`<template>`配合`v-slot`,除非子组件只有一个插槽.


### 2. 编译作用域
1. 每个组件都有自己的作用域,所以父组件拿不到子组件的数据
2. 作用域插槽:父组件替换插槽的标签,但是内容由子组件来提供
    - 可以利用作用域插槽将子组件的数据传给父组件
    ```js
    //父组件
    <div id="vm">
       <c1 v-slot="slotProp">
            <div >
                {{slotProp.movies.xxx}}
            </div>
       </c1>
    
    </div>

    <template id="c1">
        <slot :movies="movies"></slot>
    </template>
    ```
    - 如果有多个具名插槽,`v-slot`就始终用在`<template>`标签内
    - 上面父组件取到子组件作用域的`movies`可以配合解构赋值来简单取到
        ```js
         <c1 v-slot="{movies}">
            <div >
                {{slotProp.movies.xxx}}
            </div>
       </c1>
        ```
    - `v-slot`可以用缩写语法糖`#`
## webpack配置vue
### 下载vue
1. 下载Vue`npm i vue --save`
2. 如果webpack打包的时候也不能能打包vue的模板,报错的话,设置`webpack.config.js`的`resolve属性`,让
    ```js
    resolve:{
        alias:{
            "vue$":"vue/dist/vue.esm.js"
        }
    }
    ```
### vue的终极使用方案
1. 将每一个组件都分离出来成一个xxx.vue文件
    - vue后缀文件有`template` `script` `style`三个大标签分别对应组件的html,js,css
2. 将组件文件导入到主组件,传给vue实例
    ```js
    import c1 from "xxx/c1.vue"
    const app = new Vue({
        el:"#app",
        template:"</c1>",
        components:{
            c1
        }
    })
    ```
3. 为了让webpack打包vue后缀的文件和读懂文件里面的`template`标签,需要下载`vue-loader` ,`vue-template-compiler`
    ```js
    npm i vue-loader vue-template-compiler -D
    ```
4. 配置`webpack.config.js`
    ```js
    rules:{
        test:/\.vue$/,
        loader:"vue-loader"
    }
    ```
## Vue脚手架
1. 一般开发时不会从头配置webpack,都会使用脚手架`Vue CLI`
2. 安装脚手架`npm i @vue/cli -g`
    - 上面安装的是Vue CLI3的版本
    - 如果想要使用Vue CLI2的话,使用`npm i @vue/cli-init`,就既能使用CLI2也能使用CLI3
3. 初始化项目
    - `vue init webpack 项目名称` 创建Vue CLI2
    - `vue create 项目名称` 创建Vue CLI3
4. 脚手架的文件目录解析
![20200508221734](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20200508221734.png)
5. 脚手架主文件的`render方法`
    - h 为`createElement函数`
        - 传入标签 `createElement("标签名",{标签的属性},["内容"])`
        - 传入组件 `createElement(组件实例)`
6. 如果选择`readtime-compiler`的话,主文件没有`render`方法,是有普通的渲染模板的方法创建组件
    - 渲染页面流程`template -> ast -> render -> vDOM -> UI`
7. `readtime-only`的话,主文件不需要渲染`template`和抽象语法树,直接进行`render`
    - 渲染页面流程`render -> vDOM -> UI`
8. 本地运行打包后的配置文件可以借助node的服务器包 `npm i -g server`
    - `serve -s dist` : `-s`表示单页面应用
## vue-router
### 1.  web开发历史:
1. 后端渲染阶段(jsp+html+java之类的,直接在后台写页面)
2. 前后端分离阶段(后端只提供数据,不负责任何页面的内容)
    - 前端拿到静态资源渲染整个页面
    - 前端通过ajax渲染网页交互的大部分内容
3. 单页面富应用阶段(single page applicaiton)
    - 一般整个应用只有一个html
    - 通过前端路由可以将单页面应用的分成多个页面(多个大组件)
    - 前端路由管理页面的`url->页面(大组件)`的关系
    - 前端路由的核心就是改变URL,但是页面不刷新
### 2. 改变网页url而不刷新网页的两种方式
1. `location.hash="xxx"`
2. `history.pushState({},"","xxx")`或者`history.replaceState({},"","xxx")`
    - `replace`不保存历史记录
    - `history.pushState()`完后,可以通过`go() ,back(),forward()`来调用改变网页url
### 3. vue-router是基于路由和组件的
1. 路由用于设定访问路径,将路径和组件映射起来
2. 所在在vue-router的单页面应用中,页面的路径的改变就是组件的切换.
### 4. 安装路由`npm i vue-router --save`或者脚手架傻瓜依赖
### 5. 使用路由
1. 导入路由对象 `Vue.use(Vuerouter)`
2. 创建路由实例,并且传入路由映射配置
    ```js
    const router1 = new VueRouter({
        routes:[
            {
                path:"/xxx",
                component: xxx
            },
            {
                path:"/yyy",
                component: yyy
            }
        ]
    })
    ```
3. 在Vue实例中挂载创建的路由实例
    ```js
    export default{
        router:router1
    })
    ```
4. 在APP模板中使用
    - `<route-link to="/xxx"></route-link>` :允许用户点击时,跳转到哪个组件
        - 该标签默认被渲染为a标签
        - 可以设置`tag`属性,修改渲染成其他标签,如`tag="button"`可以修改成按钮标签
        - 可以设置`replace`属性,改变路由跳转的方式为`history.replaceState()`而不是`pushState()`
        - 标签被激活时,vue会被该标签添加激活时的class属性,我们可以通过这个class名,去修改激活时的样式
            - 可以通过`active-class`标签修改默认的class的名字
            - 也可以通过创建路由实例时,对象参数中的`linkActiveClass`属性修改
                ```js
                const router1 = new VueRouter({
                    linkActiveClass : "active"
                })
                ```
    - 也可以通过事件绑定回调函数调用时,修改路由路径
        ```js
            export default{
                methods:{
                    btnclick(){
                        this.$router.push("/xxx")
                        //或者不希望保留历史记录时,用replace
                        this.$router.replace("/yyy")
                    }
                }
            }
        ```
    - `<route-view></route-view>` :用户点击`route-link`时,显示的对应的组件的`route-view`标签
### 6. 设置页面路由的默认路径
1. 在创建路由实例的时候添加重定向
    ```js
        const router1 = new VueRouter({
            //默认路由
            {path:"",
            redirect:"/xxx"
            },
            //其他路由
            {...},
            {...}
        })
    ```
### 7. 修改路由改变Url的模式
1. 默认是用`local.hash`
2. 可以在路由实例中修改为`history`
    ```js
    const router1 = new VueRouter({
        mode:"history"
    })
    ```
### 8. 动态路由的使用
1. 配置路由对象时,声明路径可动态
    ```js
    {
        path:"/xxx/:user"
    }
    ```
2. 给`router-link`的`to`属性传入动态数据
    ```js
    <router-link v-bind:to="'/xxx/'+userName"></router-link>
    ```
    - `userName`为Vue实例中的`data`
3. 此时`xxx`的路由组件能通过调用`$route.params.user`获取到动态数据`kaki`

### 路由的懒加载
1. 一般大型项目中的代码很多,必须要`code split`,不能一次性加载,所以一般**每个路由都用懒加载**
2. 路由懒加载在路由配置文件中定义
    ```js
    const xxx = () => import("/xxx")
    ```
### 路由的嵌套
1. 在外部路由对象中添加`children`属性
    ```js
        path:"/xxx",
        children :{
            //配置该路由路径为/xxx/xxx01
            path:"xxx01",
            //懒加载
            component:() =>import("/xxx01.vue")
        }
    ```
2. 在外部路由组件模板中使用`<router-link to="/xxx/xxx01>"`和`<router-view>`

### 路由之间数据的传递
1. 在路由路径后面加参数传递(动态路由)
2. 用在主页面上用`query`
    ```js
    <router-link v-bind:to="{path:"/xxx",query:{name:"kaki",age:"25"}}"></router-link>
    ```
    - 在目标路由上用`$route.query.xxx`取到数据
3. 上面两种数据传递的方式也可以在函数内调用`this.$router.push()`传递参数
    ```js
    const app =new Vue({
        ...
        data:{
            name:"kaki",
            age:"25"
        },
        methods:{
            jumpToRoute2(){
                this.$router.push({
                    path:"/xxx"+this.name
                }),
                //或者
                this.$router.push({
                    path:"/xxx",
                    query:{
                        name:this.name,
                        age:this.age
                    }
                })
            }
        }
    })
    ```

### this.$router 和 this.$route
1. `this.$router`是每个组件都有的属性,相当于`VueRouter`
    - 因为每个组件的原型都是Vue类,而$router是Vue类的原型的方法
2. `this.$route`是每一个路由组件都有的属性

### 全局导航守卫
1. `router`对象有一个函数`beforeEach()`可以用来监听*从一个路由跳到另外一个路由之前的*事件,对应*从一个路由跳到另外一个路由之后的*`afterEach()`事件
    ```js
    router.beforeEach(to,from,next){
        //路由对象的meta可以来放一下数据,这边放了每个路由对应的title
        document.title = to.meta.title
        //当重写了这个方法时,必须先调一次next()
        next()
    }
    ```
    - 函数中有三个参数分别为
        1. `to`:跳转后的路由
        2. `from`跳转前的路由
        3. `next()`:调用该方法才能进入下一个钩子函数
    
### 路由独享守卫
1. 与`全局导航守卫`不同,每个路由可以独立设置守卫监听该路由的行为
2. 在路由对象中(与path相同位置)设置`beforeEnter`等属性定义

### Keep-alive
1. 因为每次路由跳转时,前一个路由都会被销毁(路径会被重置),所以需要用`keep-alive`,在标签`router-view`外面使用
    ```js
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    ```
2. 被`keep-alive`包裹的路由会有`actived()`和`deactived`的钩子函数可以调用
3.`actived()`配合`beforeRouteLeave()`钩子函数可以保存跳转前的路由的子路由
    ```js
    actived(){
        this.$router.push(this.path)
    },
    beforeRouteLeave(){
        this.path = this.$route.path
    }
    ```











