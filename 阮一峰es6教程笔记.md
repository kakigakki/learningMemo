## 顶层对象
1.	浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
2.	浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
3.	Node 里面，顶层对象是global，但其他环境都不支持。
4.	综上原因 ：ES2020 在语言标准的层面，引入globalThis作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的this。

## 变量的解构赋值
1.	用途：
    ### 交换变量的值
    ```js
    let x = 1;
    let y = 2;
    [x, y] = [y, x];
    //上面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。
    ```
    ### 从函数返回多个值
    ``` js
         // 返回一个数组
        function example() {
        return [1, 2, 3];
        }
        let [a, b, c] = example();
        // 返回一个对象

        function example() {
        return {
            foo: 1,
            bar: 2
        };
        }
        let { foo, bar } = example();
    ```
    ### 函数参数的定义 
    ``` js
    // 参数是一组有次序的值
    function f([x, y, z]) { ... }
    f([1, 2, 3]);

    // 参数是一组无次序的值
    function f({x, y, z}) { ... }
    f({z: 3, y: 2, x: 1});
    ```
    ### 提取 JSON 数据
    ```js
    let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
    };

    let { id, status, data: number } = jsonData;

    console.log(id, status, number);
    // 42, "OK", [867, 5309]
    ```
    ### 函数参数的默认值
    ```js
    jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
    } = {}) {
    // ... do stuff
    };
    ```
    ### 遍历 Map 结构
    ```js
    const map = new Map();
    map.set('first', 'hello');
    map.set('second', 'world');

    for (let [key, value] of map) {
    console.log(key + " is " + value);
    }
    // first is hello
    // second is world
    ```
    任何部署了 Iterator 接口的对象，都可以for...of循环遍历。Map 结构原生支持Iterator 接口，配合变量的解构赋值，获键名和键值就非常方便。

    ### 输入模块的指定方法
    ```js
    const { SourceMapConsumer, SourceNode } = require("source-map");
    ```
## 字符串的拓展
1.	ES6 加强了对 Unicode 的支持，允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。
    - 此方法无法表示码点大于\uFFFF的字符，表示大于ffff的需要拆成两个字节，或者用大括号括起来表示。如
    ```js
        \u20BB7 = \u{20BB7}
        \ u20BB7 =\uD842\uDFB7
    ```
2.	字符串的for of遍历器，能遍历码点。自动识别是四个字节还是两个字节
    - For of是用来判断一个字符是四个字节还是两个字节最简单的方法 
    ```js
        let text = String.fromCodePoint(0x20BB7);
        for (let i = 0; i < text.length; i++) {
        console.log(text[i]);
        }
        // " "
        // " "

        for (let i of text) {
        console.log(i);
        }
        // "𠮷"
    ```
3. JavaScript 规定有5个字符，不能在字符串里面直接使用，只能使用转义形式。
    ```js
    U+005C：反斜杠（reverse solidus)
    U+000D：回车（carriage return）
    U+2028：行分隔符（line separator）
    U+2029：段分隔符（paragraph separator）
    U+000A：换行符（line feed）
    ```
    - 但是json.parse()解析时，允许u+2028 u+2029 直接使用，不需要进行转义，所以可能会报错，
    - 为了解决这个问题：ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）
##字符串的新增方法
1.	` String.fromCodePoint` : 因为fromcharcode不能返回大于16bits的字符，所以加入了这个方法
2.	`String.raw() `该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法
    - 该方法可以使用标签函数
    ```js
    String.raw`Hi\n${2+3}!`
    // 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

    String.raw`Hi\u000A!`;
    // 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"
    ```	 
3. ` String.prototype.codePointAt()` 能处理四个字节的码点，弥补charCodeAt ()的不足
    - codePointAt()方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString(16)方法转换一下。
4.	实例方法：` includes(), startsWith(), endsWith()`
    - 这三种方法都能提供第二个参数n 
    - Includes startsWitdh 表示从n的位置开始判断
    - endsWith表示针对字符串中的前n个字符进行判断
    - 这三种方法都返回布尔值
