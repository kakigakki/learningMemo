## webpack的五个核心
1.  entry
2. output
3. loader
    - npm下载
    - 在配置文件webpack.config.js使用
4. plugins
    - npm下载
    - 在配置文件webpack.config.js引入
    - 在配置文件webpack.config.js使用
5. mode
## 开发环境的配置
### 1.webpack初体验
1.  运行指令:
    - 开发环境
        ```JS
        webpack ./src/index.js -o ./bulid/build.    js --mode=development
        ```
        - webpack会以`./src/index.js`为入口文件开始打包，打包后输出到 `./bulid/build.js`
        - 整体打包环境是开发环境
    - 生产环境
        ```JS
        webpack ./src/index.js -o ./bulid/build.js --mode=production
        ```
        - 整体打包环境是开发环境
    -  结论：
        1. 能处理js/json,不能处理css/img等其他资源
        2. 生产环境比开发环境多了一个压缩js代码
        3. 生产环境和开发环境将es6模块化编译成浏览器能识别的模块化
### 2.打包样式资源（css）
1.  配置webpack文件 ： webpack.config.js
    - 作用：指示webpack干哪些活（当你运行webpack运行指令时，会加载里面的配置）
    - 所有构建工具都是基于node.js平台运行的，所以模块化默认采用commonJS
        ```js
         //resolve模块需要导入，属于node核心模块，用来拼接路径
        const {resolve} = require("path")
        module.expots={
            //css的样式文件可以通过import导入js中
            entry :"./src/index.js",
            output:{
                //输出文件名
                filenmae:"bulit.js" 
                //输出路径
                //__dirname是模块对象的参数，代表当前文件的目录绝对路径
                path: resolve(__dirname,"bulid")
                
               
            },
            //loader的配置
            module:{
                //loader的详细配置
                //不同的文件必须要用不同的loader处理
                rules:[{
                    //匹配哪些文件
                    test: /\.css$/
                    //使用哪些loader进行处理
                    //use数组的执行顺序，从右到左，从下到上，依次执行
                    use:[
                        //在Js中给html创建style标签，将js中的样式资源插入进去，添加到head中生效。
                        "style-loader" ,
                        //将css文件变成commonJS模块加载到js中，里面的内容是样式字符串
                        "css-loader" ,
                    ],
                },
                {
                    test: /\.less$/
                    use:[

                        "style-loader" ,
                        "css-loader" ,
                        //将less文件编译成css
                        //需要下载less和less-loader模块
                        "less-loader"
                    ]
                }
                ]
            },
            plugins:{
                 //详细的plugins的配置
            },
            mode :"development"
            //或者 mode :"production"
        }
        ```
    - 配置完上面config.js后，直接命令行webpack就能打包，将index.js打包成built.js，并将css文件引入到js中。
### 3.打包html资源
1.  需要下载html-webpack-plugin插件
    ```JS
    const {resolve} = require("path") //解构赋值方式，拿到path对象的resolve方法
    const htmlWebpackPlugin = require("html-webpack-plugin")
        module.expots={
            entry :"./src/index.js",
            output:{
                filenmae:"bulit.js"
                path: resolve(__dirname,"bulid")
            },
            module:{
                rules:
                [{
                    //匹配哪些文件
                    test: /\.css$/
                    use:[
                    ]
                },]
            }
            plugins:[
                //html-webpack-plugin
                //功能：默认创建一个空的html,自动引入打包输出的所有资源（js/css）
                //需求：需要有结构的html文件
               new htmlWebpackPlugin({
                    template: './src/index.html'
                }),
            ],
            mode :"development"
        }
    ```
### 4.打包图片资源
1.  当css中有图片的时候，需要用加载图片的所有loader
    - url-loader
    - file-loader(url-loader基于此loader运行)
