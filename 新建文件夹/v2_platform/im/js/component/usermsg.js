/*
* @Author: zhengy
* @Date:   2017-04-17 12:10:11
* @Last Modified by:   zhengy
* @Last Modified time: 2017-04-17 12:19:00
*/

'use strict';


var usermsg;
function usermsg(data){
	usermsg =new Vue({
		el:'#usermsg',
		data:data,
		methods:{
			sendMsg(){
				//发送消息
			},
			closeBtn(){
				//alert(1)
			}
		}
	})
}



var userdata  ={
			img:'http://img.1985t.com/uploads/attaches/2017/02/113333-doB4dmR.jpg',
			name:'大vaa',
			history_game:[
				{
					game_img:'http://img.1985t.com/uploads/attaches/2017/02/113333-doB4dmR.jpg',
					gamename:'梦幻西游',
					playnum:'2855552'
				},
				{
					game_img:'http://img.1985t.com/uploads/attaches/2017/02/113333-doB4dmR.jpg',
					gamename:'梦幻西游',
					playnum:'2855552'
				},
				{
					game_img:'http://img.1985t.com/uploads/attaches/2017/02/113333-doB4dmR.jpg',
					gamename:'梦幻西游',
					playnum:'28555'
				},
				{
					game_img:'http://img.1985t.com/uploads/attaches/2017/02/113333-doB4dmR.jpg',
					gamename:'梦幻西游',
					playnum:'2855'
				}
			]
		}