var ref = require('ref')
var ArrayType = require('ref-array')

// typedef
var int = ref.types.int

// define the "int[]" type
var IntArray = ArrayType(int)

// now we can create array instances; the constructor takes the same arguments
// the native JS Array class

var a = new IntArray(5) // by length
a.length // 5
a[0] = 0
a[1] = 1
a[2] = -1
a[3] = 2
a[4] = -2

var b = new IntArray([1, 2, 3, 4, 5]) // with an existing Array
b.length // 5
b[0] // 1
b[1] // 2
b[2] // 3
b[3] // 4
b[4] // 5

console.log(b)