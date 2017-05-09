import Vue from 'vue'
import App from './App.vue'
import db from './db'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'
import InfiniteScroll from 'mint-ui';

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(InfiniteScroll);

// 定义组件, 也可以像教程之前教的方法从别的文件引入
//const First = { template: '<div><h2>我是第 1 个子页面</h2></div>' }
//import secondcomponent from './comp/sec.vue'
import storeroom from './comp/storeroom.vue'

var all = Vue.extend({
        template: '#gamestore'
    })
Vue.component('gamelist',require('./comp/gamelist.vue'))
Vue.component('revenue_list',require('./comp/revenue_list.vue'));
Vue.component('data_list',require('./comp/data_list.vue'))
    // 创建一个路由器实例
    // 并且配置路由规则
const router = new VueRouter({
    base: __dirname,
    routes: [{
        path: '/',
        redirect: '/storeroom/all'
    }, {
        path: '/storeroom', //自定义子路由
        component: storeroom,
        children: [{
            path: '/',
            redirect: '/storeroom/all'
        }, {
            path: 'all',
            component: require('./comp/store.vue')
        }, {
            path: 'mygame',
            component: require('./comp/mygame.vue')
        }, {
            path: 'gameset',
            component: require('./comp/gameset.vue'),
            children: [{
                path: '',
                component: require('./comp/computerset.vue'),
                children: [{
                    path: '',
                    component: require('./comp/gameset_list.vue')
                }, ]
            }, {
                path: 'ingame',
                component: require('./comp/computerset.vue'),
                children: [{
                    path: '/',
                    component: require('./comp/gameset_list.vue')
                }, {
                    path: 'list',
                    component: require('./comp/gameset_list.vue')
                }]
            }]
        }, {
            path: 'download',
            component: require('./comp/downloadcon.vue')
        }]
    }, {
        path: '/account',
        component: require('./comp/account.vue')

    },{
        path: '/revenue',
        component: require('./comp/revenue.vue')

    },{
        path: '/data',
        component: require('./comp/data_report.vue')

    }]
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app')
if (window.CppCall == undefined) {
    window.CppCall = function () {};
}
app.gamedowndata ={};
window.CppCall('gamelistframe','getgamesstatus','');
window.CppCall('gamelistframe','getdowninfo','');
window.onmessage = function(e){
    //console.log(e.data);
    if(typeof(e.data)=="object") {
        return
    }
    try
    {
        var obj = JSON.parse(e.data);
        if(typeof(obj)!="object" || typeof(obj.type)=="undefined" || typeof(obj.data)=="undefined") {
            //console.log("parser json no type",err)
            return
        }
        var data = obj.data;
        //console.dir(data)
        switch(obj.type)
        {
            case "setcookie":
                app.$http.post("//tob.vronline.com/admin/login", data, {
                        emulateJSON: true,
                        credentials: true
                    }).then(response => {
                        console.log(response)
                    }, response => {
                        // error callback
                    });
                break;
            case "gamesstatusres":
                db.updateGame(data);
                break;
            case "updategamestatus":
            /*case "updatedownloadstatus":*/
            case "updategameinstallprogress":
            case "updategameinstallresult":
                var gameStatusArr = [data];
                db.updateGame(gameStatusArr);
                app.$emit('updateStatus', gameStatusArr);
                break;
            case "gamedowninfores":
                var gameStatusArr = data;
                var objData ={};
                for(var i in data){
                    
                    if(i=="$remove"){
                        continue;
                    }
                    var gameId = data[i].gameid;
                    if(typeof(objData[gameId])=="undefined") {
                        objData[gameId] = {gameid:gameId,status:0,pos:0,txt:''}
                    };
                    if(typeof(data[i].status)!="undefined") {
                       objData[gameId].status = data[i].status
                    }
                    if(typeof(data[i].pos)!="undefined") {
                        objData[gameId].pos = data[i].pos
                    }
                    if(typeof(data[i].txt)!="undefined") {
                        objData[gameId].txt = data[i].txt
                    }
                }
                app.gamedowndata= Object.assign(app.gamedowndata,objData)
                app.$emit('downloadstatus', app.gamedowndata); 
                   break;
                case 'updatedownloadstatus':
                case "updategamedowninstallprogres":
                var gameStatusArr = data;
                var objData =[];
                var id = data.gameid; 
                if(typeof(objData[id])=="undefined") {
                    objData[id] = {gameid:id,status:0,pos:0,txt:''}
                };
                if(typeof(data.status)!="undefined" && data.status !='') {
                    objData[id].status = data.status
                }
                if(typeof(data.pos)!="undefined" &&  data.pos!='') {
                    objData[id].pos = data.pos
                }
                if(typeof(data.txt)!="undefined" && data.txt !='') {
                    objData[id].txt = data.txt
                }
                app.gamedowndata= Object.assign(app.gamedowndata,objData)
                //console.log(app.gamedowndata)
                app.$emit('downloadstatus', app.gamedowndata); 
                    break;
            default:
        }
    }
    catch(err)
    {
        console.log("parser json error",err)
    }
}



