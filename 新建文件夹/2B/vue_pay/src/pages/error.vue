<template>
  <div>
    <div class="page-error-main" :class="styleName">
      <div class="msg-success">
      <div class="msg-success-icon"><i class="iconfont icon-shibai error"></i></div>
      <div class="product-msg"> 
      <p class="product-msg-title">购买失败 </p>
      <p class="product-msg-desc"> {{ productDesc }} </div>
      </div>
      </div>
      <mt-button type="primary" size="large" @click="reQuery()">继续等待</mt-button>
      <mt-footer v-bind:tobuid="tobuid"></mt-footer>
  </div>
</template>

<script>
import util from '../util';
var lock = false;
var timeout = 0;
var timemax = 100000;
export default {
  name: 'error',
  data() {
    return {
      productDesc:""
    };
  },
   created(){
     this.tobuid = util.getUid()
    if(util.is_weixin()==true) {
      this.styleName = "weixin"
    }
    this.merchantid = this.$route.params.merchantid
    this.terminal_sn = this.$route.params.terminal_sn
    this.orderid = this.$route.params.orderid
    this.appid = this.$route.params.appid
    this.productid = this.$route.params.productid
    var that = this;
    this.$http.get('//tob.vronline.com/pay/productinfo/'+ this.merchantid+'/'+this.terminal_sn+'/'+ this.productid).then(response => {
        document.title = response.body.data.title
        that.productDesc = response.body.data.desc
    }, response => {
      // error callback
    });
  },
  methods: {
    reQuery() {
      this.$indicator.open({
        text: '查询中...',
        spinnerType: 'fading-circle'
      })
      lock = true;
      this.queryOrder();
    },
    queryOrder() {
        var that = this
        if(lock==false) {
          return
        }
        if(timeout>timemax) {
          that.back(false)
          return
        }
        setTimeout(function() {
          that.$http.get('//test3.vronline.com/result2b/'+that.orderid).then(response => {
            var res = response.body
            timeout += 1000;
            if(res.code==0) {
              that.back(true);
            } else if (res.code==2) {
              that.queryOrder();
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
    back(ret) {
      if(lock==false) {
        return
      }
      lock = false
      this.$indicator.close();
      if(ret==true) {
        this.$router.push('/back/'+this.merchantid+"/"+this.terminal_sn+"/"+this.appid+"/"+this.productid+"/"+this.orderid)
      } else {
        this.$router.push('/error/'+this.merchantid+"/"+this.terminal_sn+"/"+this.appid+"/"+this.productid+"/"+this.orderid)
      }
    }
  }
};
</script>