### 边框环绕特效button
1.	用`box-shadow : 0 20px 1px 50px black`  可以制作物体的倒影
    - 5个参数分别为
        - Offset-x
        - Offset-y
        - 阴影的模糊度
        - 阴影的大小
        - 阴影的颜色
2. `	overflow: hidden` 会把阴影也剪切掉，需要设置元素为绝对定位,防止被剪切 

### 霓虹特效button
1. 将动画效果的transition时间设置在悬浮事件上，就可以保证松开按钮也不会返回
2. 制造霓虹特效只需要使用box-shadow:
    - `Box-shadow : 0 0 20px 0 green, 0 0 40px 0 green, 0 0 80px 0 green`
    - 上面代码表示了同时设置了三个阴影，分别是模糊度为20px 40px 80px ,偏移，扩散度都为0的阴影

### sticky滚动特效
1.  添加10个div,每个div都占据页面100vh的长度,十分之一的宽度
2.  滚动条滚动的时候,页面上的10个div就会依次附在页面顶部
3. [sticky属性详情可以看阮一峰](https://www.ruanyifeng.com/blog/2019/11/css-position.html)

### 彩虹旋转圆环转盘
1.  灵活利用`before` 和`after`伪元素
    - 在某个元素中生成小元素可以用before配合绝对定位
        ```css
        xxx::before{
            position:absolute;
            left:30px;
            top:30px;
            right:30px;
            bottom:30px;
        }
        ```
    - 上面代码就生成了离外部元素30px的内部元素,宽高自动设置
2. 设置圆环位置的`z-index :-1 `,其他部分为`z-index:1`产生镂空效果
3. 熟悉简单的liner-gradient属性用法
    ```js
    background-image :liner-gradient(xxxdeg,rgba)
    background-image :liner-gradient(to right,rgba)
    background-image :liner-gradient(rgba,rgba,rgba) //相当于180deg
     background-image :liner-gradient(rgba 30%,rgba 70%,rgba 100%) 
    ```
