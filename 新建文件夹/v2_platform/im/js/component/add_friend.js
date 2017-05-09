/**
 * Created by zhengy on 2017/1/10.
 */
$(function(){
    tinyScroll();
    $(window).resize(function(){
        tinyScroll();
    });
    //搜索功能
    searchVue = new Vue({
        el:'#search_con',
        data:{
            word:''
        },
        methods:{
            searchFn: function() {
                console.dir(this.$data.word);
                var txt = this.$data.word;
                PL.callFun('imaddfriendframe', 'searchuser', txt);
            }
        }
    })
    //关闭功能
    $('body').on('click','#add_friend .close_btn',function(){
        //alert(1)
        PL.callFun('imaddfriendframe', 'close', '');
    })  
});
//滚动条
function tinyScroll(){
    $('#in_search_list').tinyscrollbar();
}

var friendList,searchVue,recommendGame;
friendList = new Vue({
        el:'#recommend_list',
        data:{
            title:'推荐的好友',
            lists:''
        },
        methods:{
            addFn:function(index){
               // console.dir(this.$data.lists[index].userid)
            }
        }
})

//推荐的好友
function recommend_list(data){
    friendList.$data = data;
}
//推荐的游戏
function recommend_game(data){
    recommendGame = new Vue({
        el:'#recommend_game',
        data:data,
        methods: {
            playGame: function (index) {
                //console.dir(this.$data.lists[index].gameid)
            }
        }
    })
}

/*
 var listData ={
 title:'推荐的好友',
 lists:[{
 url:'../image/touxiang1.png',
 name:'爱雷士',
 userid:'1000',
 gameid:'1000',
     state:true,
 num:2000
 },
 {
 url:'../image/touxiang1.png',
 name:'爱雷士',
 userid:'1000',
 gameid:'1001',
     state:false,
 num:2000

 },
 {
 url:'../image/touxiang1.png',
 name:'爱雷士',
 userid:'1000',
 gameid:'1002',
     state:true,

     num:2000


 },
 {
 url:'../image/touxiang1.png',
 name:'爱雷士',
 userid:'1000',
 gameid:'1003',
     state:true,

     num:2000


 }
 ]
 }
recommend_list(listData);
recommend_game(listData)*/
