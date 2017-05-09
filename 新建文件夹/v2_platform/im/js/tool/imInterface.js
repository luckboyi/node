/**
 * Created by zhengy on 2016/12/22.
 */
(function(w) {
    var platform = {
        init: function() {
            if (typeof w.CppCall == "function") {
                this.Platform = "pc";
            } else {
                this.Platform = "web";
            }
        },
        callFun: function(frameType, action, json) {
            if (!frameType || !action) {
                return false;
            }
            if (!json) {
                json = null;
            }
            if (this.Platform == "pc") {
                w.CppCall(frameType, action, json);
            } else {
                if (typeof this[frameType + "_" + action] == "function") {
                    this[frameType + "_" + action](json);
                }
            }
            return true;
        },
        common_close: function() {

        }
    }
    platform.init();
    window.PL = platform;
})(window);

function MainFn(){
    function interface(module,fn,data){
        data =data != "" ? JSON.parse(data):data ;
        switch (module){
            case 'mainFrame':
                switch (fn){
                    case 'userData':
                        userData(data);
                        break;
                    case 'changeUserData':
                        changeUserData(data);
                        break;
                    case 'friend_request':
                        friend_request(data);
                        break;
                    case 'new_friend_request':
                        new_friend_request(data);
                        break;
                    case 'friend_list':
                        friend_list(data);
                        break;
                    case 'add_friend_list':
                        add_friend_list(data);
                        break;
                    case 'resh_friend_list':
                        resh_friend_list(data);
                        break;
                }
                break;
            case 'addFriendFrame':
                switch (fn){
                    case 'recommend_list':
                        recommend_list(data);
                        break;
                    case 'recommend_game':
                        recommend_game(data);
                        break;
                }
                break;
            case 'chatFrame':
                switch (fn){
                    case 'chatFrientList':
                        chatFrientList(data);
                        break;
                    case 'addMsg':
                        addMsg(data);
                        break;
                }
                break;
            case 'noticeFrame':
                switch (fn){
                    case 'noticeFn':
                        noticeFn(data);
                        break;
                    case 'addNoticeMsg':
                        addNoticeMsg(data);
                        break;
                }
                break;
            case 'deleteFrame':
                switch (fn){
                    case 'deleteFrient':
                        deleteFrient(data);
                        break;
                }
                break;
            case 'newMsgTipsFrame':
                switch (fn){
                    case 'newMsgFn':
                        newMsgFn(data);
                        break;
                    case 'addNewMsgFn':
                        addNewMsgFn(data);
                        break;
                }
            case 'usermsgFrame':
                switch(fn){
                    case 'usermsg':
                        usermsg(data);
                    break;
                }
        }
    }
    return {interface:interface}
}
var mainFn = new MainFn();

// mainFn.interface('mainFrame','userData',userUpdata);
//  mainFn.interface('mainFrame','friend_list',data2);
//  mainFn.interface('mainFrame','friend_request',data1);
//imfn.imFrame('usermsgFrame','usermsg',userdata);

/*

*/
