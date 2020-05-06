### 基本概念
1. 不使用模板
2. react不是一个MVC框架
3. 响应式
4. react时一个轻量级的js库

### 原理
1. 虚拟DOM : react把DOM抽象成一个JS对象
    - 虚拟DOM确保对界面上真正发生变化的部分进行实际的DOM操作
    - 逐层次的来进行节点的比较
2. diff算法:对产生差别的dom进行渲染

### react开发环境的搭建
1.  引入相关文件
    1. react.js 核心文件
    2. react-dom.js 渲染页面中的DOM
        - 此文件必须依赖于react核心文件
    3. babel.js
        - ES6转换成ES5
        - JSX转换为JS
2. 下载
    ```npm
    npm i react --save
    npm i react-dom --save
    npm i babel-standalone --save
    ```
3. 创建DOM根节点(一个页面中需要一个根节点,这个节点下的内容就会被react所管理)
4. 把react代码写在`<script type = "text/babel">`中
5. jsx为 js xml的扩展语法
    - 执行效率更快
    - 他是类型安装的,编译过程中及时发现错误
    - 在使用jsx的时候编写模块会更简单和快速
    - jsx的标签必须按照W3C的标准写,必须闭合

### jsx基础
1. 注释
    ```jsx
    {/*xxx*/}
    ```
2. 多行标签 :需要有一个父元素进行包裹
    ```jsx
    let myDom = <div id="father">
                    <div1></div1>
                    <div2></div2>
                </div>
    ```
3. 在jsx中使用表达式使用`{}`
    ```jsx
    let text = "你好"
    let myDom = <div>{text}</div>
    ```
4. 在jsx中设置属性 ,也是使用`{}`
    ```jsx
    let text = "hello"
    let linkUrl = "http://xxxx"
    let myDom = <a href = {linkUrl}></a>
    ```
    - jsx中标签名不能直接使用`class`,因为是js的关键字,要用`class`时,用`className`
        ```jsx
        let text = "hello"
        let myDom = <p className = {text}></p>
        ```
    - jsx中遍历数组:配合array使用map
        ```jsx
        let arr = ["11","22","33"]
        let myDom = <ul>
                        arr.map((item,index)=>{
                            return(
                                <li key={index}>{item}</li>
                                )
                        })
                    </ul>
        ```
    - jsx中遍历对象:配合Object.keys()封装成数组,再用map()
        ```jsx
        let obj = {
            name :"kaki",
            age :25
        }
        let myDom = <div>
                        Object.keys(obj).map((item,index)=>{                         return(
                            <li key={index}>{obj[item]}</li>
                            )
                        })
                    </div>

        ```
5. jsx中给标签添加点击事件
    ```js
        let text = "hello"
        let myDom = <p onClick={回调函数}></p>
    ```
    - 注意点击事件的名字是用驼峰的,跟js不一样

### 组件创建
####  无状态组件的创建
    ```jsx
    //创建一个无状态组件
    function myCom(){
        return (
            <div>我是一个无状态组件</div>
        )
    }
    //调用组件
    let com = <div>
                <myCom/>    
                <myCom/> 
            </div>
    //渲染组件
    ...
    ```
2. 创建父子组件
    ```jsx
    //创建一个子组件
    function myCom1(){
        return (
            <div>我是一个子组件</div>
        )
    }
    //创建一个父组件
    function myCom2(){
        return (
            <div>
                <myCom1></myCom1>
                <myCom1></myCom1>
                <myCom1></myCom1>
            </div>
        )
    }
    //渲染组件
    ReachDOM.render(<myCom2/>,document.quryxxx)
    ```
3. 创建类组件
    ```jsx
    //定义类组件
    class Mycom extends React.Component{
        render(){
            return(
                <div>类组件</div>
            )
        }
    }
    //调用类组件
    ...
    //渲染组件
    ...
    ```
