node-t2s
========

> t2s ͨ�� JS ʵ���˽������������������괦���ʺ��������뷨������

# ����

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

# ֱ������

* ffi
* ref-array

# ��װ

```
npm install t2s
```