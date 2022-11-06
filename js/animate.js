// 页面垂直距离移动到顶部缓动动画函数 pageY_animate
function pageY_animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (window.pageYOffset == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        window.scroll(0, window.pageYOffset + step);
    }, 15);
}

// 元素横向距离移动缓动动画函数 animateX
function animateX(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10; // n=1(可省略）不想轮播图过渡时有上一张图片的残影，直接一步到位
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}

// 元素纵向距离移动缓动动画函数 animateY
function animateY(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetTop) / 10; // offsetTop/left为距离最近一级带有定位父元素的距离
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetTop == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.top = obj.offsetTop + step + 'px';
    }, 15);
}