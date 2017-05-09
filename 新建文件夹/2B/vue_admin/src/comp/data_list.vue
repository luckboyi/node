<template>
	<div id="data_list" class="tac">
		<ul class="data_list_title clearfix">
			<li class="fl" v-for="list in datatitle">{{list.name}}</li>
		</ul>
		<ul class="data_list_con">
			<li v-for="list in datalists">
				<span>{{list.time}}</span>
				<span>{{list.num}}</span>
				<span>{{list.name}}</span>
			</li>
		</ul>
	</div>	
</template>
<script>
	export default{
		name:'data_list',
		methods: {
			getRecord(action){
                let that=this;
                let params={case:'day'};
                if(action) {
                	params={case:action};
                }
                this.$http.post("//tob.vronline.com/getDayAppDate", params, {
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if (response.status != 200) {
                        return false;
                    }
                    console.log(response.data);
                    if(!response.data.data){
                        that.datalists={};
                    }
                    that.datalists = response.data.data;
                    that.$router.app.$emit('changeTitleList', response.data.sum)
                }, response => {
                    // error callback
                });
            },
		},
		created: function() {
			let that = this;
			that.getRecord();
			that.$router.app.$on('changeAction', function(i){
                that.getRecord(i);
            });
		},
		data(){
			return{
				datatitle:[{
					name:"日期"
				},
				{
					name:"启动次数"
				},
				{
					name:"游戏名称"
				}
				],
				datalists:[]
			}
		}
	}
</script>
<style>
	#data_list{padding: 0 20px;}
	.data_list_title li{width: 33%;line-height: 30px;background: rgba(47,53,68,.3);}
	.data_list_con span{width: 33%;display: inline-block;text-indent: -16px;line-height: 30px;}
</style>