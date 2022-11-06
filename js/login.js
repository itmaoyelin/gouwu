window.addEventListener('load', function() {
    var user = document.querySelector('.user');
    var pwd = document.querySelector('.pwd');
    var eyeImg = document.querySelector('.eye-img')
    var remember = document.querySelector('#sel');

    // tab栏切换(默认选中账号登录)
    var lis = document.querySelector('.tab-nav').children;
    var forms = document.querySelector('.tab-content').children;
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].onclick = function() {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
                forms[i].style.display = 'none';
            }
            this.className = 'active';
            var index = this.getAttribute('index');
            forms[index].style.display = 'block';
        }
    }

    // 显示隐藏密码
    var flag = 0;
    eyeImg.addEventListener('click', function() {
        if (flag == 0) {
            eyeImg.src = 'img/eyeopen.png';
            pwd.type = 'text';
            flag++;
        } else {
            eyeImg.src = 'img/eyeclose.png';
            pwd.type = 'password';
            flag--;
        }
    });

    // 记住用户名和密码
    remember.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('username', user.value);
            localStorage.setItem('password', pwd.value);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }
    });
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
        user.value = localStorage.getItem('username');
        pwd.value = localStorage.getItem('password');
        remember.checked = true;
    }

    var login_btn = document.querySelector('.login-btn');
    login_btn.onclick = function(e) {
        if (user.value == '' || pwd.value == '') {
            alert('用户名/密码不能为空！');
            e.preventDefault(); // 阻止默认行为，防止链接跳转
        } else if (user.value == '1553019969@qq.com' && pwd.value == '123456789') {
            alert('恭喜，登录成功！');
        } else {
            alert('用户名/密码输入有误，请重新输入！');
            e.preventDefault();
        }
    }
})