```js
const resolve = require("path")
module.exports = {
    entry :"./src/index.js",
    output:{
        //输出文件名
        filenmae:"bulit.js" 
        //输出路径
        //__dirname是模块对象的参数表当前文件的目录绝对路径
        path: resolve(__dirname,"bulid")
    },
    module:{
        rules:
        [
            {
                test:/\.less/,
                use:["style-loader","css-loader","less-loader"]
            },
            {
                //默认处理不了html中的img标签的图片
                //处理图片资源
                test:/\.(jpg|png|gif)$/,
                loader : "url-loader",
                options :{
                    //图片大小小于8kb,进行base64处理，对图片进行优化
                    //优点：减少请求数量，减轻服务器压力
                    //缺点：图片体积会更大，文件请求速度更慢
                    limit:8*1024,
                    //问题：因为url-loader默认使用es6模块化解析，但是html-loader引入图片时commonjs模块解析，所以两个一次用时可能会出问题
                    //解决方法:关闭url-loader的es6模块化，使用commonjs
                    esModule :false,
                    //给图片重命名
                    //[hash:10]取图片的hash值的前10位
                    //[ext]取文件的原来的扩展名
                    name:"[hash:10].[ext]",
                    //指定输出到bulid文件夹的哪里
                    outputPath : "imgs"
            }
            },
            //处理html中的图片资源，需要用html-loader
            {
                test : /\.html$/
                loader :"html-loader"

            }
        ]
    }
    plugins:[]
    mode: "development"
}
```
### 5.打包其他资源

1.  打包除了html,js,css以外的资源
    - 在入口文件的index.js里引入字体的css文件
        - import "pathName"
    - 然后设置webpack.config.js的loader
        ```js
        module :{
            rules :[
                {   
                    //排除下面这些资源的所有资源
                    exclude :/\.(css|js|html|less|图片等)$/
                    loader :"file-loader"
                    options :{
                        name :"[hash:10][ext]"
                        outputPath : "medias"
                    }
                }
            ]
        }
        ```
### 6.开发服务器devServer
1.  作用：
    - 自动编译
    - 自动打开服务器
    - 自动刷新服务器
2. 使用： 
    - 需要先下载`webpack-dev-server`模块
    - 配置`webpack.config.js`（一般配置在mode属性的下方）
        ```js
        devServer:{
            contentBase :resolve(__dirname,"build"),
            //启动gzip压缩
            compress :true,
            //端口号
            port :3000，
            open:true
        }
        ```
    - 运行`npx webpack-dev-server`
3. 特点：只会在**内存**中编译打包，不会有任何输出
    - `webpack`指令会输出一个bulid文件夹，把一大堆东西放里面
    - `npx webpack-dev-server`，只会进行打包，不会有任何输出，也就是说不会生成bulid文件夹

