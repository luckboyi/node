<template>
    <div id="store">
        <div class="tips">
            <p>{{tips}}</p>
            <p>{{tipsmsg}}</p>
        </div>
        <div class="game_type">
            <ul class="clearfix">
                <li v-for="type in gametypes" class="fl" :class="{'router-link-active':type.id==category}" v-if="type.name.lengths !=''" v-on:click="screen_game(type.id)">{{type.name}}</li>
            </ul>
        </div>
        <div class="screen_type clearfix">
<!--             <ul class="clearfix fl">
                <li class="fl pr" v-for="type in types" v-on:click="screen_type(type)"><i class="icon select_icon"></i>{{type.name}}</li>
            </ul> -->
            <div class="search_bar fl pr">
                <input type="text" placeholder="请输入游戏名称" v-on:keyup.enter="searchGame" v-model="gameName">
                <i class="icon search_icon" v-on:click="searcg_game()"></i>
            </div>
            <div class="fr" v-if="num >= 0" style="margin-right:20px;;">总游戏数：{{num}} 款</div>
        </div>
        <div class="gamelist_sec">
            <ul class="clearfix tac title">
                <li class="fl" style="width: 200px;">VR游戏</li>
                <li class="fl" style="width: 100px;">大小</li>
                <li class="fl" style="width: 100px;">版本</li>
                <li class="fl" style="width: 140px;">支持设备</li>
                <li class="fl" style="width: 100px;">评分</li>
                <li class="fl" style="width: 100px;">价格</li>
                <li class="fl" style="width: 200px;">操作</li>
             </ul>
            <gamelist type="store"></gamelist>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sec',
    methods: {
        batchinstall:function(){
             console.log("batchinstall")
             console.log("juesttestb")
            window.CppCall('gamelistframe', 'batchinstall', '');
        },
        batchupdate:function(){
             console.log("batchupdate")
            window.CppCall('gamelistframe', 'batchupdate', '');
        },
        batchsync:function(){
              console.log("batchsync")
            window.CppCall('gamelistframe', 'batchsync', '');
        },
        searchGame() {
            let params={
                name:this.gameName,
                category:this.category
            };
            this.$router.app.$emit('getList',params);
        },
        screen_game(typeid){
            this.category=typeid;
            this.gameName="";
            let params={
                category:this.category
            };
            this.$router.app.$emit('getList',params);
        }
    },
    created() {
        let _this = this;
        this.$router.app.$off('upAllGameNum');
        this.$router.app.$on('upAllGameNum', function(num) {
            _this.num = num;
        });
    },
    props:["gametypes"],
    data() {
        return {
            gameName: '',
            num: 0,
            category:0,
            tips: '助手提示：（在这里您可以查看到所有VR游戏例表）',
            tipsmsg: '1）浏览所有VR游戏；      2）购买游戏，或安装游戏免费试玩；',
            types: [{
                name: '免费',
                typeid: '2001'
            }, {
                name: '付费',
                typeid: '2002'
            }, {
                name: '更新',
                typeid: '2003'
            }, {
                name: '同步',
                typeid: '2004'
            }, ],
            batchtypes: [{
                name: '批量安装',
                typeid: '2004'
            }, {
                name: '批量更新',
                typeid: '2002'
            }, {
                name: '批量同步',
                typeid: '2003'
            }, ],

        }
    }
}
</script>
<style>
.game_type,
.screen_type {
    color: #828f9e;
    width: 100%;
}

.game_type ul li {
    margin-right: 16px;
    cursor: pointer;
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0);
}

.game_type ul li.router-link-active,
.game_type ul li:hover {
    border: 1px solid #23a0bf;
    color: #23a0bf;
}

.select_icon {
    width: 18px;
    height: 18px;
    background-position: -13px 0;
    left: 6px;
}

.select_icon.selected {
    background-position: -31px 0;
}

.screen_type {
    margin: 10px 0;
}

.screen_type ul li {
    text-indent: 30px;
    margin-right: 20px;
    cursor: pointer;
}

.screen_type ol li {
    cursor: pointer;
    margin: 0 10px;
    text-decoration: underline;
    color: #23a0bf;
}

.search_bar {
    width: 216px;
    line-height: 28px;
    height: 28px;
    margin: -6px 0 0 20px;
}

.search_bar input {
    position: absolute;
    width: 100%;
    text-indent: 10px;
    height: 100%;
    background: rgba(20, 26, 37, .6);
    border: none;
    outline: none;
    color: #8196b0;
}

.search_icon {
    width: 18px;
    height: 18px;
    background-position: -49px 0;
    right: 10px;
    top: 50%;
    margin-top: -9px;
}

.gamelist_sec ul.title {
    width: 100%;
    line-height: 32px;
    height: 32px;
    background: #212735;
    color: #828f9e;
}
</style>