5.	实例方法：` repeat()`
    - 表示将字符串重复n次，创建新的字符串返回。
    - 如果是小数，会向下取整
    - 如果是负数或者nan会报错
6.	实例方法： ` padStart()  padEnd()`
    - 接受两个参数
    - 需要补全到的长度
    - 需要用来补全的字符串
    - 如果第二个参数省略，那么默认用空格补全
    - 用途：
        - 为数值补全指定位数 
        ```js
         '1'.padStart(10, '0') // "0000000001"
        '12'.padStart(10, '0') // "0000000012"
        '123456'.padStart(10, '0') // "0000123456"       
        ```
        - 提示字符串格式
        ```js
        '12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
        '09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
        ```
7.	实例方法：` trimStart()  trimEnd()`
    - 用法与trim()类似，对空格，换行，制表符，都有效
8.	实例方法：` matchAll()`
    - 返回正则表达式的所有匹配的结果，match()的拓展

## 正则表达式的扩展
### u修饰符
1.  加上u修饰符时，含义为“Unicode 模式”，用来正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码。
    ```js
    /^\uD83D/u.test('\uD83D\uDC2A') // false
    /^\uD83D/.test('\uD83D\uDC2A') // true
    ```

2.  一旦加上u修饰符，很多表达式的效果会相应改变。
3.  实例属性 ： regExp.unicode
    - 能正确判断该正则表达式是否加了u修饰符，加了返回true。
### y修饰符
1.  y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义
2.  实例属性：regExp.sticky
    -  能证券判断该正则表达式是否加了y修饰符，加了返回true
### 实例属性 ： regExp.flags

1.  返回所有存在的修饰符
### 实例属性 ： regExp.source 
1.  返回正则表达式本身内容
### s修饰符
1.  正则表达式中. 代表一切字符，但是不能匹配换行符(/n)，回车符（/r）,行分隔符（line separator），段分隔符（paragraph separator）
2.  所以es2018出了s修饰符，让.也能匹配这些字符
3.  实例属性 ： regExp.dotAll 
    - 返回是否存在s修饰符
### 实例属性 ： string.mathAll()
1.  可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。
2.  可以通过for of 或者…运算符或者Array.from()变成数组

## 数组的扩展
1.  0b表示二进制  0o表示八进制  0x表示十六进制
2.  如果需要转成十进制只需要用` Number(0b111)`
3. ` Number.isfinity(num)` 判断是否是有限数值，如果类型不是数值，一律false
4. ` Number.isNaN(num)` 判断是否是NaN，如果类型不是NaN，一律false
    - 上面两种方法与全局的同名方法的区别是直接对数值进行判断
    - 传统的全局方法会将参数隐性转换为数值，即调用一次Number（）然后再判断。
        ```js
        isFinite(25) // true
        isFinite("25") // true
        Number.isFinite(25) // true
        Number.isFinite("25") // false

        isNaN(NaN) // true
        isNaN("NaN") // true
        Number.isNaN(NaN) // true
        Number.isNaN("NaN") // false
        Number.isNaN(1) // false
        ```
5. ` Number.parseInt === parseInt // true ` 完全一样，规范化
6. ` Number.parseFloat === parseFloat // true`  完全一样，规范化
7.	` Number.isInteger` 判断是否为整数，小数点后如果是0也是返回True，
    - 不是数值，一律flase
    - 精度需求很高的，位数很多的数，不建议使用
8. ` Number .isSafeInteger()`
    - Javascript中的整数范围为-2的53次方到2的53次方
     ```js
     Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
    // true
    Number.MAX_SAFE_INTEGER === 9007199254740991
    // true

    Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
    // true
    Number.MIN_SAFE_INTEGER === -9007199254740991
    // true
     ```
    - 此函数就是用来判断一个数是否在这个范围内