### props
1.  props的定义
    - 使用props可以从组件的外部向组件的内部进行数据的传递
    - 无论无状态组件,还是类组件,我们都不能修改自身的props
    - 无状态组件props使用
        ```jsx
        //定义组件时,定义props
        function Com(props){
            return (
                <div>
                    我要传递{props.text}和{props.text2}和{props.text3}
                </div>
            )
        }
        //声明传递的数据
        let obj ={
            text1 :"data1",
            text2 :"data2",
            text3 :"data3"
        }
        //渲染组件时,传递props
        ReachDOM.render(<myCom2 {...obj}/>,document.quryxxx)
        ```
    - 类组件props使用
        ```jsx
        class Com extends React.Component{
            render(){
                return(
                    <div>
                        我要传递{this.props.text1}和{this.props.text2}
                    </div>
                )
            }
        }
        //声明传递的数据
        ...
        //渲染组件时,传递props
        ...
        ```
2. props的默认值的设定(无状态组件和类组件一样)
    - 当某个Props没有数据是,定义的Props的默认值
        ```js
        //定义无状态组件
        function Com(
            ...
        )
        //设置默认值
        Com.defaultProps = {
            name :"我们name的默认值"
        }
        ```
    - 类组件还可以直接在类中设置`static defaultProps = {...}`
3. props的验证(无状态组件和类组件一样)
    - 验证传递进来的数据是否符合我们期望的类型或者要求
    - 需要下载prop-types库 `npm i prop-types --save`
        ```js
        //定义无状态组件
        function Com(
            ...
        )
        //设置验证
        Com.propTypes={
            name : PropTypes.string, //验证name的值必须是string类型
            age : PropTypes.number.isRequired //验证age的值必须是number类型,且不能为空
        }
        ```

### status
1. 与props的区别
    - state是组件对外的接口,props是组件对内的接口
    - 组件除了使用了上层组件传递的数据之外,他自身也可能有需要管理的数据,这个对内管理数据的属性就是state
    - state是可变的,
    - props对于当前页面的组件来说,是只读的,不可变的.如果想要修改props只能修改传递的props
2. 如果使用state,不能使用无状态组件
    ```js
    class Com extends React.Component{
        constructor(props){
            super(props)
            //声明state
            this.state= {
                name :"第一个state"
            }
        }
        render(){
            return (
                //调用state
                <div>
                    <div>
                    我是一个组件---{this.state.name}
                    </div>
                    //更新state:this.setState({xx:xx})
                    <button onClick = ()=>{this.setState({name:"第二个state"})}>
                    </button>
                </div>

            )
        }
    }
    ```
    - this.setState是异步的,第二个参数是执行成功的回调函数
        ```js
        this.setState({xxx:xxx},callback )
        ```
3. state如果想要插入字符串标签的话
    ```js
    let StringTag = "<p>字符串标签</p>"
    <div>{this.state.StringTag}</div> //这样不行
    <div dangerouslySetInnerHTML = {{__html :this.state.StringTag}}>{this.state.StringTag}</div> //这样才行
    ```
### refs
1.  无法在无状态组件中使用,因为无状态没有实例
2.  表示当前组件的真正实例的引用,他会返回绑定当前属性的元素
3. react提供了三种方式使用refs
    - 字符串的方式(最简单)
    - 回调函数(推荐)
    - `React.createRef()`(react16.3提供的方式)
4. refs的使用
    - 字符串方式
        ```js
        func=()=>{
            console.log(this.refs.demoInput.value)
        }
        render(){
            return(
                <div>
                    我是组件
                    <input type="text" ref="demoInput">
                    <button onClick={this.func}>点我</button>
                </div>
            )
        }
        ```
    - 回调函数
        ```js
        func=()=>{
            console.log(this.textInput.value)
        }
        render(){
            return(
                ...
                <input type="text" ref={(input)=>{this.textInput = input}}>
                ...
            )
        }
        ```
    - `React.createRef()`
        ```js
        ...
        constructor(props){
            super(props)
            this.myRef = React.createRef()
        }
        func=()=>{
            console.log(this.myRef.current.value)
        }
        ...
        <input type="text" ref={this.myRef}>
        ...
        ```
