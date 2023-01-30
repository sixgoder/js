// 获取元素样式
function getStyle(obj, name) {
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		//兼容IE8
		return obj.currentStyle[name];
	}
}

var timer;

// 移动函数
function move(obj, arr, target, speed, callback) {
	clearInterval(obj.timer);

	var oldValue = parseInt(getStyle(obj, arr));
	if (oldValue > target) {
		speed = -speed;
	}

	obj.timer = setInterval(function() {
		var newValue = oldValue + speed;
		oldValue = newValue;

		if ((speed > 0 && newValue >= target) || (speed < 0 && newValue <= target)) {
			newValue = target;
		}

		obj.style[arr] = newValue + "px";
		if (newValue == target) {
			clearInterval(obj.timer);
			callback && callback();
		}
	}, 30);
}

// class样式切换
function toggleClass(obj, name) {
	var reg = new RegExp("\\b" + name + "\\b");
	if (reg.test(obj.className)) {
		obj.className = obj.className.replace(reg, "");
	} else {
		obj.className += " " + name;
	}
}
