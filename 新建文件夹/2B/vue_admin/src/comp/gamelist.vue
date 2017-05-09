<template>
    <div class="gamelist" id="gamelist">
        <ol infinite-scroll-disabled="loading" v-infinite-scroll="loadMoreTest">
            <li v-for="(list,$index) in gamelist" :key="list.id" class="clearfix gamelist_con">
                <div class="fl" style="width: 168px;">
                    <div class="imgcon pr">
                        <img :src="'//image.vronline.com/'+list.image.logo">
                        <p class="pa game_title">{{list.name}}</p>
                    </div>
                </div>
                <div class="fl tac" style="width: 100px;">1.2G
                    <!-- {{list.size}} -->
                </div>
                <div class="fl tac" style="width: 100px;">1.0.1
                    <!-- {{list.version}} -->
                </div>
                <div class="fl tac sup_equipment" style="width: 140px;">
                    <ul class="" v-for="icon in list.support">
                        <li class="fl" v-bind:class="[support[icon]]"></li>
                        <!-- <li v-if="list.htc == true"  class="fl" :class="{'htc':list.htc}"></li>
                        <li v-if="list.ocu == true"  class="fl" :class="{'ocu':list.ocu}"></li>
                        <li v-if="list.osvr == true" class="fl"  :class="{'osvr':list.osvr}"></li> -->
                    </ul>
                </div>
                <div class="grade fl tac" style="width: 100px;">{{list.score}}</div>
                <div class="fl sell tac" style="width: 100px;">￥{{list.sell}}</div>
                <div class="btn_con fl tac" style="width: 200px;">
                    <ul class="clearfix" v-if="type=='store'">
                        <li v-on:click="buyFun(list.id,$index)" v-show="!list.purchased" class="fl tac gamelist_btn install_btn cur">购买</li>
                        <li class="purchased gamelist_btn" v-show="list.purchased">已购买</li>
                    </ul>
                    <ul class="clearfix" v-else-if="type=='mygame'">
                        <li v-on:click="installFn(list.id)" v-if="gameStatus[list.id].status==0" class="fl tac gamelist_btn install_btn cur">安装</li>
                        <li class="fl tac gamelist_btn install_btn unclick_btn cur" v-if="gameStatus[list.id].status==10">已安装</li>
                        <li class="fl tac gamelist_btn install_btn  cur" v-if="gameStatus[list.id].status==2">等待中</li>
                        <li v-on:click="installingFn(list.id)" class="fl tac gamelist_btn installed_btn pr cur" v-if="gameStatus[list.id].status==3">安装中...
                            <p class="download_pro pa ells">正在下载<i>{{gameStatus[list.id].pos}}%</i>...<b>{{gameStatus[list.id].txt}}</b></p>
                        </li>
                        <li v-on:click="updataFn(list.id)" class="fl tac gamelist_btn updata_btn cur pr" v-if="gameStatus[list.id].status==1">更新</li>
                        <li v-on:click="updatingFn(list.id)" class="fl tac gamelist_btn updating_btn pr cur" v-if="gameStatus[list.id].status==4">取消更新
                            <p class="download_pro pa ells">正在下载<i>{{gameStatus[list.id].pos}}%</i>...<b>{{gameStatus[list.id].txt}}</b></p>
                        </li>
                        <li v-on:click="syncFn(list.id)" class="fl tac gamelist_btn sync_btn" v-show="list.sync">同步</li>
                    </ul>
                </div>
                <div class="tips_container" v-show="">
                    <div class="pa in_tips">
                        <div class="header pr">
                            <h3 class="f18 tal">提示信息</h3>
                            <i class="icon close_icon"  v-on:click ='closeFn()'></i>
                        </div>
                        <div class="body tac">
                            <p class="icon_container pr"><i class="icon warning_icon"></i></p>
                            <p class="f14">当前游戏有最新版本！</p>
                            <p class="f14">请先更新至最新版本后再同步至其它客机电脑中！</p>
                        </div>
                        <div class="foot tac">
                            <ul class="clearfix btn_container">
                                <li class="fl" v-on:click="sureFn()">确定</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tips_container" v-show="">
                    <div class="pa in_tips">
                        <div class="header pr">
                            <h3 class="f18 tal">提示信息</h3>
                            <i class="icon close_icon"  v-on:click ='closeFn()'></i>
                        </div>
                        <div class="body tac">
                            <p class="icon_container pr"><i class="icon warning_icon"></i></p>
                            <p class="f14">当前游戏有最新版本！</p>
                            <p class="f14">请先更新至最新版本后再同步至其它客机电脑中！</p>
                        </div>
                        <div class="foot tac">
                            <ul class="clearfix btn_container">
                                <li class="fl" v-on:click="sureFn()">确定</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        </ol>
        <span style="text-align: center; height:25px;display: block;" v-show="loading">载入中…</span>
    </div>
