<template>
	<div id="revenue">
		<div class="tips">
            <p>{{tips}}</p>
            <p>{{tipsmsg}}</p>
        </div>
        <div class="revenue_con clearfix tac f16">
        	<div class="revenue_titile fl">
        		分成收入明细：
        	</div>
        	<div class="revenue_total fl">
        		<p>总收入：</p>
        		<p class="blueCol">￥<span class="f20">{{total}}</span><b>.00</b></p>
        	</div>
        	<!-- <div class="revenue fl">
        		<p class="pr">奖励返现：<i class="f12 pa new_icon">NEW!</i></p>
        		<p>还差<b class="blueCol2">￥</b><span class="f20 blueCol2">{{differ}}</span><b class="blueCol2">.00</b><i  class="f20 blueCol2">/</i><span class="f20 blueCol2">{{total_num}}</span><b  class="blueCol2">.00</b>可获得返现<b class="blueCol">￥</b><span class="f20 blueCol">{{get_num}}</span><b  class="blueCol">.00</b></p>
        	</div> -->
        </div>
        <div class="revenue_body">
        	<ul class="clearfix revenue_nav">
        		<li v-for="(item,$index) in inquiry_mode" class="fl pr" @click="select_mode($index)"><i class="pa icon select_icon" :class="{selected:item.selected}"></i>{{item.name}}</li>
        	</ul>
        	<div class="revenue_body_con tac">
        		<ul class="clearfix revenue_body_title">
        			<li class="fl time">日期</li>
        			<li class="fl income">我的收入</li>
        			<li class="fl scale">分成比例</li>
        			<li class="fl scale_money">分成金额</li>
        			<li class="fl real_income">实际收入</li>
        			<li class="fl msg">备注</li>
        		</ul>
        		<revenue_list></revenue_list>
        	</div>
        </div>
	</div>
</template>
<script>
	export default{
		name:'revenue',
		methods:{
			select_mode:function(i){
				var that = this ;
				that.inquiry_mode.map(function(v,index) {
					i== index ? v.selected = true && that.$router.app.$emit('changeCase', v.case) : v.selected = false;
				});
			}
		},
		created(){
			let that = this;
			that.$router.app.$on('totalBill', function(i){
                that.total = Math.floor(i);
            });
		},
		data(){
			return {
				tips:'助手提示：（在这里您可以查看当前账号的余额，以及操作余额提现）',
				tipsmsg:'1）查看所有收入明细；2）查看所有分成明细；3）查看活动奖励信息',
				total:200,
				differ:1500,
				total_num:2000,
				get_num:20,
				inquiry_mode:[{
					name:"按日",
					case:"day",
					selected:true
				},
				{
					name:"按月",
					case:"month",
					selected:false
				}
				]
			}
		}
	}
</script>
<style>

	.revenue_con{padding: 20px 0; background: rgba(45,53,74,.3);margin: 20px 0 30px 0;}
	.revenue_con .revenue_titile{width: 240px;height:80px; line-height: 80px;}
	.revenue_con .revenue_total{width: 210px;height: 80px;border-left:1px solid #293141; border-right:1px solid #293141;margin-right: 30px;}
	.revenue_con .revenue_total p:nth-child(1),.revenue_con .revenue p:nth-child(1){line-height: 40px;}
	.revenue_con .revenue .blueCol2{margin: 0 4px;}
	.revenue_con .revenue .new_icon{width: 26px;line-height: 12px;color: #fff;background: #c83535;-webkit-transform:scale(0.7);transform:scale(0.7);padding: 6px;text-indent: -4px;}
	.revenue_body{border: 1px solid #293141;background: rgba(47,53,68,.2);padding-bottom: 10px;margin-bottom: 60px;}
	.revenue_body .revenue_nav{padding: 20px ;}
	.revenue_body .revenue_nav li{text-indent: 30px;margin:0 10px 0 0; }
	.revenue_body_con {padding: 0 20px;}
	.revenue_body_con ul.revenue_body_title li{width: 156px;}
	.revenue_body_con ul.revenue_body_title li{background: rgba(47,53,68,.3);line-height: 30px;}
	.revenue_body_con ul.revenue_body_title li{background: rgba(47,53,68,.3);line-height: 30px;}
	.revenue_body_con ol li span{ width: 156px;display: inline-block;line-height: 40px;}
</style>