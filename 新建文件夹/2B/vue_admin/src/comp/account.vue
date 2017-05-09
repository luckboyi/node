<template>
    <div id="account">
        <!--助手提示-->
        <div class="prompt">
            <div class="tip">
                <!--<span class="f14">{{msg}}</span>-->
            <span class="f14"></span>
                <span class="f12">（在这里您可以查看当前账号的余额，以及操作余额提现）</span>
            </div>
            <p>1）账户余额为体验店实际的收入金额，已扣除与VRonline分成部分的金额，金额可能会存在延迟。</p>
            <p>2）提现时会涉及扣取0.1%的服务费。</p>
            <p>3）单笔提现总额最高为 ¥20000。</p>
        </div>
        <!--资本管理-->
        <div class="capital pr">
            <ul class="clearfix">
                <li class="fl total">
                    <div>
                        <span>总收入 :</span>
                        <i class="icon"></i>
                        <p class="explain">
                            <i class="left"></i>
                            <span>体验店商家总收入的金额，包括：已扣除分成部分和未到账部分 </span>
                        </p>
                    </div>
                    <p class="sum">￥<span class="f18">{{total_income}}</span>.00</p>
                </li>
                <li class="fl avail">
                    <div>
                        <span>可用收入 :</span>
                        <i class="icon"></i>
                        <p class="explain">
                            <i class="left"></i>
                            <span>体验店商家可提现的金</span>
                        </p>
                    </div>
                    <p class="sum">￥<span class="f18">{{usable_income}}</span>.00</p>
                </li>
                <!-- 				<li class="fl line">
					<div>
						<span>今日提现 :</span>
						<i class="icon"></i>
						<p class="explain">
							<i class="left"></i>
							<span>体验店商家今日提现的金额 </span>
						</p>
					</div>
					<p class="sum">￥<span class="f18">{{today_withdraw}}</span>.00</p>
				</li> -->
                <li class="fl withdrawals">
                    <div class="clearfix">
                        <i class="icon"></i>
                        <span>提现</span>
                    </div>
                    <p class="btn">提现</p>
                </li>
                <li class="fl key">
                    <div>
                        <i class="icon"></i>
                        <span>取款密码</span>
                    </div>
                    <p class="btn" @click="pop='set_pwd'">设置</p>
                </li>
                <li class="fl bank_card">
                    <div>
                        <i class="icon"></i>
                        <span>银行卡</span>
                    </div>
                    <p><span class="btn" @click="pop='my_bank'">管理</span>X<span>{{bank_list.length?bank_list.length:0}}</span>张</p>
                </li>
            </ul>
        </div>
        <!--交易记录-->
        <div class="record">
            <div class="record_title clearfix">
                <span class="fl cur">交易记录</span>
                <!-- <span class="fl">提现记录</span> -->
            </div>
            <div class="record_con">
                <!--交易记录内容-->
                <div class="transaction_record">
                    <div>
                        <!-- <select>
							<option>所有游戏</option>
						</select> -->
                        <select v-model="terminal_no" v-on:change="changeTerminal">
                            <option :value="false">机器位置</option>
                            <option v-for="terminal in terminal_list" :value="terminal.terminal_no">{{terminal.terminal_no}}号机</option>
                        </select>
                        <select v-model="order_status" v-on:change="changeStatus">
                            <option value="all">交易状态</option>
                            <option v-for="(status, key) in trade_status" :value="key">{{status}}</option>
                        </select>
                    </div>
                    <div class="record_list">
                        <ul class="title clearfix">
                            <li class="fl">购买时间</li>
                            <li class="fl">游戏名称</li>
                            <li class="fl">交易金额</li>
                            <li class="fl">体验游戏</li>
                            <li class="fl">机器位置</li>
                            <li class="fl">交易方式</li>
                            <li class="fl">交易状态</li>
                            <li class="fl">商家收入</li>
                            <li class="fl">交易流水号</li>
                            <li class="fl">备注</li>
                        </ul>
                        <ul class="con clearfix">
                            <li v-for="record in records">
                                <div class="clearfix">
                                    <span class="fl">{{record.paytime}}</span>
                                    <span class="fl" :title="game_name[record.appid]?game_name[record.appid]:''">{{game_name[record.appid]?game_name[record.appid]:''}}</span>
                                    <span class="fl">￥{{record.pay_rmb}}</span>
                                    <span class="fl">获得{{record.playtime}}分钟</span>
                                    <span class="fl">{{record.terminal_no}}号机</span>
                                    <span class="fl">{{pay_channel[record.pay_channel]?pay_channel[record.pay_channel]:record.pay_channel}}</span>
                                    <span class="fl">{{trade_status[record.status]?trade_status[record.status]:record.status}}</span>
                                    <span class="fl">￥{{record.merchant_fee}}</span>
                                    <span class="fl" :title="record.orderid">{{record.orderid}}</span>
                                    <span class="fl">备注</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--提现记录内容-->
                <!-- <div class="presentation_record hide">
					<div class="record_list">
						<ul class="title clearfix">
							<li class="fl">提现时间</li>
							<li class="fl">银行名称</li>
							<li class="fl">申请信息</li>
							<li class="fl">提现申请金额</li>
							<li class="fl">服务费</li>
							<li class="fl">提现到账金额</li>
							<li class="fl">提现状态</li>
							<li class="fl">备注</li>
						</ul>
						<ul class="con clearfix">
							<li>
								<div class="clearfix">
									<span class="fl">2017-01.21 08:56:24</span>
									<span class="fl">浦发银行</span>
									<span class="fl">123....1234</span>
									<span class="fl">￥500</span>
									<span class="fl">1%</span>
									<span class="fl">495</span>
									<span class="fl">提现成功</span>
									<span class="fl">备注</span>
								</div>
							</li>
							<li>
								<div class="clearfix">
									<span class="fl">2017-01.21 08:56:24</span>
									<span class="fl">浦发银行</span>
									<span class="fl">123....1234</span>
									<span class="fl">￥500</span>
									<span class="fl">1%</span>
									<span class="fl">495</span>
									<span class="fl">提现成功</span>
									<span class="fl">备注</span>
								</div>
							</li>
						</ul>
					</div>
				</div> -->
            </div>
        </div>
        <div class="paging">
            <span>{{(page-1)*10+1}}-{{(page-1)*10+10}}条</span>
            <span>共{{count}}条</span>
            <a class="prev" href="javascript:" @click="prevPage"><span>&lt;</span><span>上一页</span></a>
            <a class="next" href="javascript:;" @click="nextPage"><span>下一页</span><span>&gt;</span></a>
            <a class="last" href="javascript:;" @click="lastPage">尾页>></a>
        </div>
        <!--弹框-->
        <div class="mask" v-show="pop!=false">
            <div class="box">
                <!--添加银行卡-->
                <div class="popup add_bank" v-if="pop=='add_bank'">
                    <div class="title clearfix">
                        <span class="fl f18">填写银行卡信息</span>
                        <i class="fr" @click="pop=false"></i>
                    </div>
                    <div class="information">
                        <ul>
                            <li>
                                <span>卡号：</span>
                                <input type="text" placeholder="输入卡号后会智能识别银行和卡种" />
                                <p class="show_bank hide">交通银行</p>
                            </li>
                            <li>
                                <span>开户银行：</span>
                                <input type="text" />
                            </li>
                            <li>
                                <span>开户姓名：</span>
                                <input type="text" placeholder="请输入您的姓名" />
                            </li>
                            <li>
                                <span>手机号码：</span>
                                <input type="text" placeholder="请填写您在银行预留的手机号码 " />
                            </li>
                            <li>
                                <span>校验码：</span>
                                <input type="text" />
                                <span class="obtain">获取</span>
                            </li>
                        </ul>
                        <div>
                            <p>注意事项：</p>
                            <p>1、银行卡开户姓名必段和填写的姓名和身份证等信息一致，否则将无法收到提现的款项。</p>
                            <p>2、银行卡开户时预留的手机号码必须和填写的手机号码信息一致。</p>
                            <p>3、如填遇到填写时身份信息不一致，可能由于办理储蓄卡时填写的身份信息不完整，请至银行柜台补全您的身份信息。</p>
                        </div>
                    </div>
                    <span class="submit">同意并开通</span>
                </div>
                <!--取款密码-->
                <div class="popup withdrawal_password" v-if="pop=='set_pwd'">
                    <div class="title clearfix">
                        <span class="fl f18">取款密码设置</span>
                        <i class="fr" @click="pop=false"></i>
                    </div>
                    <div class="information">
                        <!--设置密码-->
                        <div class="con">
                            <p class="remind">提现时需要输入一个“取款密码”，您还没有设置，请立即设置，确保资金安全！</p>
                            <ul>
                                <li>
                                    <span>取款密码：</span>
                                    <input v-model="pay_pwd" type="password" placeholder="请输入6位数字取款密码" />
                                </li>
                                <li>
                                    <span>确认密码：</span>
                                    <input v-model="confirm_pay_pwd" type="password" placeholder="请输入6位数字取款密码 " />
                                </li>
                                <li>
                                    <span>绑定手机：</span>
                                    <span>{{bind_phone}}<!-- 139****1234 --></span>
                                </li>
                                <li>
                                    <span>校验码：</span>
                                    <input type="text" v-model="pay_pwd_code"/>
                                    <span class="obtain" @click="getPayPwdCode">获取</span>
                                </li>
                            </ul>
                            <div>
                                <p>注意事项：</p>
                                <p>为了确保资金安全，“取款密码”密码作为在提现时需要进行验证的重要信息，请您牢记此密码。</p>
                            </div>
                        </div>
                    </div>
                    <span class="submit" @click="setPayPwd">确定</span>
                </div>
                <!--取款密码设置成功-->
                <div class="popup withdrawal_password succeed"  v-if="pop=='set_pwd_success'">
                    <div class="title clearfix">
                        <span class="fl f18">取款密码设置</span>
                        <i class="fr" @click="pop=false"></i>
                    </div>
                    <div class="information">
                        <div class="success">
                            <i class="icon"></i>
                            <span>恭喜您，取款密码设置成功！</span>
                        </div>
                    </div>
                    <span class="submit" @click="pop=false">确定</span>
                </div>
                <!--提现账户余额到银行卡-->
                <div class="popup withdrawals hide">
                    <div class="title clearfix">
                        <span class="fl f18">提现账户余额到银行卡</span>
                        <i class="fr"></i>
                    </div>
                    <div class="information">
                        <!--设置密码-->
                        <div class="con">
                            <div class="clearfix add_bank_card">
                                <div class="fl">
                                    <span>今日可提现：</span>
                                    <span class="font_color f18">￥2980.00</span>
                                    <span>（￥2.00=￥2000.00*0.1%服务费）</span>
                                </div>
                                <p class="fr f14">+添加银行卡</p>
                            </div>
                            <div class="sel_bank">
                                <p>选择银行卡：</p>
                                <ul class="hide">
                                    <li class="clearfix">
                                        <i class="fl sel"></i>
                                        <i class="fl bank_logo"></i>
                                        <span class="fl bank">中国建设银行</span>
                                        <span class="fl number">尾号：9478</span>
                                        <span class="fl quick">快捷</span>
                                        <span class="fl morrow">次日</span>
                                        <span class="fl money">单笔交易50000元</span>
                                        <span class="fl set_default">设为默认</span>
                                    </li>
                                    <li class="clearfix cur">
                                        <i class="fl sel selected"></i>
                                        <i class="fl bank_logo"></i>
                                        <span class="fl bank">中国建设银行</span>
                                        <span class="fl number">尾号：9478</span>
                                        <span class="fl quick">快捷</span>
                                        <span class="fl morrow">次日</span>
                                        <span class="fl money">单笔交易50000元</span>
                                        <span class="fl set_default default">默认</span>
                                    </li>
                                    <li class="clearfix">
                                        <i class="fl sel"></i>
                                        <i class="fl bank_logo"></i>
                                        <span class="fl bank">中国建设银行</span>
                                        <span class="fl number">尾号：9478</span>
                                        <span class="fl quick">快捷</span>
                                        <span class="fl morrow">次日</span>
                                        <span class="fl money">单笔交易50000元</span>
                                        <span class="fl set_default">设为默认</span>
                                    </li>
                                </ul>
                                <!--未添加银行卡-->
                                <div class="no_add_bank">
                                    <p>您还未添加有效的银行卡，无法提现，请点击“添加银行卡”</p>
                                    <p class="f14">+添加银行卡</p>
                                </div>
                                <div class="clearfix">
                                    <div class="fl fill">
                                        <p>
                                            <span class="fl">体验时间：</span>
                                            <input class="fl" type="text" placeholder="本次您最低可提 ¥ 1.00" />
                                            <span class="fl">元</span>
                                            <span class="fl all">全部取出</span>
                                        </p>
                                        <p>
                                            <span class="fl">到账时间：</span>
                                            <i class="fl sel selected"></i>
                                            <span class="fl">次日到账</span>
                                        </p>
                                        <p>
                                            <span class="fl">取款密码：</span>
                                            <input class="fl" type="text" placeholder="未设置" />
                                        </p>
                                    </div>
                                    <div class="fr regulations">
                                        <p>手续费规定：</p>
                                        <p>商家每笔完成提现时，我们将会对单笔 提现总额收取0.1%的服务费。 </p>
                                        <br />
                                        <p>计算公式：</p>
                                        <p>服务费=单笔提现总额×0.1%服务费</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="submit">提现</span>
                </div>
                <!--提现申请成功-->
                <div class="popup withdrawals succeed hide">
                    <div class="title clearfix">
                        <span class="fl f18">提现账户余额到银行卡</span>
                        <i class="fr"></i>
                    </div>
                    <div class="information">
                        <div class="success">
                            <i class="icon"></i>
                            <span class="color">本次提现申请成功，次日到账，请您耐心等待！</span>
                            <p>提现至：<span>中国建设银行</span>【<span>尾号9748</span>】的银行卡 </p>
                        </div>
                        <div class="regulations">
                            <p>手续费规定：</p>
                            <p>商家每笔完成提现时，我们将会对单笔 提现总额收取0.1%的服务费。 </p>
                            <br />
                            <p>计算公式：</p>
                            <p>服务费=单笔提现总额×0.1%服务费</p>
                        </div>
                    </div>
                    <span class="submit">确定</span>
                </div>
                <!--我的银行卡-->
                <div class="popup my_bank succeed" v-show="pop=='my_bank'">
                    <div class="title clearfix">
                        <span class="fl f18">我的银行卡</span>
                        <i class="fr" @click="pop=false"></i>
                    </div>
                    <div class="information">
                        <ul class="clearfix">
                            <li class="fl" v-for="bank in bank_list">
                                <div class="bank_mask f14 hide">提现中...</div>
                                <div class="bank_bg">
                                    <p class="clearfix title">
                                        <i class="fl"></i>
                                        <span class="fl">{{bank.card_opener}}</span>
                                        <span class="fl">[{{bank_type[bank.card_tp]}}]</span>
                                    </p>
                                    <p class="bank_number f14">
                                        <span>{{hideBankNo(bank.card_no)}}</span>
                                        <span>{{bank.card_name}}</span>
                                    </p>
                                    <p class="tel clearfix">
                                        <span class="fl">客服电话：</span>
                                        <span class="fl">4008200588</span>
                                        <span class="fr delete">删除</span>
                                    </p>
                                </div>
                            </li>
                            <li class="fl add" @click="pop='add_bank'">
                                <div class="bank_bg">
                                    <p>+</p>
                                    <p class="f14">添加银行卡</p>
                                </div>
                            </li>
                            <!-- 
							<li class="fl withdrawalsing">
								<div class="bank_mask f14">体现中...</div>
								<div class="bank_bg">
									<p class="clearfix title">
										<i class="fl"></i>
										<span class="fl">中国建设银行</span>
										<span class="fl">[储蓄卡]</span>
									</p>
									<p class="bank_number f14">
										<span>6226*******9748</span>
										<span>彬彬</span>
									</p>
									<p class="tel clearfix">
										<span class="fl">客服电话：</span>
										<span class="fl">4008200588</span>
										<span class="fr delete">删除</span>
									</p>
								</div>
							</li>
							<li class="fl cur">
								<div class="bank_mask f14 hide">体现中...</div>
								<div class="bank_bg">
									<p class="clearfix title">
										<i class="fl"></i>
										<span class="fl">中国建设银行</span>
										<span class="fl">[储蓄卡]</span>
									</p>
									<p class="bank_number f14">
										<span>6226*******9748</span>
										<span>彬彬</span>
									</p>
									<p class="tel clearfix">
										<span class="fl">客服电话：</span>
										<span class="fl">4008200588</span>
										<span class="fr delete">删除</span>
									</p>
								</div>
							</li> -->
                        </ul>
                    </div>
                    <span class="submit hide"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'account',
    methods: {
        nextPage() {
            if ((this.page) * 10 > this.count) {
                return false;
            }
            this.page++;
            this.getRecord();
        },
        prevPage() {
            if (this.page == 1) {
                return false;
            }
            this.page--;
            this.getRecord();
        },
        lastPage() {
            this.page = parseInt(this.count / 10) + 1;
            this.getRecord();
        },
        changeTerminal() {
            this.page = 1;
            this.getRecord();
        },
        changeStatus() {
            this.page = 1;
            this.getRecord();
        },
        getRecord() {
            let _this = this;
            let params = {
                page: _this.page,
                tp: _this.tp,
                terminal_no: _this.terminal_no,
                status: _this.order_status
            };
            this.$http.post("//tob.vronline.com/admin/record", params, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                if (response.status != 200) {
                    return false;
                }
                if (response.data.code != 0) {
                    return false;
                }
                _this.total_income = response.data.data.balance.total_income;
                _this.usable_income = response.data.data.balance.net_income;

                _this.count = response.data.data.count;
                if (!response.data.data.data) {
                    _this.records = {};
                    return false;
                }
                if (!response.data.data.name) {
                    _this.game_name = {};
                } else {
                    _this.game_name = response.data.data.name;

                }
                for (var i in response.data.data.data) {
                    if (response.data.data.data[i].playtime) {
                        response.data.data.data[i].playtime = response.data.data.data[i].playtime / 60;
                    }
                }
                _this.records = response.data.data.data;
            }, response => {
                // error callback
            });
        },
        getTerminalList() {
            let _this = this;
            this.$http.post("//tob.vronline.com/admin/terminallist/simple", {}, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                if (response.status != 200) {
                    return false;
                }
                if (response.data.code != 0) {
                    return false;
                }
                _this.terminal_list = response.data.data;
            }, response => {
                // error callback
            });
        },
        getBankList() {
            let _this = this;
            this.$http.post("//tob.vronline.com/admin/getBankCards", {}, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                if (response.status != 200) {
                    return false;
                }
                if (response.data.code != 0) {
                    return false;
                }
                _this.bank_list = response.data.data;
            }, response => {
                // error callback
            });
        },
        getBindMobile(){
        	let _this = this;
            this.$http.post("//tob.vronline.com/admin/phone", {}, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                if (response.status != 200) {
                    return false;
                }
                if (response.data.code != 0) {
                    return false;
                }
                var reg = /^(\d{3})\d+(\d{4})$/;
                _this.bind_phone = response.data.data.mobile.replace(reg, "$1****$2");
            }, response => {
                // error callback
            });
        },
        getPayPwdCode(){
        	let _this = this;
            this.$http.post("//tob.vronline.com/admin/paypwdcode", {}, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                if (response.status != 200) {
                    alert("发送失败，请稍后再试");
                }
                if (response.data.code != 0) {
                    alert("发送失败，请稍后再试");
                }
            }, response => {
                // error callback
            });
        },
        setPayPwd(){
        	let _this = this;
        	let reg = /^\d{6}$/;
        	if(!reg.test(this.pay_pwd)||!reg.test(this.confirm_pay_pwd)){
        		alert("密码格式错误");
        		return false;
        	}
        	if(!this.pay_pwd_code){
        		alert("请填写验证码");
        		return false;
        	}
        	let params={
        		oldpwd:this.pay_pwd,
        		newpwd:this.confirm_pay_pwd,
        		code:this.pay_pwd_code
        	}

            this.$http.post("//tob.vronline.com/admin/setpaypwd", params, {
                emulateJSON: true,
                credentials: true
            }).then(response => {
                if (response.status != 200) {
                    alert("发送失败，请稍后再试");
                }
                // if (response.data.code != 0) {
                //     alert("发送失败，请稍后再试");
                // }
                
                _this.pay_pwd="";
                _this.confirm_pay_pwd="";
                _this.pay_pwd_code="";
                _this.pop="set_pwd_success";
            }, response => {
                // error callback
            });
        },
        hideBankNo(bankNo) {
            var reg = /^(\d{4})\d+(\d{4})$/;
            return bankNo.replace(reg, "$1*******$2");
        }
    },
    created: function() {
        this.getRecord();
        this.getTerminalList();
        this.getBankList();
        this.getBindMobile();
    },
    data() {
        return {
            game_name: {},
            trade_status: {
                0: "付款成功，等等发货",
                8: "发货成功"
            },
            pay_channel: {
                alipayh5vr: "支付宝支付",
                wechath5vr: "微信支付",
            },
            total_income: 0,
            usable_income: 0,
            today_withdraw: 0,
            msg: "",
            bind_phone:"",
            page: 1,
            tp: 1,
            count: 0,
            records: {},
            terminal_list: {},
            bank_list: {},
            terminal_no: false,
            order_status: "all",
            pop: false,
            bank_type: {
                1: "储蓄卡"
            },
            pay_pwd:"",
            confirm_pay_pwd:"",
			pay_pwd_code:""
        }
    }
}
</script>
<style>
/*账户余额*/