### 新的数据类型BigInt
1.  BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示。
2.  为了与number区别，bigint必须使用n结尾
3.  JavaScript 原生提供BigInt对象，可以用作构造函数生成 BigInt 类型的数值。转换规则基本与Number()一致，将其他类型的值转为 BigInt。
    ```JS
    BigInt(123) // 123n
    BigInt('123') // 123n
    BigInt(false) // 0n
    BigInt(true) // 1n
    ``` 
4.  BigInt()构造函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。
    ```JS
    new BigInt() // TypeError
    BigInt(undefined) //TypeError
    BigInt(null) // TypeError
    BigInt('123n') // SyntaxError
    BigInt('abc') // SyntaxError
    ``` 
    - 上面代码中，尤其值得注意字符串123n无法解析成 Number 类型，所以会报错。

    - 参数如果是小数，也会报错。

## 函数的扩展
### 函数参数可以指定默认值
1.  配合解构赋值使用，尤其好用
    ```JS
    function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
    console.log(method);
    }

    fetch('http://example.com')
    // "GET"
    ```
    - 上面代码中，函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET。
2.  利用默认值可以给参数创造必须赋值的条件
    ```JS
    function throwIfMissing() {
    throw new Error('Missing parameter');
    }

    function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
    }

    foo()
    // Error: Missing parameter
    ```
    - 以上代码可以看出函数的默认值不是在函数定义的时候执行的，还是在函数调用的时候执行。
### 函数的rest参数
1. ` function xxx(…value)` …value就是数组参数
    - Rest参数是真正的数组，能使用数组的方法，而arguments是伪数组
2.  Rest参数后面不能有其他参数，否则会报错
### 箭头函数
1. 箭头函数没有自己的this，所以箭头的this跟它所在的普通函数的this是同一个
2. 即，箭头函数的this,指向定义时所在的对象，而不是运行时所在的对象
3. 除了没有this.箭头函数也没有arguments, super , new target
    - 想用arguments,可以用rest函数替代
4. 箭头函数不适用的场所
    - 直接在对象内定义，如
        ```js
        const cat = {
            lives: 9,
            jumps: () => {
                this.lives--;
            }
        }
        ```
        -   上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。
    - 需要利用动态this的时候
        ```js
        var button = document.getElementById('press');
        button.addEventListener('click', () => {
        this.classList.toggle('on');
        });
        ```
    - 复杂的函数体的时候，用普通函数的可读性高
## 数组的扩展
### 扩展运算符 ： …arr
1.	虽然与rest参数很像，但是有点像rest参数的逆运算
2. Rest参数是将多个值封装成数组，传入参数
3. …arr是将数组遍历成多个值（底层用的是iterator）
4. 扩展运算符的应用
    - 复制数组：
        ```js
        const a1 = [1, 2];
        const a2 = a1;

        a2[0] = 2;
        a1 // [2, 2]
        ```
        - 此方法并不是复制引用，而是指向新的数组引用。
    - 合并数组
        ```js
        const arr1 = ['a', 'b'];
        const arr2 = ['c'];
        const arr3 = ['d', 'e'];

        // ES5 的合并数组
        arr1.concat(arr2, arr3);
        // [ 'a', 'b', 'c', 'd', 'e' ]

        // ES6 的合并数组
        [...arr1, ...arr2, ...arr3]
        // [ 'a', 'b', 'c', 'd', 'e' ]
        ```
    - 与解构赋值结合
        ```js
        const [first, ...rest] = [1, 2, 3, 4, 5];
        first // 1
        rest  // [2, 3, 4, 5]

        const [first, ...rest] = [];
        first // undefined
        rest  // []

        const [first, ...rest] = ["foo"];
        first  // "foo"
        rest   // []
        ```
    - 与字符串一起用
        ```js
        [...'hello']
        // [ "h", "e", "l", "l", "o" ]
        ```
        - 此方法解体字符串，有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。
    - 实现了iterator接口的对象可以直接转换为数组
        ```JS
        let nodeList = document.querySelectorAll('div');
        let array = [...nodeList];
        ```