### react事件处理
1.  react事件绑定命名使用驼峰命名法
2. 事件绑定的方式
    - 1. 函数通过箭头函数进行创建
        ```js
        funa = ()=>{}
        ...
        onClick = {this.funa}
        ```
    - 2. bind方式绑定
        ```js
        onClick = {this.funb.bind(this)}
        ```
    - 3. 在constructor中提前绑定
        ```js
        constructor(props){
            super(props)
            this.func.bind(this)
        }
        func(){
            ...
        }
        ...
        onClick = {this.func}
        ```
    - 4. 把事件调用的时候写成箭头函数的调用方式
        ```js
         onClick = {()=>{}}
        ```
### 条件渲染
1.  if语句
    ```js
    constructor(props){
        super(props)
        this.state={
            bool :true
        }
    }
    render(){
        let text
        if(bool){
            text = "11"
        }else{
            text = "22"
        }
        return (
            <div>
                <button onClick=()=>{this.setState({bool:!this.state.bool})}></button>
                <p>{text}</p>
            </div>
        )
    }
    ```
### 状态提升
1. 多个组件需要反映相同的变化数据,提升到他们最近的一个父组件中
    - 即,将多个子组件需要用到的相同的state写在父组件中.然后通过props传递给多个子组件
2. 多个子组件需要用到对方状态的时候,也可以用状态提升

### react的脚手架
1.  安装
    ```js
    npm i -g create-react-app  //下载脚手架安装库
    create-react-app --version //查看当前版本
    create-react-app folderName //创建项目
    npm start //启动项目
    ```
2. 说明
    - 如果多行标签的包裹父标签不想在页面上表示的话,就用`<></>`
    - `app.js`是页面入口
    - `rccp`快捷键可以直接创建带有propTypes的模板

### 组件的传值
1.  父组件给子组件传值
    - 上文学习props时的传值方式
2. 子组件给父组件传值
    - 通过给子组件的props配合state传值给父组件
        ```js
        //子组件
        class Son extends React.Component{
            constructor(props){
                super(props)
                this.state = {
                    text :"from son"
                }
            }

            render(){
                return(
                    <div>
                    <button onClick={this.props.forFather.bind(this,this.state.text)}></button>
                    </div>
                )
            }
        }
        //父组件
        class Father extends React.Component{
            ...
            forFatherFunc(text){
                console.log(text)
            }
            render(){
                return(
                    <div>
                        <p forFather={this.forFatherFunc.bind(this)}</p>
                    </div>                  
                )
            }
        }
        ```
3. 子组件之间数值传递
    - 利用pubsub库
    - 下载`npm i pubsub --save`
    - 在子组件都导入pubsub,然后利用它进行传值
        ```js
            //子组件1
            funcA(){
                PubSub.publish("event",this.state.xxx)
            }
            <button onClick={this.funcA.bind(this)}>传值</button>

            //子组件2
            constructor(props){
                super(props)
                PubSub.subcribe("event",(msg,data)=>{
                    console.log(data)//该data是从子组件1传过来的
                })
            }
        ```

### 模拟数据
1. 下载`npm i json-server -g`
2. 下载`npm i axios --save`
3. 模拟数据流程
    - 创建json数据`data.json`
    - 使用`json-server`
        ```js
        json-server data.json --port xxxxx
        ```
    - 使用`axios` 获取值,然后渲染到页面
    - 然后将值设置到state
    - 然后渲染到页面
    ![20200506084803](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20200506084803.png)