.prompt .tip {
    margin-bottom: 8px;
    color: #828f9e;
}

.prompt p {
    line-height: 22px;
}

.capital {
    height: 78px;
    padding: 20px 0;
    margin: 10px 0 18px;
    border: 1px solid #223650;
    background: rgba(45, 53, 74, .3);
}

.capital ul li {
    width: 16%;
    text-align: center;
}

.capital ul li div span {
    color: #8196b0;
}

.capital ul li .sum {
    margin-top: 24px;
}

.capital ul li .btn {
    width: 58px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    margin: 20px auto 0;
    color: #fff;
    background: #169bd6;
    cursor: pointer;
}

.capital ul li .btn:hover {
    background: #23a0bf;
}

.capital ul li div i {
    width: 12px;
    height: 12px;
    margin: 2px 0 0 6px;
    background: url(../assets/icon.png) -94px 0;
}

.capital ul li.total .sum {
    color: #15bbe4;
}

.capital ul li.avail .sum {
    color: #15bbe4;
}

.capital ul li.line {
    border-right: 1px solid #313d52;
}

.capital ul li.line .sum {
    color: #2ca8ff;
}

.capital ul li.withdrawals div i {
    width: 11px;
    height: 10px;
    margin: 4px 0 0;
    background: url(../assets/icon.png) -107px 0;
}