</template>
<script>
import db from "../db"

export default {
    name: 'gamelist',
    methods: {
            //关闭
       
        buyFun: function(appid, i) {
            let param = {
                appid: appid,
            };
            this.$http.post("//tob.vronline.com/admin/game/buy", param, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                //console.log(response.data.data.data);
                this.$set(this.gamelist[i], "purchased", true);
                this.$set(this.gamelist[i], "install", true);
            }, response => {
                // error callback
            });
        },
        installFn: function(i) {
            window.CppCall('gamelistframe', 'insfuncclicked', '{"gameid":'+i+'}');
        },
        installingFn: function(i) {
            window.CppCall('gamelistframe', 'insfuncclicked', '{"gameid":'+i+'}');

        },
        updataFn: function(i) {
            
            window.CppCall('gamelistframe', 'insfuncclicked', '{"gameid":'+i+'}');

        },
        updatingFn: function(i) {
            

            window.CppCall('gamelistframe', 'insfuncclicked', '{"gameid":'+i+'}');
        },
        syncFn: function(i) {
            window.CppCall('gamelistframe', 'insfuncclicked', '{"gameid":'+i+'}');
        },
        getList: function() {
            let url = "";
            let params = {};
            if(!this.canLoadMore){
                return false;
            }
            if (this.type == "store") {
                url = "//tob.vronline.com/admin/search";
            }
            if (this.type == "mygame") {
                url = "//tob.vronline.com/admin/game";
            }
            if (this.params) {
                params = this.params;
            }
            this.$http.post(url, params, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                if (response.status != 200) {
                    this.loading = false;
                    return false;
                }
                if (response.data.code != 0) {
                    this.loading = false;
                    return false;
                }

                if(response.data.data.data.length<10){
                    this.canLoadMore=false;
                };

                if(this.params.start==0){
                    this.initGameStat(response.data.data.data)
                    this.gamelist = response.data.data.data;
                    this.loading = false;
                }else if(this.params.start>1){
                    this.initGameStat(response.data.data.data)
                    this.gamelist=this.gamelist.concat(response.data.data.data);
                    this.loading = false;
                }
                
                this.params.start=this.params.start+10;
                if (this.type == "store") {
                    this.$router.app.$emit('upAllGameNum', response.data.data.num);
                } else if (this.type == "mygame") {
                    this.$router.app.$emit('upMyGameNum', response.data.data.num);
                }

                //this.loading = false;
                //this.someData = response.body;
            }, response => {
                // error callback
            });
        },
        getCategory(){
            this.$http.get("//tob.vronline.com/admin/game/category", {}, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                if (response.status != 200) {
                    return false;
                }
                if (response.data.code != 0) {
                    return false;
                }
                this.$router.app.$emit('upGameCategory', response.data.data);
            }, response => {
                // error callback
            });
        },
        loadMoreTest() {
            //console.log(this.canLoadMore);
            if(!this.canLoadMore){
                return false;
            }
            this.loading = true;
            if(this.firstLoad){
                this.firstLoad=false;
                this.getList();
                return false;
            }
            setTimeout(() => {
                this.getList();
                //this.gamelist=this.gamelist.concat(this.gamelist);
               
            }, 2500);
        },
        loadGameStatus(){
           this.gameStatus = db.get('game');
        },
        initGameStat(data) {
            var len = data.length
            for(var i=0;i<len;i++) {
                var gameId = data[i].id
                if(typeof(this.gameStatus[gameId])=='undefined') {
                    this.gameStatus[gameId] = {gameid:gameId,status:0,pos:0,txt:""}
                }
            }
            //onsole.log(this.gameStatus)
        },
        updateGameStatus() {
            var that = this;
            if (that.type == "mygame") {
                this.$router.app.$off('updateStatus');
                this.$router.app.$on('updateStatus',function(res) {
                for(var i=0;i<res.length;i++) {
                    var gameId = res[i].gameid
                    if(typeof(that.gameStatus[gameId])=="undefined") {
                        that.gameStatus[gameId] = {gameid:gameId,status:0,pos:0,txt:''}
                    }
                    if(typeof(res[i].status)!="undefined") {
                        that.gameStatus[gameId].status = res[i].status
                    }
                    if(typeof(res[i].pos)!="undefined") {
                         that.gameStatus[gameId].pos = res[i].pos
                    }
                    if(typeof(res[i].txt)!="undefined") {
                         that.gameStatus[gameId].txt = res[i].txt
                    }
                        
                    // if(typeof(that.gamelist[i].id) != 'underfined'){
                    //     that.$router.this.$router.app.$emit('upGameCategory', that.gamelist[i]);
                    // }
                }
                });
            }
            
        }
    },
    created: function() {
        let _this = this;
        this.params={start:0};
        this.canLoadMore=true;

        this.$router.app.$off('down');
        this.$router.app.$on('down',function(name){
            console.log("receive vue down")
        });
 
        this.getCategory();
        this.loadGameStatus();
        this.updateGameStatus();
        this.$router.app.$off('getList');
        this.$router.app.$on('getList', function(params) {
            _this.gamelist={};
            _this.loading = true;
            if(params){
                _this.params=params;
            }
            _this.params.start=0;
            console.log(_this.params);
            _this.canLoadMore=true;
            _this.getList();
        });  
    },    
    props: ["type"],
    data() {
        return {
            firstLoad:true,
            loading:false,
            support: ["deep", "ocu", "ocu-r", "htc", "osvr"],
            gamelist: [],
            gameStatus:{}
        }
    }
}
</script>
<style>
.imgcon {
    width: 142px;
    height: 80px;
    border: 1px solid #000;
}

