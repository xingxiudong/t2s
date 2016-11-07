var ffi = require ('ffi');
var ref = require ('ref');
var struct = require ('ref-struct');

var MouseInput = struct ({
    'type': 'int',
    'dx': 'long',
    'dy': 'long',
    'mouseData': 'int',
    'dwFlags': 'int',
    'time': 'int',
    'dwExtraInfo': 'int'
})
var MouseInputPtr = ref.refType(MouseInput);
var mouseInput = new MouseInput();
mouseInput.type = 0;
mouseInput.dx = 0;
mouseInput.dy = 0;
mouseInput.dwFlags = 0x0002;
mouseInput.mouseData = 0;
mouseInput.time = 0;
mouseInput.dwExtraInfo = 0;

var user32 = ffi.Library ('user32',
    { 'SendInput': [ 'int', [ 'uint', MouseInputPtr, 'int' ] ] });

var r = user32.SendInput (1, mouseInput.ref() , 28);
console.log (r);