.capital ul li.withdrawals div span {
    margin-left: 16px;
}

.capital ul li.key div i {
    width: 10px;
    height: 11px;
    margin: 4px 0 0;
    background: url(../assets/icon.png) -119px 0;
}

.capital ul li.key div span {
    margin-left: 16px;
}

.capital ul li.bank_card {
    font-size: 14px;
}

.capital ul li.bank_card div i {
    width: 11px;
    height: 10px;
    margin: 4px 0 0;
    background: url(../assets/icon.png) -130px 0;
}

.capital ul li.bank_card div span {
    margin-left: 14px;
}

.capital ul li.bank_card .btn {
    display: inline-block;
    margin: 16px 4px 0 36px;
}

.capital ul li p.explain {
    position: absolute;
    left: 108px;
    top: 18px;
    z-index: 9;
    display: none;
}

.capital ul li.total>div:hover p.explain {
    display: block;
}

.capital ul li.avail>div:hover p.explain {
    display: block;
}

.capital ul li.line>div:hover p.explain {
    display: block;
}

.capital ul li.avail p.explain {
    left: 272px;
}

.capital ul li.line p.explain {
    left: 432px;
}

.capital ul li.avail p.explain {
    left: 272px;
}

.capital ul li p.explain i.left {
    display: inline-block;
    width: 5px;
    height: 22px;
    margin: 0 0 0 10px;
    background: url(../assets/icon.png) -142px 0;
}

