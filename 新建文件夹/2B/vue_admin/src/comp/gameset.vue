<template>
    <div id="gameset">
        <div class="tips">
            <p>{{tips}}</p>
            <p>{{tipsmsg}}</p>
        </div>
        <div class="set_container clearfix">
            <div class="fl in_set_con">
                <div class="set_head clearfix">
                    <h3 class="fl">电脑设备（已接入{{device_num}}台客机）</h3>
                    <div class="address fl">{{address}}</div>
                </div>
                <div class="set_body" >
                    <ul class="clearfix in_set_body" >
                        <!-- <router-link  class="fl cd"  tag="li"  to = '/storeroom/gameset/ingame' v-for="(item, $index) in items"  :class="{'router-active':item.selected}" v-on:click="setCur($index)"> -->
                            <li class="fl cd" v-for="(item, $index) in items"  :class="{'router-active':item.selected}" v-on:click="setCur($index)">
                            <a href="javascript:;" >
                                <div class="fl left_set_con" v-on:click="gameDetail(item.terminal_sn, item.terminal_no)">
                                    <div class="img_container">
                                        <img src="../assets/keji.png">
                                    </div>
                                    <p class="pr tac com_state"><i class="icon" v-bind:class="[item.classObject]"></i>{{item.state}}</p>
                                </div>
                                <div class="fl right_set_con" v-on:click="gameDetail(item.terminal_sn, item.terminal_no)" >
                                    <p>电脑名称：{{item.terminal_no}}</p>
                                    <p :title="item.terminal_sn">电脑编号：{{item.terminal_sn.substr(0, 8)}}...</p>
                                    <p>设备位置：{{item.terminal_address}}</p>
                                    <p>当前状态：{{item.computer_state}}</p>
                                    <p>剩余时间：{{item.time}}</p>
                                    <p class="blueCol cp pr tac" v-on:click.stop.prevent="selectFn($index)">体验时间设定<i class="icon select2_icon" :class="{selected:item.sell_state}" ></i></p>
                                </div>
                                <div class="tips_container" v-show="item.tips_state">
                                    <div class="pa in_tips">
                                        <div class="header pr">
                                            <h3 class="f18">设置提示</h3>
                                            <i class="icon close_icon"  v-on:click ='closeFn($index)'></i>
                                        </div>
                                        <div class="body tac">
                                            <div class="msg_con" v-if="item.sell.length > 0 && item.sell.length < 4">
                                                <p class="pr"  v-for="(sells,$index2) in item.sell" :title="sells.title"><i class="icon select2_icon" v-bind:class="{'selected' : sells.selected}" v-on:click="toggle($index, $index2)"></i>体验时间：<input type="text" v-model="sells.price">元/<input type="text" v-model="sells.playtime">分钟</p>
                                                <p class="pr" v-for='i in 4-item.sell.length'><i class="icon select2_icon selected"></i>体验时间：<input type="text" v-model="item.min">元/<input type="text" v-model="item.hour">分钟</p>
                                            </div>
                                            <div class="msg_con" v-if="item.sell.length == 4">
                                                <p class="pr"  v-for="(sells,$index2) in item.sell" :title="sells.title"><i class="icon select2_icon" v-bind:class="{'selected' : sells.selected}" v-on:click="toggle($index, $index2)"></i>体验时间：<input type="text" v-model="sells.price">元/<input type="text" v-model="sells.playtime">分钟</p>
                                            </div>
                                            <div class="msg_con" v-if="item.sell.length == 0">
                                                <p class="pr" v-for='(v, $index3) in 4'><i class="icon select2_icon" ></i>体验时间：<input type="text" v-model="item.min">元/<input type="text" v-model="item.hour">分钟</p>
                                            </div>
                                        </div>
                                        <div class="foot tac">
                                            <ul class="clearfix btn_container">
                                                <li class="fl" v-on:click ='closeFn($index)'>取消</li>
                                                <li class="fl" v-on:click="sureFn($index)">确定</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <!-- </router-link> -->
                    </ul>
                    <div class="tips_container" v-show="suc_tips_state">
                        <div class="pa in_tips">
                            <div class="header pr">
                                <h3 class="f18">同步提示</h3>
                                <i class="icon close_icon"  v-on:click ='suc_sureFn()'></i>
                            </div>
                            <div class="body tac">
                                <p class="icon_container"><i class="icon suc_icon"></i>配置保存成功！</p>
                            </div>
                            <div class="foot tac">
                                <ul class="clearfix btn_container">
                                    <li class="fl" v-on:click="suc_sureFn()">确定</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fr device_set_con">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name :'gameset',
        methods:{
            selectFn:function(i){
                this.items[i].tips_state = !this.items[i].tips_state;
                this.terminal_sn = this.items[i].terminal_sn;
            },
            closeFn:function(i){
                this.items[i].tips_state = !this.items[i].tips_state;

            },
            toggle: function(index, index2) {
                this.items[index].sell[index2].selected = !this.items[index].sell[index2].selected;
            },
            sureFn:function(i){
                let that =  this;
                that.items[i].tips_state = !that.items[i].tips_state;
                that.items[i].selected = true;
                for(var m=0; m<that.items[i].sell.length; m++ ) {
                    if(that.items[i].sell[m]['selected']) {
                        that.items[i].sell_state = true;
                        break;
                    }
                }
                // that.items[i].sell_state = true;
                that.suc_tips_state =true;
                let terminal_sn = that.items[i].terminal_sn;
                let params = that.items[i].sell;
                let url="http://tob.vronline.com/admin/product/modify";
                that.$http.post(url, {
                    params:JSON.stringify(params)
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
            },
            suc_sureFn:function(){
                this.suc_tips_state =false;     
            },
            gameDetail:function(terminal_sn, terminal_no){
                this.$router.app.$emit('getGameDetail', terminal_sn);
                this.$router.app.$emit('changeVersion', terminal_no);
            },
            setCur: function (index) {
                let that =  this;
                that.items[index].selected = true;
                for(var i=0;i< that.items.length; i++){
                    if(i != index){
                        that.items[i].selected = false;
                    }
                }
            },
            getdata:function(){
                let that=this;
                let url="http://tob.vronline.com/admin/terminallist";
                that.$http.post(url, {
                    params: {}
                }, {
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if(response.status!=200){
                        return false;
                    }
                    that.items = response.body.data;
                    that.device_num = response.body.data.length;
                    that.address = response.body.data[0]['store_address'];
                    that.first_sn = response.body.data[0]['terminal_sn'];
                }, response => {
                    // error callback
                });
            }
        },
        created: function() {
            let that = this;
            that.getdata();
        },
        data(){
        return {
            tips:'助手提示：（在这里您可以查看主/客机电脑，以及手动配置对应的VR游戏）',
            tipsmsg:'1）对每台电脑设备配合对应的VR游戏； 2）对体验时间设定；3）  查看主/客电脑设备上当前的游戏；',
            device_num:'',
            iscur:true,
            terminal_sn:'',
            address:'',
            isSelected:true,
            suc_tips_state:false,
            items:[
                // {
                //     state:'待机',
                //     computer_model:'0001',
                //     computer_num:'20000',
                //     computer_address:'网鱼网咖',
                //     computer_state:'客机',
                //     computer_time:'00:00:12',
                //     classObject:'abnormal_icon',
                //     selected:true,
                //     tips_state:false,
                //     min:'30',
                //     hour:'60'
                // },
                // {
                //     state:'待机',
                //     computer_model:'0001',
                //     computer_num:'20000',
                //     computer_address:'网鱼网咖',
                //     computer_state:'客机',
                //     computer_time:'00:00:12',
                //     classObject:'ingame_icon',
                //     selected:false,
                //     tips_state:false,
                //     min:'30',
                //     hour:'60'
                // },
                // {
                //     state:'待机',
                //     computer_model:'0001',
                //     computer_num:'20000',
                //     computer_address:'网鱼网咖',
                //     computer_state:'客机',
                //     computer_time:'00:00:12',
                //     classObject:'wait_icon',
                //     selected:true,
                //     tips_state:false,
                //     min:'30',
                //     hour:'60'
                // }
            ]
        }
    }
    }
</script>
<style>
    #gameset .tips{margin: 20px 0; color: #969696}
    .set_container{
        border: 1px solid #293141;
        height: 100%;
    }
    .set_container .set_head{margin:16px 0 6px 10px;}
    .set_container .in_set_con{background:rgba(22,29,14,.3);width: 624px;}
    .set_container .img_container{width: 70px;}
    .set_container .left_set_con{margin: 30px 14px 0 12px;}
    .set_container .img_container img{width: 100%;height: 100%;}
    .set_container .set_body ul.set_body{ min-height: 600px;}
    .set_container .set_body li.cd{
        width:294px;
        height: 148px;
        border: 1px solid #293141;
        margin: 10px 0 0 10px;
    }
    .set_container .set_body li a{width: 100%;height: 100%;}
    .set_container .set_body li.router-active{border-color: #03a9f4;}
    /*.set_container .set_body li.router-link-active{border-color: #03a9f4;}*/
    .com_state{text-indent: 10px;height: 30px;line-height: 30px;display: inline-block;width: 100%;}
    .wait_icon,.ingame_icon,.abnormal_icon{
        width: 15px;
        height: 16px;
        background-position:-70px -26px ;
        left: 10px;
        top: 50%;
        margin-top: -6px;
    }
    .ingame_icon{
        background-position:-85px -26px;
    }
    .abnormal_icon{
        background-position:-100px -26px;
    }
    .right_set_con{padding-top: 10px;}
    .right_set_con p{
        line-height: 20px;
    }
    .right_set_con p.blueCol{margin-top: 10px;width: 100px;}
    .device_set_con{
        width: 362px;
        min-height: 854px;
        background: rgba(22,29,14,.5);
    }
    .tips_container{position:fixed;}
    .tips_container .in_tips .body input{
        width:100px;
        line-height: 24px;
        background: rgba(24,27,42,1);
        border: 1px solid #252c39;
        color: #969696;
        text-indent: 10px;
        outline: none;
        margin: 0 10px;
    }
    .tips_container .in_tips .body .msg_con{margin: 0 10px 0 20px;}
    .tips_container .in_tips .body .msg_con p{margin: 16px 0;}
    .tips_container .select2_icon{left: -20px;}
    .set_container  .icon_container{text-indent: 36px;
        line-height: 36px;}
</style>