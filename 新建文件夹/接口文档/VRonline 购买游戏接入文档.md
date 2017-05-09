# VRonline 页游接入文档 #

### 说明 ###

1. 每个游戏服需要单独配置进入游戏的页面域名，和充值发货回调地址，发货回调地址不能带任何参数。
2. 游戏创建后，会生成游戏的`appid`，以及`appkey`、`paykey`，其中`appkey`是登录校验用的私钥，`paykey`是充值用的私钥。
2. 假如游戏配置的域名是 s1.qmqj.com，进入游戏的地址是 http://s1.qmqj.com/?appid=1000011&openid=yZuGMDDDtrhLFA&seq=57fdd77498b5a7.32235061&serverid=1&t=1476253556.6255&sign=9506734e59711a3b035a37f3602504d4。
3. 签名sign生成算法
	1. 收到的**所有get参数**中，过滤掉sign参数
	2. 将剩下的参数按照参数名升序排序
	3. 将参数以key=value为单元，以&分割拼成字符串，即key1=value1&key2=value2&key3=value3......
	4. 将paykey加到字符串前，生成新的字符串
	5. 将最终的字符串md5，最终得到sign

### PHP 代码示例 ###
    function encrypt($params, $appkey)
    {
        if(!$params || !is_array($params) || !$appkey) {
            return false;
        }
        ksort($params);
        $query1 = array();
        foreach($params as $key => $value)
        {
            if($key == "sign") {
                continue;
            }
            array_push($query1, $key."=".$value);
        }
        $query_string = join("&", $query1);
        $sign         = md5($key . $query_string);
        return $sign;
    }


## 登录游戏 ##

通过开发商在后台配置的每个服的游戏域名，带参数进入游戏。开发商需要校验签名是否正确。

进入游戏连接如下：http://s1.example.com/?appid=1000011&openid=yZuGMDDDtrhLFA&seq=57fdd77498b5a7.32235061&serverid=1&t=1476253556.6255&sign=9506734e59711a3b035a37f3602504d4

	appid	 ： 游戏appid，游戏创建时生成。
	openid 	 ： 用户openid。
	serverid ： 服务器ID，开发商在后台自己填写。
	vrkey	 ： 校验key，以后的接口需要传该key。
	t		 ： 当前时间戳。
	sign	 ： 校验用的签名。签名规则见《签名sign生成算法》，使用appkey加密。


## 充值流程 ##

1. 通过app的服务端调用接口 `https://pay.vronline.com/paytoken`，获取本次交易token，并返回给客户端。
2. 客户端调用js方法，弹出充值窗口，点击完成支付。
3. App服务端的发货回调接口接收平台的发货请求发货，并返回结果。成功返回 success，其他为失败。
4. 注意：平台对失败的订单会自动补单，在补单时，app要判断当前一笔订单的发货状态，如果已经发货成功了，不要重复发货。


## 获取交易token ##

接口地址：https://pay.vronline.com/paytoken

请求方法：POST

**参数**：

	openid	 ： 当前用户的openid。
	game_type： 分配给每个游戏的appid。
	serverid ： 要充值的服务器id，由开发商在后台填写。
	vrkey	 ： vrkey。
	ts		 ： 当前的时间戳。
	sign	 ： 校验用的签名。签名规则见《签名sign生成算法》，使用paykey加密。

此接口使用的key为paykey

**返回结果**：

	{
		code: 0,
		data: {
			paytoken: "r=WJAhNbdD9Krb=OMXaDvfy=1_hPfu4Q"
		},
		msg: "操作成功"
	}

返回Json格式，code=0表示成功，其他为失败，msg为失败信息。


## 弹出充值窗口 ##

需要先加载
http://pic.vronline.com/common/js/jquery-1.12.3.min.js
http://pic.vronline.com/pay/minipay.js

点击充值的时候调用下面的方法

	VRminipay.open({
		buygameord:{
			paytoken : xxxxxx   
			appid 	 : 1,
			serverid : 1,
			openid	 : "faqRv_HgeC",   //光民
			vrkey	 : "xxxxxxxxxxx" ,  //tooken
			price	 :10,
			num		 : 1,
			total	 : 10,
			url		 : "http://img3.duitang.com/uploads/item/201411/07/20141107220551_TMMsE.jpeg",
			item  	 : "游戏名",
			itemid	 : 1007,
			extra1	 : "此处可以写开发商订单号"
		}
	});

**参数**：

	paytoken ： 充值前调用接口获得的交易token，必选。
	appid	 ： 分配给每个游戏的appid，必选。
	serverid ： 要充值的服务器id，没有传0。
	openid	 ： 当前用户的openid，必选。
	vrkey	 ： 登录时传的参数，必选。
	price	 ： 购买的道具的单价，必选。
	num	 	 ： 购买数量，默认为1，必选。
	total	 ： 支付总价格，单位：元，必选。
	url		 ： 购买道具的图片url，必选。
	item	 ： 购买道具的名称，必选。
	itemid	 ： 购买的道具ID，可不传。
	extra1	 ： 透传参数，长度200字节内，在充值成功回调开发商发货接口时会传回给开发商，可选。



## 充值发货回调 ##

用户充值成功后，会由平台调用发货回调接口通知开发商发货。发货回调需要开发商针对每一个服单独配置一个接口。如果没有配置会导致发货回调失败。

**发货接口要求在2秒内处理完成并返回结果，否则会视为发货失败。**

回调示例：

	http://pay.vronline.com/delivery?amount=10&appid=1001&extra1=test&num=1&itemid=1007&openid=faqRv_HgeC&price=0.01&serverid=1&tradeid=trade_123123123&ts=1497625321&paytoken=xxx&sign=xxxxxxxxx

**参数**：

	tradeid	 ： 交易订单号。
	paytoken ： 本次交易的token。
	amount	 ： 总充值金额。
	openid	 ： 用户openid。
	vrkey	 ： vrkey。
	appid	 ： appid。
	serverid ： 服务器id。
	price	 ： 购买商品单价。
	num		 ： 购买数量。
	itemid	 ： 购买的道具ID。
	extra1	 ： 透传参数。
	ts		 ： 当前时间戳。
	sign	 ： 校验用的签名。签名规则见《签名sign生成算法》，使用paykey加密。

**返回结果**：

	成功返回success，其他为发货失败。


## 获取用户资料 ##

接口地址：http://openapi.vronline.com/user

请求方法：POST

**参数**：

	openid	 ： 当前用户的openid。
	appid	 ： 分配给每个游戏的appid。
	vrkey	 ： 登录时传给客户端的vrkey。
	ts		 ： 当前的时间戳。
	sign	 ： 校验用的签名。签名规则见《签名sign生成算法》，使用appkey加密。


**返回结果**：

	{
		code: 0,
		data: {
			nick: "abcbd",
			face: "http://image.vronline.com/face/17/10017/10017.jpg?1475977985"
		},
		msg: "操作成功"
	}

返回Json格式，code=0表示成功，其他为失败，msg为失败信息。
