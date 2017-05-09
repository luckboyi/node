var db = {
	_pre:"tob",
	set:function(a,b) {
		 window.localStorage.setItem(this._pre + a, b);
	},
	get:function(a) {
		var val = window.localStorage.getItem(this._pre + a);
		if(val==null) {
			return {};
		} else {
			return JSON.parse(val)
		}
	},
	updateGame:function(arr) {
		var gameStatus = this.get('game')
		var len = arr.length
		for(var i=0;i<len;i++) {
			var gameId = arr[i].gameid
			if(typeof(gameStatus[gameId])=="undefined") {
				gameStatus[gameId] = {gameid:gameId,status:0,pos:0,txt:""}
			}

			if(typeof(gameStatus[gameId].status)=="undefined") {
				gameStatus[gameId].status = 0
			}
			if(typeof(gameStatus[gameId].pos)=="undefined") {
				gameStatus[gameId].pos = 0
			}
			if(typeof(gameStatus[gameId].txt)=="undefined") {
				gameStatus[gameId].txt = ""
			}

			if(typeof(arr[i].status)!="undefined") {
				gameStatus[gameId].status = arr[i].status
			}
			if(typeof(arr[i].pos)!="undefined") {
				gameStatus[gameId].pos = arr[i].pos
			}
			if(typeof(arr[i].txt)!="undefined") {
				gameStatus[gameId].txt = arr[i].txt
			}
		}
		//console.log(gameStatus)
		this.set('game',JSON.stringify(gameStatus))
	}
}
export default db;