/**
 * Created by zhengy on 2017/1/11.
 */
var newmsgVue;
function newMsgFn(data){
    newmsgVue = new Vue({
        el:'#new_msg_tips',
        data:data,
        methods:{
            openMsgFn:function(i){
                console.dir(this.$data.lists[i].uid);
            },
            overlookFn:function(){
                console.dir('overlook')
            },
            viewAll:function(){
                console.dir(222)
            }
        }
    })
}

function addNewMsgFn(data){
    for(var i = 0 ; i < newmsgVue.$data.lists.length ; i++){
        if(newmsgVue.$data.lists[i].uid == data.uid){
            newmsgVue.$data.lists[i].msg++;
        }
    }
    newmsgVue.$data.lists.unshift(data);
}
/*var data2 ={
    uid:10001,
    name:1111,
    msg:'dsfdfafaffffffffffffffffffffffff',
    url:'../image/touxiang1.png',
    msgnum:'20'
}
var data1 = {
    lists:[{
        uid:10001,
        name:245,
        msg:'dsfdfafaffffffffffffffffffffffff',
        url:'../image/touxiang1.png',
        msgnum:'20'
    }
    ]
}

newMsgFn(data1);*/