### Array.from()
1.	可以将两类对象转换为真正的数组
    - 类数组对象（具有length属性的对象）
        - Nodelist集合
        - Arguments对象
    - 可遍历对象
2.  该方法可以接受第二个参数（函数），作用类似与数组的map方法，用来对每个元素进行处理，然后再放回数组
    ```JS
    Array.from(arrayLike, x => x * x);
    // 等同于
    Array.from(arrayLike).map(x => x * x);

    Array.from([1, 2, 3], (x) => x * x)
    // [1, 4, 9]
    ```
### Array.of()
1.	将一串数值封装成数组
2.	此方法可以完全替代构造函数调用
### 实例方法：` array.find()  array.findIndex() `
1.  遍历数组寻找第一个符合条件的值，然后返回这个值或者索引
2. 可以传第二个参数，指定一个对象，回调函数中的this将指向这个对象

### 实例方法 ： ` array.keys()   array.values()   array.entries()`

1.  用于遍历数组。它们都返回一个遍历器对象
2.  可以用` for...of`循环进行遍历
    - ` keys()`是对键名的遍历
    - ` values()`是对键值的遍历
    - ` entries()`是对键值对的遍历
    ```JS
    for (let index of ['a', 'b'].keys()) {
    console.log(index);
    }
    // 0
    // 1
    for (let elem of ['a', 'b'].values()) {
    console.log(elem);
    }
    // 'a'
    // 'b'
    for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
    }
    // 0 "a"
    // 1 "b"
    ```
3.  如果不使用for...of循环，可以手动调用遍历器对象的next方法，进行遍历。
    ```JS
    let letter = ['a', 'b', 'c'];
    let entries = letter.entries();
    console.log(entries.next().value); // [0, 'a']
    console.log(entries.next().value); // [1, 'b']
    console.log(entries.next().value); // [2, 'c']
    ```
## 对象的扩展
### 属性的可枚举性和遍历
1.	对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。` Object.getOwnPropertyDescriptor`方法可以获取该属性的描述对象。
2.  描述对象的` enumerable`属性，为“可枚举性”，如果该属性为false，则下面操作会忽略当前属性
3.  **目前，有四个操作会忽略enumerable为false的属性。**
    - ` for...in`循环：只遍历对象自身的和继承的可枚举的属性。
    - ` Object.keys()`：返回对象自身的所有可枚举的属性的键名。
    - `JSON.stringify()`：只串行化对象自身的可枚举的属性。
    - `Object.assign()`： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
3.  ES6 规定，所有 Class 的原型的方法都是不可枚举的。
    ```JS
    Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
    // false
    ```
### 属性的遍历
1. ES6 一共有 5 种方法可以遍历对象的属性。
    - ` for...in`循环遍历对象自身的和继承的可枚举属性
    - `Object.keys(obj)`返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
    - `Object.getOwnPropertyNames(obj)`返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
    - `Object.getOwnPropertySymbols(obj)`返回一个数组，包含对象自身的所有 Symbol 属性的键名。
    - `Reflect.ownKeys(obj)`返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
### Super关键字
1.	指向当前对象的原型对象
2.	只能用在es6的对象中的简写方法中
3.	下面情况都会报错
    ```js
    // 报错
    const obj = {
    foo: super.foo
    }

    // 报错
    const obj = {
    foo: () => super.foo
    }

    // 报错
    const obj = {
    foo: function () {
        return super.foo
    }
    }
    ```
### 对象的扩展运算符
1.	解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。
    ```js
    function baseFunction({ a, b }) {
    // ...
    }
    function wrapperFunction({ x, y, ...restConfig }) {
    // 使用 x 和 y 参数进行操作
    // 其余参数传给原始函数
    return baseFunction(restConfig);
    }
    ```
2.	对象的扩展运算符等同于使用Object.assign()方法。
    ```js
    let aClone = { ...a };
    // 等同于
    let aClone = Object.assign({}, a);
    ```
