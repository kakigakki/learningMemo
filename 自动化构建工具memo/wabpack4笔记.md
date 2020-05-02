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
