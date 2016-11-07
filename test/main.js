var T2S = require('../lib/t2s')

var t2s = new T2S(300);
t2s.start();

setTimeout(function(){
	t2s.pause();
}, 10000);

setTimeout(function(){
	t2s.stop();
}, 13000);