3.  上面的例子只是拷贝了对象实例的属性，如果想完整克隆一个对象，还拷贝对象原型的属性，可以采用下面的写法。
    ```js
    // 写法一
    const clone1 = {
    __proto__: Object.getPrototypeOf(obj),
    ...obj
    };

    // 写法二
    const clone2 = Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
    obj
    );

    // 写法三
    const clone3 = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
    )
    ```
4. 注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

### 链判断运算符，NULL判断运算符
1. 链判断运算符解决了每次需要判断一个对象是否存在，如果存在才去拿它的值的繁琐过程（通常用三元运算符或者||来判断）
2. 链判断运算符有三种用法。
    ```js
    obj?.prop // 对象属性
    obj?.[expr] // 同上
    func?.(...args) // 函数或对象方法的调用
    ```
3. 链判断运算符常见的使用形式
    ```js
    a?.b
    // 等同于
    a == null ? undefined : a.b

    a?.[x]
    // 等同于
    a == null ? undefined : a[x]

    a?.b()
    // 等同于
    a == null ? undefined : a.b()

    a?.()
    // 等同于
    a == null ? undefined : a()
    ```
4. ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符左侧的值为null或undefined时，才会返回右侧的值。
    ```js
    const headerText = response.settings.headerText ?? 'Hello, world!';
    const animationDuration = response.settings.animationDuration ?? 300;
    const showSplashScreen = response.settings.showSplashScreen ?? true;
    ```
    - 上面代码中，默认值只有在属性值为null或undefined时，才会生效。
5. Null 判断运算符的一个目的，就是跟链判断运算符?.配合使用，为null或undefined的值设置默认值。
    ```js
    const animationDuration = response.settings?.animationDuration ?? 300;
    ```
    - 上面代码中，response.settings如果是null或undefined，就会返回默认值300。
6. Null 判断运算符很适合判断函数参数是否赋值
    ```js
    function Component(props) {
    const enable = props.enabled ?? true;
    // …
    }
    ```
    - 上面代码判断props参数的enabled属性是否赋值，

## 对象的新增方法

### Object.is()
1. 严格比较两个值,与`===`基本相同,下面两点不同
    ```js
    +0 === -0 //true
    NaN === NaN //false

    Object.is(+0,-0) //false
    Object.is(NaN,NaN) //true
    ```
### Object.assin(target,source1,source2...) 
1. `undefined` `null`无法转成对象,所以如果传入参数,会报错
2. 只拷贝源对象的本身的属性(不包括原型属性),也不拷贝不可枚举的属性(`enumerable:false`)
3. `Symbol`也会被拷贝
4. 常见用途:
    - 为对象添加属性
        ```js
        class Person{
            constructor(name,age){
                Object.assign(this,{name,age})
                /* 相当于
                this.name = name
                this.age = age
                 */
            }
        }
        ```
    - 为对象添加方法,可直接将若干个方法放到大括号中,`assign`给`target`
    - 克隆对象(普通)
        ```js
        Object.assign({},origin)
        ```
    - 克隆对象(下面为继承的对象一起克隆的代码)
        ```js
        let protoObejct = Object.getPrototypeOf(sourceObject)
        Object.assign(Obejct.create(originProto),origin)
        ```
    - 合并多个对象
    - 为属性指定默认值
        ```js
        Obejct.assign({},DEFAULT,options)
        ```
### Obejct.getOwnPropertyDescriptors()
1. 返回指定对象的所有自身属性及其描述
2. `Object.getOwnPropertyDescriptor()`返回**某个**属性`descriptor`对象
3. 此方法带`s`的,返回**所有**属性的

### __proto__属性的拓展
1. Object.setPrototypeOf()
2. Object.getPrototypeOf()
3. Object.create()

### Object.keys(obj) Object.values(obj) Object.entries(obj)
1. 返回的都是数组.都是只有对象自身的可遍历属性
2. 

### Object.fromEnries()
1. 主要用于将map结构转为对象,为`Object.entries`的逆向操作
2. 配合`URLSearchParams`对象,可以将查询字符串转为对象
    ```js
    Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
    //{foo:bar,baz:qux}
    ```


