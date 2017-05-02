function MainFn(argument) {
	function interface(module,fn,data){
        data = data != ''?JSON.parse(data):data;
        switch(module){
            case 'video':
                switch (fn){
                    case 'addLocalVideo':
                        addVideoSource(data);
                        break;
                   
                };
                break;
        }
    };
    return {interface:interface}
};
var mainFn = new MainFn();


function addVideoSource(data){
		alert(data.src)
	var  html = '<div class="valiantPhoto" data-video-src="'+data.src+'" style="width: 976px; height: 540px;background: #000"></div>';
   $('.local_video_play').html(html);
   $('.valiantPhoto').Valiant360({
			clickAndDrag:true,
			muted:false
	});
}