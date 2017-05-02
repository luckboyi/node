/**
 * 页游左侧栏登录的验证js
 */
//获取验证码链接

//$("#verify_container").attr('src',verifyCodeUrl + "?w=84&h=38&v="+Math.random());

$(".choice-tab").click(function() {
    $(this).addClass('tab_titleBg').siblings().removeClass('tab_titleBg');
    var id = $(this).attr("tag-id");
    $(".tab-content").hide();
    $("#" + id).show();
})
$(".startGame").click(function() {
    $(this).addClass("cur").siblings().removeClass("cur");
    var gameid = $(this).attr("game-id");
    if (!gameid) {
        return false;
    }
    var json = {
        gameid: gameid,
        gamename: $(this).attr("game-name"),
        areaid: $(this).attr("area-id"),
        areaname: $(this).attr("server-name")
    };
    PL.startGame(json);
});

//判断用户是否勾选记住密码功能
var remember = 0;
//失去焦点
$('.web_auto_login').click(function() {
    var t = $('.has_auto').toggleClass("cur");
    if (t.attr("class").indexOf("cur") > 0) {
        remember = 1;
    } else {
        remember = 0;
    }
});

$("#loginBtn").click(function() {
    var check = checkLogin();
    if (!check) {
        return false;
    }

    var accountFlag = checkLogin($('.webgame_login_con input[name=accountnum]'));
    if (!accountFlag) {
        return false;
    }

    var passwordFlag = checkLogin($('.webgame_login_con input[name=password]'));
    if (!passwordFlag) {
        return false;
    }

    var passwordFlag = checkLogin($('.webgame_login_con input[name=verifycode]'));
    if (!passwordFlag) {
        return false;
    }


    var name = $('.webgame_login_con input[name="accountnum"]').val();
    var pwd = $('.webgame_login_con input[name="password"]').val();
    var code = $('.webgame_login_con input[name="verifycode"]').val();
    $(".error").text("");
    $.post("/api/login", {
        name: name,
        pwd: pwd,
        code: code,
        remember: remember
    }, function(data) {
        if (data.code == 0) {
            location.href = window.location.href;
        } else {
            if (data.code == 1302) { // 用户名不存在

                $('.webgame_login_con input[name=accountnum]').next('span.erro_msg').css("display", "inline").find('b').text(data.msg);
                $('.webgame_login_con input[name=accountnum]').css('border-color', '#ea5a5a');

            } else if (data.code == 1303) { // 密码错误 
                $('.webgame_login_con input[name=password]').next('span.erro_msg').css("display", "inline").find('b').text(data.msg);
                $('.webgame_login_con input[name=password]').css('border-color', '#ea5a5a');
            } else if (data.code == 1115) { // 验证码错误
                $(".verify_container").show();
                $("#verify_container").attr('src',data.data.img + "?w=84&h=38&v="+Math.random());
                $('.webgame_login_con input[name=verifycode]').next('span.erro_msg').css("display", "inline").find('b').text(data.msg);
                $('.webgame_login_con input[name=verifycode]').css('border-color', '#ea5a5a');
            }

            //$(".error").text(data.msg)
        }
    }, "json");
});

//登录 检测
function checkLogin(obj) {
    if (!obj) {
        var error = 0;
        $('.webgame_login_con input').each(function(i, e) {
            if (!checkLogin($(e))) {
                error += 1;
            }
        });
        if (error > 0) {
            return false;
        }
        return true;
    }

    var name = obj.attr('name');
    var value = obj.val();
    if (name == 'accountnum') {
        if (typeof value == 'undefinde' || value == '') {
            obj.next('span.erro_msg').css("display", "inline").find('b').text('账号不能为空');
            obj.css('border-color', '#ea5a5a');
            return false;
        } else {
            obj.next('span.erro_msg').hide().find('b').text('');
            obj.css('border-color', '#2a3343')
        }
    };
    if (name == 'password') {
        if (typeof value == 'undefinde' || value == '') {
            obj.next('span.erro_msg').css("display", "inline").find('b').text('密码不能为空');
            obj.css('border-color', '#ea5a5a');
            return false;
        } else {
            obj.next('span.erro_msg').hide().find('b').text('');
            obj.css('border-color', '#2a3343')
        }
    }
    if (name == 'verifycode' && $('.verify_container').css('display') !== 'none') {
        if (typeof value == 'undefinde' || value == '') {
            obj.next('span.erro_msg').css("display", "inline").find('b').text('验证码不能为空');
            obj.css('border-color', '#ea5a5a');
            return false;
        } else {
            obj.next('span.erro_msg').hide().find('b').text('');
            obj.css('border-color', '#2a3343')
        }
    }
    return true;
}