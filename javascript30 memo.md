### 01 - JavaScript Drum Kit
1. Dom的Classlist属性可以用来增删html的class属性
2.	${}可以拼接字符串 es6特性 如
```
doucument.querySelector(“div[data-key =${}]”) 
```
3.	` Event.propertyName`可以判断当前transitionend监听事件的样式是否是自己想要的样式，如果不是则不进行处理


### 02 - JS + CSS Clock
1.	时钟效果主要靠Date()对象和rotate()样式来实现
2.	记得用transform-origin来保持中心在表盘中心。
3.	可以用transition-timing-function来控制秒针移动效果
4.	box-shadow有5个属性分别为
    - Inset  (可选) Box里面
    - X轴偏移量 px
    - Y轴偏移量 px
    - 发散度  px
    - 发散距离 px
    - 颜色
### 03- CSS Variables
+	Css中fliter的用法：
```
filter: blur(5px); 模糊度
filter: brightness(0.4); 亮度
filter: contrast(200%);  抽象都
filter: drop-shadow(16px 16px 20px blue)  边框阴影 : x ，y ，阴影范围，颜色
filter: grayscale(50%); 灰度
filter: hue-rotate(90deg); 
filter: invert(75%);  色调反转
filter: opacity(25%); 透明度
filter: saturate(30%); 饱和度
filter: sepia(60%);  褐色度
```
+ root伪类，匹配html标签，常用于声明全局的CSS变量  
+	可以用oninput事件来实时获取input为range类型的拖动值
+ elment.style.setProperty(css样式，值) 可以用来修改全局css变量

### 04 - Array Cardio Day 1
1. 数组的用法`  map(callback(item){}) `：返回一个处理过的新数组
2. ` filter(callback(item){}) `：返回一个过滤过的新数组
3. ` sort([callback(a,b)])` ：返回一个排序过的新数组
4. ` reduce(callback(prev,cur,index,array),[init])` ： 返回一个累加值 ，init可以是对象，可以用来统计数值
5. ` str.includes("xx") `相当于contains()的用法，查找字符串中是否有某个字符
6. ` arr.includes(“xx”) `是查找数组中是否有某个元素

### 05 - Flex Panel Gallery
1.	可以给 ` * ，*:after ,*:before { box-sizing ：border-box}`
2.	Flex的收缩也可以用transition来增加动画效果
3.	Cubic-bezier可以制作弹跳效果的动画
4.	100vh就是视窗的高度

### 06 – Type Ahead
1.	Promise对象的用法
```
Promise.prototype.then
Promise.prototype.catch
Promise.prototype.
Promise.all([promise1,promise2])  全部成功才执行
Promise.race([promise1,promise2]) 一个成功就执行
```
2.	全局方法fetch（）的用法，
    1.  Fetch(url) 去请求，然后返回一个promise对象，对象中参数带有response对象，然后想什么操作再用response去操作
3.	数组的fliter map forEach的用法


### 07 - Array Cardio Day 2
1.	` Array.prototype.some(function(){}) `
    - 	返回一个布尔值，只要找到一个满足条件的元素，就返回true
2.	` Array.prototype.every()`
    - 返回一个布尔值，所有的元素都满足条件，才返回true
3.	` Array.prototype,find()`
    - 找第一个满足条件的元素，返回此元素
4.	` Array.prototype.findIndex()`
    - 找第一个满足条件的元素，返回次元素的下标
5.	` Array.prototype.slice(start,end)`
    - 找返回内的元素，返回新数组
6.	` Array.prototype.splice(start,range,replace)`
    - 找元素，然后删除，或者替换，返回删除或者替换的元素，原数组被改变。

### 08 - Fun with HTML5 Canvas
1.	简单的获取滚动条到顶部(左部)的距离：
```
let top = document.documentElement.scrollTop || document.body.scrollTop;
let left = document.documentElement.scrollLeft || document.body.scrollLeft;
```
2.	HSL可以用来方便的制造彩虹色
    - H代表色调，取值为0-360 
    - S为饱和度，取值为0-1
    - L为亮度，取值为0-1
3.	Js中的角度都得用弧度表示，所以180度得用Math.PI
4.	数字先慢慢变大再慢慢变小的逻辑，可以用一个代表方向的flag来帮忙
5.	画布的大小可以在Js中设置等于` window.innerWidth 和 window.innerHeight`

### 09 - Dev Tools Domination
1.	在按 F12 出现的 Chrome 开发工具中，在 Elements 选项卡之中，选择页面的某个标签（以 <p>为例），右键 → Break on → Attributes modifications。即可为该元素添加断点，当它的属性发生改变时，会自动定位到页面代码中的对应行。
2.	关于console调试的一大堆用法
    - Console.log
        - 替换字符 %s
        - 替换整数 %d
        - 替换小数 %f
        - 替换样式%c
    - Console.dir