.capital ul li p.explain span {
    position: relative;
    top: -7px;
    left: -4px;
    display: inline-block;
    height: 23px;
    line-height: 23px;
    padding: 0 4px;
    background: url(../assets/explain.png) repeat-x;
}


/*交易记录、提现记录*/

.record {
    padding: 0 15px;
    border: 1px solid #293141;
    background: rgba(45, 53, 74, .3);
}

.record .record_title {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #2a3242;
}

.record .record_title span {
    width: 56px;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;
}

.record .record_title span.cur {
    color: #23a0bf;
    border-bottom: 1px solid #23a0bf;
}

.record .record_con .transaction_record div select {
    width: 80px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background: #252d3d;
    border: 1px solid #1e2531;
    color: #505e70;
    outline: none;
    cursor: pointer;
    margin: 14px 20px 14px 0;
}

.record .record_con .transaction_record div select option {
    color: #505e70;
    outline: none;
}

.record .record_con .transaction_record .record_list ul.title li {
    width: 10%;
    text-align: center;
}

.record .record_con .transaction_record .record_list ul.title,
.record .record_con .presentation_record .record_list ul.title {
    height: 32px;
    line-height: 32px;
    background: rgba(47, 53, 68, .15);
}

.record .record_con .transaction_record .record_list ul.con li {
    height: 52px;
}

