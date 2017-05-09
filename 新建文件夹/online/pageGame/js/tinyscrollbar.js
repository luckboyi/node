(function(factory) {
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory);
        } else if (typeof exports === 'object') {
            module.exports = factory(require("jquery"));
        } else {
            factory(jQuery);
        }
    }
    (function($) {
        "use strict";

        var pluginName = "tinyscrollbar",
            defaults = {
                axis: 'y',
                wheel: true,
                wheelSpeed: 40,
                wheelLock: true,
                touchLock: true,
                trackSize: false,
                thumbSize: false,
                thumbSizeMin: 20
            };

        function Plugin($container, options) {
            /**
             * The options of the carousel extend with the defaults.
             *
             * @property options
             * @type Object
             */
            this.options = $.extend({}, defaults, options);

            /**
             * @property _defaults
             * @type Object
             * @private
             * @default defaults
             */
            this._defaults = defaults;

            /**
             * @property _name
             * @type String
             * @private
             * @final
             * @default 'tinyscrollbar'
             */
            this._name = pluginName;

            var self = this,
                $viewport = $container.find(".viewport"),
                $overview = $container.find(".overview"),
                $scrollbar = $container.find(".scrollbar"),
                $track = $scrollbar.find(".track"),
                $thumb = $scrollbar.find(".thumb")

            , hasTouchEvents = ("ontouchstart" in document.documentElement), wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
                document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
                "DOMMouseScroll" // let's assume that remaining browsers are older Firefox
                , isHorizontal = this.options.axis === 'x', sizeLabel = isHorizontal ? "width" : "height", posiLabel = isHorizontal ? "left" : "top"

            , mousePosition = 0;

            /**
             * The position of the content relative to the viewport.
             *
             * @property contentPosition
             * @type Number
             */
            this.contentPosition = 0;

            /**
             * The height or width of the viewport.
             *
             * @property viewportSize
             * @type Number
             */
            this.viewportSize = 0;

            /**
             * The height or width of the content.
             *
             * @property contentSize
             * @type Number
             */
            this.contentSize = 0;

            /**
             * The ratio of the content size relative to the viewport size.
             *
             * @property contentRatio
             * @type Number
             */
            this.contentRatio = 0;

            /**
             * The height or width of the content.
             *
             * @property trackSize
             * @type Number
             */
            this.trackSize = 0;

            /**
             * The size of the track relative to the size of the content.
             *
             * @property trackRatio
             * @type Number
             */
            this.trackRatio = 0;

            /**
             * The height or width of the thumb.
             *
             * @property thumbSize
             * @type Number
             */
            this.thumbSize = 0;

            /**
             * The position of the thumb relative to the track.
             *
             * @property thumbPosition
             * @type Number
             */
            this.thumbPosition = 0;

            /**
             * Will be true if there is content to scroll.
             *
             * @property hasContentToSroll
             * @type Boolean
             */
            this.hasContentToSroll = false;

            /**
             * @method _initialize
             * @private
             */
            function _initialize() {
                self.update();
                _setEvents();

                return self;
            }

            /**
             * You can use the update method to adjust the scrollbar to new content or to move the scrollbar to a certain point.
             *
             * @method update
             * @chainable
             * @param {Number|String} [scrollTo] Number in pixels or the values "relative" or "bottom". If you dont specify a parameter it will default to top
             */
            this.update = function(scrollTo) {
                var sizeLabelCap = sizeLabel.charAt(0).toUpperCase() + sizeLabel.slice(1).toLowerCase();
                this.viewportSize = $viewport[0]['offset' + sizeLabelCap];
                this.contentSize = $overview[0]['scroll' + sizeLabelCap];
                this.contentRatio = this.viewportSize / this.contentSize;
                this.trackSize = this.options.trackSize || this.viewportSize;
                this.thumbSize = Math.min(this.trackSize, Math.max(this.options.thumbSizeMin, (this.options.thumbSize || (this.trackSize * this.contentRatio))));
                this.trackRatio = (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize);
                this.hasContentToSroll = this.contentRatio < 1;

                $scrollbar.toggleClass("disable", !this.hasContentToSroll);

                switch (scrollTo) {
                    case "bottom":
                        this.contentPosition = Math.max(this.contentSize - this.viewportSize, 0);
                        break;

                    case "relative":
                        this.contentPosition = Math.min(Math.max(this.contentSize - this.viewportSize, 0), Math.max(0, this.contentPosition));
                        break;

                    default:
                        this.contentPosition = parseInt(scrollTo, 10) || 0;
                }

                this.thumbPosition = this.contentPosition / this.trackRatio;

                _setCss();

                return self;
            };

            /**
             * @method _setCss
             * @private
             */
            function _setCss() {
                $thumb.css(posiLabel, self.thumbPosition);
                $overview.css(posiLabel, -self.contentPosition);
                $scrollbar.css(sizeLabel, self.trackSize);
                $track.css(sizeLabel, self.trackSize);
                $thumb.css(sizeLabel, self.thumbSize);
            }

            /**
             * @method _setEvents
             * @private
             */
            function _setEvents() {
                if (hasTouchEvents) {
                    $viewport[0].ontouchstart = function(event) {
                        if (1 === event.touches.length) {
                            event.stopPropagation();

                            _start(event.touches[0]);
                        }
                    };
                }
                $thumb.bind("mousedown", function(event) {
                    event.stopPropagation();
                    _start(event);
                });
                $track.bind("mousedown", function(event) {
                    _start(event, true);
                });

                $(window).resize(function() {
                    self.update("relative");
                });

                if (self.options.wheel && window.addEventListener) {
                    $container[0].addEventListener(wheelEvent, _wheel, false);
                } else if (self.options.wheel) {
                    $container[0].onmousewheel = _wheel;
                }
            }

            /**
             * @method _isAtBegin
             * @private
             */
            function _isAtBegin() {
                return self.contentPosition > 0;
            }

            /**
             * @method _isAtEnd
             * @private
             */
            function _isAtEnd() {
                return self.contentPosition <= (self.contentSize - self.viewportSize) - 5;
            }

            /**
             * @method _start
             * @private
             */
            function _start(event, gotoMouse) {
                if (self.hasContentToSroll) {
                    $("body").addClass("noSelect");

                    mousePosition = gotoMouse ? $thumb.offset()[posiLabel] : (isHorizontal ? event.pageX : event.pageY);

                    if (hasTouchEvents) {
                        document.ontouchmove = function(event) {
                            if (self.options.touchLock || _isAtBegin() && _isAtEnd()) {
                                event.preventDefault();
                            }
                            event.touches[0][pluginName + "Touch"] = 1;
                            _drag(event.touches[0]);
                        };
                        document.ontouchend = _end;
                    }
                    $(document).bind("mousemove", _drag);
                    $(document).bind("mouseup", _end);
                    $thumb.bind("mouseup", _end);
                    $track.bind("mouseup", _end);

                    _drag(event);
                }
            }

            /**
             * @method _wheel
             * @private
             */
            function _wheel(event) {
                if (self.hasContentToSroll) {
                    // Trying to make sense of all the different wheel event implementations..
                    //
                    var evntObj = event || window.event,
                        wheelDelta = -(evntObj.deltaY || evntObj.detail || (-1 / 3 * evntObj.wheelDelta)) / 40,
                        multiply = (evntObj.deltaMode === 1) ? self.options.wheelSpeed : 1;

                    self.contentPosition -= wheelDelta * multiply * self.options.wheelSpeed;
                    self.contentPosition = Math.min((self.contentSize - self.viewportSize), Math.max(0, self.contentPosition));
                    self.thumbPosition = self.contentPosition / self.trackRatio;

                    /**
                     * The move event will trigger when the carousel slides to a new slide.
                     *
                     * @event move
                     */
                    $container.trigger("move");

                    $thumb.css(posiLabel, self.thumbPosition);
                    $overview.css(posiLabel, -self.contentPosition);

                    if (self.options.wheelLock || _isAtBegin() && _isAtEnd()) {
                        evntObj = $.event.fix(evntObj);
                        evntObj.preventDefault();
                    }
                }
                event.stopPropagation();
            }

            /**
             * @method _drag
             * @private
             */
            function _drag(event) {
                if (self.hasContentToSroll) {
                    var mousePositionNew = isHorizontal ? event.pageX : event.pageY,
                        thumbPositionDelta = event[pluginName + "Touch"] ?
                        (mousePosition - mousePositionNew) : (mousePositionNew - mousePosition),
                        thumbPositionNew = Math.min((self.trackSize - self.thumbSize), Math.max(0, self.thumbPosition + thumbPositionDelta));

                    self.contentPosition = thumbPositionNew * self.trackRatio;

                    $container.trigger("move");

                    $thumb.css(posiLabel, thumbPositionNew);
                    $overview.css(posiLabel, -self.contentPosition);
                }
            }

            /**
             * @method _end
             * @private
             */
            function _end() {
                self.thumbPosition = parseInt($thumb.css(posiLabel), 10) || 0;

                $("body").removeClass("noSelect");
                $(document).unbind("mousemove", _drag);
                $(document).unbind("mouseup", _end);
                $thumb.unbind("mouseup", _end);
                $track.unbind("mouseup", _end);
                document.ontouchmove = document.ontouchend = null;
            }

            return _initialize();
        }

        /**
        * @class tinyscrollbar
        * @constructor
        * @param {Object} options
            @param {String} [options.axis='y'] Vertical or horizontal scroller? ( x || y ).
            @param {Boolean} [options.wheel=true] Enable or disable the mousewheel.
            @param {Boolean} [options.wheelSpeed=40] How many pixels must the mouswheel scroll at a time.
            @param {Boolean} [options.wheelLock=true] Lock default window wheel scrolling when there is no more content to scroll.
            @param {Number} [options.touchLock=true] Lock default window touch scrolling when there is no more content to scroll.
            @param {Boolean|Number} [options.trackSize=false] Set the size of the scrollbar to auto(false) or a fixed number.
            @param {Boolean|Number} [options.thumbSize=false] Set the size of the thumb to auto(false) or a fixed number
            @param {Boolean} [options.thumbSizeMin=20] Minimum thumb size.
        */
        $.fn[pluginName] = function(options) {
            return this.each(function() {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
                }
            });
        };
    }));


