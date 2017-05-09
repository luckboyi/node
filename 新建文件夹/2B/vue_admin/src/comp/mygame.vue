<template>
    <div id="mygame">
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
            <ol class="clearfix fl">
                <li class="fl pr"  @click="batchinstall">批量安装</li>
                <li class="fl pr"  @click="batchupdate">批量更新</li>
                <li class="fl pr"  @click="batchsync">批量同步</li>
            </ol>
            <div class="search_bar fl pr">
                <input type="text" placeholder="请输入游戏名称" v-on:keyup.enter="searchGame" v-model="gameName">
                <i class="icon search_icon" v-on:click="searcg_game()"></i>
            </div>
            <div class="fr" v-if="num >= 0" style="margin-right:20px;">总游戏数：{{num}} 款</div>
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
            <gamelist type="mygame" ></gamelist>
        </div>
        <!--弹窗-->
        <div class="mask hide">
    		<!--删除游戏提示-->
    		<div class="box delete_game hide">
    			<div class="title clearfix">
    				<span class="fl f18">提示信息</span>
    				<i class="fr close"></i>
    			</div>
    			<div class="con">
    				<span class="warning"></span>
    				<p>您确定是否要删除当前游戏？</p>
    			</div>
    			<div class="foot clearfix">
    				<span class="fl btn">确定删除</span>
    				<span class="fl btn">取消</span>
    			</div>
    		</div>
    		<!--更新提示-->
    		<div class="box update hide">
    			<div class="title clearfix">
    				<span class="fl f18">提示信息</span>
    				<i class="fr close"></i>
    			</div>
    			<div class="con">
    				<span class="warning"></span>
    				<p>当前游戏有最新版本！</p>
    				<p>请先更新至最新版本后再同步至其它客机电脑中！</p>
    			</div>
    			<div class="foot clearfix">
    				<span class="fl btn">确定</span>
    			</div>
    		</div>
    		<!--批量同步1-->
    		<div class="box synchronization">
    			<div class="title clearfix">
    				<span class="fl f18">批量同步</span>
    				<span class="fl">您可以操作将当前被选中的游戏，同步至以下客机内：</span>
    				<i class="fr close"></i>
    			</div>
    			<div class="con">
    				<div id="scrollbar1">
					    <div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
					    <div class="viewport">
					        <div class="overview">
								<p class="text">助手提示：</p>
			    				<p class="text">1）客机已安装游戏，操作同步将自动覆盖至最游戏最新版本。</p>
			    				<p class="text">2）客服尚未添加此款游戏，操作同步将自动添加当前游戏至客机电脑上。</p>
			    				<ul class="clearfix">
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel selected"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add">未添加</p>
			    							<p class="added hide">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state complete"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add hide">未添加</p>
			    							<p class="added">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state error"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add hide">未添加</p>
			    							<p class="added hide">已添加</p>
			    							<p class="error">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add">未添加</p>
			    							<p class="added hide">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state complete"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add hide">未添加</p>
			    							<p class="added">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state error"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add hide">未添加</p>
			    							<p class="added hide">已添加</p>
			    							<p class="error">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add">未添加</p>
			    							<p class="added hide">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state complete"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add hide">未添加</p>
			    							<p class="added">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add">未添加</p>
			    							<p class="added hide">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state complete"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add hide">未添加</p>
			    							<p class="added">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add">未添加</p>
			    							<p class="added hide">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    					<li class="fl">
			    						<div>
			    							<p class="pr">
			    								<span class="keji"></span>
			    								<i class="state complete"></i>
			    							</p>
			    							<p class="clearfix">
			    								<i class="fl sel"></i>
			    								<span class="fl">002号机</span>
			    							</p>
			    							<p class="no_add hide">未添加</p>
			    							<p class="added">已添加</p>
			    							<p class="error hide">异常无法同步</p>
			    						</div>
			    					</li>
			    				</ul>
					        </div>
					    </div>
					</div>
    			</div>
    			<div class="foot clearfix">
    				<span class="fl btn">取消</span>
    				<span class="fl btn">一键同步</span>
    			</div>
    		</div>
        	<!--批量同步2-->
    		<div class="box synchronization2 hide">
    			<div class="title clearfix">
    				<span class="fl f18">同步提示</span>
    				<i class="fr close"></i>
    			</div>
    			<div class="con">
    				<p class="text">由于同步操作可能会对当前正在进行游戏体验产生不可预知的影响，</p>
    				<p class="text">我们建议您可预设定一个空闲时间，系统会在该指定时段内自动完成同步内容操作。</p>
    				<p class="clearfix">
    					<i class="fl sel selected"></i>
						<span class="fl">我可以现在就同步，不需要预设定时间</span>    				
    				</p>
    				<div class="clearfix">
    					<i class="fl sel"></i>
    					<span class="fl">我可以预设定时间同步</span> 
    					<select class="fl">
    						<option>00:00-04:00</option>
    					</select>
    				</div>
    			</div>
    			<div class="foot clearfix">
    				<span class="fl btn">确定</span>
    			</div>
    		</div>
    		<!--批量同步3-->
    		<div class="box synchronization3 hide">
    			<div class="title clearfix">
    				<span class="fl f18">同步提示</span>
    				<i class="fr close"></i>
    			</div>
    			<div class="con">
    				<p class="text">正在同步游戏至客机上,请稍后…  <span>80.0%</span></p>
    				<p class="progress_bar"><span class="bar"></span></p>
    			</div>
    			<div class="foot clearfix">
    				
    			</div>
    		</div>
    		<!--批量同步4-->
    		<div class="box synchronization4 hide">
    			<div class="title clearfix">
    				<span class="fl f18">同步提示</span>
    				<i class="fr close"></i>
    			</div>
    			<div class="con">
    				<p class="clearfix">
    					<i class="fl icon"></i>
    					<span class="fl">游戏同步成功</span>
    				</p>
    			</div>
    			<div class="foot clearfix">
    				<span class="fl btn">确定</span>
    			</div>
    		</div>
    		<!--设置体验时间-->
    		<div class="box set_time hide">
    			<div class="title clearfix">
    				<span class="fl f18">同步提示</span>
    				<i class="fr close"></i>
    			</div>
    			<div class="con">
    				<ul>
    					<li class="clearfix">
    						<i class="fl sel selected"></i>
    						<span class="fl">体验时间：</span>
    						<input class="fl" type="text" value="30" />
    						<span class="fl">/</span>
    						<input class="fl" type="text" value="60" />
    						<span class="fl">分钟</span>
    					</li>
    					<li class="clearfix">
    						<i class="fl sel"></i>
    						<span class="fl">体验时间：</span>
    						<input class="fl" type="text" value="30" />
    						<span class="fl">/</span>
    						<input class="fl" type="text" value="60" />
    						<span class="fl">分钟</span>
    					</li>
    					<li class="clearfix">
    						<i class="fl sel"></i>
    						<span class="fl">体验时间：</span>
    						<input class="fl" type="text" value="30" />
    						<span class="fl">/</span>
    						<input class="fl" type="text" value="60" />
    						<span class="fl">分钟</span>
    					</li>
    					<li class="clearfix">
    						<i class="fl sel"></i>
    						<span class="fl">体验时间：</span>
    						<input class="fl" type="text" value="30" />
    						<span class="fl">/</span>
    						<input class="fl" type="text" value="60" />
    						<span class="fl">分钟</span>
    					</li>
    				</ul>
    			</div>
    			<div class="foot clearfix">
    				<span class="fl btn">取消</span>
    				<span class="fl btn">确定</span>
    			</div>
    		</div>
        	<!--批量同步4-->
    		<div class="box set_time_success hide">
    			<div class="title clearfix">
    				<span class="fl f18">设置提示</span>
    				<i class="fr close"></i>
    			</div>
    			<div class="con">
    				<p class="clearfix">
    					<i class="fl icon"></i>
    					<span class="fl">配置保存成功</span>
    				</p>
    			</div>
    			<div class="foot clearfix">
    				<span class="fl btn">确定</span>
    			</div>
    		</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'mygame',
    methods: {
        batchinstall:function(){
            window.CppCall('gamelistframe', 'batchinstall', '');
        },
        batchupdate:function(){
            window.CppCall('gamelistframe', 'batchupdate', '');
        },
        batchsync:function(){
             console.dir(1)
            
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
        this.$router.app.$off('upMyGameNum');
        this.$router.app.$on('upMyGameNum', function(num) {
            _this.num = num;
        });
    },
    props:["gametypes"],
    data() {
        return {
            gameName: '',
            num: '0',
            tips: '助手提示：（在这里您可以查看到所有VR游戏例表）',
            tipsmsg: '1）浏览所有VR游戏；      2）购买游戏，或安装游戏免费试玩；',
            category:0,
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
#mygame .tips {
    margin: 20px 0;
}
#mygame .mask{position:absolute; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,.7); z-index:999;}
#mygame .mask .box{text-align: center; width:390px;}
#mygame .mask .box .title{line-height:24px; margin-bottom:8px;}
#mygame .mask .box .title i.close{width:9px; height:9px; margin-top:6px; background:url(../assets/icon.png) -70px 0; cursor:pointer;}
#mygame .mask .box .title i.close:hover{background-position-x: -79px;}
#mygame .mask .box .title span{margin-right:14px;}
#mygame .mask .box .con{min-height: 172px; background:#151920;}
#mygame .mask .box .con .warning{display:inline-block; width:36px; height:36px; margin:36px 0 20px; background:url(../assets/icon.png) -31px -26px;}
#mygame .mask .box .foot{display:inline-flex; margin:16px 0 4px; height:34px;}
#mygame .mask .box .foot .btn{width:98px; height:26px; line-height:26px; text-align: center; border:1px solid #000; background:#384355; margin:0 10px; cursor:pointer; color:#fff;}
#mygame .mask .box .foot .btn:hover{border:1px solid #23a0bf; background:#23a0bf;}
#mygame .mask .box .con i.sel{width:14px; height:14px; background:url(../assets/icon.png) -70px -42px;}
#mygame .mask .box .con i.selected{background-position-x:-84px;}
#mygame .mask .synchronization{width:578px;}
#mygame .mask .synchronization .con{height:358px;}
#mygame .mask .synchronization .con p.text{text-align: left; line-height:22px;}
/*自定义滚动条*/
#scrollbar1 { width: 578px; clear: both; margin: 10px 0; padding:4px 0; }
#scrollbar1 .viewport { width: 576px; height: 350px; overflow-y:auto; position: relative; }
#scrollbar1 .overview { list-style: none; position: absolute; left: 0; top: 0; }
#scrollbar1 .thumb .end,#scrollbar1 .thumb { background-color: #2d3744; }
#scrollbar1 .scrollbar { position: relative; float: right; width: 10px; }
#scrollbar1 .track { background-color: none; height: 100%; width:5px; position: relative; top:0px;}
#scrollbar1 .thumb { height: 20px; width: 5px; cursor: pointer; overflow: hidden; position: absolute; top: 0px; border-radius:4px; -moz-border-radius: 4px; -webkit-border-radius: 4px; -o-border-radius: 4px; }
#scrollbar1 .thumb .end { overflow: hidden; height: 30px; width: 5px; }
#scrollbar1 .disable{ display: none; }
.noSelect { user-select: none; -o-user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; }

#mygame .mask .synchronization .con .overview{padding:14px 0 0 18px;}
#mygame .mask .synchronization .con .overview ul li{width:122px; height:122px; border:1px solid #151920; margin:8px 10px 0 0; cursor:pointer;} 
#mygame .mask .synchronization .con .overview ul li:hover{border:1px solid #2c3242; }
#mygame .mask .synchronization .con .overview ul li span.keji{display:inline-flex; width:69px; height:60px; margin-top:6px; background:url(../assets/keji.png) no-repeat; background-size:cover;}
#mygame .mask .synchronization .con .overview ul li i.state{position:absolute; right:20px; bottom:8px; display:block; width:15px; height:15px; background:url(../assets/icon.png) -100px -26px;}
#mygame .mask .synchronization .con .overview ul li i.complete{background-position-x:-70px}
#mygame .mask .synchronization .con .overview ul li i.error{background-position-x:-115px;}
#mygame .mask .synchronization .con .overview ul li p.clearfix{display:inline-flex; margin:4px 0;}
#mygame .mask .synchronization .con .overview ul li i.sel{margin:2px 4px;}
#mygame .mask .synchronization .con .overview ul li p.no_add{color:#c83435;}
#mygame .mask .synchronization .con .overview ul li p.added{color:#23a0bf;}
#mygame .mask .synchronization .con .overview ul li p.error{color:#505e70;}
#mygame .mask .synchronization2,#mygame .mask .synchronization3,#mygame .mask .synchronization4,#mygame .mask .set_time,#mygame .mask .set_time_success {width:504px;}
#mygame .mask .synchronization2 .con{padding:20px 0;}
#mygame .mask .synchronization2 .con p.text{text-align: left; line-height:22px; margin-left:20px; color:#828f9e;}
#mygame .mask .synchronization2 .con p.clearfix,#mygame .mask .synchronization2 .con div.clearfix{margin:34px 0 0 34px;}
#mygame .mask .synchronization2 .con i.sel{margin:2px 16px 0 0;}
#mygame .mask .synchronization2 .con select{width:248px; height:26px; text-indent:22px; background:#242b3a; border:1px solid #1d232e; outline:none; color:#828f9e; margin:-4px 0 0 18px; border-radius:4px; -moz-border-radius: 4px; -webkit-border-radius: 4px; -o-border-radius: 4px; }
#mygame .mask .synchronization3 .con p.text{padding:82px 0 40px;}
#mygame .mask .synchronization3 .con p.progress_bar{display:inline-flex; width:446px; height:8px; padding:1px; background:#000; margin-bottom:60px;}
#mygame .mask .synchronization3 .con p.progress_bar .bar{display:block; width:400px; height:8px; background:#23a0bf;}
#mygame .mask .synchronization4 .con{height:264px;}
#mygame .mask .synchronization4 .con p{ font-size:24px; color:#23a0bf; display:inline-flex; margin-top:102px;}
#mygame .mask .synchronization4 .con p i.icon{width:36px; height:36px; background:url(../assets/icon.png) -33px -65px;}
#mygame .mask .synchronization4 .con p span{margin-left:50px;}
#mygame .mask .set_time .con{padding:40px;}
#mygame .mask .set_time .con ul li{height:26px; line-height:26px; padding:10px 0;}
#mygame .mask .set_time .con ul li input{ width:102px; height:24px; background:#181b2a; border:1px solid #252c39; margin:0 18px; outline:none; text-indent:18px; color:#fff;}
#mygame .mask .set_time .con ul li i.sel{margin:7px 16px 0 0;}
#mygame .mask .set_time_success .con{height:264px;}
#mygame .mask .set_time_success .con p{ font-size:24px; color:#23a0bf; display:inline-flex; margin-top:102px;}
#mygame .mask .set_time_success .con p i.icon{width:36px; height:36px; background:url(../assets/icon.png) -33px -65px;}
#mygame .mask .set_time_success .con p span{margin-left:50px;}
</style>
