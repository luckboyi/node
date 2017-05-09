<template>
  <div class="page-product-main" :class="styleName">
  <mt-radio
      class="page-product"
      v-bind:title="title"
      v-model="value"
      :options="options1" />
   
    <mt-button type="primary" size="large" @click="goPay" >支付</mt-button>
    <br />
    <mt-button type="default" size="large" @click="swapTerminal" >更换机器</mt-button>
    <iframe name="frm_dealer" style="display:none"></iframe>
    <form  style="display:none" :action="actionUrl" id="frm_post" method="post" accept-charset="utf-8" :target="target">
    <div style="display:none">
    <input type="hidden" :value="uid" name="uid">
    <input type="hidden" :value="sid" name="sid">
    <input type="hidden" :value="jump_url" name="jump_url">
    <input type="hidden" :value="game_type" name="game_type">
    <input type="hidden" :value="wp_pid" name="wp_pid">
    <input type="hidden" :value="wp_uid" name="wp_uid">
    <input type="hidden" :value="pay_rmb" name="pay_rmb">
    <input type="hidden" :value="action" name="action">
    <input type="hidden" :value="sign" name="sign">
    <input type="hidden" :value="user_ip" name="user_ip">
    <input type="hidden" :value="product_id" name="product_id">
    </div>
    </form>
    <mt-footer v-bind:tobuid="tobuid"></mt-footer>
</template>

<script>
import util from '../util';
var lock = false;
var timeout = 0;
var timemax = 100000;


export default {
  name: 'product',
  data() {
    return {
      value:"",
      options1:[],
      title:"",
      merchantid:"",
      terminal_sn:"",
      appid:"",
      actionUrl:"",
      uid:"",
      sid:"",
      jump_url:"",
      game_type:"",
      wp_pid:"",
      wp_uid:"",
      pay_rmb:"",
      action:"",
      sign:"",
      user_ip:"",
      product_id:""
    };
  },
  created() {
    this.tobuid = util.getUid()
    if(util.is_weixin()==true) {
      this.styleName = "weixin"
      this.payAction = 'wechath5vr';
      this.target = '_blank';
    } else {
      this.payAction = 'alipayh5vr';
      this.target = 'frm_dealer';
      var that = this;
      window.addEventListener('message',function(e){
         if(e.data == "payok") {
            that.back(true);
         }
      },false);
    }
    this.merchantid = this.$route.params.merchantid
    this.terminal_sn = this.$route.params.terminal_sn
    this.appid = this.$route.params.appid
    var that = this;
    this.$http.get('//tob.vronline.com/pay/product/'+ this.merchantid+'/'+this.terminal_sn+'/'+ this.appid).then(response => {
        document.title = response.body.data.title
        that.title = response.body.data.title+"-"+response.body.data.terminal_no+"号机"
        that.value = response.body.data.value
        that.options1 = response.body.data.product
        that.actionUrl = response.body.data.actionUrl+that.payAction
        that.orderUrl = response.body.data.orderUrl
    }, response => {
      // error callback
    });
  },
  methods: {
    goPay() {
      var product = this.options1[this.value]
      var that = this;
      var params = JSON.stringify({uid:this.merchantid,game_type:this.appid,wp_uid:this.terminal_sn,pay_rmb:product.price,action:that.payAction,product_id:product.id});
      this.$http.post(that.orderUrl+"/create/create2bOrder",{params:params},{emulateJSON:true}).then(response => {
        var res = response.body
        that.uid = res.data.uid;
        that.sid = res.data.sid;
        that.jump_url = res.data.jump_url;
        that.game_type = that.appid;
        that.wp_pid = res.data.wp_pid;
        that.wp_uid = res.data.wp_uid;
        that.pay_rmb = product.price;
        that.sign = res.data.sign;
        that.action = that.payAction;
        that.product_id = product.id;
        that.user_ip = res.data.user_ip;
        that.orderid = res.data.orderid
        setTimeout(function(){
          document.getElementById("frm_post").submit();
          if(that.payAction=='alipayh5vr') {
             that.$indicator.open({
              text: '支付中...'
            });
            lock = true;
            that.queryOrder(res.data.orderid);
          }
         
        },100)
      }, response => {
      // error callback
      });
    },
    queryOrder(orderId) {
      var that = this
      if(lock==false) {
        return
      }
      if(timeout>timemax) {
        that.back(false)
        return
      }
      setTimeout(function() {
        that.$http.get(that.orderUrl+'/result2b/'+orderId).then(response => {
          var res = response.body
          timeout += 1000;
          if(res.code==0) {
            that.back(true);
          } else if (res.code==2) {
            that.queryOrder(orderId);
          } else if(res.code==3) {
            that.back(false);
          } else {
            that.back(false);
          }
        }, response => {
        // error callback
        });
      },1000)
    },
    swapTerminal(){
       this.$router.push('/terminal/'+this.merchantid+"/"+this.terminal_sn+"/"+this.appid)
    },
    back(ret) {
      if(lock==false) {
        return
      }
      lock = false
      this.$indicator.close();
      if(ret==true) {
        this.$router.push('/back/'+this.merchantid+"/"+this.terminal_sn+"/"+this.appid+"/"+this.product_id+"/"+this.orderid)
      } else {
        this.$router.push('/error/'+this.merchantid+"/"+this.terminal_sn+"/"+this.appid+"/"+this.product_id+"/"+this.orderid)
      }
    }
  }
};
 
</script>