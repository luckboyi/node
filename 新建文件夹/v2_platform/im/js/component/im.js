/**
 * Created by zhengy on 2016/12/28.
 */
//定义vm

var search, userVm,friendReq,friendList;

search = new Vue({
    el:'#addsearch',
    methods:{
       addsearch(){
        //console.log(1)
        PL.callFun('immainframe', 'openaddfriend', '');
       }
    }
})
//用户数据
function userData(data){
    $('#user_msg .img_container i').attr('class','');
    userVm = new Vue({
        el:'#user_msg',
        data:data,
        methods:{
            /*state = true*/
            greet:function(){
                this.user_state = !this.user_state;
            },
            
        }
    })
}
//刷新数据
function changeUserData(data){
    // vm.$data = data;
    $('#user_msg .img_container i').attr('class','');
    if(data.name !=''){
        userVm.$data.name = data.name
    };
    if(data.url !=''){
        userVm.$data.url = data.url;
    };
    if(data.rank !=''){
        userVm.$data.rank = data.rank;
    };
    if(data.money !=''){
        userVm.$data.money = data.money;
    };
    if(data.state !=''){
        userVm.$data.state = data.state;
    };
    if(data.online == true){
        $('#user_msg .img_container i').attr('class','online');
    };
    if(data.busy == true){
        $('#user_msg .img_container i').attr('class','busy');
    };
    if(data.leave == true){
        $('#user_msg .img_container i').attr('class','leave');
    };
    if(data.hiding == true){
        $('#user_msg .img_container i').attr('class','hiding');
    }

}
//好友请求
function friend_request(data){
    friendReq =  new Vue({
        el:'#friend_req',
        data:data,
        methods:{
            /*state = true*/
            list:function(){//点击进入聊天记录
                this.listState= !this.listState;
                this.if_shrink = !this.if_shrink;
                $('#friend_list_scrollbar').tinyscrollbar();
            },
            agree:function(item){//点击同意
                $('.agree_tips').fadeIn();
                this.items.$remove(item);
                if(this.items.length == 0){
                    setTimeout(function(){
                        $('#friend_req').fadeOut();
                    },1000)
                }
                $('#friend_list_scrollbar').tinyscrollbar();
                setTimeout(function(){
                    $('.agree_tips').fadeOut();
                },1000)
            },
            overlook:function(item){//点击忽略
                this.items.$remove(item);

                console.dir(this.items.length);
                if(this.items.length == 0){
                    this.state = false;
                };
                $('#friend_list_scrollbar').tinyscrollbar();
            },
            userMsg:function(item){ //点击查看用户信息
                //alert(1)
                //event.stopPropagation();
            }
        }
    })
}
//新增加的数据请求
function new_friend_request(data){
    friendReq.$data.items.push(data);
}
//好友列表
function friend_list(data){
    friendList = new Vue({
        el:'#friend_list',
        data:data,
        methods:{
            /*state = true*/
            firendListClick:function(item){//点击进入聊天记录
                //console.dir(1)
            },
            userMsg:function(item){//点击查看用户信息
                //console.dir(2)
                //event.stopPropagation();
            },
            list:function(){ //展开或收缩
                this.listState= !this.listState;
                this.if_shrink = !this.if_shrink;
                $('#friend_list_scrollbar').tinyscrollbar();
            },
        }
    })
}
//好友列表刷新
function resh_friend_list(data){
    friendList.$data = data;
}
//新加的好友列表
function add_friend_list(data){
    console.dir(data);
    friendList.$data.items.push(data);
}
$(function(){
    //点击关闭按钮
    $('.im_container .close_btn').on('click',function(){
        //alert(1)
        PL.callFun('mainFrame', 'close', '');
    })
    //测试
    $('.ceshi').on('click',function(){
        //alert(1);
        //console.dir(userUpdata)
        changeUserData(userUpdata);
        add_friend_list(addData)
    });
    $('#friend_list_scrollbar').tinyscrollbar();
    //窗口拉伸
    $(window).resize(function(){
        $('#friend_list_scrollbar').tinyscrollbar();
    });
    //点击用户状态显示用户列表
    $('body').on('click','.user_state span',function(e){
        $('.sel_state').toggle();
        e.stopPropagation();
    });
    //点击用户列表选择状态
    $('body').on('click','.user_state ul li',function(){
        $('.user_state span').html($(this).find('b').html());
        $(this).parents('#user_msg').find('.img_container i').attr('class','').addClass($(this).attr('state'))
    });
    $(window).click(function(){
        $('.user_state ul').hide();
    });
    //点击用户列表
    $('body').on('click','.friend_list li',function(){
        $(this).addClass('cur').siblings().removeClass('cur').parents('.friend_req').siblings('.friend_req').find('li').removeClass('cur');
    });
    //同意或者忽略
    $('body').on('click','.friend_req div.btn span',function(){
        $(this).addClass('cur').siblings('').removeClass('cur');
    });
    $('body').on('mousemove','.friend_req div.btn span',function(){
        $(this).addClass('cur').siblings('').removeClass('cur');
    });
    //点击好友列表
    $('body').on('mousedown','#friend_list .in_friend_list',function(e){
        var html ='<div class=" list_tips pa" style="z-index:9999;">\
                    <ul>\
                        <li><div>发送信息</div></li>\
                        <li><div>查看资料</div></li>\
                        <li><div>移除好友</div></li>\
                    </ul>\
                  </div>';
        var left = e.pageX;
        var top = e.pageY;
        var winHeight = window.innerHeight;
        var t = $(this).offset().top;
        console.dir(t)
        if(3 == e.which){
            $('body').find('.list_tips').detach();
            $(this).append(html);
            if(top + 80 <winHeight){
                $('body').find('.list_tips').css({
                    'left':left,
                    'top':top-t
                })
            }else{
                $('body').find('.list_tips').css({
                    'left':left,
                    'top':top-t-84
                })
            }
        }
        e.stopPropagation();
    })
    //点击发送消息
    $('body').on('click','.list_tips li',function(){
        var i = $(this).index();
        var id =$(this).parents('.in_friend_list').attr('uid');
        //console.log(i)
        if( i == 0){
            //发送消息
            PL.callFun('immainframe', 'openchat', '{"userid":'+id+'}');
        }else if( i == 1){
            //查看资料
            PL.callFun('immainframe', 'openchat', '{"userid":'+id+'}');
        }else{
            //移除好友
            //friendList.$data.items
            $(this).parents('.in_friend_list').detach();
            PL.callFun('immainframe', 'delfriend', '{"userid":'+id+',"bothdel":true}');
        }
    })

    $(window).on('click',function(){
        $('.list_tips ').detach();
    })

})
