/**
 * Copyright [yyyy] [name of copyright owner]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
 
/**
 *
 * Send clipboard data to a inputable text container where focus is.
 *
 * @Author xingxiudong.com
 * @Date 2016/11/4
 * @Links https://github.com/node-ffi/node-ffi/issues/141
 * @Links https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms646270(v=vs.85).aspx
 * @Since 1.0
 */
module.exports = function(mill_intervals) {
	var running = false, stoped = false;
	var intervals = mill_intervals || 2000;
	
	console.log("Execute copy clipboard data to input where the foucus is per %s ms", intervals);
	
	var ffi = require ('ffi');
	var ref = require ('ref');
	var struct = require ('ref-struct');
	var ArrayType = require('ref-array')

	var KeybdInput = struct ({
		'type': 'int',
		'wVk': 'short',
		'wScan': 'short',
		'dwFlags': 'int',
		'time': 'int',
		'dwExtraInfo': 'int'
	});

	var KeybdInputPtr = ref.refType(KeybdInput);
	//var KeybdInputArray = ArrayType(KeybdInputPtr, 4);

	var keydownCtrl = new KeybdInput();
	keydownCtrl.type = 1;
	keydownCtrl.wVk = 0x0011;
	keydownCtrl.wScan = 0;
	keydownCtrl.dwFlags = 0x0000;
	keydownCtrl.time = 0;
	keydownCtrl.dwExtraInfo = 0;

	var keyupCtrl = new KeybdInput();
	keyupCtrl.type = 1;
	keyupCtrl.wVk = 0x0011;
	keyupCtrl.wScan = 0;
	keyupCtrl.dwFlags = 0x0002;
	keyupCtrl.time = 0;
	keyupCtrl.dwExtraInfo = 0;

	var keydownV = new KeybdInput();
	keydownV.type = 1;
	keydownV.wVk = 0x0056;
	keydownV.wScan = 0;
	keydownV.dwFlags = 0x0000;
	keydownV.time = 0;
	keydownV.dwExtraInfo = 0;

	var keyupV = new KeybdInput();
	keyupV.type = 1;
	keyupV.wVk = 0x0056;
	keyupV.wScan = 0;
	keyupV.dwFlags = 0x0002;
	keyupV.time = 0;
	keyupV.dwExtraInfo = 0;

	//var ctrlVInputArray = new KeybdInputArray([keydownCtrl, keydownV, keyupV, keyupCtrl]);
	// ctrlVInputArray[0] = keydownCtrl;
	// ctrlVInputArray[1] = keydownV;
	// ctrlVInputArray[2] = keyupV;
	// ctrlVInputArray[3] = keyupCtrl;

	var user32 = ffi.Library ('user32',
		{ 
			'SendInput': [ 'int', [ 'uint', KeybdInputPtr, 'int' ] ]
		}
	);
	
	this.onStart = function(){};
	this.onStop = function(){};
	this.onPause = function(){};
	this.onOnce = function(){};
	
	var _this = this;
	var once = function() {
		if (running) {
			// console.log('============' + new Date().getTime());
			var r1 = user32.SendInput (1, keydownCtrl.ref() , 28);
			// console.log ("ctrl down - " + r1);
			
			var r2 = user32.SendInput (1, keydownV.ref() , 28);
			// console.log ("v down - " + r2);
			
			var r3 = user32.SendInput (1, keyupV.ref() , 28);
			// console.log ("v up - " + r3);
			
			var r4 = user32.SendInput (1, keyupCtrl.ref() , 28);
			// console.log ("ctrl up - " + r4);
			
			console.log("exc ctrl - v")
			_this.onOnce();
		}
		if (stoped) return;
		
		setTimeout(once, intervals);
	};
	once();
	
	/*
	var _intv_id = setInterval(function(){
		alert(intervals)
		if (running) once();
	}, intervals);
	*/
	
	this.start = function() {
		running = true;
		console.log("t2s is started.");
		this.onStart();
	};
	this.restart = function() {
		running = true;
		console.log("t2s is restarted.");
	};
	this.pause = function() {
		running = false;
		console.log("t2s is paused.");
		this.onPause();
	};
	this.stop = function() {
		running = false;
		stoped = true;
		console.log("t2s is stopped.");
		this.onStop();
	};
};