var util = {
	_pre:"vrtob",
	is_weixin:function() {
		var ua = navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i)=="micromessenger") {
	        return true;
	    } else {
	        return false;
	    }
	},
	getUid() {
		var uid = this.get('uid')
		if(uid==null) {
			uid = this.createUid();
			this.set('uid',uid);
			return uid;
		} else {
			return uid;
		}
	},
	createUid() {
        var timestamp = Date.parse(new Date());
        var hashKey = parseInt(timestamp/1000);
        var rand = Math.random().toString(36).substring(7)
        var ua = navigator.userAgent.toLowerCase();
        var uid = rand+this.getHashCode(ua,hashKey)+hashKey
       	return uid
	},
	set:function(a,b) {
		 window.localStorage.setItem(this._pre + a, b);
	},
	get:function(a) {
		return window.localStorage.getItem(this._pre + a);
	},
	getHashCode:function(str,hashKey){
    	str = str.toLowerCase();
	    var hash  =  hashKey,i,ch;
	    for (i = str.length - 1; i >= 0; i--) {
	        ch = str.charCodeAt(i);
	        hash ^= ((hash << 5) + ch + (hash >> 2));
	    }
	    return  (hash & 0x7FFFFFFF);
	},
	saveOrder:function(merchantid,orderInfo){
		if(orderInfo.merchantid!=merchantid) {
			return
		}
	 	var orders = this.getOrder(merchantid);
		for (var order of orders) {
		  if(order.id==orderInfo.id) {
		  	return
		  }
		}
		orders.push(orderInfo);
		var orderStr = JSON.stringify(orders);
		this.set('order',orderStr);
	},
	getOrder:function(merchantid,idonly){
		var curTime = this.getCurTime();
		var orderStr = this.get('order')
		if(orderStr==null) {
			return [];
		} else {
			var orders = JSON.parse(orderStr);
			var newOrders = [];
			for (var order of orders) {
			  if(merchantid == order.merchantid && order.time-curTime<3601) {
			  	if(typeof(idonly)!="undefined") {
			  		newOrders.push(order.id);
			  	} else {
			  		newOrders.push(order);
			  	}	
			  }
			}
			return newOrders;
		}
	},
	getCurTime:function(){
		var timestamp = Date.parse(new Date());
        return (timestamp/1000);
	},
	close:function(){
		if(this.is_weixin()) {
			WeixinJSBridge.call('closeWindow');
		} else {
			AlipayJSBridge.call('closeWebview');
		}
	}
}
export default util