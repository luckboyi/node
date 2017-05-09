<template>
	<div id="data_report">
		<div class="tips">
            <p>{{tips}}</p>
            <p>{{tipsmsg}}</p>
        </div>
        <div class="data_con">
        	<div class="data_nav">
        		<ul class="clearfix tac">
        			<li class="fl" v-for="(list,$index) in titlelist" :class="{cur:list.click_state}" @click="selectFn($index)">
                        <div>
                            <p class="pr data_title"><i class="icon" :class="list.iconobject"></i>{{list.name}}</p>
                            <p class="blueCol f30 pr data_msg">{{list.time}}<i :class="list.iconstate"></i></p>
                        </div>
        			</li>
        		</ul>
        	</div>
        </div>
        <div class="revenue_body">
            <div class="clearfix">
                <ul class="clearfix revenue_nav fl">
                    <li v-for="(item,$index) in inquiry_mode" class="fl pr" @click="select_mode($index)"><i class="pa icon select_icon" :class="{selected:item.selected}"></i>{{item.name}}</li>
                </ul>
                <div class="data_sel fl">
                    <select name="" id="">
                        <option value="">自定义时间</option>
                    </select>
                     <select name="" id="">
                        <option value="">全部</option>
                    </select>
                </div>
            </div>
            
            <data_list></data_list>
            
        </div>
	</div>
</template>
<script>
	export default{
		name:'data_report',
        methods:{
            select_mode:function(i){
                var that = this ;
                that.inquiry_mode.map(function(v,index) {
                    i== index ? v.selected = true  && that.$router.app.$emit('changeAction', v.case) : v.selected = false;
                })
            },
            selectFn:function(i){
                var that = this ;
                that.titlelist.map(function(elem,index) {
                    i == index? elem.click_state = true : elem.click_state = false
                })
            },
            getTitleList:function(i) {

            }   
        },
        created: function() {
            let that = this;
            that.$router.app.$on('changeTitleList', function(i){
                that.titlelist = i;
            });
        },
		data(){
			return{
				tips:'助手提示：（助手提示：在这里t您可以查看基础数据）',
				tipsmsg:'1）当前游戏启动次数；2）游戏安装统计；3）收入统计；',
                titlelist:[
                {
                    click_state:true,
                    iconobject:{
                        gameplay_icon:true,
                    },
                    name:"游戏启动：",
                    time:"1200次",
                    iconstate:{
                        up_icon:true,
                    }
                },
                {
                    click_state:false,
                    iconobject:{
                        gamepay_icon:true,
                    },
                    name:"游戏购买：",
                    time:"￥1200.00",
                    iconstate:{
                        down_icon:true,
                    }
                },
                {
                    click_state:false,
                    iconobject:{
                        gametime_icon:true,
                    },
                    name:"游戏时长：",
                    time:"00:24:00",
                    iconstate:{
                        up_icon:true,
                    }
                }
                ],
                click_state:{
                    cur:true
                },
                gameplay_data_states:{
                    up_icon:true,
                },
                gamepay_data_states:{
                    down_icon:true,
                },
                gametime_data_states:{
                    up_icon:true
                },
                inquiry_mode:[{
                    name:"按日",
                    case:'day',
                    selected:true
                },
                {
                    name:"按月",
                    case:'month',
                    selected:false
                }
                ]
			}
		}
	}
</script>
<style>
.data_con{margin: 20px 0;}
    .data_con .data_nav{
        
        background: rgba(45,53,74,.3);
        border: 1px solid #293141;
        box-sizing:border-box;
        -webkit-box-sizing:border-box;
    }
    .data_con .data_nav li{width: 324px;height: 79px; padding: 20px 0;cursor: pointer;}
    .data_con .data_nav li div{height: 100%;}
     .data_con .data_nav li:nth-child(2) div{
        border-left: 1px solid #293141;
        border-right: 1px solid #293141;
     }
    .data_con  .data_title{line-height: 40px;}
    .gameplay_icon,.gamepay_icon,.gametime_icon{width: 12px;height: 12px;background-position:0 -150px;left: 116px;top: 50%;margin-top: -5px;}
    .gamepay_icon{background-position-x: -12px;width: 14px;}
    .gametime_icon{background-position-x:-26px;}
    .data_con .data_msg{text-indent: -16px;}
    .up_icon,.down_icon{width: 12px;height:19px;background-position:0 -162px; top: 50%;margin-top: -4px;margin-left: 6px;}
    .down_icon{background-position: 0 -181px;}
    .data_con .data_nav li.cur{border: 1px solid #293141;background:url(../assets/select.png) no-repeat center;margin: -1px 0 0 -1px;}
    .data_sel{padding: 20px 0;}
    .data_sel select{background: #283040; color: #505e70;outline: none;line-height: 30px;height: 26px;}
    .revenue_body .revenue_nav{margin-top: 4px;}
</style>