### 7.开发环境的配置
1. 在空文件夹下创建webpack.config.js构建配置文件
2. 文件夹的的根目录下创建src文件夹，放入**入口**(entry)用的index.js文件和**模板**(template)用的index.html
3. 如果有其他的css文件或者js文件的话，全部导入index.js中
4. index.html中的css,js引入都引入到index.js中。如果html中有图片引入的话，需要配置html-loader，否则不用。
5. 配置config.js
6. [详细的视频地址](https://www.bilibili.com/video/BV1e7411j7T5?p=10)
7. 完整配置参照项目

## 生产环境的配置
### 单独生成一个css文件
1.  在开发配置中，css文件是在打包前导入到inde.js中进行打包的，打包完后并不生成css文件，还是直接陷入html中。
2. 如果想要单独生成css文件需要用到插件
    - 下载`mini-css-extract-plugin`
    - 在config.js中引入
    - 在config.js中写入
        ```JS
        module.exports = require("MiniCssExtractPlugin")
        modules:{
            rules:[
                {
                    test :/\.test$/,
                    use:{
                        //这个Loader取代style-loader,作用为提取js中的css成单独文件
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    }

                }
            ]
        }
        plugins :{
            new MiniCssExtractPlugin(
                {
                    //对输出的文件进行重命名
                    filename : "css/bulit.css"
                }
            )
        }
        ```
### css的兼容性处理
1.  css的兼容性处理:postcss
    - postcss-loader
    - postcss-preset-env
        - 帮助postcss找到package.json中的browserslist里面的配置,通过配置加载指定的css兼容性样式
            ```js
            "browerslist":{
                "development":[
                    "last 1 chrome version",
                    "last 1 firefox version",
                    "last 1 safari version",
                ],
                //生产环境配置(默认)
                "production":[
                    ">0.01%",
                    "not dead",
                    "not op_mini all"
                ]
            }
            ```
        - browserslist默认是生效生产环境,如果需要在开发环境生效的话需要在webpack.config.js的全局作用域上配置
            ```JS
            process.env.NODE_ENV = "development"
            ```
    - 在config.js中配置loader
        ```js
        rules:[
            {
                ...
                use:[
                    "css-loader",
                    {
                        loader:"postcss-loader",
                        options:{
                            ident:"postcss",
                            plugins:()=>[
                                //postcss的插件
                                require("postcss-preset-env")
                            ]
                        }
                    }
                ]
            }
        ]
        ```
### 压缩css
1.  下载插件OptimizeCssAssetsWebpackPlugin
2.  引入插件
3.  创建该插件的构造函数

### js的语法检查Eslint
1.  下载`eslint-loader` `eslint`
    ```js
    module:{
        rules:[
            {
                test :/\.js$/,
                exclude :/node_modules/, //不检查第三方模块
                loader :"eslint-loader",
                options :{
                    fix :true //遇到不规范语句,自动修复
                }
                
            }
        ]
    }
    ```
2.  设置检查规则
    - `package.json`中的`eslintConfig`中设置
        ```js
        eslintConfig:{
            //设置eslint的检查规则
        }
        ```
    - 可以用airbnb写的规则
        - 下载,依赖`eslint-config-airbnb-base`
        - 下载,依赖` eslint-plugin-import`
    - 配置`eslintConfig`:`extends : airbnb-base`
3. 如果不希望eslint检查某些语句的话可以在那些语句上加下面注释
    ```js
    //eslint-disable-next-line
    ```
### js的兼容性处理

1.  js兼容处理工具:`babel-loader` `@babel/preset-env` `@babel/core`
    - 第一种方案:基本js兼容性处理 `@babel/preset-env`
        - 问题:只能转换基本语法,es6的新增函数,对象无法转换,如`promise`
            ```js
            module:{
                rules:[
                    {   
                        test :/\.js$/,
                        exclude : /node_modules/
                        loader :"babel-loader",
                        options:{
                            //预设:指示babel做怎么样的兼容性处理
                            presets :[
                                ["@babel/preset-env"]
                            ]
                        }
                    }
                ]
            }
            ```
    - 第二种方案:全部js兼容性处理: `@babel/polyfill`
        - 该模块不需要在config.js中配置,直接导入index.js中
        - 问题:将所有兼容性代码全部引入,体积很大
            ```js
            import "@babel/polyfill"
            ```
    - 第三种方案:(**推荐**)需要做兼容性处理的就做,按需加载:利用 `core-js`模块
        - 使用此方案时,不能再在index.js中引入 `@babel/polyfill`
            ```js
            module:{
            rules:[
                {   
                    test :/\.js$/,
                    exclude : /node_modules/
                    loader :"babel-loader",
                    options:{
                        //预设:指示babel做怎么样的兼容性处理
                        presets :[
                            ["@babel/preset-env",
                            //下面代码为第三种方案的代码
                            {
                                //按需加载兼容性代码
                                useBulitIns :"usage",
                                //指定core-js版本
                                corejs:{
                                    version:3
                                },
                                //指定兼容性做到哪个版本浏览器
                                targets :{
                                    chrome :"60",
                                    firefox :"50",
                                    ie :"9",
                                    safari :"10",
                                    edge :"17"
                                }
                            }]
                        ]
                    }
                }
            ]
        }
            ```
### js压缩,Html压缩
1.  js的压缩只需要将mode设成生产环境
    ```js
    mode :"production"
    ```
2.  html的压缩需要在HtmlWebpackPlugin插件中设置
    ```js
        plugins :[
            new HtmlWebpackPlugin({
                template :"./src/index,html",
                //压缩html代码
                minify:{
                    //移除空格
                    collapseWhitespace : true,
                    //移除注释
                    removeComments :true
                }
            })
        ]
    ```

### 生产环境的基本配置
1.  用`MiniCssExtractPlugin`插件来给less,css提取成单独css文件
2. 用`postcss-loader`设置css的兼容性处理
3. 用`OptimizeCssAssetWebpackPlugin`来压缩css文件
4. 用`eslint-loader`来检查js文件
5. 用`babel-loader`给js做兼容性处理
6. 当一个文件要被多个loader处理的时候,一定要制定loader执行的先后顺序
    - 对于js文件先这行`eslint-loader` 在执行 `babel-loader`
        ```js
        rules:[
            {   
                ...
                loader:"eslint-loader",
                //表示先执行这个Loader
                enforce:"pre"
                ...
            }
        ]
        ```
7. 用`HtmlWebpackPlugin`给html压缩


## 开发环境的性能优化
### 优化打包构建速度
#### webpack的HMR功能
1.  全称: hot module replacement
2.  模块热加载,一个模块发生变化,只会重新打包这一个模块,而不是所有模块,极大提高了构建速度
3. 在config.js配置devserver属性中加hot属性
    ```js
        devserver :{
            ...
            hot :true
        }
    ```
4. webpack构建的项目中
    - css文件默认有HMR功能,style-loader内部实现了
    - js文件默认不使用HMR功能
        - 需要在入口js文件上写方法去监听其他模块的js文件
            ```js
            //一旦 module.hot为true,说明开启了devserver上的HMR功能
            if(module.hot){
                //然后用accept方法监听其他js文件,一旦该模块发生变化,其他的模块不会重新打包构建
                module.hot.accept("./moduleOne.js",function(){})
            }
            ```
        - 入口js文件修改了的话,无论如何其他模块也会重新打包构建(入口js文件无法HMR加载)
    - html文件不能使用HMR功能,同时会导致问题:html文件不能热更新(现在的应用html都是只有一个,所以不需要HMR功能)
        - 解决 : 修改entry入口,将html文件引入

### 优化代码调试
#### source-map

1.  一种提供源代码到构建后代码映射的技术(如果后代码出错了,通过映射可以追踪到源代码的错误)
2. 在config.js文件中增加devtool属性
    ```js
    devtool :"source-map"
    ```
3. `source-map`类型
    - `source-map`
        - 外部
        - 准确提示源代码的错误文件,错误行数
    - `inline-source-map` :
        - 只生成一个大的内联map
        - 准确提示源代码的错误文件,错误代码行和列
    - `hidden-source-map`:
        - 外部
        - 不能追踪源代码错误,只能提示到构建后代码的错误位置(防止代码泄露)
        - 只隐藏源代码
    - `eval-source-map` :
        - 每个源模块文件对应生成一个内联map
        - 准确提示源代码的错误文件,错误行数
    - `nosources-source-map`
        - 外部
        - 能找到错误代码准确信息,但不能追踪到源代码(防止代码泄露)
        - 全部隐藏
    - `cheap-source-map`
        - 外部
        - 准确提示源代码的错误文件,只提示错误代码**行**
    - `cheap-module-source-map`
        - 外部
        - 准确提示源代码的错误文件,只提示错误代码**行**
        - module会将loader的source map加入
4. 如何使用`source-map`
    - 开发环境 :需要速度快,调试更友好
        - `eval-source-map`
        - `eval-cheap-module-source-map`
    - 生产环境: 源代码要不要隐藏?调试要不要更友好?
        - 内联map会让代码体积变大,所以生产环境下不用内联
        - 如果需要隐藏用
            - `nosources-source-map`
            - `hidden-source-map`
        - 一般用`source-map`就行

## 生产环境的性能优化
### 优化打包构建速度
#### oneof的使用

1.  正常来讲一个类型的文件只需要匹配一个`rules`里的`loader`
2. 此时用oneOf来优化
    ```js
     rules:[
         {  
             //注意,oneOf里面一定不能有两个配置处理同一种类型的文件
             oneOf:[
                {
                    test:xxx,
                    use:["xxx","xxx"]
                },
                {...},
                {...}
             ]
         }
     ]
    ```

#### babel缓存
1.  babel缓存
    - 在生产环境中,如果改一个js代码,不打算重新构建所有代码时,可以使用babel缓存
        ```js
        {
            ...
            loader:"babe-loader",
            options:{
                presets:[...],
                cacheDirectory :true
            }
        }
        
        ```
    - **作用** :此缓存让第二次打包构建速度更快
#### 多进程打包
1. 下载`thread-loader`
2. 一般跟`babel-loader`一起使用,放在`babel-loader`的前面
3. **注意事项**
    - 进程启动大概为600ms,所以进程通信启动也有开销
    - 只有工作消耗时间比较长,才需要多进程打包
4. 使用:
    ```js
        {
            loeder:"thread-loader",
            options:{
                workers :2 //开启两个进程2
            }
        }
    ```
#### externals
1. 在config.js中配置`externals`属性
    ```js
        //拒绝jquery打包
        externals :{
            jquery :"jQuery"
        }
    ```
2.  注意:库被拒绝打包的情况下,需要手动在源代码的html中引入cdn链接调用这些库

#### dll技术
1. `dll`技术,对某些库(jquery,react,vue...)进行单独打包
    - 如果用`cdn链接调用第三方库的话`的话,不需要用`dll`,用`externals`就行
2. 与`externals`区别:
    - dll技术:相当于对库提前打包,然后每次要用的时候直接拿就行,不用每次都对库进行打包,提高打包速度
    - externals技术: 完全不对库进行打包
3. 使用
    1. 在`webpacl.dll.js`的配置文件中配置
        - `webpacl.dll.js`是对第三方库进行单独处理时的配置文件
        ```js
            const webpack = require("webpack")
            const {resolve} = require("path")
            module.exports = {
                entry : {
                    //属性名:最后打包生成的名字: jquery
                    //属性值: 需要打包的库名 "jquery"
                    jquery :["jquery"]
                },
                output:{
                    //[name]为entry定义的属性名
                    filename : "[name].js",
                    path :resolve(__dirname,"dll"),
                    //打包的库里面向外暴露出去的内容叫什么名字
                    library :"[name]_[hash:10]"
                },
                plugins:[
                    //打包生成一个manifest.json,提供与jquery映射
                    new webpack.DllPlugin({
                        //映射库中暴露的名字
                        name : "[name]_[hash:10]",
                        //输出的文件路径
                        path :resolve(__dirname,"dll/manifest.json")
                    })
                ]
            }
        ```
        - 运行`webpack --config webpacl.dll.js`
            - 因为运行webpack默认打包`webpack.config.js`,所以需要打包`webpack.dll.js`时,需要指定
    - 在`webpack.config.js`中加插件,告诉主配置文件,哪些第三方包需要引用
        ```js
            plugins :[
                //告诉webpack哪些库不参与打包,同时使用时名字也得变
                new webpack.DllReferencePlugin({
                    manifest :resolve(__dirname,"dll/manifest.json")
                })
                //将之前在webpack.dll.js中打包的库引进来调用
                new AddAssetHtmlWebpackPlugin({
                    filepath :resolve(__dirname,"dll/jquery.js")
                })
            ]
        ```
### 优化代码运行的性能
#### 文件资源缓存(浏览器默认)
1. **问题**:文件名字如果不变,缓存就不会变,导致服务器上的修改无法及时反映到浏览器的缓存
2. **解决**:每次打包时自动修改文件名,
    - 给文件名加一个hash值
    - 此hash值为webpack每次打包产生的hash值
        - hash值`[hash:10]`  :每次打包生成的唯一hash值
        - chunkhash值`[chunkhashhash:10]`: 根据同一个entry生成的hash值
        - contenthash值 `[contenthash:10]` : 根据文件内容生成的hash值.不同文件hash值一定不一样
    - 除了contenthash值都有**问题**: js和css同时使用一个hash值,如果只修改了一种文件然后重新打包,js,css文件的缓存都会失效
3. **作用** :此缓存让代码上线运行时,缓存更好的被利用

#### tree shaking(树摇)
1.  前提:
    - 必须使用es6环境
    - 开启production模式
2. 作用: 减少代码体积
3. 最好在在package.json中配置sideEffects,否则可能会因为版本原因打包的时候把css之类的文件给删掉
    ```js
    sideEffects:["*.css","*.less"]
    ```

#### code split(代码分割)
1.  **第一种方式**:配置多入口(entry)
    - 单入口
    ```js
    entry :"xxx"
    ```
    - 多入口
    ```js
    entry :{
        main :"xxx",
        test :"xxx"
    },
    output :{
        //[name]表示取入口文件的文件名
        filename :"js/[name].js"
    }
    ```
2. **第二种方式**:在`config.js`中配置`optimization`属性
    - 可以将node_modules中的代码单独打包成一个文件
    - 可以自动分析多入口chunk中,有没有公共的文件,如果有就会打包成单独的一个chunk
    ```js
    optimization :{
        splitChunks:{
            chunks :all
        }
    }
    ```
3. **第三种方式**:通过js代码,让某个文件被单独打包成一个chunk
    - import动态导入语法,**不需要配置config.js成多入口**
    ```js
        import(/* webpackChunkName = "test"*/"xxx").then((module)=>{
            //promise对象参数是xxx.js的module对象
            //文件加载成功
        }).catch(()=>{
            //文件加载失败
        })
    ```
    - `/* webpackChunkName = "tetst"*/` 在导入文件参数前加此**注释**可以给打包成的chunk命名

#### lazy loading(懒加载)
1. 让页面需要用到某个js文件时,才加载这个js文件.而不是一上来就加载全部js文件
2. 还是通过import动态导入语法,来实现懒加载
    ```js
        document.querySelector(".btn").onclick = function(){
            import(/* webpackChunkName = "test"*/"xxx").then((module)=>{
                //promise对象参数是xxx.js的module对象
                //文件加载成功
                //调用xxx.js文件中的print()方法
                module.print("懒加载成功")
            }).catch(()=>{
                //文件加载失败
            })

        }
    ```
#### prefetch(预加载)
1. 会在使用某个js文件之前,提前加载js文件
2. 与正常加载的区别
    - 正常加载为并行加载(同一时间加载多个文件)
    - 预加载时等其他资源加载完毕,浏览器空闲了,再偷偷加载资源
    - 有兼容性的问题,一般只有pc浏览器采用
2. 还是通过import动态导入语法,来实现预加载,与懒加载只区别于一段注释`/* webpackPrefetch :true */`
    ```js
        document.querySelector(".btn").onclick = function(){
            import(/* webpackChunkName = "test",webpackPrefetch :true*/"xxx").then((module)=>{
                ...
            }).catch(()=>{
                ...
            })
        }
    ```
#### PWA:渐进式网络开发应用程序(离线可访问)
1. workbox
    - 下载workbox-webpack-plugin
2. 使用:
    - 在`config的plugin`中配置并启动`serviceWorker`
        ```js
            plugin :[
                new WorkboxWebpackPlugin.GenerateSW({
                    //帮助serviceWorker快速启动
                    //删除旧的serviceWorker
                    //生成一个serviceWorker配置文件
                    clientsClaim:true,
                    skipWaiting :true
                })
            ]
        ```
    - 在入口js文件中使用`serviceWorker`
        ```js
        //需要判断浏览器是否支持
        if(serviceWorker in navigator){
            //当页面加载完成时回调
            window.addEventListener("load",()=>{
                //注册用WorkboxWebpackPlugin.GenerateSW插件配置完成的service-worker
                navigator.serviceWorker.register("./service-worker.js").then(()={
                    //注册成功
                }).catch(()=>{
                    //注册失败
                })
            })
        }
        ```
3. **注意事项**: 
    - eslint不认识window,navigator等浏览器的全局变量,需要配置`package.json`
        ```js
        eslintConfig:{
            ...
            "env" :{
                browser :true
            } 
        }
        ```
    - serviceWorker必须运行在服务器上
        - 第一种开启服务器方式:使用node.js打开服务器
        - 第二种开启服务器方式:下载serve包来开启服务器(遍历)
            - `npm i serve -g` 必须全局下载
            - `serve -s bulid` 启动服务器,将bulid目录下的所有资源作为静态资源暴露出去

## webpack的详细配置
### entry
1.  入口起点：
    1. string :`./src/index.js`
        - 单入口
        - 打包形成一个chunk,输出一个bundle文件
        - chunk的名称默认是main
    2. array :`["./src/index.js","./src/add.js"]`
        - 多入口
        - 所有入口文件最终形成一个chunk,输出一个bundle文件
        - 一般在HMR功能中让html热更新生效
    3. object :`{main: "./src/index,js",add:"./src/add.js"}`
        - 多入口
        - 有几个入口文件,就形成几个chunk,同时输出几个bundle文件
        - chunk的名称为定义的属性名
    4. object时的特殊用法 : 
    ```js
    {jquery :["jqeury"],
    react:["react-xxx","react-yyy"]}
    ```
### output
1. filename :指定输出的文件名称(指定名称+目录)
2. path : 指定输出文件目录(将来所有资源输出的公共目录)
3. publicPath: 指定所有资源引入公共路径的前缀.一般设置为`"/"`
4. chunkFilename : 指定非入口chunk的名称
    - 通过import直接引入js代码的js文件,或者通过optimization配置的node_modules的js文件
5. library : 指定打包的文件向外暴露出去的变量名
    - 如果没设置的话,打包完的js文件是匿名的
    - 一般配合dll技术打包第三方库使用
6. libraryTarget : 指定通过哪种规范暴露出去
    - commonjs 变量名以commonjs的规范暴露出去
    - window  变量名添加到window上
    - global 变量名添加到node上
### module
1.  基本上只适用rules
2. rules中配置loader
    1. test : 检查哪些文件
    2. use : 用哪些loader
    3. exclude : 排除哪些文件
    4. include : 传一个路径,只查该路径下的文件
    5. loader : 单个loader的情况下用此属性,否则用use
    6. enforece :
        - pre  优先执行
        - post 延后执行
    7. oneOf:该属性下的loader配置只会生效一个
 ### resolve :配置解析模块的规则
 1. alias :配置解析模块路径别名 :
    - 优点: 简写路径
    - 缺点 : 写路径无提示
    ```js
    resolve :{
        alias :{
            $css : resolve(__dirname,"src/css")
        }
    }
    ```
    - 配置完以上代码后,源代码中的js文件引入css文件只需要写`import "$css/xxxx.css"`
2. extensions : 配置省略文件路径的后缀名
    ```js
    extensions :[".js",".json",".css"]
    ```
3. modules : 指定去哪个目录找webpack命令
    ```js
    modules :resolve(__dirname,"../../node_modules")
    ```
### devServer
1.  contentBase : 运行代码的目录
    ```js
    contentBase : resolve(__dirname ,"build")
    ```
2. compress : 启动.gzip压缩
    - `true`
3. port: 指定端口号
    - `"50000"`
4. host : 指定域名
    - `"localhost"`
5. open : 是否自动打开浏览器
    - `true`
6. hot : 是否开启HMR功能
    - `true`
7. watchContentBase : 监视contentBase目录下的所有文件,一旦文件变化就会reload
    - `true`
8. watchOptions :监视文件时忽略文件
    ```js
    watchOptions:{
        //一点要忽略node_modules
        ignored :"/node_modules/"
    }
    ```
8. clientLogLevel :不要显示启动服务器日志信息
    - `"none"`
9. quiet :除了一些基本启动信息,其他内容都不要显示
    - `true`
10. overlay : 如果出错了,不要全屏提示
    - `false`
11. proxy :服务器代理,解决开发环境跨域问题
    ```js
    proxy:{
        //一旦devServer(5000)服务器接收到了api/xxx的请求,就会把请求转发给另一个服务器(3000)
        "/api":{
            target :"http://localhost :3000",
            //服务器3000发送请求时,请求路径重写:api/xxx --> xxx(去掉api)
            pathRewrite :{
                "^/api":""
            }
        }
    }
    ```
### optimization
1.  splitChunks : 分割成多个chunk 
    - 一般需要把node_modules的文件单独打包成chunk时设置
    ```js
    optimization:{
        splitChunks:{
            chunks :"all"
        }
    }
    ```
   -  splitChunks的默认值
    ![20200504182552](https://raw.githubusercontent.com/kakigakki/picBed/master/imgs/20200504182552.png)
2.  runtimeChunk : 将当前模块记录其他模块的hash单独打包为一个文件
    ```js
    runtimeChunk:{
        name : entrypoint => `runtime-${entrypoint.name}`
    }
    ```
    - 如果不设置这个选项的话,当一个文件import引入第二个文件时,而这两个文件的名字都是用contenthash值命名的话,当第二个文件内容修改了重新打包了,hash值发生变化,第一个文件因为引入了第二个文件,所以第一个文件内的第二个文件的名字也发生变化,导致了第一个文件的内容也发生变化,这时导致了构建时的缓存失效,构建速度就变慢了
3. minimizer :配置生产环境的压缩方案 : js和css
    - 比上文介绍的OptimizeCssAssetsWebpackPlugin更好用
    - webpack4.2.x版本以上支持
    ```js
    minimizer:[
        new TerserWebpackPlugin({
            //开启缓存
            cache :true,
            //开启多进程打包
            parallel :true,
            //启动source-map
            sourceMap :true
        })
    ]
    ```