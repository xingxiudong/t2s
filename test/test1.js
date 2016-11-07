var ffi = require('ffi');

var Test_dll = ffi.Library('E:/t2s/Test', {
  'sum': [ 'int', [ 'int', 'int' ] ]
});
console.log(Test_dll.sum(1 , 5));