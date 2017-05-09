<template>
    <div id="gameset_gamelist" :data-sn="terminal_sn">
        <ul>
            <li class="clearfix tac pr" v-for="(list,$index) in lists">
                <div class="img_container fl pr">
                    <img :src="list.img" >
                    <p class="pa game_title">{{list.name}}</p>
                </div>
                <div class="size_container fl">{{list.size}}</div>
                <div class="sup_service fl">
                    <div class="clearfix">
                        <i class="fl equip_icon" :class="{'deep':ture}" v-if="list.deep"></i>
                        <i class="fl equip_icon" :class="{'htc':true}" v-else-if="list.htc"></i>
                        <i class="fl equip_icon" :class="{'ocu':true}" v-else-if="list.ocu"></i>
                        <i class="fl equip_icon" :class="{'osvr':true}" v-else="list.ocu"></i>
                    </div>
                </div>
                <div class="fl set_btn blueCol">设置</div>
                <div class="pa deletebtn" @click="deleteFn($index)" :data-status="btnMark">{{btnDesc}}</div>
                <!-- <div class="tips_container" v-show="list.tips_state">
                    <div class="pa in_tips">
                        <div class="header pr">
                            <h3 class="f18">设置提示</h3>
                            <i class="icon close_icon"  v-on:click ='closeFn($index)'></i>
                        </div>
                        <div class="body tac">
                            <div class="msg_con" v-if="list.sell.length > 0">
                                <p class="pr"  v-for="(sells,$index2) in list.sell" :title="sells.title"><i class="icon select2_icon" v-bind:class="{'selected' : sells.selected}" v-on:click="toggle($index, $index2)"></i>体验时间：<input type="text" v-model="sells.price">元/<input type="text" v-model="sells.playtime">分钟</p>
                                <p class="pr" v-for='i in 5-list.sell.length'><i class="icon select2_icon selected"></i>体验时间：<input type="text" v-model="list.min">元/<input type="text" v-model="list.hour">分钟</p>
                            </div>
                            <div class="msg_con" v-else>
                                <p class="pr" v-for='(v, $index3) in 5'><i class="icon select2_icon" ></i>体验时间：<input type="text" v-model="list.min">元/<input type="text" v-model="list.hour">分钟</p>
                            </div>
                        </div>
                        <div class="foot tac">
                            <ul class="clearfix btn_container">
                                <li class="fl" v-on:click ='closeFn($index)'>取消</li>
                                <li class="fl" v-on:click="sureFn($index)">确定</li>
                            </ul>
                        </div>
                    </div>
                </div> -->
            </li>
        </ul>
        <div class="page none" >
            <ul class="none" :class="{ showPagination: showPagination }">
                <li><a v-on:click="prevClick()">上一页</a></li>
                <li v-for="index2 in pages"  v-bind:class="{ active: curPage == index2}">
                    <a v-on:click="btnClick(index2)">{{ index2 }}</a>
                </li>
                <li><a v-on:click="nextClick()">下一页</a></li>
                <li><a>共<i>{{totalPages}}</i>页</a></li>
            </ul>
        </div>
    </div>    
</template>