3.  打印dom元素的属性
    - Console.warn
    - Console.error
    - Console.info
    - Console.table
    - Console.assert()
        -  如果第一个返回false，就以错误的形式打印第二个参数，
    - Console.clear() 也可以用ctrl + L直接清空
    - onsole.group /console.groupCollapsed()
        - 配合console.groupEnd 进行分组
    - Console.time
        - 配合console.timeEnd 进行计时，参数必须保持一样
### 10 - Hold Shift and Check Checkboxes
1.	做一个flag来保存上一个被checked的元素，然后被监听的元素如果是上一个被点击的或者第二次被点击的元素时把默认为false的inbetween的flag弄为! inbetween,如果是true的话，表示此元素在第一个点击和第二个点击的元素中间。


### 11 - Custom Video Player
1.	` Element.getBoundingClientRect() `可以获取当前元素相对于窗口的相对位置和长宽
2.	` clientWitdh 和 clientHeight` 获取元素可视的不包括边框的宽度和高度
3.	` offsetWitdh 和offsetHeight` 获取元素可视的包括边框的宽度和高度
4.	` offsetLeft 和offsetTop` 获取元素到父元素的距离
5.	` scrollWidth 和 scrllHeight` 获取元素的实际的不包括边框的宽度和高度（没有滚动条时等于clientXXX）
6.	` timeupdate`可以用来监听video的currentTime是否被改变了

### 12- Key Sequence Detection
1.	event.key可以监听到物理键盘真实的输出结果
2.	event,.keyCode 已经不推荐使用了
3.	event.code 可以监听到按键的编码
### 13 - Slide in on Scroll
1.	获取滚动条滚动过的距离
```
Document.documentElement.scrollTop || document.body.scrollTop
```
2.	解构赋值获取getBoundClientRect方法返回的对象很方便
3.	Lodash提供了可以降低监视频率的方法，具体源码很牛逼
4.	Undefined 和null都是false ,所以 !undefined 和 !null 都是true

### 14 - JavaScript References VS Copying
1. 对数组和对象的复制都是复制引用。
### 15 – LocalStorage
1. localStorage可以用来存储网页的数据到本地
    - localStorage.setItem()
    - localStorage.getItem()
    - localStorage.clear()
2. 该属性是window的属性，属于web APIs，所以能够直接用。
3. ` event.preventDefault()` 禁用元素的默认事件
4.	用模板字符串${}可以很方便的进行字符串拼接出页面元素
5.	` Event.target.tagName` 可以获取到具体的事件触发的元素的名字。
6.	Label的for属性在dom里是用htmlFor表示。所以需要获取for属性就用，` element.htmlFor`

### 16 - Mouse Move Shadow
1.	利用` var(--xx)`的css变量不用js拼接就改变` text-shadow`的偏移值
2.	` getBoundingClientRect`配合解构赋值特别爽

### 17 - Sort Without Articles
1. 主要是用sort的方法，当return a-b时升序，当b-a时降序
2. `codePointAt` 替代`charcodeAt`方法，能更精准的查找字符
3. 用string的实例方法replace配合正则去替换the an a，然后再排序

### 18- AddingUpTimesWithReduce
1.	利用reduce第二个参数的init值，将其设为对象，可以很好的统计结果，跟map有点类似
2.	利用padStart可以补位

### 19-Webcam Fun 
1. 当两个数值需要到达临界值互换值时，利用Math.min() Math.max(),可以无脑对调两个数值
2. `Navigator.mediaDevices.getUsermedia(constraint)`返回一个`promise`对象
    - 返回的`promise`对象的`then`方法中获得一个`mediaStream`对象，这个对象就是用户的media
    - 将`mediaStream`对象赋值给`video.srcObj`，然后`video.play()`就能够看到用户的摄像头了
    - `canvas`的上下文对象的`drawImage()`第一个参数能够传视频对象，获取当前帧的图像
3. `canvas`上下文对象操作图片主要有下面几个方法
    - `drawImage(img,x,y,width,height)` 获取一个imgData对象，里面包含一个data数组，数组里面是图片所有像素点的rgba
        - x为canvas距离原点的偏移值
        - y为canvas距离原点的偏移值
        - width，height 是该图片显示大小
    - `putImageData(img,x,y)` 将图片放入canvas中
        - x为canvas距离原点的偏移值
        - y为canvas距离原点的偏移值
    - `getImageData(x,y,width,height)` 获取canvas中的图片，一般是接下来对该图片进行像素操作，然后再用`putImageData(img,x,y)`放回去

### 20 - Speech Detection
1.  主要是熟悉`window.SpeechRecognition`的api，可以用来识别语音
```JS
   window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   let recognition = new SpeechRecognition()
```
### 21 - Geolocation
1.  主要是熟悉` navigator.geolocation.getCurrentPosition()`的api。可以用来判断当前地理位置
    - 第一参数：success的回调
        - 唯一参数 `position`对象中的`coords`属性，带有当前位置的各种属性
    - 第二参数：error的回调
    - 第三参数：options的值




