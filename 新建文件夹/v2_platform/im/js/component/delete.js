/**
 * Created by zhengy on 2017/1/11.
 */
function deleteFrient(data){
    var deleteVue ;
    deleteVue = new Vue({
        el:'#delete_tips',
        data:data,
        methods:{
            sureFn:function(){
                console.dir(1);
            },
            cancelFn:function(){
                console.dir(2)
            }
        }
    })
}
/*
var data2 = {
    name:'1111',
    uid:'10000'
}
deleteFrient(data2);*/
