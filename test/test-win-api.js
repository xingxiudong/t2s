var FFI = require('ffi'),
    ref = require('ref'),
    Struct = require('ref-struct');

/* First, create the necessary data structures that'll be used
   by our windows api calls. */

var pointStruct = Struct({
  'x': 'long',
  'y': 'long'
});

var msgStruct = Struct({
  'hwnd': 'int32',
  'message': 'int32', 
  'wParam': 'int32', 
  'lParam': 'int32', 
  'time': 'int32', 
  'pt': pointStruct
});

var msgStructPtr = ref.refType(msgStruct);

/* Second, register the functions we'd like to use by providing
   their method signatures. */

var user32 = new FFI.Library('user32', {

  'RegisterHotKey': [ 
    'bool', ['int32', 'int', 'int32', 'int32'] 
  ],

  'GetMessageA': [ 
    'bool', [msgStructPtr, 'int32', 'int32', 'int32'] 
  ]

});
  /* You may prefer to use PeekMessageA which has the same
     signature as GetMessageA, but is non-blocking. I haven't
     tested it, though.

});

/* Third, register your hotkeys. I wanted to control a media player,
   so these keys reflect that. */

var ALT = 0x0001,
    CTRL = 0x0002,
    SHIFT = 0x0004;

var MEDIA_NEXT = 0xB0,
    MEDIA_PREV = 0xB1,
    MEDIA_STOP = 0xB2,
    MEDIA_PLAY_PAUSE = 0xB3,
    MEDIA_LAUNCH = 0xB5;

var PERIOD = 0xBE,
    COMMA = 0xBC,
    EQUAL = 0xBB,
    DIVIDE = 0xBF,
    SQUOTE = 0xDE,
    PAGEUP = 0x21,
    PAGEDOWN = 0x22;

registrations = [];
registrations.push(user32.RegisterHotKey(0, 1, 0, MEDIA_NEXT));
registrations.push(user32.RegisterHotKey(0, 1, 0, MEDIA_PREV));
registrations.push(user32.RegisterHotKey(0, 1, 0, MEDIA_STOP));
registrations.push(user32.RegisterHotKey(0, 1, 0, MEDIA_PLAY_PAUSE));
registrations.push(user32.RegisterHotKey(0, 1, 0, MEDIA_LAUNCH));
registrations.push(user32.RegisterHotKey(0, 1, CTRL, PERIOD));
registrations.push(user32.RegisterHotKey(0, 1, CTRL, COMMA));
registrations.push(user32.RegisterHotKey(0, 1, CTRL, EQUAL));
registrations.push(user32.RegisterHotKey(0, 1, CTRL, DIVIDE));
registrations.push(user32.RegisterHotKey(0, 1, CTRL | ALT, PAGEUP));
registrations.push(user32.RegisterHotKey(0, 1, CTRL | ALT, PAGEDOWN));

// an array of booleans telling us which registrations failed/succeeded
console.log(registrations);

/* Fourth, wait for new hotkey events from the message queue. */

var myMsg = new msgStruct;
while (user32.GetMessageA(myMsg.ref(), 0, 0, 0)) {
    var key = myMsg.lParam >> 16;
    switch (key) {
        case MEDIA_NEXT: console.log('media next'); break;
        case MEDIA_PREV: console.log('media prev'); break;
        case MEDIA_STOP: console.log('media stop'); break;
        case MEDIA_PLAY_PAUSE: console.log('media play/pause'); break;
        case MEDIA_LAUNCH: console.log('media launch'); break;
        case PERIOD: console.log('next'); break;
        case COMMA: console.log('previous'); break;
        case EQUAL: console.log('play/pause'); break;
        case DIVIDE: console.log('info'); break;
        case PAGEUP: console.log('volume up'); break;
        case PAGEDOWN: console.log('volume down'); break;
        default: console.log('undefined hotkey', key, key.toString(16));
    }
}