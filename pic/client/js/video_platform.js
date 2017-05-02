$(function(){
       
       /* $('body').on('click','#valiantPhoto .open_local_file',function(){
            PL.callFun('videoframe','video_open_local','');
        });*/
        /*点击vr按钮*/
       /* $('body').on('click','#valiantPhoto .vr_btn',function(){
              var vrJson ={
                url:'',
                time:''
                };
        vrJson.url = $(this).parents('#valiantPhoto').attr('data-video-src');
        var timer = $(this).parents('#valiantPhoto').find('.timeLabel').html();
        vrJson.time =parseFloat(timer.split('/')[0].split(":")[0]*60)+parseFloat(timer.split('/')[0].split(":")[1]);
        
        PL.callFun('videoframe', 'video_vr_open', JSON.stringify(vrJson));
        });*/
        //点击全屏        
       /* $('body').on('click','.fa-expand',function(){
        	PL.callFun('common', 'fullscreen', '');
        });*/
    
});