.record .record_con .transaction_record .record_list ul.con li div {
    height: 32px;
    margin: 18px 0 2px;
    overflow: hidden;
}

.record .record_con .transaction_record .record_list ul.con li div span {
    width: 10%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
}

.record .record_con .presentation_record .record_list ul.title {
    margin-top: 18px;
}

.record .record_con .presentation_record .record_list ul.title li {
    text-align: center;
    width: 12.5%;
}

.record .record_con .presentation_record .record_list ul.con li div {
    height: 32px;
    margin: 18px 0 2px;
    overflow: hidden;
}

.record .record_con .presentation_record .record_list ul.con li div span {
    width: 12.5%;
    text-align: center;
}

.paging {
    margin: 6px 0;
    position: absolute;
    left: 40%;
    transform: translateX(50%);
}

.paging .prev {
    margin-left: 20px;
}

.paging .last {
    margin-left: 10px;
}


/*弹窗样式*/

.mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    background: rgba(0, 0, 0, .7);
}

.mask .box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 744px;
    padding: 10px;
    border: 1px solid #000;
    transform: translate(-50%, -50%);
    background: #1c202a;
}

.popup {
    width: 100%;
}

.popup .title {
    height: 20px;
    line-height: 20px;
    margin: 4px 0 10px;
}