//列表轮播
;
(function($) {
    "use strict";
    $.movingBoxes = function(el, options) {
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var o, base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el).addClass('mb-slider');
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data('movingBoxes', base);

        base.init = function() {
            base.options = o = $.extend({}, $.movingBoxes.defaultOptions, options);

            // Setup formatting (to reduce the amount of initial HTML)
            base.$el.wrap('<div class="movingBoxes mb-wrapper"><div class="mb-scroll" /></div>');

            // defaults
            base.$window = base.$el.parent(); // mb-scroll
            base.$wrap = base.$window.parent() // mb-wrapper
                .prepend('<a class="mb-scrollButtons mb-left"></a>')
                .append('<a class="mb-scrollButtons mb-right"></a><div class="mb-left-shadow"></div><div class="mb-right-shadow"></div>');

            base.$panels = base.$el.children().addClass('mb-panel')
            base.runTime = $('.mb-slider').index(base.$el) + 1; // Get index (run time) of this slider on the page
            base.regex = new RegExp('slider' + base.runTime + '=(\\d+)', 'i'); // hash tag regex

            base.initialized = false;
            base.currentlyMoving = false;
            base.curPanel = (o.initAnimation) ? 1 : base.getHash() || o.startPanel;
            // save original slider width
            base.width = (o.width) ? parseInt(o.width, 10) : base.$el.width();
            // save panel width, o.panelWidth originally a fraction (0.5 of o.width) if defined, or get first panel width
            // now can be set after initialization to resize using fraction (value <= 2) or px (all values > 2)
            base.pWidth = (o.panelWidth) ? (o.panelWidth <= 2 ? o.panelWidth * base.width : o.panelWidth) : base.$panels.eq(0).width();

            // Set up click on left/right arrows
            base.$left = base.$wrap.find('.mb-left').click(function() {
                base.goBack();
                return false;
            });
            base.$right = base.$wrap.find('.mb-right').click(function() {
                base.goForward();
                return false;
            });
            // code to run to update MovingBoxes when the number of panels change
            base.update({}, false);
            // make sure current panel is centered
            base.setWrap(base.curPanel);

            // go to clicked panel
            base.$el.delegate('.mb-panel', 'click', function(e) {
                if (!$(this).hasClass(o.currentPanel)) {
                    e.preventDefault(); // prevent non-current panel links from working
                    base.change(base.$panels.index($(this)) + base.adj, {}, true);
                }
            });

            // Activate moving box on click or when an internal link obtains focus
            base.$wrap.click(function() {
                if (!base.$wrap.hasClass('mb-active-slider')) {
                    base.active();
                }
            });
            base.$panels.delegate('a', 'focus', function(e) {
                e.preventDefault();
                // focused link centered in moving box
                var loc = base.$panels.index($(this).closest('.mb-panel')) + base.adj;
                if (loc !== base.curPanel) {
                    base.change(loc, {}, true);
                }
            });

            // Add keyboard navigation
            $(document).keyup(function(e) {
                // ignore arrow/space keys if inside a form element
                if (e.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
                    return;
                }
                switch (e.which) {
                    case 39:
                    case 32: // right arrow & space
                        if (base.$wrap.is('.mb-active-slider')) {
                            base.goForward();
                        }
                        break;
                    case 37: // left arrow
                        if (base.$wrap.is('.mb-active-slider')) {
                            base.goBack();
                        }
                        break;
                }
            });

            // Bind Events
            $.each('preinit initialized initChange beforeAnimation completed'.split(' '), function(i, evt) {
                if ($.isFunction(o[evt])) {
                    base.$el.bind(evt + '.movingBoxes', o[evt]);
                }
            });

            base.$el.trigger('preinit.movingBoxes', [base, base.curPanel]);

        };

        // update the panel, flag is used to prevent events from firing
        base.update = function(callback, flag) {

            // Infinite loop
            base.$el.children('.cloned').remove();
            base.$panels = base.$el.children();
            base.adj = (o.wrap && base.$panels.length > 1) ? 0 : 1; // count adjustment for infinite panels

            base.width = (o.width) ? parseInt(o.width, 10) : base.width;
            base.$wrap.css('width', base.width); // set wrapper width

            if (o.wrap && base.$panels.length > 1) {
                base.$el.prepend(base.$panels.filter(':last').clone().addClass('cloned'));
                base.$el.append(base.$panels.filter(':first').clone().addClass('cloned'));
                base.$el.find('.cloned').each(function() {
                    // disable all focusable elements in cloned panels to prevent shifting the panels by tabbing
                    $(this).find('a,input,textarea,select,button,area').removeAttr('name').attr('disabled', 'disabled');
                    $(this).find('[id]').andSelf().removeAttr('id');
                });
            }

            // Set up panes & content sizes
            // defined $panels again to include cloned panels
            base.$panels = base.$el.children()
                .addClass('mb-panel')
                // inner wrap of each panel
                .each(function() {
                    if ($(this).find('.mb-inside').length === 0) {
                        $(this).wrapInner('<div class="mb-inside" />');
                    }
                });
            base.totalPanels = base.$panels.filter(':not(.cloned)').length; // don't include cloned panels in total
            // in case current panel no longer exists
            if (base.totalPanels <= 1) {
                base.curPanel = 1;
            }

            base.setSizes(flag);

            base.buildNav();

            base.change(base.curPanel, callback, flag); // initialize from first panel... then scroll to start panel

            // check panel height after all images load
            base.imagesLoaded(function() {
                base.setSizes(false);
                base.setWrap(base.curPanel);

                // animate to chosen start panel - starting from the first panel makes it look better
                if (!base.initialized) {
                    setTimeout(function() {
                        base.initialized = true;
                        base.change(base.getHash() || o.startPanel, {}, false);
                        base.$el.trigger('initialized.movingBoxes', [base, base.curPanel]);
                    }, o.speed * 2);
                }

            });

        };

        base.setSizes = function(flag) {
            // include padding & margins around the panels
            base.padding = parseInt(base.$panels.css('padding-left'), 10) + parseInt(base.$panels.css('margin-left'), 10);

            // save 'cur' numbers (current larger panel size), use stored sizes if they exist
            base.curWidth = (o.panelWidth) ? (o.panelWidth <= 2 ? o.panelWidth * base.width : o.panelWidth) : base.pWidth;
            // save 'reg' (reduced size) numbers
            base.regWidth = base.curWidth * 0.9;
            // set image heights so base container height is correctly set
            base.$panels.css({
                width: base.curWidth,
                marginTop: '12'
            }); // make all panels big
            // save each panel height... script will resize container as needed
            // make sure current panel css is applied before measuring
            base.$panels.eq(base.curPanel - base.adj).addClass(o.currentPanel);
            base.heights = base.$panels.css('height', 'auto').map(function(i, e) {
                return $(e).outerHeight(true);
            }).get();

            base.returnToNormal(base.curPanel, 0); // resize new panel, animation time
            base.growBigger(base.curPanel, 0, flag);
            base.updateArrows(base.curPanel);

            // make base container wide enough to contain all the panels
            base.$el.css({
                position: 'absolute',
                // add a bit more width to each box (base.padding *2; then add 1/2 overall width in case only one panel exists)
                width: (base.curWidth + base.padding * 2) * base.$panels.length + (base.width - base.curWidth) / 2,
                height: Math.max.apply(this, base.heights) + 10,
                // add padding so scrollLeft = 0 centers the left-most panel (needed because scrollLeft cannot be < 0)
                'padding-left': (base.width - base.curWidth) / 2
            });
            base.$window.css({
                height: (o.fixedHeight) ? Math.max.apply(this, base.heights) : base.heights[base.curPanel - base.adj]
            });
        };

        // Creates the numbered navigation links
        base.buildNav = function() {
            if (base.$nav) {
                base.$nav.find('.mb-links').empty();
            } else {
                base.$nav = $('<div class="mb-controls"><span class="mb-links"></span></div>').appendTo(base.$wrap);
            }
            if (o.buildNav && base.totalPanels > 1) {
                var t, j, a = '',
                    $a;
                base.$panels.filter(':not(.cloned)').each(function(i) {
                    j = i + 1;
                    a = '<a class="mb-link mb-panel' + j + '" href="#"></a>';
                    $a = $(a);
                    // If a formatter function is present, use it
                    if ($.isFunction(o.navFormatter)) {
                        t = o.navFormatter(j, $(this));
                        if (typeof(t) === "string") {
                            $a.html();
                        } else {
                            $a = $('<a/>', t);
                        }
                    } else {
                        $a.html();
                    }
                    $a
                        .appendTo(base.$nav.find('.mb-links'))
                        .addClass('mb-link mb-panel' + j)
                        .data('index', j);
                });
                base.$nav
                    .find('a.mb-link').bind('click', function() {
                        base.change($(this).data('index'));
                        return false;
                    });
            }
        };

        // Resize panels to normal
        base.returnToNormal = function(num, time) {
            var panels = base.$panels.not(':eq(' + (num - base.adj) + ')').removeClass(o.currentPanel);
            if (o.reducedSize === 1) {
                panels.css({
                    width: base.regWidth
                }); // excluding fontsize change to prevent video flicker
            } else {
                panels.stop(true, false).animate({
                    width: base.regWidth,
                    marginTop: '12'
                }, (time === 0) ? 0 : o.speed);


            }
        };

        // Zoom in on selected panel
        base.growBigger = function(num, time, flag) {
            var panels = base.$panels.eq(num - base.adj);
            if (o.reducedSize === 1) {
                panels.css({
                    width: base.curWidth
                }); // excluding fontsize change to prevent video flicker
                // time delay prevents click outer panel from following links - fixes issue #67
                setTimeout(function() {
                    base.completed(num, flag);
                }, (time === 0) ? 0 : o.speed);
            } else {
                panels.stop(true, false).animate({
                    width: base.curWidth,
                    marginTop: '0'
                }, (time === 0) ? 0 : o.speed, function() {
                    base.completed(num, flag);
                });

            }
        };

        // instantly center the indicated panel
        base.setWrap = function(panel) {
            if (base.totalPanels >= 1) {
                base.growBigger(panel, 0, false);
                var leftValue = base.$panels.eq(panel - base.adj).position().left - (base.width - base.curWidth) / 2 + base.padding;
                base.$window.scrollLeft(leftValue);
            }
        };

        base.completed = function(num, flag) {
            // add current panel class after animating in case it has sizing parameters
            var loc = base.$panels.eq(num - base.adj);
            if (!loc.hasClass('cloned')) {
                loc.addClass(o.currentPanel);
            }
            if (flag !== false) {
                base.$el.trigger('completed.movingBoxes', [base, num]);
            }
        };

        // go forward/back
        base.goForward = function(callback) {
            if (base.initialized) {
                base.change(base.curPanel + 1, callback);
            }
        };

        base.goBack = function(callback) {
            if (base.initialized) {
                base.change(base.curPanel - 1, callback);
            }
        };

        // Change view to display selected panel
        base.change = function(curPanel, callback, flag) {

            if (base.totalPanels < 1) {
                if (typeof(callback) === 'function') {
                    callback(base);
                }
                return;
            }
            var ani, leftValue, wrapped = false;
            flag = flag !== false;

            // check if curPanel is a jQuery selector or object
            // $('' + curPanel) needed because $(3) = [3], but $('3') = []
            if ($('' + curPanel).length || (curPanel instanceof $ && $(curPanel).length)) {
                curPanel = $(curPanel).closest('.mb-panel').index() + base.adj;

            } else {
                // make sure it's a number and not a string
                curPanel = parseInt(curPanel, 10);

            }

            if (base.initialized && flag) {
                // make this moving box active
                if (!base.$wrap.hasClass('mb-active-slider')) {
                    base.active();
                }
                // initChange event - has extra parameter with targeted panel (not cleaned)
                base.$el.trigger('initChange.movingBoxes', [base, curPanel]);
            }

            // Make infinite scrolling work
            if (o.wrap) {
                if (curPanel > base.totalPanels) {
                    wrapped = true;
                    curPanel = 1;
                    base.returnToNormal(0, 0);
                    base.setWrap(0);
                } else if (curPanel === 0) {
                    wrapped = false;
                    curPanel = base.totalPanels;
                    base.setWrap(curPanel + 1);
                }
            }

            if (curPanel < base.adj) {
                curPanel = (o.wrap) ? base.totalPanels : 1;
            }
            if (curPanel > base.totalPanels - base.adj) {
                curPanel = (o.wrap) ? 1 : base.totalPanels;
            }
            // abort if panel is already animating
            // animation callback needed to clear this flag, but there is no animation before base.initialized is set
            if (base.curPanel !== curPanel && (!base.currentlyMoving || !base.initialized)) {
                // set animation flag; animation callback will clear this flag
                base.currentlyMoving = !o.stopAnimation;

                // center panel in scroll window
                base.$curPanel = base.$panels.eq(curPanel - base.adj);
                leftValue = base.$curPanel.position().left - (base.width - base.curWidth) / 2 + base.padding;
                // when scrolling right, add the difference of the larger current panel width
                if (base.initialized && (curPanel > base.curPanel || wrapped)) {
                    leftValue -= (base.curWidth - base.regWidth);
                }
                ani = (o.fixedHeight) ? {
                    scrollLeft: leftValue
                } : {
                    scrollLeft: leftValue,
                    height: base.heights[curPanel - base.adj]
                };
                base.curPanel = curPanel;

                // before animation trigger
                if (base.initialized && flag) {
                    base.$el.trigger('beforeAnimation.movingBoxes', [base, curPanel]);
                }

                if (o.delayBeforeAnimate) {
                    // delay starting slide animation
                    setTimeout(function() {
                        base.animateBoxes(curPanel, ani, flag, callback);
                    }, parseInt(o.delayBeforeAnimate, 10) || 0);
                } else {
                    base.animateBoxes(curPanel, ani, flag, callback);

                }
            } else {
                base.endAnimation();
            }
        };

        base.animateBoxes = function(curPanel, ani, flag, callback) {
            // animate the panels
            base.$window.scrollTop(0).stop(true, false).animate(ani, {
                queue: false,
                duration: o.speed,
                easing: o.easing,
                complete: function() {
                    if (base.initialized) {
                        base.$window.scrollTop(0); // Opera fix - otherwise, it moves the focus link to the middle of the viewport
                    }
                    base.currentlyMoving = false;
                    if (typeof(callback) === 'function') {
                        callback(base);
                    }
                }
            });

            base.returnToNormal(curPanel);
            base.growBigger(curPanel, o.speed, flag);
            base.updateArrows(curPanel);
            if (o.hashTags && base.initialized) {
                base.setHash(curPanel);
            }
            base.endAnimation();

        };

        base.endAnimation = function() {
            // Update navigation links
            if (o.buildNav && base.$nav.length) {
                base.$nav.find('a.mb-link')
                    .removeClass(o.currentPanel)
                    .eq(base.curPanel - 1).addClass(o.currentPanel);
            }
        };

        base.updateArrows = function(cur) {
            base.$left.toggleClass(o.disabled, (!o.wrap && cur === base.adj) || base.totalPanels <= 1);
            base.$right.toggleClass(o.disabled, (!o.wrap && cur === base.totalPanels) || base.totalPanels <= 1);
        };

        // This method tries to find a hash that matches an ID and slider-X
        // If either found, it tries to find a matching item
        // If that is found as well, then it returns the page number
        base.getHash = function() {
            var h = window.location.hash,
                i = h.indexOf('&'),
                n = h.match(base.regex);
            // test for "/#/" or "/#!/" used by the jquery address plugin - $('#/') breaks jQuery
            if (n === null && !/^#&/.test(h) && !/#!?\//.test(h)) {
                // #quote2&panel1-3&panel3-3
                h = h.substring(0, (i >= 0 ? i : h.length));
                // ensure the element is in the same slider
                n = ($(h).length && $(h).closest('.mb-slider')[0] === base.el) ? $(h).closest('.mb-panel').index() + base.adj : null;
            } else if (n !== null) {
                // #&panel1-3&panel3-3
                n = (o.hashTags) ? parseInt(n[1], 10) : null;
            }
            return (n > base.totalPanels) ? null : n;
        };

        // set hash tags
        base.setHash = function(n) {
            var s = 'slider' + base.runTime + "=",
                h = window.location.hash;
            if (typeof h !== 'undefined') {
                window.location.hash = (h.indexOf(s) > 0) ? h.replace(base.regex, s + n) : h + "&" + s + n;
            }
        };

        // Make moving box active (for keyboard navigation)
        base.active = function() {
            $('.mb-active-slider').removeClass('mb-active-slider');
            base.$wrap.addClass('mb-active-slider');
        };

        // get: var currentPanel = $('.slider').data('movingBoxes').currentPanel();  // returns # of currently selected/enlarged panel
        // set: var currentPanel = $('.slider').data('movingBoxes').currentPanel(2, function(){ alert('done!'); }); // returns and scrolls to 2nd panel
        base.currentPanel = function(panel, callback) {
            if (typeof(panel) !== 'undefined') {
                base.change(panel, callback); // parse in case someone sends a string
            }
            return base.curPanel;
        };

        // based on https://github.com/Mottie/imagesLoaded plugin
        base.imagesLoaded = function(callback, img) {
            var i, ic,
                c = true, // complete flag
                t = img ? $(img) : base.$panels.find('img'),
                l = t.length;
            img = img || []; // array of images that didn't complete
            for (i = 0; i < l; i++) {
                if (t[i].tagName === "IMG") {
                    // IE: fileSize property = -1 before image has loaded & if image load error, so if false is returned
                    // 10x, then just assume it's an error & call it complete - it's what Firefox & webkit does
                    ic = ('fileSize' in t[i] && t[i].fileSize < 0 && t[i].count > 10) ? true : t[i].complete;
                    // complete flag, checks previous flag status, complete flag & image height
                    // image height may need to be > 20 (or whatever the line-height is) because the alt text is included
                    c = (c && ic && t[i].height !== 0); // complete flag
                    // save non-complete images for next iteration
                    if (ic === false) {
                        img.push(t[i]);
                        // iteration count for IE
                        t[i].count = (t[i].count || 0) + 1;
                    }
                }
            }
            if (c) {
                // all complete, run the callback
                if (typeof callback === "function") {
                    callback();
                }
            } else {
                // some images not loaded, rinse & repeat
                setTimeout(function() {
                    base.imagesLoaded(callback, img);
                }, 200);
            }
        };

        // Run initializer
        base.init();
    };

    $.movingBoxes.defaultOptions = {
        // Appearance
        startPanel: 1, // start with this panel
        reducedSize: 0.8, // non-current panel size: 80% of panel size
        fixedHeight: false, // if true, slider height set to max panel height; if false, slider height will auto adjust.

        // Behaviour
        initAnimation: true, // if true, movingBoxes will initialize, then animate into the starting slide (if not the first slide)
        stopAnimation: false, // if true, movingBoxes will force the animation to complete immediately, if the user selects the next panel
        hashTags: true, // if true, hash tags are enabled
        wrap: false, // if true, the panel will loop through the panels infinitely
        buildNav: false, // if true, navigation links will be added
        navFormatter: null, // function which returns the navigation text for each panel
        easing: 'swing', // anything other than "linear" or "swing" requires the easing plugin

        // Times
        speed: 500, // animation time in milliseconds
        delayBeforeAnimate: 0, // time to delay in milliseconds before MovingBoxes animates to the selected panel

        // Selectors & classes
        currentPanel: 'current', // current panel class
        tooltipClass: 'tooltip', // added to the navigation, but the title attribute is blank unless the link text-indent is negative
        disabled: 'disabled', // class added to arrows that are disabled (left arrow when on first panel, right arrow on last panel)

        // Callbacks
        preinit: null, // callback after the basic MovingBoxes structure has been built; before "initialized"
        initialized: null, // callback when MovingBoxes has completed initialization; all images loaded
        initChange: null, // callback upon change panel initialization
        beforeAnimation: null, // callback before any animation occurs
        completed: null // callback after animation completes

        // deprecated options - but still used to keep the plugin backwards compatible
        // and allow resizing the overall width and panel width dynamically (i.e. on window resize)
        // width        : 800,       // overall width of movingBoxes (not including navigation arrows)
        // panelWidth   : 0.5        // current panel width adjusted to 50% of overall width

    };

    $.fn.movingBoxes = function(options, callback, flag) {
        var mb;
        return this.each(function() {
            mb = $(this).data('movingBoxes');
            // initialize the slider but prevent multiple initializations
            if ((typeof(options)).match('object|undefined')) {
                if (mb && options instanceof $ && options.length) {
                    // pass a jQuery object to change panels
                    mb.change(options, callback, flag);
                } else if (mb) {
                    mb.update(callback, flag);
                } else {
                    (new $.movingBoxes(this, options));
                }
            } else if (mb) {
                // page #, autoplay, one time callback, if flag is false then no events triggered and animation time = 0
                mb.change(options, callback, flag);
            }
        });
    };

    // Return the movingBoxes object
    $.fn.getMovingBoxes = function() {
        return this.data('movingBoxes');
    };

})(jQuery);

