window.addEventListener('load', function() {
    // 获取元素
    var uname = document.querySelector('#uname');
    var qq = document.querySelector('#qq');
    var tel = document.querySelector('#tel');
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd');
    var pwd_sure = document.querySelector('#pwd-sure');
    var safe = document.querySelector('.safe');

    // 待验证的正则表达式
    var reguname = /^[\u4e00-\u9fa5|\w]{2,8}$/;
    var regqq = /^[1-9][0-9]{4,9}$/;
    var regtel = /^1[3|5|7|8]\d{9}$/;
    var regmsg = /^[a-zA-Z0-9]{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;

    // 调用函数进行验证
    regexp(uname, reguname);
    regexp(qq, regqq);
    regexp(tel, regtel);
    // regexp(msg, regmsg);
    regexp(pwd, regpwd);

    // 封装表单验证的函数
    function regexp(ele, reg) {
        ele.addEventListener('focus', function() {
            if (this.value === '') {
                this.nextElementSibling.innerHTML = '请输入相应内容！';
            }
            this.style.borderColor = 'red';
            // this.autocomplete = 'off'; 关闭input输入框的历史记录
        });
        ele.addEventListener('blur', function() {
            if (this.value === '') {
                this.nextElementSibling.innerHTML = '';
            } else if (reg.test(this.value)) {
                this.nextElementSibling.className = 'true';
                this.nextElementSibling.innerHTML = '<i class="true-icon">恭喜您输入正确！</i>';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error-icon">格式不正确，请重新输入！</i>';
            }
            this.style.borderColor = '';
        });
    }

    // 密码强度验证
    pwd.addEventListener('keyup', function() {
        safe.style.display = 'block';
        var Value = this.value;
        // 每次触发之前要将上一次的样式全部清空
        for (var i = 0; i < safe.children.length; i++) {
            safe.children[i].style.backgroundColor = '#bbb';
        }
        if (Value.length >= 6) {
            if (/^\d+$/.test(Value) || /^[a-z]+$/.test(Value) || /^[A-Z]+$/.test(Value)) {
                safe.children[0].style.backgroundColor = '#5f9ea0';
            } else if (/\d/.test(Value) && /[a-z]/.test(Value) && /[A-Z]/.test(Value)) {
                safe.children[2].style.backgroundColor = '#ff4500';
            } else {
                safe.children[1].style.backgroundColor = '#6a5acd';
            }
        }
    });
    pwd.addEventListener('blur', function() {
        safe.style.display = 'none';
    })
    pwd_sure.addEventListener('blur', function() {
        if (pwd.value === '') {
            return;
        } else if (this.value === pwd.value) {
            this.nextElementSibling.className = 'true';
            this.nextElementSibling.innerHTML = '<i class="true-icon">恭喜您输入正确！</i>';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error-icon">两次密码输入不一致，请重新输入！</i>';
        }
    });

    // 点击按钮获取验证码
    var getMsg = document.querySelector('.getMsg');
    var btn = getMsg.querySelector('button');
    var sixMsg = getMsg.querySelector('span');
    var time = 60;
    var timer = null;
    btn.onclick = function() {
        this.disabled = true;
        sixMsg.style.display = 'block';
        sixMsg.style.color = randomColor();
        sixMsg.style.background = randomColor();
        sixMsg.innerHTML = testCode(6);
        timer = setInterval(function() {
            if (time == 0) {
                clearInterval(timer);
                btn.disabled = false;
                btn.innerHTML = '获取验证码';
                sixMsg.style.display = 'none';
                aside.innerHTML = '';
                msg.value = '';
                time = 60;
            } else {
                // 注意点：表单元素中只有按钮是用innerHTML,其余皆是value
                btn.innerHTML = '还剩下' + time + '秒';
                time--;
            }
        }, 1000);
    }

    // 短信验证
    var aside = document.querySelector('#aside');
    msg.addEventListener('focus', function() {
        aside.innerHTML = '请先点击获取验证码！';
        if (sixMsg.innerHTML !== '') {
            aside.innerHTML = '请输入对应的验证码！';
        }
    });
    msg.addEventListener('blur', function() {
        if (sixMsg.innerHTML == '') {
            aside.innerHTML = '';
            return;
        } else if (msg.value === sixMsg.innerHTML) {
            aside.innerHTML = '<i class="true-icon">验证成功！</i>';
        } else {
            aside.innerHTML = '<i class="error-icon">验证失败！</i>'
        }
    });
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            msg.blur();
        }
    });

    // 生成带有大小写字母和数字的验证码 ascall码值: a-z:97-122 A-Z:65-90
    function testCode(n) {
        var arr = [];
        for (var i = 0; i < n; i++) {
            var num = parseInt(Math.random() * 123);
            if (num >= 0 && num <= 9) {
                arr.push(num); // unshift头部插入  pop尾部删除  shift头部删除
            } else if ((num >= 65 && num <= 90) || (num >= 97 && num <= 122)) {
                arr.push(String.fromCharCode(num)); // String.fromCharCode() 将传入的ascll码值转成对应字符
            } else {
                i--; // 消除无用数字的循环
            }
        }
        return arr.join('');
    }

    // 只含有数字的验证码
    function numTestCode(n) {
        var arr = [];
        for (var i = 0; i < n; i++) {
            var num = parseInt(Math.random() * 10);
            arr.unshift(num);
        }
        return arr.join('');
    }

    // 颜色随机函数 rgba()
    function randomColor() {
        var str = 'rgba(' + parseInt(Math.random() * 256) + ', ' + parseInt(Math.random() * 256) + ', ' + parseInt(Math.random() * 256) + ', 1)';
        return str;
    }

    // 获取当前有效样式(外联) 跨浏览器兼容
    function getStyle(node, cssStyle) {
        return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(box)[cssStyle];
    }

    var register_btn = document.querySelector('.btn');
    register_btn.onclick = function(e) {
        if (uname.value == '' || qq.value == '' || tel.value == '' || msg.value == '' || pwd.value == '' || pwd_sure.value == '') {
            alert('以上内容均为必填选项！');
            e.preventDefault();
        } else {
            alert('恭喜你注册成功！快去登录吧');
        }
    }

    function borderColor(ele) {
        ele.onfocus = function() {
            this.style.borderColor = 'red';
        }
        ele.onblur = function() {
            this.style.borderColor = '';
        }
    }
    borderColor(msg);
    borderColor(pwd_sure);

    var eye_toggle = document.querySelector('.eye-toggle');
    var flag = true;
    eye_toggle.onclick = function() {
        if (flag) {
            eye_toggle.src = 'img/eyeopen.png';
            pwd.type = 'text';
            pwd_sure.type = 'text';
            flag = false;
        } else {
            eye_toggle.src = 'img/eyeclose.png';
            pwd.type = 'password';
            pwd_sure.type = 'password';
            flag = true;
        }
    }
})