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
        <li v-for="(key[,value[,index]]) in info">{{key value}}</li>//key属性名,value属性值
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






