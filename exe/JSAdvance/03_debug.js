console.log('?')

c = 2;

if (true) {
	var b = 3
}
console.log(b)
console.log(c)

// console.log(a)

// 作用域面试题
//01
var x = 10

function fn() {
	console.log(x)
}

function show(f) {
	var x = 20
	f()
}
fn() // 10
// 作用域在函数定义时确定，不会在执行上下文时改变

//02
var fn = function() {
	console.log(fn)
}
fn()

var obj = {
	fn2: function() {
		console.log(fn2)
	}
}
obj.fn2()