.popup .title i.fr {
    width: 9px;
    height: 9px;
    cursor: pointer;
    background: url(../assets/icon.png) -70px 0;
}

.popup .title i.fr:hover {
    background-position-x: -79px;
}

.popup .information {
    padding: 14px 24px;
    min-height: 320px;
    background: #151920;
}

.popup .information .remind {
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-bottom: 20px;
}

.popup .information .success {
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-top: 140px;
}

.popup .information .success i.icon {
    width: 36px;
    height: 36px;
    background: url(../assets/icon.png) -33px -65px;
}

.popup .information .success span {
    margin-left: 50px;
    font-size: 22px;
    color: #23a0bf;
}

.popup .information ul li {
    line-height: 26px;
    padding: 12px 0;
}

.popup .information ul li p.show_bank {
    margin-left: 82px;
    line-height: 20px;
}

.popup .information ul li span {
    display: inline-block;
    width: 78px;
}

.popup .information ul li input {
    width: 206px;
    height: 26px;
    line-height: 26px;
    background: #181b2a;
    border: 1px solid #252c39;
    outline: none;
    color: #4d5a6c;
    text-indent: 8px;
}

.popup .information ul li span.obtain {
    width: 58px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    color: #a9bad0;
    background: #384355;
    border: 1px solid #000;
    cursor: pointer;
}