<script>
    export default {
        name:'gameset_gamelist',
        props: {
            dataNum: {
                type: Number,
                default: 0
            },
            cur: {
                type: Number,
                default:1
            },
            each: {
                type: Number,
                default: 20
            },
            visiblepage: {
                type: Number,
                default: 8
            }

        },
        methods:{
            getGameDetail:function(terminal_sn){
                let that=this;
                let url="http://tob.vronline.com/admin/gameDetailList";
                let page = 1;
                let start = (parseInt(page)-1)*that.each;
                let num = that.each;
                that.$http.post(url, {
                    terminal_sn:terminal_sn
                }, {
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if(response.status!=200){
                        return false;
                    }
                    that.dataNum = response.body.data.length;
                    if(that.dataNum > 1){
                        that.showPagination = true;
                    } else {
                        that.showPagination = false;
                    }
                    that.terminal_sn = terminal_sn;
                    that.$router.app.$emit('changeStatus', 0);
                });
                that.$http.post(url, {
                    terminal_sn:terminal_sn,start:start,num:num
                }, {
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if(response.status!=200){
                        return false;
                    }
                    that.lists = response.body.data;
                }, response => {
                    // error callback
                });
            },
            getGameDetailBysort:function(terminal_sn, sortId, name, mark, page){
                let that=this;
                let url="http://tob.vronline.com/admin/game/bysort";
                if(typeof(page)=="undefined" || page < 1) {
                    page = 1;
                }
                let start = (parseInt(page)-1)*that.each;
                let num = that.each;

                that.$http.post(url, {
                    terminal_sn:terminal_sn,category:sortId,name:name,mark:mark
                }, {    
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if(response.status!=200){
                        return false;
                    }
                    that.dataNum = response.body.data.length;
                    if(that.dataNum > 1){
                        that.showPagination = true;
                    } else {
                        that.showPagination = false;
                    }
                    that.terminal_sn = terminal_sn;
                    that.category = sortId;
                    that.name = name;
                });

                that.$http.post(url, {
                    terminal_sn:terminal_sn,category:sortId,name:name,mark:mark,start:start,num:num
                }, {    
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if(response.status!=200){
                        return false;
                    }
                    that.lists = response.body.data;
                }, response => {
                    // error callback
                });
            },
            deleteFn:function(i){
                let that=this;
                let sn = $("#gameset_gamelist").attr("data-sn");
                if(that.btnMark == 0) {
                    var url = "http://tob.vronline.com/admin/game/del";
                }
                if(that.btnMark == 1) {
                    var url = "http://tob.vronline.com/admin/game/add";
                }
                that.$http.post(url, {
                    terminal_sn:sn,appid:that.lists[i].id
                }, {    
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if(response.status!=200){
                        return false;
                    }
                    that.lists.splice(i, 1);
                }, response => {
                    // error callback
                });
            },
            changeBtn:function(i) {
                let that=this;
                if(i === 1){
                    that.btnDesc = '删除';
                    that.btnMark = 0;
                    that.mark = 1;
                } else {
                    that.btnDesc = '添加';
                    that.btnMark = 1;
                    that.mark = 0;
                }
            },
            btnClick: function(index){
                let that = this;
                that.curPage = index;
                that.getGameDetailBysort(that.terminal_sn, that.category, that.name, that.mark, index);
            },
            nextClick: function() {
                let that = this;
                if (that.curPage < that.totalPages) {
                    that.curPage++;
                    that.getGameDetailBysort(that.terminal_sn, that.category, that.name, that.mark, that.curPage);
                }
             },
            prevClick: function() {
                let that = this;
                if (that.curPage > 1) {
                    that.curPage--;
                    that.getGameDetailBysort(that.terminal_sn, that.category, that.name, that.mark, that.curPage);
                }
            }
        },
        computed: {
            totalPages: function(){
                var that = this;
                return Math.ceil(that.dataNum / that.each) || 0;
            },
            pages: function(){
                var lowPage = 1;
                var that = this;
                var highPage = that.totalPages;
                var pageArr = [];

                
                if(that.totalPages > that.visiblepage){
                    var sub = Math.ceil(that.visiblepage/2);
                    if(that.curPage > sub && that.curPage < that.totalPages - sub +1){
                        lowPage = that.curPage - sub;
                        highPage = that.curPage + sub - 2;
                    }else if(that.curPage <= sub){
                        lowPage = 1;
                        highPage = that.visiblepage;
                    }else{
                        lowPage = that.totalPages - that.visiblepage + 1;
                        highPage = that.totalPages;
                    }
                }

                while(lowPage <= highPage){
                    pageArr.push(lowPage);
                    lowPage ++;
                }
                return pageArr;
            }
        },
        created: function() {
            let that = this;
            that.curPage = that.cur;
            that.$router.app.$on('getGameDetail', function(data){
                that.getGameDetail(data);
            });
            that.$router.app.$on('getGameDetailBysort', function(terminal_sn, sortId, name, mark){
                if(name == 'undefined'){name = '';}
                if(mark == 'undefined'){mark = '';}
                that.getGameDetailBysort(terminal_sn, sortId, name, mark);
            });
            that.$router.app.$on('changeBtn', function(i){
                that.changeBtn(i);
                console.log(i);
            });
        },
        data(){
            return{
                terminal_sn:'',
                btnDesc:'删除',
                btnMark:0,
                mark:1,
                category:0,
                name:'',
                showPagination:false,
                lists:[],
            }
    }
    }
</script>
<style>
    .deletebtn{
        right: 16px;
        line-height: 30px;
        background: #169bd6;
        border-radius: 1px;
        -webkit-border-radius: 1px;
        width: 60px;
        color: #fff;
        top: 50%;
        margin-top: -15px;
        cursor: pointer;
    }
    .deletebtn:hover{
        background: #23a0bf;
    }
    .none{
        display: none;
    }
    
    .page{
        width: 342px;
        display: inline-flex;
    }
    .page ul{
        margin:0 auto;
    }

    .page .showPagination{display: block;}
    .page ul li:nth-child(1){
        width:auto;
    }
    .page ul li{
        padding: 4px 8px;
        float:left;
        text-align: center;
        cursor: pointer;
    }
    .page ul li .active{
        
    }
    .page ul li a:hover{
        color: #fff;
    }
    .set_btn{line-height: 60px;margin-left: -16px; text-decoration: underline; cursor: pointer;}
</style>