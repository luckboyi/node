function checkLogin(e){if(!e){var n=0;return $(".webgame_login_con input").each(function(e,a){checkLogin($(a))||(n+=1)}),!(n>0)}var a=e.attr("name"),i=e.val();if("accountnum"==a){if("undefinde"==typeof i||""==i)return e.next("span.erro_msg").css("display","inline").find("b").text("账号不能为空"),e.css("border-color","#ea5a5a"),!1;e.next("span.erro_msg").hide().find("b").text(""),e.css("border-color","#2a3343")}if("password"==a){if("undefinde"==typeof i||""==i)return e.next("span.erro_msg").css("display","inline").find("b").text("密码不能为空"),e.css("border-color","#ea5a5a"),!1;e.next("span.erro_msg").hide().find("b").text(""),e.css("border-color","#2a3343")}if("verifycode"==a&&"none"!==$(".verify_container").css("display")){if("undefinde"==typeof i||""==i)return e.next("span.erro_msg").css("display","inline").find("b").text("验证码不能为空"),e.css("border-color","#ea5a5a"),!1;e.next("span.erro_msg").hide().find("b").text(""),e.css("border-color","#2a3343")}return!0}$(".choice-tab").click(function(){$(this).addClass("tab_titleBg").siblings().removeClass("tab_titleBg");var e=$(this).attr("tag-id");$(".tab-content").hide(),$("#"+e).show()}),$(".startGame").click(function(){$(this).addClass("cur").siblings().removeClass("cur");var e=$(this).attr("game-id");if(!e)return!1;var n={gameid:e,gamename:$(this).attr("game-name"),areaid:$(this).attr("area-id"),areaname:$(this).attr("server-name")};PL.startGame(n)});var remember=0;$(".web_auto_login").click(function(){var e=$(".has_auto").toggleClass("cur");remember=e.attr("class").indexOf("cur")>0?1:0}),$("#loginBtn").click(function(){var e=checkLogin();if(!e)return!1;var n=checkLogin($(".webgame_login_con input[name=accountnum]"));if(!n)return!1;var a=checkLogin($(".webgame_login_con input[name=password]"));if(!a)return!1;var a=checkLogin($(".webgame_login_con input[name=verifycode]"));if(!a)return!1;var i=$('.webgame_login_con input[name="accountnum"]').val(),r=$('.webgame_login_con input[name="password"]').val(),o=$('.webgame_login_con input[name="verifycode"]').val();$(".error").text(""),$.post("/api/login",{name:i,pwd:r,code:o,remember:remember},function(e){0==e.code?location.href=window.location.href:1302==e.code?($(".webgame_login_con input[name=accountnum]").next("span.erro_msg").css("display","inline").find("b").text(e.msg),$(".webgame_login_con input[name=accountnum]").css("border-color","#ea5a5a")):1303==e.code?($(".webgame_login_con input[name=password]").next("span.erro_msg").css("display","inline").find("b").text(e.msg),$(".webgame_login_con input[name=password]").css("border-color","#ea5a5a")):1115==e.code&&($(".verify_container").show(),$("#verify_container").attr("src",e.data.img+"?w=84&h=38&v="+Math.random()),$(".webgame_login_con input[name=verifycode]").next("span.erro_msg").css("display","inline").find("b").text(e.msg),$(".webgame_login_con input[name=verifycode]").css("border-color","#ea5a5a"))},"json")});