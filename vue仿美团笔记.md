# 仿美团页面

## Koa 的使用介绍

### 安装脚手架

```node
npm install -g koa-generator
koa2 -e projectName
```

### 复习 async 和 await

1. async 函数声明里才能使用 await,await 后面其实就是 promise 实例对象

```js
async (){
  const a = await 12 //相当于await Promise.resolve(12)
}
```

1. await 将异步处理成了同步的方式,便于阅读管理,await 没有执行完成时,无法往下走

```js
router.get("/testAwait", async (ctx) => {
    const a = new Date();
    console.log(a);
    const b = await new Promise((reslove, reject) => {
        setTimeout(() => {
            console.log("await b");
            reslove("b"); //此时reslove的参数会传给b
        }, 1000);
    });
    const c = new Date();
    console.log(c); //此时c的时间与a的时间大概相差1s
});
```

### 使用 mongoDB 作为数据库

-   . 启用 mongoDB : `mongod`
-   . 安装可视化工具: `Robo 3T`
-   . 安装 mongoose : `npm i mongoose`
-   . 在 koa2 项目下新建一个专门操作数据库的文件夹`dbs`
-   . 创建配置文件

```js
module.exports = { dbs: "mongodb://127.0.0.1:27017/dbs" };
```

-   . 创建`models`文件夹,专门放数据库的表
-   . 创建`xxx.js`,作为表的配置

```js
const mongoose = require("mongoose");
let xxxSchema = new mongoose.Schema({
    yyy: String,
    zzz: Number,
});

//导出model(相当于表)
module.exports = mongoose.model("xxx", xxxSchema);
```

-   . 在`app.js`中里连接数据库

```js
//引入mongoose和配置文件
const mongoose = require("mongoose");
const dbConfig = require("./dbs/config.js");

//连接数据库
mongoose.connect(dbConfig.dbs, { useNewUrlParser: true });
```

-   .在路由上引入模型(model),调用接口向模型中插入数据

```js
const Person = require("../dbs/models/xxx");

router.post("/addXXX", async function (ctx) {
    const xxx = new xxx({ yyy: ctx.request.body.xxx, zzz: ctx.request.zzz });
    let code;
    try {
        await xxx.save();
        code = 0;
    } catch (e) {
        code = -1;
    }
});
```

-   在命令行使用 post 方法插入数据

```shell
curl -d "yyy=test1&zzz=test2" http://localhost:3000/addXXX
#curl -d 表示用post请求接口
```

-   . 查询数据

```js
router.post("getXXX", async function (ctx) {
    //只找一条
    const result = await Person.findOne({ name: ctx.request.body.name });
    //找全部
    const results = await Person.find({ name: ctx.request.body.name });
    ctx.body = {
        reuslt,
        results,
    };
});
```

-   .测试更新数据

```js
router.post("/updateXXX", async function (ctx) {
    const result = await Person.where({
        name: ctx.request.body.name,
    }).update({
        age: ctx.request.body.age,
    });
    ctx.body = {
        code: 0,
    };
});
```

-   .删除数据

```js
router.post("/deleteXXX", async function (ctx) {
    const result = await Person.where({
        name: ctx.request.body.name,
    }).remove();

    ctx.body = {
        code: 0,
    };
});
```

### 使用 redis 作为存储数据层(存 session)

