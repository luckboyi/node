<template>
  <div>
  <div class="page-terminal-main" :class="styleName">
    <mt-cell :title="title" >
      <span class="swap-desc">{{ terminal_no }}</span>
       <i class="iconfont icon-vralternation title" slot="icon"></i>
    </mt-cell>
    <mt-radio
  :title="rtitle"
  v-model="value"
  :options="options1">
</mt-radio>
    <br /> <br />
    <mt-button type="primary" size="large"  @click="swapTermainal" :disabled="disabled">更换</mt-button>
    <br />
    <mt-button type="default" size="large"  @click="back">返回</mt-button>
    <mt-footer v-bind:tobuid="tobuid"></mt-footer>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import util from '../util';
export default {
  name: 'terminal',
  data() {
    return {
      value:"",
      options1:[],
      title:"",
      terminal_no:"",
      rtitle:"选择历史订单"
    };
  },
  created() {
    this.tobuid = util.getUid()
    if(util.is_weixin()==true) {
      this.styleName = "weixin"
    }
    this.merchantid = this.$route.params.merchantid
    this.terminal_sn = this.$route.params.terminal_sn
    this.appid = this.$route.params.appid
    var orders = util.getOrder(this.merchantid,true);
    var that = this
    this.$http.post("//tob.vronline.com/pay/swapterminalinfo/"+this.merchantid+"/"+this.terminal_sn+"/"+this.appid,{orderids:orders},{emulateJSON:true,credentials:true}).then(response => {
        document.title = response.body.data.title
        that.title = response.body.data.title
        that.terminal_no = response.body.data.terminal_no+"号机"
        if(response.body.data.options.length>0) {
          that.options1 = response.body.data.options;
          that.value = response.body.data.value;
        } else {
          that.rtitle = "暂无历史订单"
          that.disabled = "disabled"
        }
    }, response => {
    // error callback
    });
  },
  methods: {
    swapTermainal() {
      var that = this
      MessageBox.confirm('确定更换到'+this.terminal_no+'吗?',{confirmButtonClass:this.styleName}).then(action => {
        this.$http.post("//tob.vronline.com/pay/swapterminal/"+this.merchantid+"/"+this.terminal_sn+"/"+that.appid+"/"+that.value,{},{emulateJSON:true,credentials:true}).then(response => {
              if(response.body.code==0) {
                let instance =this.$toast({message: '更换机器成功',iconClass: 'icon icon-success'});
                setTimeout(() => {
                  instance.close();
                   back();
                }, 2000);
              }
        }, response => {
        });
      },cancel=>{

      });
    },
    back() {
        this.$router.go(-1)
    }
  }
};
</script>
