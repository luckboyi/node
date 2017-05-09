 <template>
  <div>
    <div class="page-payback-main" :class="styleName">
      <div class="msg-success">
      <div class="msg-success-icon"><i class="iconfont icon-chenggong success"></i></div>
      <div class="product-msg"> 
      <p class="product-msg-title">支付成功 </p>
      <p class="product-msg-desc"> {{ productDesc }} </div>
      </div>
      </div>
      <mt-button type="primary" size="large" @click="startGame()">启动游戏</mt-button>
      <mt-footer v-bind:tobuid="tobuid"></mt-footer>
  </div>
</template>



<script>
if (self != top) {    
  window.parent.postMessage('payok','*');
}
import util from '../util';
export default {
  name: 'payback',
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
    this.productid = this.$route.params.productid
    this.orderid = this.$route.params.orderid
    var that = this;
    that.$http.get('//test3.vronline.com/result2b/'+that.orderid).then(response => {
          var res = response.body
          if(res.code==0) {
            
            util.saveOrder(this.merchantid,{id:that.orderid,time:res.data.time,merchantid:res.data.merchantid})
          }
        }, response => {
        // error callback
    });

    this.$http.get('//tob.vronline.com/pay/productinfo/'+ this.merchantid+'/'+this.terminal_sn+'/'+ this.productid).then(response => {
        document.title = response.body.data.title
        that.productDesc = response.body.data.desc
    }, response => {
      // error callback
    });
  },
  methods: {
    startGame() {
       this.$toast({
        message: '游戏已经启动成功',
        position: 'middle',
        duration: 2000
      });
    }
  }
};
</script>
<style>
.page-product-main{
  margin: 20px 0 20px 0;
}
.page-product{
  margin:10px 0 30px 0;
}
.page-product>.mint-radiolist-title{
  margin-top: .77em;
  margin-bottom: .3em;
  padding-left: 15px;
  padding-right: 15px;
  color: #999;
  font-size: 14px;
}

.page-fixed-bottom {
    position: fixed;
    bottom: .52em;
    left: 0;
    right: 0;
    color: #999;
    font-size: 14px;
    text-align: center;
}

.page-footer-link{
   color: #586c94;
   text-decoration: none;
}
.page-footer-copyright{
   padding: 0 .34em;
  font-size: 12px;
}
   
.msg-success {
  text-align: center;
  padding: 20px;
}
.msg-success-icon {
  padding: 10px;
}
.iconfont.success{
  font-size:93px;
  color:#26A2FF;
}

.iconfont.error{
  font-size:93px;
  color:#EF4F4F;
}

.iconfont.title {
  color:#26A2FF;
}

.product-msg {
  margin:20px 0;
  height:100px;
}
.product-msg-title{
  font-weight: 400;
  font-size: 20px;
  color:#000;
}

.product-msg-desc {
  font-size: 14px;
  color: #999;
}
.swap-desc{
color:#26A2FF;
}
    
.weixin .iconfont.success{
  color:#1AAD19;
}
.weixin .iconfont.title {
  color:#1AAD19;
}

.weixin .mint-button--primary{
  background-color: #1AAD19;
}
.weixin .swap-desc{
  color:#1AAD19;
}
.weixin.mint-msgbox-confirm{
  color:#1AAD19;
}

.weixin .mint-radio-input:checked + .mint-radio-core {
    background-color: #1AAD19;
    border-color: #1AAD19;
}
.weixin .mint-button--primary{
  background-color: #1AAD19;
}
</style>