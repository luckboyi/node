  $(function(){
    $(".btn-sub-account").click(function() {
        Open.navigation.subAccount();
    });
    $(".btn-sub-account-edit").click(function() {
        Open.navigation.subAccountEdit();
    });
    $(".btn-sub-account-perm").click(function() {
        Open.navigation.subAccountPerm();
    });
    
    $(".btn-my").click(function() {
        Open.navigation.my();
    });
    $(".btn-logout").click(function() {
        Open.navigation.logOut();
    });
    $(".btn-offline-product").click(function() {
        Open.navigation.webGameOffline();
    });

    $(".btn-online-product").click(function() {
        Open.navigation.webGameList();
    });

     $(".btn-offline-vr").click(function() {
        Open.navigation.vrGameOffline();
    });

    $(".btn-online-vr").click(function() {
        Open.navigation.vrGameList();
    });

    $(".btn-webgame-list").click(function() {
        Open.navigation.webGameList();
    });
     $(".btn-review-product").click(function() {
        Open.navigation.reviewProduct("webgame");
    });
     $(".btn-review-vrgame").click(function() {
        Open.navigation.reviewProduct("vrgame");
    });
     $(".btn-review-video").click(function() {
        Open.navigation.reviewProduct("video");
    });
       $(".btn-review-user").click(function() {
        Open.navigation.reviewUser();
    });
    $(".btn-webgame-create").click(function() {
         Open.navigation.webGameCreate();
    });
     $(".btn-vrgame-create").click(function() {
         Open.navigation.vrGameCreate();
    });
    $(".btn-webgame-detail").click(function(){
        var id = $(this).attr("data-id");
        Open.navigation.webGameDetail("all",id);
    });

    $(".btn-webgame-info").click(function(){
        var id = $(this).parent().attr("data-id");
        var name = $(this).attr("data-src");
        Open.navigation.webGameDetail(name,id);
    });

    $(".btn-vrgame-detail").click(function(){
        var id = $(this).attr("data-id");
        Open.navigation.vrGameDetail("all",id);
    });
     $(".btn-review-app-detail").click(function(){
        var id = $(this).attr("data-id");
         var tp = $(this).attr("data-tp");
        Open.navigation.reviewAppDetail(tp,id);
    });
     $(".btn-review-user-detail").click(function(){
        var id = $(this).attr("data-id");
        Open.navigation.reviewUserDetail(id);
    });

    $(".btn-vrgame-info").click(function(){
        var id = $(this).parent().attr("data-id");
        var name = $(this).attr("data-src");
        Open.navigation.vrGameDetail(name,id);
    });

    $(".btn-history").click(function(){
        Open.navigation.history();
    });

    $(document).on('click', '.pic>.close', function() {
        $(this).parent().remove()
    });
 });

var Open = {
    urls:{
        webGameCreateSubmit:"/product/webgame/submit",
        webGameSave:"/product/webgame/save",
        webGameServerSave:"/product/webgame/serversave/",
        webGameReview:"/product/webgame/review/",
        webGameOnline:"/product/webgame/publish/",
        vrGameCreateSubmit:"/product/vrgame/submit",
        vrGameSave:"/product/vrgame/save",
        reviewWebGameSubmit:"/review/webgame/"
    },
    navigation:{
        subAccount:function() {
             location.href = "/subAccount";
        },
        subAccountEdit:function() {
             location.href = "/subAccount/edit";
        },
        subAccountPerm:function() {
             location.href = "/subAccount/perm";
        },
        my:function() {
            location.href = "/getDeveloperInfo";
        },
        history:function(){
            history.back();
        },
        logOut:function() {
            location.href = "/logout";
        },
        webGameList:function() {
            location.href = "/product/webgamelist/online";
        },
        webGameOffline:function() {
            location.href = "/product/webgamelist/offline";
        },
        vrGameList:function() {
            location.href = "/product/vrgamelist/online";
        },
        vrGameOffline:function() {
            location.href = "/product/vrgamelist/offline";
        },
        webGameCreate:function() {
             location.href = "/product/webgame/create";
        },
        webGameDetail:function(name,appid) {
            location.href = "/product/webgame/"+name+"/"+appid;
        },
        vrGameList:function() {
            location.href = "/product/vrgamelist/online";
        },
        vrGameOffline:function() {
            location.href = "/product/vrgamelist/offline";
        },
        vrGameCreate:function() {
             location.href = "/product/vrgame/create";
        },
        vrGameDetail:function(name,appid) {
            location.href = "/product/vrgame/"+name+"/"+appid;
        },
        reviewProduct:function(tag) {
             location.href = "/review/"+tag+"/0";
        },
        reviewUser:function() {
             location.href = "/review/regUser/1";
        },
        reviewAppDetail:function(tp,id) {
             location.href =  "/review/"+tp+"/info/base/"+id;
        },
        reviewUserDetail:function(id) {
             location.href =  "/review/user/info/"+id;
        }
    },
    goTo:function(href) {
        location.href = href;
    },
    showMessage:function(msg,timeout,callback) {
        if(typeof(timeout)=="undefined") {
            timeout = 2000;
        }
        var obj = $(".firetips_layer_wrap");
        if(obj.length>0) {
            $(".firetips").html(msg)
            $(".firetips_layer_wrap").fadeIn()
        } else {
            $("body").append('<div class="firetips_layer_wrap"><span class="firetips_layer" style="z-index: 10000;"><span class="hits"></span><span class="firetips">'+msg+'</span></span></div>');
        }
        setTimeout(function(){
            $(".firetips_layer_wrap").fadeOut();

            if(typeof(callback)=="function") {
                callback()
            }
        }, timeout);
    },
    randVersion:function() {
        return Math.random();
    },
    getImageName:function(str) {
        var match = str.match(/\/[\w\d_\.]{10,100}($|\?)/i);
        if(match.length>=1) {
            var match1 = match[0].replace("?","");
            var match2 = match1.replace("/","");
            return match2;
        } else {
            return false;
        }
    },
    upload:function(op,okCallback,errCallback) {
        if(!op.max_file_size) {
            op.max_file_size = "5mb";
        }
        if(!op.extensions) {
            op.extensions = "jpg";
        }
        var option = {
        browse_button: op.name+'-upload',
        container: document.getElementById(op.name+'-container'),
        url : '/upload/start',
        filters : {
            max_file_size : op.max_file_size,
            mime_types: [
                {title : "Image files", extensions : op.extensions},
            ]
        },
        init: {
            'FileUploaded': okCallback,
            'Error':errCallback
            }
        };
        if(op.add_params) {
             option.add_params = op.add_params;
         }
        if(op.check) {
            option.check = op.check;
        }
        if(op.err) {
            option.err = op.err;
        }
        if(op.cos) {
            option.cos = op.cos;
        }
        if(typeof(fireUploader)!="undefined") {
            return fireUploader(option);
        }
        return ;
    }
}