-   [安装 redis](https://github.com/tporadowski/redis/releases)
-   启动 redis 服务 `redis-server`
-   安装中间件

    -   `koa-generic-session` 处理 session
    -   `koa-redis`

-   在 app.js 中引用中间件

```js
const session = require("koa-generic-session");
const Redis = require("koa-redis");
```

-   在 app.js 中使用中间件

```js
app.use(
    session({
        store: new Redis(),
    })
);
//设置完后,就能自动使用redis来设置session了
```

-   redis 命令行
    -   `redis-cli` :进入客户端
    -   `keys *` : 查询所有 key
    -   `get [key]` :查看某个 key 的 value

### 项目环境准备

-   全局安装 npx `npm i -g npx`
-   使用 nuxt 脚手架安装初始化 nuxt 项目 `npx create-nuxt-app project-name`
-   因为 nuxt 默认不支持 es6 语法,所以修改配置文件`packjson.js`使用 babel,使用 import 替换 require

### 首页菜单结构

-   容器及对应类名`div.pageindex`
-   分成两行

    -   第一行两列(5,19)
    -   第二行只有一列(24)

-   第一行,第一列`全部分类`菜单
    -   容器及类名`div.m-menu`
        -   `dl.nav` 分类列表
            -   `dt`
            -   `dd`:每个 dd 就是一个分类(图标(`<i></i>`)和文字和箭头`<span class="arrow">`)
        -   `div.detail` 每个分类的弹窗
    -   数据结构
        -   `kind` 当前`hover`的分类
        -   `menu`列表中每一个分类对象都有`{type,name,child:{title,child:[xxx,xxx]}}`
-   第一行 第二列 `life`主屏幕
    -   容器及类名`div.m-life`
        -   再分成两行
            -   第一行 3 列(14,4,6)
                -   第一列 `slider`
                -   第二列 `div-m-life-pic`
                -   第三列 `div-m-login`
            -   第二行 4 列(7,7,4,6)
                -   第一列 `div.m-life-hotel`
                -   第二列 `div.m-life-music`
                -   第三列 `div.m-life-coop`
                -   第四列 `div.m-life-downapp`
-   第二行 第一列 `artistic`推荐栏
-   容器及对应类名 :`section.m-istyle`
    -   `dl`
        -   `dd`
    -   容器及对应类名 `ul.ibody`
        -   `li`
            -   `el-card`
                -   `img`
                -   `ul.cbody`
                    -   `li`\*3

### 注册页接口设计

1. 邮箱验证码使用腾讯邮箱
1. `sever`目录
    - dbs
        - models
            - users.js
    - config.js
    - interface
        - users.js
            - signup
            - signin
            - verify
            - exit
            - getUser
        - utils
            - axios.js
            - password.js
1. `config`设置

```js
export default {
    //设置mongodb配置
    dbs:"mongodb://127.0.0.1:27017/student"
    //配置redis
    redis:{
        get host(){
            return "127.0.0.1"
        },
        get port(){
            return 6379
        }
    }
    //配置邮箱smtp服务(注意,需要设置自己邮箱的SMTP服务设置为开启的)
    email:{
        get host(){
            return "smtp.qq.com"
        },
        get user(){
            return "xxxx@qq.com"
        },
        get pass(){
            return "xx"//smtp服务开启时,生成的授权码
        },
        //生成验证码
        get code(){
            return ()=>{
                return Math.random().toString(16).slice(2,6).toUpperCase()
            }
        },
        get expire(){
            return ()+>{
                return new Date().getTime()+60*60*1000
            }
        }
    }
}
```

1. 配置`users.js`model 操作设计表

```js
import mongoose from "mongoose";
//设计表
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
});
//导出模型(表)
export default mongoose.model("User", UserSchema);
```

1. 配置`axios.js`

```js
import axios from "axios";
const instance = axios.create({
    baseUrl: `http;//${process.env.HOST || "localhost"}:${
        process.env.POST
    }||3000`,
    timeout: 1000,
});

export default instance;
```

1. 配置`passport.js`

```js
import passport from "koa-passport";
import localStrategy from "passport-local";
import UserModel from "../../dbs/models/users";

passport.use(
    new LocakStrategy(async function (username, password, done) {
        let where = {
            username,
        };
        //查询用户名信息
        let result = await UserModel.findOne(where);
        if (resut != null) {
            if (result.password === password) {
                return done(null, result);
            } else {
                return donw(null, false, "密码错误");
            }
        } else {
            return done(null, false, "用户不存在");
        }
    })
);

//将用户序列化，存储到session中
passport.serializeUser(function (user, done) {
    done(null.user);
});

//将用户反序列化，将用户的数据从session中提出来
passport.deserializeUser(function (user, donw) {
    return done(null.user);
});

export default passport;
```

1. 配置`users.js`接口

```js
//安装并导入下列三个包

//koa的路由
import Router from "koa-router";
//koa可以直接使用的redis服务
import Redis from "koa-redis";
//处理邮箱之间的通信（在qq上开启smtp服务后，还得装此包)
import nodeMailer from "nodemailer";

//导入user模型
import User from "../dbs/models/users";
import Passport from "./utils/passport";
import Email from "./dbs/config";
import axios from "./utils/axios";

let router = new Router({
    prefix: "/users",
});

let Store = new Redis().client;

//提取用户的注册信息
router.post("/signup", async (ctx) => {
    const { username, password, email, code } = ctx.request.body;

    if (code) {
        //`nodemail：username` 是用来标识的
        const saveCode = await Store.hget(`nodemail:${username}`, "code");
        const saveExpire = await Store.hget(`nodemail:${username}`, "expire");
        //判断时填写的验证码是否正确
        if(code === saveCode){
            if(new Date().getTime()-saveExpire >){
                ctx.body = {
                    code:-1,
                    msg:"验证码已经过期"
                }
                return false
            }
        }else{
             ctx.body = {
                    code:-1,
                    msg:"请填写正确的验证码"
                }
            return
        }
    }else{
        ctx.body = {
            code:-1,
            msg:"请填写验证码"
        }
        return
    }
    //查询表，获取用户信息
    let user = await User.find({username})

    //判断用户名是否已经存在
    if(user.length){
        ctx.body={
            code =-1，
            msg:"用户已存在"
        }
        return
    }

    //新增用户
    let nuser = await User.create({
        username,
        password,
        email
    })

    //新增用户成功后，判断是否能登录
    if(nuser){
        let res = await axios.post("./users/signin",{
            username,
            password
        })
        if(res.data&&res.data.code===0){
            ctx.body={
                code:0,
                msg:"注册成功",
                user:res.data.user
            }
        }else{
            ctx.body={
                code:-1,
                msg:"error"
            }
        }
    }else{
        ctx.body={
            code:-1,
            msg:"注册失败"
        }
    }
});
```
