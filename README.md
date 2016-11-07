node-t2s
========

> t2s 通过 JS 实现了将剪贴板内容输出到光标处。适合语音输入法场景。

# 例子

``` javascript
var T2S = require('../lib/t2s')

var t2s = new T2S(300);
t2s.start();

setTimeout(function(){
	t2s.pause();
}, 10000);

setTimeout(function(){
	t2s.stop();
}, 13000);
```

# 直接依赖

* ffi
* ref-array

# 安装

```
npm install t2s
```