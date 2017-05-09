jQuery(function ($) {
    //轮播图代码
    var mySwiper = new Swiper('.news-cast', {
        pagination: '.news-cast .pagination',
        paginationClickable: true,
        loop:true,
        autoplay:3000,
        resizeReInit:true
    });
    $('#first-prev').on('click', function (e) {
        e.preventDefault();
        mySwiper.swipePrev();
    });
    $('#first-next').on('click', function (e) {
        e.preventDefault();
        mySwiper.swipeNext();
    });
    //新闻标签切换
    $('.news-nav').on('click','span',function(){
        var $this = $(this),
            index = $this.index();
        if($this.is('.news-nav .current')){
            return;
        }
        $this.addClass('current').siblings().removeClass('current');
        $('.news-content').stop().eq(index).fadeIn('500',function(){
            $('.news-content.news-current').removeClass('news-current').hide();
            $(this).addClass('news-current');
            
        });
    });
    //一周热点 排行
    $('.hot-list').on('mouseover','li',function(){
        var $this = $(this);
        if($this.is('.hot-list .current')){
            return
        }
        $this.addClass('current').siblings().removeClass('current');
    });
});