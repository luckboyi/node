<template>
    <div id="revenue_list">
        <ol>
            <li class="clearfix" v-for="list in lists">
                <span class="fl time">{{list.time}}</span>
                <span class="fl income">{{list.income}}</span>
                <span class="fl scale">{{list.scale}}</span>
                <span class="fl  scale_money">{{list.scale_money}}</span>
                <span class="fl real_income">{{list.real_income}}</span>
                <span class="fl msg">{{list.msg}}</span>                        
            </li>
        </ol>
        <div class="page_con tac">
            <div class="in_page_con clearfix">   
                <div class="fl"><span> {{(page-1)*prePage+1}}-{{(page-1)*prePage+prePage}}</span><span>共{{count}}条</span></div>
                <ul class="clearfix fl">
                    <li class="fl" href="javascript:" @click="prevPage">上一页</li>
                    <li class="fl" href="javascript:;" @click="nextPage">下一页</li>
                    <li class="fl" href="javascript:;" @click="lastPage">尾页>></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'revenue_list',
        methods: {
            nextPage(){
                if((this.page)*this.prePage>this.count){
                    return false;
                }
                this.page++;
                this.getRecord();
            },
            prevPage(){
                if(this.page==1){
                    return false;
                }
                this.page--;
                this.getRecord();
            },
            lastPage(){
                this.page=parseInt(this.count/this.prePage)+1;
                this.getRecord();
            },
            changeTerminal(){
                this.page=1;
                this.getRecord();
            },
            changeStatus(){
                this.page=1;
                this.getRecord();
            },
            getRecord(){
                let _this=this;
                let params={
                    start:(_this.page-1)*_this.prePage,
                    count:_this.prePage,
                    case:_this.case
                };
                this.$http.post("//tob.vronline.com/admin/getbillbydate", params, {
                    emulateJSON: true,
                    credentials: true
                }).then(response => {
                    if (response.status != 200) {
                        return false;
                    }
                    if (response.data.code != 0) {
                        return false;
                    }
                    console.log(response.data.data);
                    _this.count=response.data.data.count;
                    if(!response.data.data.data){
                        _this.lists={};
                    }
                    _this.lists=response.data.data.data;
                    _this.totalBill=response.data.data.totalBill;
                    _this.$router.app.$emit('totalBill', _this.totalBill)
                }, response => {
                    // error callback
                });
            },
            changeCase: function(index){
                let that = this;
                that.case = index;
            }
        },
        created: function() {
            let that = this;
            that.getRecord();
            that.$router.app.$on('changeCase', function(i){
                that.changeCase(i);
            });
        },
        data(){
            return{
                page:1,
                tp:1,
                count:0,
                prePage:5,
                case:"day",
                totalBill:'0.00',
                lists:[]
            }
        }
    }
</script>
<style>
    .in_page_con{margin: 20px 0 ;display: inline-block;}
    .in_page_con span{margin:0 6px;}
    .page_con ul{display: inline-block;margin-left: 20px;}
    .page_con ul li{cursor: pointer; }
</style>