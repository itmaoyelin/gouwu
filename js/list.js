window.addEventListener('load', function() {
    // 条形统计图数据变化
    var lis = document.querySelector('.like-price').children;
    var start = document.querySelector('.start');
    var end = document.querySelector('.end');
    var clear = document.querySelector('.clear');
    var numArr = [{
        start: 8096,
        end: 36999
    }, {
        start: 3573,
        end: 8096
    }, {
        start: 1362,
        end: 3573
    }, {
        start: 349,
        end: 1362
    }, {
        start: 0,
        end: 349
    }];
    // 疑问：此处循环为什么用var声明i就报错呢？
    // 启示：循环体尽量使用let进行声明
    // 特点：(1)没有变量提升，先声明，再使用 (2)防止循环变量变成全局变量，每次循环都会变成一个单独的(块级)作用域 (3)暂时性死区 (4)同一作用域下不可重复声明变量
    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener('mouseover', function() {
            start.value = numArr[i]['start'];
            end.value = numArr[i]['end'];
            // start.value = numArr[i].start;
            // end.value = numArr[i].end;
        });
    }
    clear.addEventListener('click', function() {
        start.value = '';
        end.value = '';
    });

    // 商品图片切换
    // 由于图片众多不一，不好一一对应；全部取相同的类名不行，只能单个模块——>以后看看有什么办法？
    var bigImg1 = document.querySelector('#bigImg1');
    var bigImg2 = document.querySelector('#bigImg2');
    var bigImg3 = document.querySelector('#bigImg3');
    var bigImg4 = document.querySelector('#bigImg4');
    var bigImg5 = document.querySelector('#bigImg5');
    var bigImg6 = document.querySelector('#bigImg6');
    var bigImg7 = document.querySelector('#bigImg7');
    var bigImg8 = document.querySelector('#bigImg8');
    var bigImg9 = document.querySelector('#bigImg9');
    var bigImg10 = document.querySelector('#bigImg10');
    var bigImg11 = document.querySelector('#bigImg11');
    var bigImg12 = document.querySelector('#bigImg12');
    var bigImg13 = document.querySelector('#bigImg13');
    var bigImg14 = document.querySelector('#bigImg14');
    var bigImg15 = document.querySelector('#bigImg15');
    var bigImg16 = document.querySelector('#bigImg16');
    var bigImg17 = document.querySelector('#bigImg17');
    var bigImg18 = document.querySelector('#bigImg18');
    var bigImg19 = document.querySelector('#bigImg19');
    var bigImg20 = document.querySelector('#bigImg20');

    var littleImgs1 = document.querySelectorAll('.littleImg1');
    var littleImgs2 = document.querySelectorAll('.littleImg2');
    var littleImgs3 = document.querySelectorAll('.littleImg3');
    var littleImgs4 = document.querySelectorAll('.littleImg4');
    var littleImgs5 = document.querySelectorAll('.littleImg5');
    var littleImgs6 = document.querySelectorAll('.littleImg6');
    var littleImgs7 = document.querySelectorAll('.littleImg7');
    var littleImgs8 = document.querySelectorAll('.littleImg8');
    var littleImgs9 = document.querySelectorAll('.littleImg9');
    var littleImgs10 = document.querySelectorAll('.littleImg10');
    var littleImgs11 = document.querySelectorAll('.littleImg11');
    var littleImgs12 = document.querySelectorAll('.littleImg12');
    var littleImgs13 = document.querySelectorAll('.littleImg13');
    var littleImgs14 = document.querySelectorAll('.littleImg14');
    var littleImgs15 = document.querySelectorAll('.littleImg15');
    var littleImgs16 = document.querySelectorAll('.littleImg16');
    var littleImgs17 = document.querySelectorAll('.littleImg17');
    var littleImgs18 = document.querySelectorAll('.littleImg18');
    var littleImgs19 = document.querySelectorAll('.littleImg19');
    var littleImgs20 = document.querySelectorAll('.littleImg20');
    imgToggle(littleImgs1, bigImg1);
    imgToggle(littleImgs2, bigImg2);
    imgToggle(littleImgs3, bigImg3);
    imgToggle(littleImgs4, bigImg4);
    imgToggle(littleImgs5, bigImg5);
    imgToggle(littleImgs6, bigImg6);
    imgToggle(littleImgs7, bigImg7);
    imgToggle(littleImgs8, bigImg8);
    imgToggle(littleImgs9, bigImg9);
    imgToggle(littleImgs10, bigImg10);
    imgToggle(littleImgs11, bigImg11);
    imgToggle(littleImgs12, bigImg12);
    imgToggle(littleImgs13, bigImg13);
    imgToggle(littleImgs14, bigImg14);
    imgToggle(littleImgs15, bigImg15);
    imgToggle(littleImgs16, bigImg16);
    imgToggle(littleImgs17, bigImg17);
    imgToggle(littleImgs18, bigImg18);
    imgToggle(littleImgs19, bigImg19);
    imgToggle(littleImgs20, bigImg20);

    function imgToggle(littleImgs, bigImg) {
        for (let i = 0; i < littleImgs.length; i++) {
            littleImgs[i].onmouseover = function() {
                for (let i = 0; i < littleImgs.length; i++) {
                    littleImgs[i].parentNode.classList.remove('active');
                }
                this.parentNode.classList.add('active');
                bigImg.src = this.src;
            }
        }
    }
    // 待做功能：(1)品牌分类 (2)价格排序 (3)分页展示
})