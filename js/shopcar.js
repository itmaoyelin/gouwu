$(document).ready(function() {
    // 全选 全不选功能模块
    $("#all-checked").on("change", function() {
        $(".s-checkbox, #allChecked").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".goods-item").addClass("checked");
        } else {
            $(".goods-item").removeClass("checked");
        }
        getSum();

    });

    $("#allChecked").on("change", function() {
        $(".s-checkbox, #all-checked").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".goods-item").addClass("checked");
        } else {
            $(".goods-item").removeClass("checked");
        }
        getSum();
    });

    // 小复选框被选中的个数等于其总数，全选框要被选中，否则不选
    $(".s-checkbox").on("change", function() {
        if ($(".s-checkbox:checked").length == $(".s-checkbox").length) {
            $("#all-checked, #allChecked").prop("checked", true);
        } else {
            $("#all-checked, #allChecked").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".goods-item").addClass("checked");
        } else {
            $(this).parents(".goods-item").removeClass("checked");
        }
        getSum();
    });

    // 增减商品数量模块
    $(".increase").on("click", function() {
        // 先获取当前兄弟文本框的值
        var n = $(this).siblings(".countNum").val();
        if (n == 199) {
            $(this).addClass("disabled");
        }
        if (n == 200) {
            return false; // if (n == 200) return; 不用加false亦可
        }
        n++;
        // 再将修改后的值赋值回对应的文本框
        $(this).siblings(".countNum").val(n);
        // 首次点击过后文本框的值变为2，减号按钮就可以点击了
        $(this).siblings(".decrease").removeClass("disabled");
        // 获取当前商品的价格
        let p = $(this).parents(".goods-num").siblings(".goods-price").children(".unit-price").text();
        p = p.substr(1); // p = p.slice(1);
        // 小计模块
        $(this).parents(".goods-num").siblings(".goods-count").children(".subtotal").text("￥" + (p * n).toFixed(2));
        getSum();
    });

    $(".decrease").on("click", function() {
        let n = $(this).siblings(".countNum").val();
        if (n == 1) {
            return false;
        }
        if (n == 2) {
            // 因为此事件是要点击后才会触发，所以当n=2的时候就要为其添加disabled类名 “加减一，减加一”
            $(this).addClass("disabled");
        }
        n--;
        $(this).siblings(".countNum").val(n);
        $(this).siblings(".increase").removeClass("disabled"); // 点击完减/加，就一定能够点击加/减
        let p = $(this).parents(".goods-num").siblings(".goods-price").children(".unit-price").text();
        p = p.substr(1);
        $(this).parents(".goods-num").siblings(".goods-count").children(".subtotal").text("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 修改文本框的值->小计内容变化
    $(".countNum").on("change", function() {
        let n = $(this).val();
        if (n == 1) {
            $(this).siblings(".decrease").addClass("disabled");
        }
        if (n >= 2) {
            $(this).siblings(".decrease").removeClass("disabled");
        }
        if (n >= 1 && n < 200) {
            $(this).siblings(".increase").removeClass("disabled");
        }
        if (n >= 200) {
            n = 200;
            $(this).val(n);
            $(this).siblings(".increase").addClass("disabled");
            alert("每样商品最多只能购买200件！");
        }
        let p = $(this).parents(".goods-num").siblings(".goods-price").children(".unit-price").text();
        p = p.substr(1);
        $(this).parents(".goods-num").siblings(".goods-count").children(".subtotal").text("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 计算总计和总价模块
    function getSum() {
        let count = 0;
        let money = 0;
        // 只有被选中的商品才会进行结算
        $(".s-checkbox:checked").parent(".check").siblings(".goods-num").find(".countNum").each(function(index, domEle) {
            count += parseInt($(domEle).val());
        });
        $(".Count").text(count);
        $(".s-checkbox:checked").parent(".check").siblings(".goods-count").children(".subtotal").each(function(index, domEle) {
            money += parseFloat($(domEle).text().substr(1));
        });
        $(".total-price").text("￥" + money.toFixed(2));
    }
    getSum(); // 用于本地存储（保留之前复选框的选中状态）

    /* 商品未被选中就进行结算 (X)
    function getSum() {
        let count = 0;
        let money = 0;
        $(".countNum").each(function(index, domEle) {
            // 从Dom元素中取出来的数是字符型，要转换成数字型
            count += parseInt($(domEle).val());
        });
        $(".Count").text(count);
        $(".subtotal").each(function(index, domEle) {
            money += parseFloat($(domEle).text().substr(1));
        });
        $(".total-price").text("￥" + money.toFixed(2));
    } */

    // 全部商品种类数量统计 
    $(".number").text($(".goods-item").length);

    // 删除商品模块
    // (1)商品列表中的删除
    $(".del").on("click", function() {
        let decision = confirm("您确定要删除该商品吗？");
        if (decision == true) {
            $(this).parents(".goods-item").remove();
            getSum();
            $(".number").text($(".goods-item").length);
            options_boxTop = options_box.offsetTop;
            optionsChange();
        }
    });

    // (2)删除选中的商品
    $(".clear").on("click", function() {
        if ($(".s-checkbox:checked").length == 0) {
            alert("对不起！您还未选中商品");
        } else {
            let decision = confirm("您确定要删除选中的商品吗？");
            if (decision == true) {
                $(".s-checkbox:checked").parents(".goods-item").remove();
                if ($(".s-checkbox:checked").length == $(".goods-item").length) {
                    $("#all-checked, #allChecked").prop("checked", false);
                }
                getSum();
                $(".number").text($(".goods-item").length);
                options_boxTop = options_box.offsetTop;
                optionsChange();
            }
        }
    });

    // (3)清理购物车
    $(".clearAll").on("click", function() {
        if ($(".goods-item").length == 0) {
            alert("购物车里没有商品啦！快去选购吧");
        } else {
            let decision = confirm("您确定要删除购物车里的所有商品吗？");
            if (decision == true) {
                $(".goods-item").remove();
                $("#all-checked, #allChecked").prop("checked", false);
                getSum();
                $(".number").text($(".goods-item").length);
                options_boxTop = options_box.offsetTop;
                optionsChange();
            }
        }
    });

    // 当options_box不在可视区域内时，则变为固定定位于底部，方便查看操作
    // 注：【bug】删除一件商品后，其不在可视区域内，但固定定位没有显示出来；此时options_boxTop的值有问题！(why?)
    var options_box = document.querySelector('.options-box');
    var options_boxTop = options_box.offsetTop;

    function optionsChange() {
        if (options_boxTop >= document.documentElement.clientHeight) {
            options_box.style.position = 'fixed';
            options_box.style.bottom = 0;
            options_box.style.left = '50%';
            options_box.style.margin = '0 0 0 -600px';
            options_box.style.backgroundColor = '#f3f3f3';
        } else {
            options_box.style.position = '';
            options_box.style.bottom = '';
            options_box.style.left = '';
            options_box.style.margin = '20px auto';
            options_box.style.backgroundColor = '';
        }
    }
    optionsChange();

    window.onscroll = function() {
        if (window.pageYOffset <= (options_boxTop - document.documentElement.clientHeight)) {
            options_box.style.position = 'fixed';
            options_box.style.bottom = 0;
            options_box.style.left = '50%'
            options_box.style.margin = '0 0 0 -600px';
            options_box.style.backgroundColor = '#f3f3f3';
        } else {
            options_box.style.position = '';
            options_box.style.bottom = '';
            options_box.style.left = '';
            options_box.style.margin = '20px auto';
            options_box.style.backgroundColor = '';
        }
    }
})