//详情轮播
function banner() {
    //轮播
    function G(s) {
        return document.getElementById(s);
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

    function Animate(obj, json) {
        if (obj.timer) {
            clearInterval(obj.timer);
        }
        obj.timer = setInterval(function() {
            for (var attr in json) {
                var iCur = parseInt(getStyle(obj, attr));
                iCur = iCur ? iCur : 0;
                var iSpeed = (json[attr] - iCur) / 5;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                obj.style[attr] = iCur + iSpeed + 'px';
                if (iCur == json[attr]) {
                    clearInterval(obj.timer);
                }
            }
        }, 50);
    }

    function clearAnimate() {
        clearInterval(oPicUl.timer);
        clearInterval(oListUl.timer);
    }

    var oPic = G("picBox");
    var oList = G("listBox");
    var oPrev = G("prev");
    var oNext = G("next");
    var oCenter = G('center');
    var oCenEm = oCenter.getElementsByTagName('em')[0];
    var oWidth = oCenter.offsetWidth - oCenEm.offsetWidth;
    var oPicLi = oPic.getElementsByTagName("li");
    var oListLi = oList.getElementsByTagName("li");
    var len1 = oPicLi.length;
    var len2 = oListLi.length;
    var oPicUl = oPic.getElementsByTagName("ul")[0];
    var oListUl = oList.getElementsByTagName("ul")[0];
    var w1 = oPicLi[0].offsetWidth;
    var w2 = oListLi[0].offsetWidth + 5;
    var oLeft = 470 / (len2 - 1);
    oPicUl.style.width = w1 * len1 + "px";
    oListUl.style.width = (w2 + 4) * len2 + "px";
    /*var oUlWidth = (w2+4) * len2;
     var oCenEmWidth = parseInt(310800/oUlWidth)+4
     oCenEm.style.width = oCenEmWidth+'px';*/
    var index = 0;

    var num = 5;
    var num2 = Math.ceil(num / 2);
    var picWidth = oListUl.offsetWidth - oPic.offsetWidth;

    function Change() {

        Animate(oPicUl, {
            left: -index * w1
        });

        if (index < num2) {
            Animate(oListUl, {
                left: 0
            });
        } else if (index + num2 <= len2) {
            Animate(oListUl, {
                left: -(index - num2 + 1) * w2
            });
        } else {
            Animate(oListUl, {
                left: -(len2 - num + 1) * w2
            });
        }

        for (var i = 0; i < len2; i++) {
            oListLi[i].className = "";
            if (i == index) {
                oListLi[i].className = "on";
                if (len2 > 4) {
                    oCenEm.style.left = oLeft * i + 'px';
                }
            }
        }
    }
    oNext.onclick = function() {
        index++;
        index = index == len2 ? 0 : index;
        Change();

    }
    oPrev.onclick = function() {
        index--;
        index = index == -1 ? len2 - 1 : index;
        Change();

    }
    for (var i = 0; i < len2; i++) {
        oListLi[i].index = i;
        oListLi[i].onclick = function() {
            index = this.index;
            Change();
        }
    }
    var disX = disY = 0;

    if (len2 < 5) {
        var oUlWidth = (w2 + 4) * len2;
        var oCenEmWidth = parseInt(310800 / oUlWidth) + 4;
        oCenEm.style.width = 518 + 'px';
    } else {
        oCenter.onmousedown = function(e) {
            var event = e || event;
            var x = event.clientX - oCenter.offsetLeft - oCenEm.offsetWidth / 2 - 270;
            x = (x < 0) ? 0 : x;
            x = (x > 470) ? 470 : x;
            oCenEm.style.left = x + 'px';
            var left = picWidth * x / 470;
            clearAnimate();
            oListUl.style.left = -left + 'px';
        }
        oCenEm.onmousedown = function(e) {

            var event = e || event;
            disX = event.clientX - oCenEm.offsetLeft;
            document.onmousemove = function(e) {
                var event = e || event;
                var x = event.clientX - disX;
                x = (x < 0) ? 0 : x;
                x = (x > 470) ? 470 : x;
                oCenEm.style.left = x + 'px';
                var left = picWidth * x / 470;
                clearAnimate();
                oListUl.style.left = -left + 'px';
            }
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }
}