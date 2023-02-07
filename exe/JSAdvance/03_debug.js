// console.log('?')

// c = 2;

// if (true) {
// 	var b = 3
// }
// console.log(b) // 3
// console.log(c)

// // console.log(a)

// // 作用域面试题
// //01
// var x = 10

// function fn() {
// 	console.log(x)
// }

// function show(f) {
// 	var x = 20
// 	f()
// }
// fn() // 10
// // 作用域在函数定义时确定，不会在执行上下文时改变

// //02
// var fn = function() {
// 	console.log(fn)
// }
// fn()

// var obj = {
// 	fn2: function() {
// 		console.log(this.fn2)
// 	}
// }
// obj.fn2()

// {

// 变量提升：使用var声明的变量
// 使用let和const声明的变量不会提升
// 当前函数声明和变量声明使用同一个变量名称时，函数的优先级高于变量的优先级, 但赋值操作优先级最高，会覆盖声明类型

// 测试表明：目前js对函数提升做了优化，函数提升取决于是否有调用代码

// 闭包是指有权访问另一个函数作用域中的变量的函数
// 也就是当一个函数访问另一个函数作用域中的变量时产生闭包

// function test() {
if (false) {
	var a = 2 // 无块作用域 a=undefine
}

function fn1() {
	a++ // 产生闭包 a=undefine
	var b = 2

	var fn2 = function() {
		// function fn2() {
		a++ // 不使用变量b时不产生新闭包，可见闭包是为了锁住要访问的变量，a由fn1进行保存，fn2引用闭包使用 
		b++
		console.log(b) // 当使用fn1的变量b时,fn2产生闭包， 且在进入fn2时因为变量提升立即产生闭包
	}
	return fn2
}

var f = fn1()
f() // 3
f() // 4 执行完此句，fn2再无调用，依据调用栈顺序释放fn2 fn1闭包

// b++ // 此处可观察到fn1和fn2的闭包已释放 
// // 且报错“b is not define.”由于js没有块级作用域， 其由花括号封闭的var变量会被自动添加到最接近的环境中。 
// // 因此b的作用域是fn1函数局部环境，⭐️⭐️⭐️a的作用域是test函数局部环境。
// console.log(b)
// }


function fun(n, o) {
	console.log(o)
	return {
		fun: function(m) {
			return fun(m, n)
		}
	}
}

// 始终是a这个闭包，闭包的值没变
var a = fun(0) // undefined
a.fun(1) // 0 产生的新闭包未保存
a.fun(2) // 0 
a.fun(3) // 0

var b = fun(0).fun(1).fun(2).fun(3) // 不断叠加闭包，值递增 undefine, 0, 1, 2
var c = fun(0).fun(1) // 0 保存了叠加闭包 闭包保存的属性n当前值为1
c.fun(2) // 1 产生的新闭包未保存
c.fun(3) // 1

//1. 原型链继承
function Supper() {
	this.supProp = 'super property'
}

function Sub() {
	this.subProp = 'Sub property'
}

Supper.prototype.showSupperProp = function() {
	console.log(this.supProp)
}

// 利用原型链实现继承
// 子类型的原型 = 父类型的一个实例对象
Sub.prototype = new Supper() // 继承父类方法
// 让子类型的原型的constructor指向子类型
Sub.prototype.console = Sub() //修正constructor属性
Sub.prototype.showSubProp = function() {
	console.log(this.subProp)
}

var sub = new Sub()
sub.showSupperProp()
sub.toString()

//2. 借用构造函数继承
function Person(name, age) {
	this.name = name
	this.age = age
}

Person.prototype.setName = function(name) {
	this.name = name
}
// 3. 组合继承
function Student(name, age, price) {
	Person.call(this, name, age) //继承属性
	this.price = price
}

Student.prototype = new Person()
Student.prototype.constructor = Student
Student.prototype.setPrice = function(price) {
	this.price = price
}

var s = new Student('Tom', 24, 15000)
s.setName('Bob')
s.setPrice(13000)
console.log(s.name, s.age, s.price)
