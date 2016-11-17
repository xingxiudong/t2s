// 创建一个剪贴板
var Clipboard = function() {
	var __orig = "";
	// get the system clipboard
	var clipboard = nw.Clipboard.get();
	this.get = function() {
		// Read from clipboard
		return clipboard.get('text');
	};
	this.backup = function() {
		var text = clipboard.get('text');
		__orig = this.get();
	};
	this.set = function(s) {
		clipboard.set(s, 'text');
	};
	this.reset = function() {
		clipboard.set(__orig, 'text');
	};
};

var T2S = function () {
	var clipboard = new Clipboard();
	var T2S = require('t2s');
	var t2s = new T2S(1);
	t2s.start();
	
	t2s.onOnce = function(){
		t2s.pause();
		clipboard.reset();
	};
	
	this.emit = function(s) {
		clipboard.backup();
		clipboard.set(s);
		t2s.restart();
	};
};