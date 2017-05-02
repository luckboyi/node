(function($) {
    var comment = {};

    var page = pagination;

    comment.config = {
        resource: "web",
        pageSize: 7
    }

    comment.isSending = 0;

    comment.init = function(config) {
        var _this = this;

        _this.config = $.extend({}, _this.config, config);

        _this.targetId = parseInt($("#target-id").val());
        _this.targetType = parseInt($("#target-type").val());
        _this.uid = parseInt($("#user-uid").val());
        _this.isGood = 1;
        _this.grade = $('#gradeCon .score b').attr("score");

        if (_this.config.resource == "web") {
            _this.resource = 1
        } else if (_this.config.resource == "pc") {
            _this.resource = 2
        }

        _this.changeCommentType("hot");
        $('#gradeCon li').css('width', _this.grade * 16);

        //评分
        $('#gradeCon .grade').mousemove(function(e) {
            var x = (e.clientX - $(this).offset().left) / 15;
            var num = x.toString();
            if ((num.substring(num.indexOf('.')) + 1) < .5) {
                n = 0.5
            } else {
                n = 1;
            }
            var left = parseInt(x) + n;
            //console.dir(left+n);
            $('#gradeCon li').css('width', left * 16);
            $('#gradeCon .score b').text(left);
            $('#gradeCon .score b').attr("score", left);
        });

        $('#gradeCon .grade').mouseleave(function(e) {
            $('#gradeCon li').css('width', _this.grade * 16);
            $('#gradeCon .score b').text(_this.grade);
        });

        //点击确定评分；
        $('#gradeCon .grade').click(function() {
            var grade = $('#gradeCon .score b').attr("score");
            _this.grade = parseFloat(parseFloat(grade).toFixed(1));
        });

        $("#sendComment").click(function(event) {
            _this.sendComment();
        });

        $(".support").click(function(event) {
            if ($(this).attr("isChoice") == 1) {
                return false;
            }
            var comment_id = $(this).attr("comment-id");
            var type = $(this).attr("type");
            _this.support(comment_id, type);
        });

        $(".isGood").click(function(event) {
            _this.isGood = $(this).attr("is-good");
            console.log(_this.isGood);
            $(this).addClass('cur').siblings().removeClass('cur');
        });

        $("#comment_con").delegate(".support-comment", 'click', function(event) {
            /* Act on the event */
            if (!_this.uid) {
                _this.dialog("提交失败", "您尚未登录");
                return false;
            }
            var comment_con = $(this).parents(".comment-con");
            var supported = comment_con.attr("supported");
            if (supported == 1) {
                return false;
            }
            $(this).addClass('cur');
            var num_con = $(this).find(".num-con");
            num_con.text(parseInt(num_con.text()) + 1);
            var isSupport = $(this).attr("support");
            var comment_id = comment_con.attr("comment-id");
            comment_con.attr("supported", 1);
            _this.doSupport(comment_id, isSupport);
        });

        $(".comment-tab").click(function() {
            if ($(this).hasClass('cur')) {
                return false;
            }
            $(this).addClass('cur').siblings().removeClass('cur');
            _this.changeCommentType($(this).attr("comment-type"));
        });
    }

    comment.doSupport = function(comment_id, isSupport) {
        var _this = this;

        var data = {
            commentId: comment_id,
            support: isSupport,
            resource: _this.resource
        }

        $.ajax({
            url: '/comment/addSupport',
            dataType: 'json',
            data: data,
        });
    }

    comment.checkParam = function() {
        var _this = this;

        var comment_content = $("#content").val();

        comment_content = $.trim(comment_content);

        var length = comment_content.length;

        if (length < 1 || length > 800) {
            _this.dialog("评测失败", "字数需要在1~800字之间");
            return false;
        }

        if (!_this.grade) {
            _this.dialog("评测失败", "请选择评分");
            return false;
        }

        _this.comment_content = comment_content;

        return true;
    }

    comment.sendComment = function() {
        var _this = this;
        if (_this.isSending) {
            return false;
        }

        var check = _this.checkParam();
        if (!check) {
            return false;
        }

        _this.isSending = 1;

        var data = {
            targetId: _this.targetId,
            targetType: _this.targetType,
            resource: _this.resource,
            commentType: _this.isGood == 1 ? _this.isGood : 2,
            content: _this.comment_content,
            score: _this.grade
        }

        $.ajax({
                url: '/comment/add',
                dataType: 'json',
                data: data
            })
            .done(function(json) {
                if (json.code != 0) {
                    _this.dialog("评论失败", json.msg);
                    return false;
                }
                _this.dialog("评论成功", "发表评论成功");
                $(".no-comment").remove();
                $(".has-comment").show();
                page.switchPage(1);

                var comment_num = parseInt($("#comment-num").text());
                var score = parseFloat($("#score").text()).toFixed(1);

                score = (score * comment_num + _this.grade) / (comment_num + 1);

                $("#score").text(score.toFixed(1));

                $(".comment-num").each(function(i, e) {
                    $(e).text(parseInt($(e).text()) + 1);
                });

                if (_this.isGood == 1) {
                    $(".good-comment-num").text(parseInt($(".good-comment-num").text()) + 1);
                } else {
                    $(".bad-comment-num").text(parseInt($(".bad-comment-num").text()) + 1);
                }
            })
            .fail(function() {
                _this.dialog("评论失败", "请求失败");
                return false;
            })
            .always(function() {
                _this.isSending = 0;
            });
    }

    comment.changeCommentType = function(type) {
        var _this = this;
        var typelist = type;
        page.init({
            url: "/comment/getComment",
            pageSize: _this.config.pageSize, //默认一页显示数量
            ajaxData: {
                targetId: _this.targetId,
                targetType: _this.targetType,
                resource: _this.resource,
                type: type,
                pageNum: _this.config.pageSize
            }, //其他需要专递参数
            allowAlert: false, //是否运行弹出错误信息
            contentHtmlTmp: '\
            <li class="comment_list" uid="{uid}">\
                <div class="comment_body_con clearfix">\
                    <div class="fl com_portrait">\
                        <img src="{headerPic}">\
                    </div>\
                    <div class="fl right_com pr comment-con" comment-id="{id}" supported="{supported}">\
                        <div class="right_com_title clearfix ">\
                            <h3 class="fl">{account}：</h3>\
                            <span class="fl">{content}</span>\
                        </div>\
                        <div class="right_com_con clearfix">\
                            <p class="fl">{create_at}</p>\
                            <p class="fl playGame_time comment-time-con clearfix">\
                                <i class="language fl" data-name="game_play_time">进行游戏时间：</i>\
                                <b class="fl">{totalTime}</b>\
                            </p>\
                            <div class="fr clearfix comment_comment">\
                                <div class="fl comment_delete language" data-name="report">举报</div>\
                                <i class="fl">|</i>\
                                <div class="fl pr like support-comment {supportCur}" support="1">(<b class="num-con">{support}</b>)</div>\
                                <i class="fl">|</i>\
                                <div class="fl pr unlike support-comment {unSupportCur}" support="0">(<b class="num-con">{unsupport}</b>)\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </li>', //dataDataType为json或者jsonp时,对对象进行替换的模板
            //beforeHtml: "", //自动构建页面前所需的html内容，默认为””
            //afterHtml: "", //自动构建页面后所需的html内容，默认为””
            ifEmptyHtml: '<div class="unComment language" style="display:block">暂无评论</div>', //如果数据会空时填入容器的html
            contentHtmlContainer: "#comment_con", //生成html后存放的容器
            autoCreateHtml: true,
            getPageDataSuccess: function(obj) {
                console.log(_this.targetType);
                if (_this.targetType == 1) {
                    $(".comment-time-con").hide();
                }
                if (obj.data.type) {
                    var num_con = $(".comment-tab[comment-type='" + obj.data.type + "']").find("span");
                    num_con.text(obj.data.count);
                }

                if (typeof resizeFn == "function") {
                    resizeFn();
                };

                $(".comment_body_con .right_com span").each(function() {
                    var nameWidth = $(this).prev().width() + "px";
                    $(this).css("text-indent", nameWidth);
                });
            },
            handleData: function(data) {
                data.supported = 1;
                data.supportCur = "";
                data.unSupportCur = "";
                if (data.alreadyClick == "Y") {
                    data.supportCur = "cur";
                } else if (data.alreadyClick == "N") {
                    data.unSupportCur = "cur";
                } else {
                    data.supported = 0;
                }

                return data;
            }, //ajax获取数据成功后执行函数,默认执行在contentHtmlContainer替换生成的html
            debug: true, //开启后控制台输出相关错误信息
        });
    }

    /**
     * 通用的弹出框
     */
    comment.dialog = function(title, content, obj) {

        var config = {
            headerMsg: title,
            msg: content,
            model: "tips"
        }

        if (typeof obj == "object") {
            config = $.extend({}, config, obj);
        }

        tipsFn.init(config);
    }

    window.Comment = comment;
})(jQuery);