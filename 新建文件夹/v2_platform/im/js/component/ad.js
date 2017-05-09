/**
 * Created by zhengy on 2017/1/10.
 */
$(function(){
    tinyScroll();
    $(window).resize(function(){
        tinyScroll();
    });
    //点击关闭
    $('body').on('click','.chat_container .close_btn',function(){
        //alert(1)
         PL.callFun('noticeFrame', 'close', '');
    })
});
function tinyScroll(){
    $('#chat_list').tinyscrollbar();
    $('.in_chat_con').tinyscrollbar();
    //$('#in_chat_con').tinyscrollbar();

}
//获取消息列表
var chatUser,chatMsg;
function noticeFn(data){
    chatUser = new Vue({
        el:'#ad_container',
        data:data,
        methods:{
            closeBtn:function(index,item){
                if(this.items[index].state == true){
                    this.items[index-1].state =true;
                }
                this.items.$remove(item);
                if(this.items.length == 0){
                    //关闭窗口
                }
            },
            clickFn:function(index){
                this.items[index].state =true;
                this.items[index].list.msg = 0;
                for(var i= 0 ; i<this.items.length; i++){
                    if(index !=  i){
                        this.items[i].state = false;
                    }
                }
            },
            sentBtn:function(index){
                var data = {
                    sendtime:'',
                    msg:[{
                        url:'../image/touxiang1.png',
                        state:'true',
                        txt:'dddd',
                    }]
                };
                data.txt = $('.chat_container').find('.in_chat_container').eq(index).find('.in_input textarea').val();
                if(data.txt == ''){
                    $('.chat_container').find('.in_chat_container').eq(index).find('.in_input textarea').attr('placeholder','内容不能为空');
                }else{
                    //userMsg(index,data);

                }
            },
            closeBtn:function(index){
                var data = {
                    sendtime:'2017/01/09',
                    uid:'',
                    msg:[{
                        url:'../image/touxiang1.png',
                        state:'false',
                        txt:'dddd',
                    }]
                };
                addNoticeMsg(data);
            }

        }
    })
}
//newdata
//滚动到底部
function scrollBottom(index){
    setTimeout(function(){
        if($('.chat_container').find('.in_chat_container').eq(index).find('.overview').height()+50 >= $('body').height()-280){
            var top =$('.chat_container').find('.in_chat_container').eq(index).find('.overview').height()+50 - ($('body').height()-280);
        }else{
            top = 0;
        };
        $('.in_chat_con').tinyscrollbar();
        var crollTop = $('.chat_container').find('.in_chat_container').eq(index).find('.track').height()-$('.chat_container').find('.in_chat_container').eq(index).find('.thumb').height();
        $('.chat_container').find('.in_chat_container').eq(index).find('.overview').css('top',-top);
        $('.chat_container').find('.in_chat_container').eq(index).find('.thumb').css('top',crollTop)
    },10);
}
//添加来的信息
function addNoticeMsg(data){
    for(var i = 0 ;i < chatUser.$data.items.length; i++ ){
        if(chatUser.$data.items[i].uid == data.uid){
            //console.dir(data)
            chatUser.$data.items[i].msglist.push(data);
            //console.dir( chatUser.$data.items[i].msglist)

            //console.dir(chatUser.$data.items[i].msglist[1].msg);
            //console.dir(chatUser.$data.items[i].list.msg);
            // chatUser.$data.items[i].list.msg ++;
            scrollBottom(i);

        }
    }

}
//获取消息列表

/*
var chatData = {
    items:[{
        url:'../image/touxiang1.png',
        name:'维护公告',
        uid:10002,
        state:false,
        list:{
            msg:20
        },
        msglist:[{
            sendtime:'',
            msg:[
                {
                    time:'1020',
                    txt:'打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我',
                },
                {
                    time:'08:00',
                    txt:'22222'
                },
                {
                    time:'08:00',
                    txt:'3333333'
                }
            ]
        },
            {
                sendtime:'2017/01/08',
                msg:[
                    {
                        time:'12:00',
                        txt:'打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我',
                    },
                    {
                        time:'12:30',
                        txt:'22222'
                    }
                ]
            }
        ]

    },
        {
            url:'../image/touxiang1.png',
            name:'活动信息',
            uid:10001,
            state:true,
            list:{
                msg:0
            },
            msglist:[{
                sendtime:'',
                msg:[{
                    url:'../image/touxiang1.png',
                    txt:'打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我',

                },
                    {
                        url:'../image/touxiang1.png',
                        txt:'打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我',
                    },
                    {
                        url:'../image/touxiang1.png',
                        txt:'打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我',
                        state:false
                    },
                    {
                        url:'../image/touxiang1.png',
                        txt:'大的不好带带我',
                    },
                    {
                        url:'../image/touxiang1.png',
                        txt:'大的不好带带我',
                        state:false
                    },
                    {
                        url:'../image/touxiang1.png',
                        txt:'大的不好带带我',
                        state:false
                    },
                    {
                        url:'../image/touxiang1.png',
                        txt:'大的不好带带我',
                        state:false
                    },
                    {
                        url:'../image/touxiang1.png',
                        txt:'大的不好带带我',
                        state:false
                    },
                    {
                        url:'../image/touxiang1.png',
                        txt:'大的不好带带我',
                        state:false
                    }
                ]
            },
                {
                    sendtime:'2017/01/08',
                    msg:[{
                        url:'../image/touxiang1.png',
                        txt:'打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我',
                        state:true,
                    },
                        {
                            url:'../image/touxiang1.png',
                            txt:'打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我',
                            state:false
                        },
                        {
                            url:'../image/touxiang1.png',
                            txt:'打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我打的不好带带我',
                            state:false
                        },
                        {
                            url:'../image/touxiang1.png',
                            txt:'大的不好带带我',
                            state:true
                        },
                        {
                            url:'../image/touxiang1.png',
                            txt:'大的不好带带我',
                            state:false
                        },
                        {
                            url:'../image/touxiang1.png',
                            txt:'大的不好带带我',
                            state:false
                        },
                        {
                            url:'../image/touxiang1.png',
                            txt:'大的不好带带我',
                            state:false
                        },
                        {
                            url:'../image/touxiang1.png',
                            txt:'大的不好带带我',
                            state:false
                        },
                        {
                            url:'../image/touxiang1.png',
                            txt:'大的不好带带我',
                            state:false
                        }
                    ]
                }
            ]

        },

    ]
}
var chatMsgData =
{
    msgs:[{
        txt:'我说顶顶顶顶'
    },
        {
            txt:'我说顶顶顶顶'
        }
    ]
};
noticeFn(chatData);
*/

