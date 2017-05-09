<template>
    <div class="downloadcon" id="downloadcon">
        <div class="tips">
            <p>{{tips}}</p>
            <p>{{tipsmsg}}</p>
        </div>
        <div class="in_download_con tac">
            <ol class="clearfix">
                <li class="fl">VR游戏</li>
                <li class="fl">大小</li>
                <li class="fl">进度</li>
                <li class="fl">操作</li>
            </ol>
            <ul class="gamelist" v-if="lists.length >0">
                <li v-for="(list,$index) in lists" class="clearfix">
                    <div class="img_con fl">
                        <img :src="'//image.vronline.com/'+list.image.logo">
                    </div>
                    <div class="download_size fl">{{list.score}}</div>
                    <div class="download_state fl">
                        <div  class="blueCol" v-if="gameStatus[list.id].status == 2">下载成功</div>
                        <div  class="erroCol" v-if="gameStatus[list.id].status == 3" >下载失败</div>
                        <div class="pr progress_con" v-if="gameStatus[list.id].status == 1 || gameStatus[list.id].status == 0 ">
                            <div class="pr">
                                <div class="pr progress_total">
                                <div class="pa in_progress_con" :style="{ width: gameStatus[list.id].pos+'%' }"></div>
                                </div>
                                <p class="pa progress_txt">{{gameStatus[list.id].txt}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="download_btn fl pr">
                        <div v-if="gameStatus[list.id].status == 1">
                           <div class="fl pause_btn cp" @click="pause(list.id)">暂停</div>
                           <div class="delete_btn erroCol fl cp" @click="deleteFn($index,list.id)">删除</div>
                       </div>
                       <div v-if="gameStatus[list.id].status == 3" class="re_download clearfix">
                           <div class="re_download_btn fl cp" @click="redownload(list.id)">重新下载</div>
                           <div class="delete_btn erroCol fl cp" @click="deleteFn($index,list.id)">删除</div>
                       </div>
                       <div v-if="gameStatus[list.id].status == 0">
                           <div class="fl pause_btn cp" @click="play(list.id)">继续</div>
                           <div class="delete_btn erroCol fl cp" @click="deleteFn($index,list.id)">删除</div>
                       </div>
                    </div>
                    <div class="tips_container" v-show="list.delete_tips_state">
                        <div class="pa in_tips">
                            <div class="header pr">
                                <h3 class="f18 tal">提示信息</h3>
                                <i class="icon close_icon"  v-on:click ='closeFn()'></i>
                            </div>
                            <div class="body tac">
                                <p class="icon_container pr"><i class="icon warning_icon"></i></p>
                                <p>您确定是否要删除当前游戏？</p>
                            </div>
                            <div class="foot tac">
                                <ul class="clearfix btn_container">
                                    <li class="fl" v-on:click="suc_sureFn($index,list)">确定</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="undownload_data f14" v-if="lists.length <=0">
                暂无下载数据,请从游戏库下载!
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:'downloadcon',
        methods:{
            deleteFn:function(i,id){
                this.lists.splice(i,1);
                window.CppCall('gamelistframe', 'deleteinstall','{"gameid":'+id+',"isdellocal":0}');
            },
            play:function(id){
                //alert(id)
                window.CppCall('gamelistframe', 'insfuncclicked','{"gameid":'+id+'}');
            },
            pause:function(id){
                //alert(id)
                window.CppCall('gamelistframe', 'insfuncclicked','{"gameid":'+id+'}');
            },
            redownload:function(id){
                window.CppCall('gamelistframe', 'insfuncclicked','{"gameid":'+id+'}');
            },
            suc_sureFn:function($index,list){
                this.lists[$index].delete_tips_state = false ;
                this.lists.splice($index,1);
            },
            closeFn:function(i){
                this.lists[i].delete_tips_state = false ;
            },
            getdowngame:function(gameid){
                console.log(gameid);
                if(gameid.length==0){
                    return false;
                }
                var that = this;
                var url = 'http://tob.vronline.com/admin/game' ;
                that.$http.post(url, {
                    inids:gameid
                }, {
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    console.dir('ok')
                    that.lists = response.body.data.data;
                    //this.initGameStat()
                    that.initGamestatus(that.lists)
                    if(response.status!=200){
                        return false;
                    }

                }, response => {
                    // error callback
                });
            },
            initGamestatus:function(data){
                var len = data.length
                for(var i=0;i<len;i++) {
                    var gameId = data[i].id
                    if(typeof(this.gameStatus[gameId])=='undefined') {
                        this.gameStatus[gameId] = {gameid:gameId,status:0,pos:0,txt:""}
                    }
                }
            },
            updateStatus:function(){
                var that = this ;
                //console.log('111')
                that.$router.app.$off('downloadstatus');
                that.$router.app.$on('downloadstatus',function(res) {
                    //console.dir(res);
                    that.getDownStauts(res);
                });

            },
            getDownStauts(res){
                console.log(res);
                var that=this;
                var id = [];
                for(var i in res) {
                    var gameId = res[i].gameid;
                    id.push(gameId); 
                    if(typeof(that.gameStatus[gameId])=="undefined") {
                        that.gameStatus[gameId] = {gameid:gameId,status:0,pos:0,txt:''}
                    }
                    if(typeof(res[i].status)!="undefined" && res[i].status != '') {
                        that.gameStatus[gameId].status = res[i].status
                    }
                    if(typeof(res[i].pos)!="undefined" && res[i].pos !='') {
                         that.gameStatus[gameId].pos = res[i].pos
                    }
                    if(typeof(res[i].txt)!="undefined" && res[i].txt !='') {
                         that.gameStatus[gameId].txt = res[i].txt
                    }
                }
                that.getdowngame(id);
                that.$router.app.$emit('downloadMagger', id);    
            }
        },
        created:function(){
            //console.log(this.$router.app.gamedowndata); 
            var that = this;
            that.updateStatus();
            console.dir(that.gameStatus);
            that.getDownStauts(that.gameStatus);
        },
        data(){
        return{
            tips:'助手提示：（在这里您可以查看到所有VR游戏下载进度哟）',
            tipsmsg:'1）查看游戏下载进度； 2）对当前下载安装的游戏可操作暂停下载/删除/取消安装等；',
            lists:[],
            gameStatus:this.$router.app.gamedowndata
        }
    }
    }