### react路由
1.  概念: 根据url的不同来切换对应的组件,实现spa,在页面切换的时候不会刷新,更加接近原生体验
2. 下载`npm i react-router-dom --save`
3. 路由模式:
    - hash(使用hash模式 带#号,刷新的时候页面不会丢失)
    - browser(历史记录,没有#号,通过历史记录api来进行路由切换)
4. 使用基本路由:
    - 父组件app.js引入路由模块和子组件
        ```js
        import {Route} from "react-router-dom"
        import Home from "xxx/home"
        import out from "xxx/out"
        ```
    - 使用路由模块标签调用子组件,设置路径
        ```js
        ...
        return(
            <div>
                <Route path="./home" component={Home}></Route>
                <Route path="./out" component={out}></Route>
            </div>
        )
        ```
        - 可以用<Switch></Switch>标签包裹路由标签防止同一个组件被多次渲染
        - 可以用`exact`属性,进行精度匹配
        - 可以用<Redirect from="/" to="xxx/home"></Redirect>标签设置默认路由为`xxx/home`

    - 路由模式包裹根组件然后渲染
        ```js
        ...
        ReactDOM.render(<BrowserRouter><App></App></BrowserRouter>)
        ```
5. 使用路径导航
    ```js
     import {Route,Link} from "react-router-dom"
     ...
     return(
         <div>
            <NavLink to="xxx/home">点我去home</NavLink>
            <NavLink to="xxx/out">点我去out</NavLink>
         </div>
     )
    ```
6. withRouter
    - 可以让不是路由切换的组件具有路由切换组件的的三个属性(Location match history)
    - 高阶组件(参数是组件,返回的也是组件)
    - 作用:
        - 监控路由变化
            ```js
            props.history.listen((link)=>{
                console.log(link)
            })
            ```
        - 编程式导航
            ```js
            <button onClick= {()=>{props.history.push("xxx/home")}}>点我去home</button>
            ```
        - 路由传参1(match.params方式)
            ```js
            ...
            //父组件中设置的route里设置形参
            <Route path="./out:id" component={out}></Route>
              //父组件中设置的路径导航里设置实参
            <NavLink to="xxx/out/我叫kaki"></NavLink>
            //子组件out中拿值
            console.log(this.props.match.params.id) //kaki
            ```
            - 优点 :刷新地址,参数依然存在
            - 缺点: 只能传递字符串,参数过多url丑
        - 路由传参2(query方式)
            ```js
            //父组件中设置的路径导航里传参
            <NavLink to={{pathname :"/xxx/out",query:{id : "我叫kaki"}}}></NavLink>

            //子组件out中拿值
            ....
            ```
### React Hook
1.  主要用来让无状态组件可以使用状态
2. 可以使用React Hook中的useState来实现
    - useState(initialState)返回的是一个数组,参数1相当于stateValue,参数2相当于setValue函数
    ```js
    import {useState} from "react"
    function App(props){
        let [val,setVal] = useState(0)
        return(
            ...
            <button onClick={()=>{setVal({val+1})}}></button>
        )
    }
    ```
3. 如果有多个状态
    ```js
    let [val ,setVal] = useState({vala :0,valb:1,valc:2})
    
    let[val1,setVal1] = useState(1)
    let[val2,setVal2]= useState(2)

### redux
1.  javascript提供的一个可测试性(我们给一个固定的输入,那么必定可以得到一个结果)的状态容器
2. redux是一个专门的状态管理库,不是react独有的(在vue等当中也可以使用,但是在react中会比较多)
3. 使用场景:
    - 某个组件的状态需要共享的时候
    - 一个组件需要改变另一个组件状态的时候
    - 组件中的状态需要在任何地方都可以拿到
4. 三大原则:
    - 单一数据源,整个react中的状态都会被统一的管理到store
    - state是只读的,我们不能够直接改变state 而是通过触发redux中的特定方法来进行修改
    - 使用纯函数来执行修改操作:`action()`来改变redux中的state
5. 下载`npm i redux --save`