.popup .information ul li span.obtain:hover {
    color: #fff;
    background: #23a0bf;
    border: 1px solid #23a0bf;
}

.popup .submit {
    display: block;
    width: 98px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    margin: 12px auto;
    color: #a9bad0;
    background: #384355;
    border: 1px solid #000;
    cursor: pointer;
}

.popup .submit:hover {
    color: #fff;
    background: #23a0bf;
    border: 1px solid #23a0bf;
}


/*提现账户余额到银行卡*/

.withdrawals .information .add_bank_card {
    padding: 16px 0;
    border-bottom: 1px solid #252c36;
    margin-bottom: 24px;
}

.withdrawals .information .add_bank_card .font_color {
    color: #23a0bf;
    margin-right: 20px;
}

.withdrawals .information .add_bank_card .f14 {
    width: 122px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #a9bad0;
    background: #384355;
    border: 1px solid #000;
    cursor: pointer;
}

.withdrawals .information .add_bank_card .f14:hover {
    color: #fff;
    background: #23a0bf;
    border: 1px solid #23a0bf;
}

.withdrawals .information .sel_bank ul {
    margin-bottom: 22px;
}

.withdrawals .information .sel_bank ul li {
    height: 28px;
    line-height: 28px;
    padding: 0;
    margin-bottom: 10px;
    background: #1a1e27;
    border: 1px solid #21252b;
}

.withdrawals .information .sel_bank ul li.cur {
    background: #1e232d;
}

.withdrawals .information .sel_bank ul li:first-child {
    margin-top: 10px;
}

.withdrawals .information .sel_bank ul li .sel {
    width: 14px;
    height: 14px;
    margin: 8px 16px 0 10px;
    background: url(../assets/icon.png) -150px 0;
    cursor: pointer;
}

.withdrawals .information .sel_bank ul li .selected {
    background: url(../assets/icon.png) -164px 0;
}

.withdrawals .information .sel_bank ul li .bank_logo {
    width: 18px;
    height: 18px;
    margin: 6px 16px 0 0;
    background: url(../assets/icon.png) 0 -108px;
}

.withdrawals .information .sel_bank ul li .bank {
    width: 90px;
}

.withdrawals .information .sel_bank ul li .quick {
    width: 30px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    margin: 6px 24px 0 20px;
    background: #252f3f;
    border: 1px solid #384354;
}

.withdrawals .information .sel_bank ul li .morrow {
    width: 34px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    margin: 6px 38px 0 0;
    background: url(../assets/icon.png) -179px 0;
}

.withdrawals .information .sel_bank ul li .money {
    width: 180px;
}

.withdrawals .information .sel_bank ul li .set_default {
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
}

.withdrawals .information .sel_bank ul li .default {
    color: #6e8097;
}

.withdrawals .information .sel_bank .fill p {
    height: 26px;
    line-height: 26px;
    margin-bottom: 18px;
}

.withdrawals .information .sel_bank .fill p input {
    width: 140px;
    height: 24px;
    line-height: 24px;
    text-indent: 4px;
    background: #181b2a;
    border: 1px solid #252c39;
    color: #778391;
    margin-right: 8px;
    outline: none;
}

.withdrawals .information .sel_bank .fill p .all {
    position: relative;
    top: 1px;
    display: inline-block;
    width: 58px;
    height: 24px;
    line-height: 24px;
    background: #384355;
    border: 1px solid #000;
    text-align: center;
    cursor: pointer;
    color: #a9bad0;
    margin-left: 14px;
}

.withdrawals .information .sel_bank .fill p .sel {
    width: 14px;
    height: 14px;
    margin: 7px 10px 0 0;
    background: url(../assets/icon.png) -70px -42px;
}