</script>
<style>
    .in_download_con {color: #8196b0;}
    .in_download_con ol{background: rgba(47,53,68,.3);line-height: 32px; }
    .in_download_con ol li,.in_download_con ul li div.img_con{width: 144px;margin:0 30px; }
    .in_download_con ol li:nth-child(2),.in_download_con ul li .download_size{width: 100px;}
    .in_download_con ol li:nth-child(3),.in_download_con ul li .download_state{width:200px;}
    .in_download_con ol li:nth-child(4),.in_download_con ul li .download_btn{width:200px;}
    .in_download_con ul{padding: 0 10px;}
    .in_download_con ul li.clearfix{padding:10px 0;border-bottom: 1px solid #293141;}
    .in_download_con ul li div img{width: 100%;height: 100%}
    .in_download_con ul li div.img_con{border: 1px solid #000;height: 80px;}
    .in_download_con ul li div.download_size{line-height: 80px;margin: 0 50px  0 20px;}
    .in_download_con ul li div.download_state{line-height: 80px;height: 80px;}
    .in_download_con ul li  div.download_btn{margin: 0 0 0 110px;}
    .in_download_con ul li .progress_con{width: 100%;padding: 1px;height: 4px;background: rgba(0,0,0,.5); margin:40px 0 0 0;}
    .in_download_con ul li .progress_total{height: 100%;width: 100%;margin: 0;}
    .in_download_con ul li .progress_con .in_progress_con{background: #169bd6;height: 4px;left: 0px;top: 0;margin: 0;}
    .in_download_con ul li .progress_con p{line-height: 24px;}
    .in_download_con ul li .re_download div{margin: 0;}
    .in_download_con ul li .download_btn .re_download_btn,.in_download_con ul li .download_btn .pause_btn{width: 68px;line-height: 30px; background: #169bd6; color: #fff;border-radius: 2px;margin: 26px 10px 0 0;}
    .in_download_con ul li  .delete_btn{width: 30px;line-height: 80px; text-decoration: underline;margin: 0;}
    .in_download_con ul li .re_download .re_download_btn:hover,.in_download_con ul li .download_btn .pause_btn:hover{background: #23a0bf;}
    .in_download_con  .icon_container{line-height: 36px;text-indent: 20px;}
    .undownload_data{line-height: 100px;}
    .progress_txt{top:6px;left: 0;text-align: left;width: 240px;}
</style>

<!-- 
{"type":"gamesstatusres","data":[{"gameid":1000017,"status":10},{"gameid":1000033,"status":0},{"gameid":1000028,"status":0},{"gameid":1000020,"status":0},{"gameid":1000022,"status":0},{"gameid":1000021,"status":0},
 -->

<!-- {"type":"gamedowninfores","data":[{"gameid":1000023,"status":0,"pos":"20","txt":"下载了"},{"gameid":1000033,"status":0,"pos":"20","txt":"下载了"}]} -->


<!-- {"1000017":{"gameid":1000017,"status":3,"pos":0,"txt":""},"1000019":{"gameid":1000019,"status":0,"pos":4,"txt":""},"1000033":{"gameid":1000033,"status":0,"pos":0,"txt":""},"undefined":{"status":0,"pos":0,"txt":""}} -->