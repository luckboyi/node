/**
 * 客服端访问时加载的通用js
 */
var messenger = new Messenger("website", 'vronline-pc');
messenger.addTarget(window.parent, 'pc');
var msg = {
    url: self.location.href
};

messenger.targets["pc"].send(JSON.stringify(msg));