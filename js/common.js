 window.addEventListener('load', function() {
     // 顶部快捷导航下拉菜单
     //  注意：下拉菜单必须写在触发其显示/隐藏的元素中，成为其子元素才可；否则下拉部分无法点击到，鼠标移出后便消失了
     var down_menu = document.querySelector('.down-menu');
     var menu_lis = down_menu.children;
     for (let i = 0; i < menu_lis.length; i++) {
         menu_lis[i].onmouseenter = function() {
             this.children[1].style.display = 'block';
         }
         menu_lis[i].onmouseleave = function() {
             this.children[1].style.display = 'none';
             // 这里会报错！Cannot read property 'style' of undefined. (why?)
         }
     }
     // 地址定位
     var location = document.querySelector('.location-icon');
     var dds = document.querySelector('.city').querySelectorAll('dd');
     for (var i = 0; i < dds.length; i++) {
         dds[i].onclick = function() {
             for (var i = 0; i < dds.length; i++) {
                 dds[i].className = '';
             }
             this.className = 'checked';
             location.innerHTML = this.innerHTML;
         }
     }

     var search = document.querySelector('#in-search');
     search.style.color = '#666';
     search.onfocus = function() {
         if (this.value == '手机') {
             this.value = '';
         }
     };
     search.onblur = function() {
         if (this.value == '') {
             this.value = '手机';
         }
     };

     // 广告栏图片随机与关闭
     var banner = document.querySelector('.banner');
     var random_a = document.querySelector('.random-a');
     var random_img = document.querySelector('.random-img');
     var linkArr = [{
         img_src: 'upload/banner1.jpg',
         a_href: 'https://jiadian.jd.com/'
     }, {
         img_src: 'upload/banner2.jpg',
         a_href: 'https://mall.jd.com/index-62888.html?from=pc'
     }, {
         img_src: 'upload/banner3.jpg',
         a_href: 'https://beauty.jd.com/'
     }, {
         img_src: 'upload/banner4.jpg',
         a_href: 'https://trip.jd.com/'
     }, {
         img_src: 'upload/banner5.jpg',
         a_href: 'https://mall.jd.com/index-1000004259.html?from=pc'
     }, {
         img_src: 'upload/banner6.png',
         a_href: 'https://toy.jd.com/'
     }, {
         img_src: 'upload/banner7.png',
         a_href: 'https://phat.jd.com/10-185.html'
     }, {
         img_src: 'upload/banner8.jpg',
         a_href: 'https://trip.jd.com/'
     }, {
         img_src: 'upload/banner9.jpg',
         a_href: 'https://phat.jd.com/10-184.html'
     }, {
         img_src: 'upload/banner10.jpg',
         a_href: 'https://beauty.jd.com/'
     }];
     // 为了解决随机数同步的问题，将其公共部分提取出来定义为一个新的变量
     var randomNum = Math.floor(Math.random() * linkArr.length);
     random_a.href = linkArr[randomNum].a_href;
     random_img.src = linkArr[randomNum].img_src;
     var close_btn = document.querySelector('.close-btn');
     close_btn.addEventListener('click', function(e) {
         e.preventDefault(); // 阻止链接跳转，不加的话会先跳转再关闭top
         banner.style.display = 'none';
     });

     // 侧边栏滑动条
     var slideboxs = document.querySelectorAll('.slidebox');
     var slideouts = document.querySelectorAll('.slideout');
     for (let i = 0; i < slideboxs.length; i++) {
         // mouseover经过其子节点会重复触发,次数较多 (VS) mouseenter
         slideboxs[i].addEventListener('mouseenter', function() {
             animateX(slideouts[i], -60, function() {
                 // 字体样式添加在回调函数中，会有慢慢浮现的动画
                 slideouts[i].style.fontSize = '12px';
             });
         });
         slideboxs[i].addEventListener('mouseleave', function() {
             animateX(slideouts[i], 0, function() {
                 slideouts[i].style.fontSize = 0;
             });
         });
     }
     // 要想子元素也在触发事件的范围内，则将其(HTML)写在父元素内，相当于是事件委托
     // 事件委托原理：不是每个子节点都单独设置事件监听器，而是设置在其父节点上，利用冒泡原理影响每个子节点。只操作了一次DOM，提高性能
     // var target = e.target || e.srcElement; 返回触发事件的对象
     var goTop = document.querySelector('.goTop');
     goTop.addEventListener('click', function() {
         pageY_animate(window, 0);
     });

     // 猜你喜欢模块点击刷新
     var renew = document.querySelector('.renew-icon');
     var like_bd = document.querySelector('.like-bd');
     var current = 0;
     renew.addEventListener('click', function() {
         if (current == 0) {
             like_bd.children[0].style.display = 'none';
             like_bd.children[1].style.display = 'flex';
             like_bd.children[2].style.display = 'none';
             like_bd.children[3].style.display = 'none';
             current = 1;
         } else if (current == 1) {
             like_bd.children[0].style.display = 'none';
             like_bd.children[1].style.display = 'none';
             like_bd.children[2].style.display = 'flex';
             like_bd.children[3].style.display = 'none';
             current = 2;
         } else if (current == 2) {
             like_bd.children[0].style.display = 'none';
             like_bd.children[1].style.display = 'none';
             like_bd.children[2].style.display = 'none';
             like_bd.children[3].style.display = 'flex';
             current = 3;
         } else if (current == 3) {
             like_bd.children[0].style.display = 'flex';
             like_bd.children[1].style.display = 'none';
             like_bd.children[2].style.display = 'none';
             like_bd.children[3].style.display = 'none';
             current = 0;
         }
     });
 })