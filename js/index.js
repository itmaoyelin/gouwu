window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var left_btn = document.querySelector('.left_btn');
    var right_btn = document.querySelector('.right_btn');

    // 按钮的隐藏与显示,轮播图的播放与清除
    focus.addEventListener('mouseover', function() {
        left_btn.style.display = 'block';
        right_btn.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清除定时器变量，释放内存
    });

    focus.addEventListener('mouseout', function() {
        left_btn.style.display = 'none';
        right_btn.style.display = 'none';
        timer = setInterval(function() {
            right_btn.click();
        }, 3000);
    });

    // 动态生成底部小圆圈,ul下有几个li就有几张图片，几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.bottom_focus');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li'); // 创建li插入到ol中
        li.setAttribute('index', i); // 设置li的索引号index，自定义属性
        ol.appendChild(li);
        // 生成的同时给小圆圈绑定点击事件/鼠标移入
        li.addEventListener('click', function() {
            // 排他思想，被选中的状态
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'selected';
            // 点击小圆圈移动图片（移动的是ul）移动距离=小圆圈的索引号*图片的宽度（负值）
            // 点击了某个li小圆圈,就拿到当前li的索引号
            var index = this.getAttribute('index');
            // 为了解决点击小圆圈和点击按钮同步的问题,需要将当前点击li的索引号给下面的num和circle
            num = circle = index;
            animateX(ul, -index * focusWidth);
        });
    }

    // 默认让第一个被选中
    ol.children[0].className = 'selected';

    // 深克隆第一张图片，不用自己在HTML中修改，也不会多增加小圆圈
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 待尝试：可以使用let关键字声明这几个变量，复用率提高？
    var num = 0; // 点击一次,num自增1,再乘以图片宽度,就是ul的滚动距离
    var circle = 0; // 控制小圆圈的播放
    var flag = true; // 定义flag节流阀,防止轮播图按钮连续点击播放过快
    // 节流阀目的：上一个函数动画执行完毕，再执行下一个，让事件无法连续触发
    // 实现思路：利用回调函数，添加一个变量来控制，锁住和解锁函数

    // 点击右侧按钮，图片滚动
    right_btn.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 无缝滚动：克隆第一张图片放在最后，当滚动到最后一张时，ul快速复原left=0, num重新赋值为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animateX(ul, -num * focusWidth, function() {
                flag = true; // 回调函数，动画执行完毕再打开节流阀
            });
            // 点击右侧按钮,小圆圈跟随变化，但图片有5张，圆圈只有4个
            circle++;
            // 如果circle == 4 说明我们走到最后克隆的图片了，就进行复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });

    // 点击左侧按钮
    left_btn.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                // 这是第一次点击左侧按钮，直接把ul往左拉到最后一张克隆的图片上了
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--; // num--之后变为负数，每点击一次就减一，从-1开始
            animateX(ul, -num * focusWidth, function() {
                flag = true;
            }); // 负负得正，往右拖动ul就实现倒序的效果了
            // 底部小圆圈跟随变化
            /* if (circle == 0) {
                circle = ol.children.length;
            }
            circle--; */
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });

    function circleChange() {
        // 先清除其余的小圆圈的类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前被选中的类名
        ol.children[circle].className = 'selected';
    }

    // 自动播放轮播图，定时器手动调用点击事件
    var timer = setInterval(function() {
        right_btn.click();
    }, 3000);

    // 新品首发轮播图
    var newA = document.querySelector('.newArrival-bd');
    var newAHeight = newA.offsetHeight;
    var top_btn = document.querySelector('.top-btn');
    var bottom_btn = document.querySelector('.bottom-btn');
    newA.onmouseover = function() {
        top_btn.style.display = 'block';
        bottom_btn.style.display = 'block';
        clearInterval(newA_timer);
        timer = null;
    }
    newA.onmouseout = function() {
        top_btn.style.display = 'none';
        bottom_btn.style.display = 'none';
        newA_timer = setInterval(function() {
            bottom_btn.click();
        }, 2500);
    }
    var newA_ul = newA.querySelector('ul');
    var newA_ol = newA.querySelector('ol');
    for (var i = 0; i < newA_ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('key', i);
        newA_ol.appendChild(li);
        li.onmouseover = function() {
            for (var i = 0; i < newA_ol.children.length; i++) {
                newA_ol.children[i].className = '';
            }
            this.className = 'selected';
            var key = this.getAttribute('key');
            n = c = key;
            animateY(newA_ul, -key * newAHeight);
        }
    }
    newA_ol.children[0].className = 'selected';
    var firstli = newA_ul.children[0].cloneNode(true);
    newA_ul.appendChild(firstli);
    // let
    var n = 0,
        c = 0;
    bottom_btn.onclick = function() {
        if (flag) {
            flag = false;
            if (n == newA_ul.children.length - 1) {
                newA_ul.style.top = 0;
                n = 0;
            }
            n++; // 往上拉
            animateY(newA_ul, -n * newAHeight, function() {
                flag = true;
            });
            c++;
            if (c == newA_ol.children.length) {
                c = 0;
            }
            newA_circleChange();
        }
    }
    top_btn.onclick = function() {
        if (flag) {
            flag = false;
            if (n == 0) {
                n = newA_ul.children.length - 1;
                newA_ul.style.top = -n * newAHeight + 'px';
            }
            n--; // 往下拉
            animateY(newA_ul, -n * newAHeight, function() {
                flag = true;
            });
            if (c == 0) {
                c = newA_ol.children.length;
            }
            c--;
            // c = c == 0 ? newA_ol.children.length : c--;
            newA_circleChange();
        }
    }

    function newA_circleChange() {
        for (var i = 0; i < newA_ol.children.length; i++) {
            newA_ol.children[i].className = '';
        }
        newA_ol.children[c].className = 'selected';
    }
    var newA_timer = setInterval(function() {
        bottom_btn.click();
    }, 2500);

    // 电梯直通栏
    var fixed = document.querySelector('.fixed');
    var goback = fixed.querySelector('.goback');
    var recomTop = document.querySelector('.recom').offsetTop;
    var sticky = document.querySelector('.sticky');
    var aside = document.querySelector('.aside');
    // 添加页面滚动事件，当页面滚动到秒杀推荐模块时就显示电梯栏、搜索栏、滑动条 【淡入淡出动画】
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= recomTop) {
            fixed.style.display = 'block';
            sticky.style.display = 'block';
            aside.style.display = 'block';
        } else {
            fixed.style.display = 'none';
            sticky.style.display = 'none';
            aside.style.display = 'none';
        }
        if (window.pageYOffset >= specialTop && window.pageYOffset < likeTop) {
            moveTop_clearStyle();
            moveTops[0].className = 'hover';
        } else if (window.pageYOffset >= likeTop && window.pageYOffset < channelTop) {
            moveTop_clearStyle();
            moveTops[1].className = 'hover';
        } else if (window.pageYOffset >= channelTop && window.pageYOffset < brandTop) {
            moveTop_clearStyle();
            moveTops[2].className = 'hover';
        } else if (window.pageYOffset >= brandTop) {
            moveTop_clearStyle();
            moveTops[3].className = 'hover';
        }
    });
    // 点击返回顶部，让窗口缓慢滚动到页面最上方
    goback.addEventListener('click', function() {
        pageY_animate(window, 0);
    });

    var moveTops = document.querySelectorAll('.moveTop');
    var specialTop = document.querySelector('.special').offsetTop;
    var likeTop = document.querySelector('.like').offsetTop;
    var channelTop = document.querySelector('.channel').offsetTop;
    var brandTop = document.querySelector('.brand').offsetTop;

    function moveTop_clearStyle() {
        for (var i = 0; i < moveTops.length; i++) {
            moveTops[i].className = '';
        }
    }
    for (var i = 0; i < moveTops.length; i++) {
        moveTops[i].onmouseover = function() {
            sticky.style.display = 'none';
        }
        moveTops[i].onmouseout = function() {
            sticky.style.display = 'block';
        };
        // 由于新增了一个固定定位搜索栏，原来通过a链接跳转到模块位置的方式会受到影响。顶部标题部分会被遮挡
        // 所以我想通过页面滚动函数来实现，可是为什么到了位置页面会不停抖动呢？？？
        /* moveTops[2].onclick = function() {
            pageY_animate(window, channelTop);
        };
        moveTops[3].onclick = function() {
            pageY_animate(window, brandTop);
        } */
    }

    // 按下S键光标定位到搜索框内(有bug,在其他输入框内输入也会定位到顶部搜索框内)
    var search = document.querySelector('#in-search');
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 83) {
            search.focus();
        }
    });

    // 鼠标点击切换品优购快报底部图片
    var isActive = true;
    var toggle_img = document.querySelector('#toggle-img')
    toggle_img.addEventListener('click', function() {
        if (isActive) {
            toggle_img.src = 'upload/bargain1.jpg';
            isActive = false;
        } else {
            toggle_img.src = 'upload/bargain.jpg';
            isActive = true;
        }
        toggle_img.onmouseover = function() {
            clearInterval(timer_tg);
            timer_tg = null;
        }
        toggle_img.onmouseout = function() {
            timer_tg = setInterval(function() {
                toggle_img.click();
            }, 2500);
        }
    });
    var timer_tg = setInterval(function() {
        toggle_img.click();
    }, 2500);

    // 今日推荐模块动态倒计时
    // var day = document.querySelector('.day');
    var hour = document.querySelector('.hour');
    var minute = document.querySelector('.minute');
    var second = document.querySelector('.second');
    var inputTime = +new Date('2021/12/31 00:00:00');
    countDown(); // 先调用一次，否则刷新后会有空白再加载出数据
    setInterval(countDown, 1000);

    function countDown() {
        var nowTime = +new Date();
        var times = (inputTime - nowTime) / 1000;
        var d = parseInt(times / 60 / 60 / 24);
        d = d < 10 ? '0' + d : d;
        // day.innerHTML = d;
        var h = parseInt(times / 60 / 60 % 24);
        h = h < 10 ? '0' + h : h;
        hour.innerHTML = h;
        var m = parseInt(times / 60 % 60);
        m = m < 10 ? '0' + m : m;
        minute.innerHTML = m;
        var s = parseInt(times % 60);
        s = s < 10 ? '0' + s : s;
        second.innerHTML = s;
    }

    // 猜你喜欢模块点击刷新
    var renew = document.querySelector('.renew-icon');
    var like_bd = document.querySelector('.like-bd');
    var current = true;
    renew.addEventListener('click', function() {
        if (current) {
            like_bd.children[0].style.display = 'none';
            like_bd.children[1].style.display = 'none';
            like_bd.children[2].style.display = 'flex';
            like_bd.children[3].style.display = 'flex';
            current = false;
        } else {
            like_bd.children[0].style.display = 'flex';
            like_bd.children[1].style.display = 'flex';
            like_bd.children[2].style.display = 'none';
            like_bd.children[3].style.display = 'none';
            current = true;
        }
    });

    // 秒杀抢购模块
    var effect = 1; // 默认效果为scale
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 1000,
        slidesPerView: 5,
        spaceBetween: 40,
        centeredSlides: true,
        watchSlidesProgress: true,
        on: {
            setTranslate: function() {
                slides = this.slides
                for (i = 0; i < slides.length; i++) {
                    slide = slides.eq(i)
                    progress = slides[i].progress
                        // slide.html(progress.toFixed(2)); 看清楚progress是怎么变化的
                    slide.css({ 'opacity': '', 'background': '' });
                    slide.transform(''); //清除样式

                    if (effect == 1) {
                        slide.transform('scale(' + (1 - Math.abs(progress) / 8) + ')');
                    } else if (effect == 2) {
                        slide.css('opacity', (1 - Math.abs(progress) / 6));
                        slide.transform('translate3d(0,' + Math.abs(progress) * 20 + 'px, 0)');
                    } else if (effect == 3) {
                        slide.transform('rotate(' + progress * 30 + 'deg)');
                    } else if (effect == 4) {
                        slide.css('background', 'rgba(' + (255 - Math.abs(progress) * 20) + ',' + (127 + progress * 32) + ',' + Math.abs(progress) * 64 + ')');
                    }

                }
            },
            setTransition: function(transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }
            },
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    pe = document.getElementById('progressEffect');
    pe.onchange = function() {
        effect = this.value
        swiper.update();
    }

    var recom_hd = document.querySelector('.recom_hd');
    var swiper_container = document.querySelector('.swiper-container');
    var button_prev = document.querySelector('.swiper-button-prev');
    var button_next = document.querySelector('.swiper-button-next');
    recom_hd.onmouseover = function() {
        pe.style.display = 'block';
    }
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            pe.style.display = 'none'; // 回车键隐藏
        }
    });
    swiper_container.onmouseover = function() {
        pe.style.display = 'none';
        button_prev.style.display = 'block';
        button_next.style.display = 'block';
        clearInterval(timer_prev);
        timer_prev = null;
    }
    swiper_container.onmouseout = function() {
        button_prev.style.display = 'none';
        button_next.style.display = 'none';
        timer_prev = setInterval(function() {
            button_prev.click();
        }, 3500);
    }
    var timer_prev = setInterval(function() {
        button_prev.click();
    }, 3500);

    // 频道广场模块
    var channel_imgs = document.querySelectorAll('.channel-img');
    for (var i = 0; i < channel_imgs.length; i++) {
        channel_imgs[i].onclick = function() {
            for (var i = 0; i < channel_imgs.length; i++) {
                channel_imgs[i].className = '';
            }
            this.className = 'channel-imgBorder';
        }
    }

    // 每日特价tab栏切换
    var bargain_hds = document.querySelector('.bargain-hd').querySelectorAll('a');
    var bargain_bds = document.querySelectorAll('.bargain-bd');
    tabToggle(bargain_hds, bargain_bds);

    // 排行榜tab栏切换
    var rank_hds = document.querySelector('.rank-hd').querySelectorAll('a');
    var rank_bds = document.querySelectorAll('.rank-bd');
    tabToggle(rank_hds, rank_bds);

    // 精选品牌模块tab栏切换
    var brand_hds = document.querySelector('.brand-hd').querySelectorAll('li');
    var brand_bds = document.querySelectorAll('.brand-bd');
    tabToggle(brand_hds, brand_bds);

    // 封装一个tab栏切换函数(鼠标点击/移入) 注意：tab_hd的样式统一存放在hover类中
    function tabToggle(tab_hds, tab_bds) {
        for (var i = 0; i < tab_hds.length; i++) {
            tab_hds[i].setAttribute('index', i);
            tab_hds[i].onmouseover = function() {
                for (var i = 0; i < tab_hds.length; i++) {
                    tab_hds[i].className = '';
                    tab_bds[i].style.display = 'none';
                }
                this.className = 'hover';
                var index = this.getAttribute('index');
                tab_bds[index].style.display = 'block';
            }
            tab_hds[i].onclick = function() {
                for (var i = 0; i < tab_hds.length; i++) {
                    tab_hds[i].className = '';
                    tab_bds[i].style.display = 'none';
                }
                this.className = 'hover';
                var index = this.getAttribute('index');
                tab_bds[index].style.display = 'block';
            }
        }
    }
})

/* $(document).ready(function() {
    var flag = true;
    var recomTop = $(".recom").offset().top;
    toggleShow();

    function toggleShow() {
        if ($(document).scrollTop >= recomTop) {
            $(".fixed, .sticky, .aside").fadeIn();
        } else {
            $(".fixed, .sticky, .aside").fadeOut();
        }
    }

    $(window).scroll(function() {
        if (flag) {
            $(".floor").each(function(i, domEle) {
                if ($(document).scrollTop() >= $(domEle).offset().top) {
                    $(".moveTop").eq(i).addClass("hover").siblings().removeClass();
                }
            });
        }
    });

    $(".moveTop").on("click", function() {
        flag = false;
        var current = $(".floor").eq($(this).index()).offset().top;
        console.log($(this).index(), current);
        $("body, html").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        $(this).addClass("hover").siblings().removeClass();
    })
}) */