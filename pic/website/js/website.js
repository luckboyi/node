var scrollbar = $('.need-tiny-scroll').tinyscrollbar();
scrollbar = scrollbar.tinyscrollbar().data("plugin_tinyscrollbar");
window.reserveHeight = 148;
updateScrollbar();

/**
 * 页面滚动时，左侧栏固定
 */
$(window).scroll(function(event) {
    var sct = $(this).scrollTop();
    var scl = $(this).scrollLeft();
    var windowWidth = $(this).width();
    if (sct >= 74) {
        $('.left-fix-con,.fix-con').css({
            'position': 'fixed',
            'top': '74px',
        }).addClass('has-fixed');

        $('.all-fixed').css({
            'top': '74px',
        }).addClass('has-fixed');

        $(".list-con-change-for-fix").css({
            "padding-top": "40px"
        });
        window.reserveHeight = 74;
    } else {
        $('.left-fix-con,.fix-con').css({
            'position': 'relative',
            'top': '0',
            'left': 'auto'
        }).removeClass('has-fixed');
        var height = 148 - sct;
        $('.all-fixed').css({
            'top': height + 'px'
        }).addClass('has-fixed');
        $(".list-con-change-for-fix").css({
            "padding-top": "10px"
        });
        window.reserveHeight = 148 - sct;
    }

    if (windowWidth < 1240) {
        $('.all-fixed').each(function(i, e) {
            var left = $(e).attr("fix-left");
            if (!left) {
                left = 0;
            }
            $(e).css({
                'left': left - scl
            });
        });
        if (sct >= 74) {
            $('.left-fix-con,.fix-con').each(function(i, e) {
                var left = $(e).attr("fix-left");
                if (!left) {
                    left = 0;
                }
                $(e).css({
                    'left': left - scl
                });
            });
        }
    } else {
        $('.all-fixed,.left-fix-con,.fix-con').css({
            'left': 'auto'
        });
    }

    updateScrollbar();
});

$(window).resize(function() {
    $('.fix-height').each(function(i, e) {
        $(e).css({
            height: $(window).height() - $(e).offset().top,
            overflow: "hidden"
        });
    });
    updateScrollbar();
});

function updateScrollbar() {
    if (!scrollbar) {
        return false;
    }
    var viewHeight = $(window).height() - window.reserveHeight;
    viewHeight = viewHeight ? viewHeight : 0;
    $(".viewport").height(viewHeight);
    scrollbar.update("relative");
}