.imgcon img {
    width: 100%;
    height: 100%;
    border: 1px solid #1c1e20;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

#gamelist ol {
    padding: 10px;
}

#gamelist li.gamelist_con{
    padding: 16px 20px 10px;
    height: 82px;
    border-bottom: 1px solid #293141;
}
#gamelist li.gamelist_con div.fl.tac{line-height: 80px;}
#gamelist .btn_con {
    width: 220px;
}

#gamelist .btn_con ul {
    display: inline-block;
}

.sup_equipment {
    width: 140px;
}

.sup_equipment ul {
    display: inline-block;
}

.sup_equipment ul li {
    margin: 0 6px;
    width: 18px;
    height: 18px;
}

.deep,
.htc,
.osvr,
.ocu {
    background: url("../assets/vricon.png") no-repeat 0 0;
}

.htc {
    background-position: -18px 0;
}

.ocu {
    background-position: -36px 0;
}

.osvr {
    background-position: -54px 0;
}

.gamelist_btn.cur,
.gamelist_btn:hover,
.gamelist_btn.cur:active {
    border-color: rgba(0, 0, 0, 0);
    color: #fff;
    background: #23a0bf;
}

.gamelist_btn.cur:hover {
    background: #2cdef5;
}

.gamelist_btn {
    width: 68px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    font-size: 14px;
    margin-top: 24px;
    cursor: pointer;
    margin: 24px 8px 0;
    color: #169bd6;
    border: 1px solid #169bd6;
    border-radius: 1px;
}

.gamelist_btn.installed_btn,
.gamelist_btn.updating_btn {
    background: rgba(35, 160, 191, 0.7);
}

.gamelist_btn .download_pro {
    width: 200px;
    left: -60px;
    color: #828f9e;
    font-size: 12px;
}

.gamelist_btn .download_pro b {
    font-weight: normal;
}

.gamelist_btn.updating_btn .download_pro {
    left: -20px;
}

.gamelist_btn.unclick_btn {
    background: #384355;
    border-color: rgba(0, 0, 0, 0);
    color: #fff;
    cursor: default;
    pointer-events: none;
}
.gamelist_btn.purchased{background: #384355;border: 1px solid #384355;color: #fff; cursor: default;}
</style>
