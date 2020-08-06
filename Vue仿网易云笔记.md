# Vue Music 笔记

## 1

-   脚手架安装
-   配置`stylus-loader`,`stylus`
-   配置 webpack 的别名

## 2 header ,tabbar

-   包:
    -   `babel-runtime` 转译 es6
    -   `fastclick`: 解决移动端 300ms 点击延迟
    -   `babel-polyfill`:转译 es6

## 3 推荐页面

-   npm 安装 jsonp
-   使用 promise 和 jsonp 包 封装 自己的 jsonp
-   用抓取 qq 音乐的 api
-   抓取 api 的文件全部放在 api 文件夹中
-   用`beter-scroll`实现轮播图

## 4 歌手页面

-   每个歌手信息的封装思想
-   顶部标题吸附效果以及偏移效果的实现
-   手动实现字母栏快速入口
-   `better-scroll`的事件使用
-   `touchstart`和`touchmove`事件的使用

## 5 歌手详情页面

-   图片,图层,背景层之间的层级,以及视觉上效果的利用
-   巧妙利用 absolute 和 relative 之间的布局使滚动条能够像原生 APP 一样流畅
-   用 js 封装 css 的前缀,在操作 dom 的时候就不用一个个浏览器供应商的加样式了
-   或许播放歌曲的 url 是本章节的难点
