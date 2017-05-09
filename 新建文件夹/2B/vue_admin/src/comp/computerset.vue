<template>
    <div class="computerset" id="computerset">
        <div class="in_set_header clearfix">
            <div class="fl pr">
                <i class="icon computer_icon"></i>
                <span class="f14">{{version}}</span>
            </div>
            <div class="fr">
                <ul class="clearfix computerset_btn tac" >
                    <li class="fl cp" v-on:click="sysnBtnUpload()">一键同步</li>
                    <li class="fl cp" v-on:click="sysnBtnUpload()">保存当前设置</li>
                    <!-- <li class="fl cp cur">保存当前设置</li> -->
                </ul>
            </div>
        </div>
        <div class="in_ste_body">
            <ul class=" clearfix">
                <router-link to = '/storeroom/gameset/ingame/list'>
                    <li class="fl f14" v-for="(item,$index) in items" :class="{cur:item.cur}" :data-index="item.mark" v-on:click="setFn($index)">
                        {{item.name}}
                    </li>
                </router-link>

            </ul>
            <div class="search_con">
                <div class="fl pr in_search_con">
                    <input id="inputName" type="text" placeholder="请输入游戏名称" v-on:keyup.enter="searchGameBySortName()">
                    <i class="icon search_icon" v-on:click="searchGameBySortName()" style="cursor: pointer"></i>
                </div>
                <select name="category" id="category_select"  @change="onSelectedDrug($event)">
                    <option value="0" selected>所有分类</option>
                    <option :value="game.id" v-for="game in gameCategory">{{game.name}}</option>
                </select>
            </div>
        </div>
        <div class="in_ste_container">
            <ol class="clearfix tac">
                <li class="fl">VR游戏</li>
                <li class="fl">大小</li>
                <li class="fl">支持设备</li>
                <li class="fl">操作</li>
            </ol>
            <div class="game_list_con">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'computerset',
        methods:{
            setFn:function(index){
                let that = this;
                let sn = $("#gameset_gamelist").attr("data-sn");
                let sortId = 0;
                let name = '';
                that.items.map(function(v,i){
                    i== index ? v.cur =true: v.cur = false;                 
                });
                that.items.map(function(vv,ii){
                    ii== index ? that.mark=0 :that.mark =1;                
                });
                if(that.cur) {
                    this.$router.app.$emit('changeBtn', that.mark);
                    this.$router.app.$emit('getGameDetailBysort', sn, sortId, name, that.mark);
                }
                
            },
            getCategory:function(){
                let that=this;
                let url="http://tob.vronline.com/admin/game/category";
                that.$http.get(url, {
                    terminal_sn:123
                }, {
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if(response.status!=200){
                        return false;
                    }
                    console.log(response);
                    that.gameCategory = response.body.data;
                    that.category_num = response.body.data.length;
                }, response => {
                    // error callback
                });
            },
            searchGameBySortName:function(){
               let that=this;
               let sn = $("#gameset_gamelist").attr("data-sn");
               let sortId = $("#category_select").val();
               let name = $("#inputName").val();
               let mark = that.mark;
               that.$router.app.$emit('getGameDetailBysort', sn, sortId, name, mark);
            },
            // 选择框
            onSelectedDrug(event) {
                let that=this;
                let sn = $("#gameset_gamelist").attr("data-sn");
                let sortId = event.target.value;
                let name = $("#inputName").val();
                let mark = that.mark;
                that.$router.app.$emit('getGameDetailBysort', sn, sortId, name, mark);
            },
            changeStatus: function(index){
                let that = this;    
                that.items.map(function(v,i){
                    i== index ? v.cur =true: v.cur = false;                   
                });
            },
            changeVersion: function(version){
                let that = this;
                that.version = version;
            },
            sysnBtnUpload: function(){
                let that=this;
                let sn = $("#gameset_gamelist").attr("data-sn");
                let url="http://tob.vronline.com/admin/terminalmsg";
                that.$http.post(url, {
                    terminal_sn:sn
                }, {
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if(response.status!=200){
                        return false;
                    }
                }, response => {
                    // error callback
                });
            }
        },
        created:function(){
            let that = this;
            that.getCategory();
            that.$router.app.$on('changeStatus', function(index){
                that.changeStatus(index);
            });
            that.$router.app.$on('changeVersion', function(version){
                that.changeVersion(version);
            });
        },
        data(){
        return {
            version:'0001',
            mark:1,
            cur:true,
            items:[
                {name:'已添加',cur:true,mark:1,desc:'删除'},
                {name:'未添加',cur:false,mark:0,desc:'添加'}
            ],
            gameCategory:[
                {name:'烈火传奇'},
                {name:'烈火传奇'},
                {name:'烈火传奇'},
                {name:'烈火传奇'},
            ]
        }
    }
    }
</script>
<style>
    .computerset .in_set_header ul.computerset_btn li{
        width: 80px;
        line-height: 30px;
        height: 30px;
        background: #169bd6;
        color: #fff;
        border-radius: 1px;
        -webkit-border-radius: 1px;
        margin: 0 8px;
    }
    .computerset .in_set_header ul.computerset_btn li:hover{background:#23a0bf; }
    .computerset .in_set_header ul.computerset_btn li.cur{
        background: #23a0bf;
    }
    .in_set_header{
        padding: 18px 0;
    }
    .in_set_header span{
        line-height: 30px;
        text-indent: 34px;
        display: inline-block;
    }
    .computer_icon{
        width: 16px;
        height: 14px;
        left: 10px;
        top: 50%;
        margin-top: -7px;
        background:url(../assets/icon.png)  -100px -42px;
    }
    .in_ste_body{padding:0 10px}
    .in_ste_body ul{
        border-bottom: 1px solid #293141;
    }
    .in_ste_body ul li{
        line-height: 24px;
        margin:0 10px;
    }
    .in_ste_body ul li.cur{color: #03a9f4;}
    .search_con{margin: 16px 0;}
    .search_con .in_search_con{ width: 210px;height: 30px;}
    .search_con input{
        line-height: 30px;
        text-indent: 10px;
        width: 210px;
        border: none;
        outline: none;
        color:#969696 ;
        background: rgba(20,26,37,.6);
    }
    .search_con select{
        line-height: 30px;
        height: 30px;
        background: rgba(40,48,64,.8);
        outline: none;
        border-radius: 4px;
        color:#969696 ;
        margin:0 10px;
    }
    .search_con select option{line-height: 30px;}
    .in_ste_container{padding:0 10px;}
    .in_ste_container  li:nth-child(1){width: 106px;}
    .in_ste_container ol li:nth-child(2),.size_container{width: 26px;margin:0 6px 0 12px;}
    .in_ste_container ol li:nth-child(3),.sup_service{width: 116px;}
      .in_ste_container ol li:nth-child(4){width: 56px;}
    .in_ste_container .img_container{width: 106px;height: 60px;border: 1px solid #000;}
    .in_ste_container ol{border-bottom: 1px solid #293141;}
    .in_ste_container ol li{line-height: 24px;}
    .in_ste_container ul li{margin-top: 10px;}
    .in_ste_container ul li:nth-child(1){width: 100%;}
    .equip_icon{margin: 0 2px; width: 18px;height: 18px;}
    .size_container{line-height: 60px;margin: 0 6px 0 10px;}
    .sup_service div{margin-top: 20px;display: inline-block;}
    .game_title{width: 100%;bottom: 0;line-height: 20px; background: rgba(0,0,0,.6);text-align: left;text-indent: 6px; color: #969696;}
    .computerset .deletebtn{right: 0;}
</style>