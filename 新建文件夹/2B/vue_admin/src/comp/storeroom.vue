<template>
    <div id="admin">
        <div class="container">
            <ul class="head tal clearfix">
                <router-link tag="li" to="/storeroom/all" class="pr fl head_nav">
                    <a>所有游戏</a>
                </router-link>
                <router-link tag="li" to="/storeroom/mygame" class="pr fl head_nav">
                    <a>我的游戏库<i class="pa msg_num" v-if="gamedata>0">{{gamedata}}</i></a>
                </router-link>
                <router-link tag="li" to="/storeroom/gameset" class="pr fl head_nav">
                    <a>游戏配置</a>
                </router-link>
                <router-link tag="li" to="/storeroom/download" class="pr fl head_nav">
                    <a>下载管理 <i class="pa msg_num" v-if="downloadnum > 0">{{downloadnum}}</i></a>
                </router-link>
                <li class="pr fl head_nav"><a @click="login">登录</a></li>
            </ul>
            <router-view :gametypes="gametypes"></router-view>
        </div>
    </div>
</template>
<script>
import db from "../db"
export default {
    name: 'storeroom',
    data() {
        return {
            gamedata: '0',
            downloadnum: '0',
            msg: '这是测试',
            tips: '助手提示：（在这里您可以查看到所有VR游戏例表）',
            tipsmsg: '1）浏览所有VR游戏；      2）购买游戏，或安装游戏免费试玩；',
            gametypes: {
                0: {
                    id: "0",
                    name: "全部"
                }
            }
        }
    },
    created() {
        //console.log(this.$route.path)

        if (this.$route.path == "") {

        }
        let _this = this;
        this.getGameNum();
        this.$router.app.$off('upGameCategory');
        this.$router.app.$on('upGameCategory', function(data) {
            _this.gametypes = Object.assign({},_this.gametypes, data);
        });
        this.getDownNum();
    },
    methods: {
        rmsg() {
            console.log(db.get('test1'));
        },
        login() {
            this.$http.post("//tob.vronline.com/login/master", {
                name: "forfire",
                pwd: "123123"
            }, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                console.log("login in")
            }, response => {
                // error callback
            });
        },
        getGameNum: function() {
            let url = "//tob.vronline.com/admin/game";

            this.$http.post(url, {}, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                if (response.status != 200) {
                    return false;
                }
                if (response.data.code != 0) {
                    return false;
                }
                let num = response.data.data.num;
                if (num > 99) {
                    num = "99+";
                }
                this.gamedata = num;
                //this.loading = false;
                //this.someData = response.body;
            }, response => {
                // error callback
            });
        },
        getDownNum:function(){
                    var that = this ;
                    that.$router.app.$on('downloadMagger',function(res) {
                    console.dir(res);
                    var len = res.length;
                    that.downloadnum = len;
                });
                    
        }
    }
}
</script>
<style>
#admin .container .head {
    width: 100%;
    border-bottom: 1px solid #293141;
}

#admin .container .head a {
    font-size: 14px;
    color: #8196b0;
}

#admin .container .head li {
    padding: 0 6px;
    line-height: 24px;
    margin-bottom: -1px;
    margin: 0;
    display: inline-block;
    margin: 0 2px;
}

#admin .container .head li.router-link-active {
    border-bottom: 2px solid #26b3c7;
}

#admin .tips {
    margin: 20px 0;
}
</style>