.withdrawals .information .sel_bank .fill p .selected {
    background: url(../assets/icon.png) -84px -42px;
}

.withdrawals .information .sel_bank .fill p span:first-child {
    width: 78px;
}

.withdrawals .information .sel_bank .regulations {
    width: 216px;
    margin-top: 14px;
}

.withdrawals .information .sel_bank .regulations p {
    line-height: 18px;
}

.withdrawals .information .sel_bank .no_add_bank {
    height: 100px;
    padding: 40px 0;
}

.withdrawals .information .sel_bank .no_add_bank p {
    text-align: center;
    color: #828f9e;
}

.withdrawals .information .sel_bank .no_add_bank p.f14 {
    width: 122px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #a9bad0;
    background: #384355;
    border: 1px solid #000;
    cursor: pointer;
    margin: 20px auto;
}

.withdrawals .information .sel_bank .no_add_bank p.f14:hover {
    color: #fff;
    background: #23a0bf;
    border: 1px solid #23a0bf;
}

.withdrawals .information .success span {
    font-size: 12px;
    margin: 0;
    color: #505e70;
}

.withdrawals .information .success span.color {
    margin-left: 50px;
    font-size: 22px;
    color: #23a0bf;
}

.withdrawals .information .success p span,
.withdrawals .information .success p {
    color: #828f9e;
}

.succeed .information .regulations {
    width: 210px;
    margin: 100px auto;
}

.succeed .information .regulations p {
    line-height: 20px;
}

.my_bank .information {
    padding: 14px;
}

.my_bank .information ul li {
    position: relative;
    width: 224px;
    height: 130px;
    padding: 0;
    border: 1px solid #000;
    box-shadow: 3px 3px 8px #0e1116;
    -webkit-box-shadow: 3px 3px 8px #0e1116;
    -moz-box-shadow: 3px 3px 8px #0e1116;
    cursor: pointer;
    margin-bottom: 20px;
}

.my_bank .information ul li.cur,
.my_bank .information ul li:hover {
    border: 1px solid #23a0bf;
}

.my_bank .information ul li:nth-child(3n-1) {
    margin: 0 18px;
}

.my_bank .information ul li .bank_bg {
    padding: 0 6px;
    height: 100%;
    background: -webkit-gradient( to left top, #1d2430, #32425e 50%);
    background: -webkit-linear-gradient( to left top, #1d2430, #32425e 50%);
    background: -moz-linear-gradient( to left top, #1d2430, #32425e 50%);
    background: -ms-linear-gradient( to left top, #1d2430, #32425e 50%);
    background: -o-linear-gradient( to left top, #1d2430, #32425e 50%);
    background: linear-gradient( to left top, #1d2430, #32425e 50%);
}

.my_bank .information ul li.withdrawalsing {
    border: 1px solid #364052;
}

.my_bank .information ul li.withdrawalsing .bank_mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 130px;
    color: #828f9e;
    text-align: center;
    background: rgba(0, 0, 0, .6);
    z-index: 9;
}

.my_bank .information ul li .bank_bg p {
    color: #828f9e;
}

.my_bank .information ul li .bank_bg p.title {
    height: 40px;
    line-height: 40px;
    padding: 0 6px;
    margin: 0;
    border-bottom: 1px solid #5b687e;
}

.my_bank .information ul li .bank_bg p.title i {
    width: 18px;
    height: 18px;
    margin: 12px 6px 0 0;
    background: url(../assets/icon.png) 0 -108px;
}

.my_bank .information ul li .bank_bg p.bank_number {
    margin: 15px 0;
}

.my_bank .information ul li .bank_bg p.bank_number span {
    width: 40px;
    margin: 0 6px;
    color: #23a0bf;
}

.my_bank .information ul li .bank_bg p.bank_number span:first-child {
    width: 120px;
}

.my_bank .information ul li .bank_bg p.tel span {
    color: #5e7a8c;
}

.my_bank .information ul li .bank_bg p.tel span:first-child {
    margin-left: 6px;
    width: 60px;
}

.my_bank .information ul li .delete {
    display: none;
    width: 40px;
    margin-left: 20px;
    color: #c03334!important;
}

.my_bank .information ul li.cur .delete,
.my_bank .information ul li:hover .delete {
    display: block;
}

.my_bank .information ul li.add {
    border: 2px dashed #4d5b75;
    border-radius: 2px;
}

.my_bank .information ul li.add div {
    background: none;
}

.my_bank .information ul li.add div p:first-child {
    height: 40px;
    font-size: 60px;
    margin-top: 34px;
}

.my_bank .information ul li.add div p {
    text-align: center;
}

.my_bank .submit {
    background: none;
    border: none;
}
</style>
