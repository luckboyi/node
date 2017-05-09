<template>
  <div id="app">
    <div class="left_con pr">
        <div class="head tal">
            <h3 class="f14 pr"><i class="pa icon manage_icon"></i>管理类型</h3>
            <p>当前>（主机）游戏管理模式</p>
        </div>
        <ul class="body">
            <router-link tag ="li" to = '/storeroom'  class="pr  left_nav ">
                <a><i class="icon gamemanage_icon"></i>游戏管理<i class="icon spread_icon"></i></a>
            </router-link>
            <router-link tag ="li"  to = '/account' class="pr  left_nav">
                <a><i class="icon account_icon"></i>账户余额<i class="icon spread_icon"></i></a>
            </router-link>
            <router-link  tag ="li"  to = '/revenue' class="pr  left_nav">
                <a><i class="icon share_income_icon"></i>分成收入<i class="icon spread_icon"></i></a>
            </router-link>
            <router-link  tag ="li"  to = '/data' class="pr  left_nav">
                <a><i class="icon data_icon"></i>数据查询<i class="icon spread_icon"></i></a>
            </router-link>
        </ul>
        <div class="foot pr pa tac">
          <i class="icon table_icon"></i>切换至客机游戏模式>
        </div>
    </div>
<!--
    <ul>
      <li>
        <router-link to = "/first">第一个</router-link>
        <router-link to = "/second">第二个</router-link>
      </li>
    </ul>-->
      <div class="main_con clearfix">
            <div class="in_main_con fr">
                <router-view ></router-view>
            </div>
      </div>
      <!--提示框qb-->
	    <div class="mask hide">
	    		<div class="box">
		    			<div class="title clearfix">
		    					<span class="fl f18">提示信息</span>
		    					<i class="fr close"></i>
		    			</div>
		    			<div class="con">
		    					<p>提示框</p>
		    			</div>
		    			<div class="foot clearfix">
		    					<span class="fl btn">确 定</span>
		    					<span class="fl btn">取 消</span>
		    			</div>
		    		</div>
	    </div>
  </div>
</template>

<script>
  import first from './comp/storeroom.vue'
  export default {
    name:'main',
    methods:{
      listFn:function(){

      }
    }
      /*data(){
       return{
         msg:'这是第一个vue'}
       }, components: { first }*/
  }
  //点击事件
  /*$('body').on('click','.left_nav',function(){
      $(this).addClass('cur').siblings().removeClass('cur');
  })*/
</script>

<style >
  .left_con{
    position: fixed;
    top:0;
    left: 0;
    z-index: 998;
    width: 240px;
    height: 100%;
    border-right: 1px solid #293141;
    color: #8196b0;
  }
  .left_con .head{padding:12px 0 0 40px;border-bottom: 1px solid #293141;}
  .left_con .head p{line-height: 24px;margin-bottom: 20px;}
  .left_con .body li{
    width: 238px;
    height: 48px;
    padding: 1px;
    margin: 0;
    line-height: 48px;
    text-align: left;
    border-bottom: 1px solid #293141;
  }
  .left_con .body li.router-link-active,.left_con .body li:hover{
    background: #384355;
  }
  .left_con .body li.router-link-active a,.left_con .body li:hover a{color: #b1d0f7;}
  .left_con .body li.router-link-active .icon,.left_con .body li:hover .icon{background-position-x: -16px;-webkit-background-position-x: -16px;-o-background-position-x: -16px;-moz-background-position-x: -16px;}
  .left_con .body li a{
    display: inline-block;
    width: 100%;
    height: 100%;
    text-indent: 50px;
    color: #8196b0;
  }
  .left_con .foot{height: 30px;line-height: 30px;background:#2d3645; color: #b1d0f7;bottom: 0; position: absolute;width: 100%;  cursor: pointer;}
  .manage_icon{width: 13px;height: 14px;top: 50%;margin-top: -7px;left: -18px;}
  .gamemanage_icon,.account_icon,.data_icon,.table_icon,.share_income_icon{width:15px;height: 16px;background-position: 0 -26px; left:30px;top: 50%;margin-top: -8px;}
  .spread_icon{background-position:0 -76px;right: 20px; top: 50%;margin-top: -8px;}
  .account_icon{background-position:0 -42px;}
  .data_icon{background-position: 0 -58px;}
  .table_icon{background-position: 0 -90px;}
    .main_con{
        width: 1240px;
        margin: 0 auto;
    }
    .in_main_con{
        width: 988px;
        padding-top: 20px;
    }
    .share_income_icon{background-position: 0 -130px;}
    .mask{position:fixed; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,.7); z-index:999;}
    #app .mask .box{text-align: center; width:390px;}
		.mask .box .title{line-height:24px; margin-bottom:8px;}
		.mask .box .title i.close{width:9px; height:9px; margin-top:6px; background:url(assets/icon.png) -70px 0; cursor:pointer;}
		.mask .box .title i.close:hover{background-position-x: -79px;}
		.mask .box .title span{margin-right:14px; }
		.mask .box .con{min-height: 132px; background:#151920;padding:20px 0;}
		.mask .box .foot{display:inline-flex; margin:16px 0 4px; height:34px;}
		.mask .box .foot .btn{width:78px; height:26px; line-height:26px; text-align: center; border:1px solid #000; background:#384355; margin:0 10px; cursor:pointer; color:#fff;}
		.mask .box .foot .btn:hover{border:1px solid #23a0bf; background:#23a0bf;}
</style>
