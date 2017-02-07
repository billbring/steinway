! function(a) {
    "use strict";
    var b = {
        cache: {},
        support: {},
        objects: {},
        init: function(b) {
            return this.each(function() {
                a(this).unbind("click.lightcase").bind("click.lightcase", function(c) {
                    c.preventDefault(), a(this).lightcase("start", b)
                })
            })
        },
        start: function(c) {
            b.origin = lightcase.origin = this, b.settings = lightcase.settings = a.extend(!0, {
                idPrefix: "lightcase-",
                classPrefix: "lightcase-",
                attrPrefix: "lc-",
                transition: "elastic",
                transitionIn: null,
                transitionOut: null,
                cssTransitions: !0,
                speedIn: 250,
                speedOut: 250,
                maxWidth: 800,
                maxHeight: 500,
                forceWidth: !1,
                forceHeight: !1,
                liveResize: !0,
                fullScreenModeForMobile: !0,
                mobileMatchExpression: /(iphone|ipod|ipad|android|blackberry|symbian)/,
                disableShrink: !1,
                shrinkFactor: .75,
                overlayOpacity: .9,
                slideshow: !1,
                timeout: 5e3,
                swipe: !0,
                useKeys: !0,
                useCategories: !0,
                navigateEndless: !0,
                closeOnOverlayClick: !0,
                title: null,
                caption: null,
                showTitle: !0,
                showCaption: !0,
                showSequenceInfo: !0,
                inline: {
                    width: "auto",
                    height: "auto"
                },
                ajax: {
                    width: "auto",
                    height: "auto",
                    type: "get",
                    dataType: "html",
                    data: {}
                },
                iframe: {
                    width: 800,
                    height: 500,
                    frameborder: 0
                },
                flash: {
                    width: 400,
                    height: 205,
                    wmode: "transparent"
                },
                video: {
                    width: 400,
                    height: 225,
                    poster: "",
                    preload: "auto",
                    controls: !0,
                    autobuffer: !0,
                    autoplay: !0,
                    loop: !1
                },
                attr: "data-rel",
                href: null,
                type: null,
                typeMapping: {
                    image: "jpg,jpeg,gif,png,bmp",
                    flash: "swf",
                    video: "mp4,mov,ogv,ogg,webm",
                    iframe: "html,php",
                    ajax: "json,txt",
                    inline: "#"
                },
                errorMessage: function() {
                    return '<p class="' + b.settings.classPrefix + 'error">' + b.settings.labels.errorMessage + "</p>"
                },
                labels: {
                    errorMessage: "Source could not be found...",
                    "sequenceInfo.of": " of ",
                    close: "Close",
                    "navigator.prev": "Prev",
                    "navigator.next": "Next",
                    "navigator.play": "Play",
                    "navigator.pause": "Pause"
                },
                markup: function() {
                    a("body").append(b.objects.overlay = a('<div id="' + b.settings.idPrefix + 'overlay"></div>'), b.objects.loading = a('<div id="' + b.settings.idPrefix + 'loading" class="' + b.settings.classPrefix + 'icon-spin"></div>'), b.objects.case = a('<div id="' + b.settings.idPrefix + 'case" aria-hidden="true" role="dialog"></div>')), b.objects.case.after(b.objects.nav = a('<div id="' + b.settings.idPrefix + 'nav"></div>')), b.objects.nav.append(b.objects.close = a('<a href="#" class="' + b.settings.classPrefix + 'icon-close"><span>' + b.settings.labels.close + "</span></a>"), b.objects.prev = a('<a href="#" class="' + b.settings.classPrefix + 'icon-prev"><span>' + b.settings.labels["navigator.prev"] + "</span></a>").hide(), b.objects.next = a('<a href="#" class="' + b.settings.classPrefix + 'icon-next"><span>' + b.settings.labels["navigator.next"] + "</span></a>").hide(), b.objects.play = a('<a href="#" class="' + b.settings.classPrefix + 'icon-play"><span>' + b.settings.labels["navigator.play"] + "</span></a>").hide(), b.objects.pause = a('<a href="#" class="' + b.settings.classPrefix + 'icon-pause"><span>' + b.settings.labels["navigator.pause"] + "</span></a>").hide()), b.objects.case.append(b.objects.content = a('<div id="' + b.settings.idPrefix + 'content"></div>'), b.objects.info = a('<div id="' + b.settings.idPrefix + 'info"></div>')), b.objects.content.append(b.objects.contentInner = a('<div class="' + b.settings.classPrefix + 'contentInner"></div>')), b.objects.info.append(b.objects.sequenceInfo = a('<div id="' + b.settings.idPrefix + 'sequenceInfo"></div>'), b.objects.title = a('<h4 id="' + b.settings.idPrefix + 'title"></h4>'), b.objects.caption = a('<p id="' + b.settings.idPrefix + 'caption"></p>'))
                },
                onInit: {},
                onStart: {},
                onFinish: {},
                onClose: {},
                onCleanup: {}
            }, c), b._callHooks(b.settings.onInit), b.objectData = b._setObjectData(this), b._cacheScrollPosition(), b._watchScrollInteraction(), b._addElements(), b._open(), b.dimensions = b.getViewportDimensions()
        },
        get: function(a) {
            return b.objects[a]
        },
        getObjectData: function() {
            return b.objectData
        },
        _setObjectData: function(c) {
            var d = a(c),
                e = {
                    title: b.settings.title || d.attr(b._prefixAttributeName("title")) || d.attr("title"),
                    caption: b.settings.caption || d.attr(b._prefixAttributeName("caption")) || d.children("img").attr("alt"),
                    url: b._determineUrl(),
                    requestType: b.settings.ajax.type,
                    requestData: b.settings.ajax.data,
                    requestDataType: b.settings.ajax.dataType,
                    rel: d.attr(b._determineAttributeSelector()),
                    type: b.settings.type || b._verifyDataType(b._determineUrl()),
                    isPartOfSequence: b._isPartOfSequence(d.attr(b.settings.attr), ":"),
                    isPartOfSequenceWithSlideshow: b._isPartOfSequence(d.attr(b.settings.attr), ":slideshow"),
                    currentIndex: a(b._determineAttributeSelector()).index(d),
                    sequenceLength: a(b._determineAttributeSelector()).length
                };
            return e.sequenceInfo = e.currentIndex + 1 + b.settings.labels["sequenceInfo.of"] + e.sequenceLength, e.prevIndex = e.currentIndex - 1, e.nextIndex = e.currentIndex + 1, e
        },
        _prefixAttributeName: function(a) {
            return "data-" + b.settings.attrPrefix + a
        },
        _determineLinkTarget: function() {
            return b.settings.href || a(b.origin).attr(b._prefixAttributeName("href")) || a(b.origin).attr("href")
        },
        _determineAttributeSelector: function() {
            var c = a(b.origin),
                d = "";
            if ("undefined" != typeof b.cache.selector) d = b.cache.selector;
            else if (b.settings.useCategories === !0 && c.attr(b._prefixAttributeName("categories"))) {
                var e = c.attr(b._prefixAttributeName("categories")).split(" ");
                a.each(e, function(a, c) {
                    a > 0 && (d += ","), d += "[" + b._prefixAttributeName("categories") + '~="' + c + '"]'
                })
            } else d = "[" + b.settings.attr + '="' + c.attr(b.settings.attr) + '"]';
            return b.cache.selector = d, d
        },
        _determineUrl: function() {
            var f, c = b._verifyDataUrl(b._determineLinkTarget()),
                d = 0,
                e = 0;
            return a.each(c, function(a, c) {
                b._devicePixelRatio() >= c.density && c.density >= e && b._matchMedia()("screen and (min-width:" + c.width + "px)") && c.width >= d && (d = c.width, e = c.density, f = c.url)
            }), f
        },
        _normalizeUrl: function(a) {
            var b = /^\d+$/;
            return a.split(",").map(function(a) {
                var c = {
                    width: 0,
                    density: 0
                };
                return a.trim().split(/\s+/).forEach(function(a, d) {
                    if (0 === d) return c.url = a;
                    var e = a.substring(0, a.length - 1),
                        f = a[a.length - 1],
                        g = parseInt(e, 10),
                        h = parseFloat(e);
                    "w" === f && b.test(e) ? c.width = g : "h" === f && b.test(e) ? c.height = g : "x" !== f || isNaN(h) || (c.density = h)
                }), c
            })
        },
        _isPartOfSequence: function(c, d) {
            var e = a("[" + b.settings.attr + '="' + c + '"]'),
                f = new RegExp(d);
            return f.test(c) && e.length > 1
        },
        isSlideshowEnabled: function() {
            return b.objectData.isPartOfSequence && (b.settings.slideshow === !0 || b.objectData.isPartOfSequenceWithSlideshow === !0)
        },
        _loadContent: function() {
            b.cache.originalObject && b._restoreObject(), b._createObject()
        },
        _createObject: function() {
            var c;
            switch (b.objectData.type) {
                case "image":
                    c = a(new Image), c.attr({
                        src: b.objectData.url,
                        alt: b.objectData.title
                    });
                    break;
                case "inline":
                    c = a('<div class="' + b.settings.classPrefix + 'inlineWrap"></div>'), c.html(b._cloneObject(a(b.objectData.url))), a.each(b.settings.inline, function(a, d) {
                        c.attr(b._prefixAttributeName(a), d)
                    });
                    break;
                case "ajax":
                    c = a('<div class="' + b.settings.classPrefix + 'inlineWrap"></div>'), a.each(b.settings.ajax, function(a, d) {
                        "data" !== a && c.attr(b._prefixAttributeName(a), d)
                    });
                    break;
                case "flash":
                    c = a('<embed src="' + b.objectData.url + '" type="application/x-shockwave-flash"></embed>'), a.each(b.settings.flash, function(a, b) {
                        c.attr(a, b)
                    });
                    break;
                case "video":
                    c = a("<video></video>"), c.attr("src", b.objectData.url), a.each(b.settings.video, function(a, b) {
                        c.attr(a, b)
                    });
                    break;
                default:
                    c = a("<iframe></iframe>"), c.attr({
                        src: b.objectData.url
                    }), a.each(b.settings.iframe, function(a, b) {
                        c.attr(a, b)
                    })
            }
            b._addObject(c), b._loadObject(c)
        },
        _addObject: function(a) {
            b.objects.contentInner.html(a), b._loading("start"), b._callHooks(b.settings.onStart), b.settings.showSequenceInfo === !0 && b.objectData.isPartOfSequence ? (b.objects.sequenceInfo.html(b.objectData.sequenceInfo), b.objects.sequenceInfo.show()) : (b.objects.sequenceInfo.empty(), b.objects.sequenceInfo.hide()), b.settings.showTitle === !0 && void 0 !== b.objectData.title && "" !== b.objectData.title ? (b.objects.title.html(b.objectData.title), b.objects.title.show()) : (b.objects.title.empty(), b.objects.title.hide()), b.settings.showCaption === !0 && void 0 !== b.objectData.caption && "" !== b.objectData.caption ? (b.objects.caption.html(b.objectData.caption), b.objects.caption.show()) : (b.objects.caption.empty(), b.objects.caption.hide())
        },
        _loadObject: function(c) {
            switch (b.objectData.type) {
                case "inline":
                    a(b.objectData.url) ? b._showContent(c) : b.error();
                    break;
                case "ajax":
                    a.ajax(a.extend({}, b.settings.ajax, {
                        url: b.objectData.url,
                        type: b.objectData.requestType,
                        dataType: b.objectData.requestDataType,
                        data: b.objectData.requestData,
                        success: function(a, d, e) {
                            "json" === b.objectData.requestDataType ? b.objectData.data = a : c.html(a), b._showContent(c)
                        },
                        error: function(a, c, d) {
                            b.error()
                        }
                    }));
                    break;
                case "flash":
                    b._showContent(c);
                    break;
                case "video":
                    "function" == typeof c.get(0).canPlayType || 0 === b.objects.case.find("video").length ? b._showContent(c) : b.error();
                    break;
                default:
                    b.objectData.url ? (c.load(function() {
                        b._showContent(c)
                    }), c.error(function() {
                        b.error()
                    })) : b.error()
            }
        },
        error: function() {
            b.objectData.type = "error";
            var c = a('<div class="' + b.settings.classPrefix + 'inlineWrap"></div>');
            c.html(b.settings.errorMessage), b.objects.contentInner.html(c), b._showContent(b.objects.contentInner)
        },
        _calculateDimensions: function(a) {
            b._cleanupDimensions();
            var c = {
                objectWidth: a.attr("width") ? a.attr("width") : a.attr(b._prefixAttributeName("width")),
                objectHeight: a.attr("height") ? a.attr("height") : a.attr(b._prefixAttributeName("height"))
            };
            if (!b.settings.disableShrink) switch (c.maxWidth = parseInt(b.dimensions.windowWidth * b.settings.shrinkFactor), c.maxHeight = parseInt(b.dimensions.windowHeight * b.settings.shrinkFactor), c.maxWidth > b.settings.maxWidth && (c.maxWidth = b.settings.maxWidth), c.maxHeight > b.settings.maxHeight && (c.maxHeight = b.settings.maxHeight), c.differenceWidthAsPercent = parseInt(100 / c.maxWidth * c.objectWidth), c.differenceHeightAsPercent = parseInt(100 / c.maxHeight * c.objectHeight), b.objectData.type) {
                case "image":
                case "flash":
                case "video":
                    c.differenceWidthAsPercent > 100 && c.differenceWidthAsPercent > c.differenceHeightAsPercent && (c.objectWidth = c.maxWidth, c.objectHeight = parseInt(c.objectHeight / c.differenceWidthAsPercent * 100)), c.differenceHeightAsPercent > 100 && c.differenceHeightAsPercent > c.differenceWidthAsPercent && (c.objectWidth = parseInt(c.objectWidth / c.differenceHeightAsPercent * 100), c.objectHeight = c.maxHeight), c.differenceHeightAsPercent > 100 && c.differenceWidthAsPercent < c.differenceHeightAsPercent && (c.objectWidth = parseInt(c.maxWidth / c.differenceHeightAsPercent * c.differenceWidthAsPercent), c.objectHeight = c.maxHeight);
                    break;
                case "error":
                    !isNaN(c.objectWidth) && c.objectWidth > c.maxWidth && (c.objectWidth = c.maxWidth);
                    break;
                default:
                    (isNaN(c.objectWidth) || c.objectWidth > c.maxWidth) && !b.settings.forceWidth && (c.objectWidth = c.maxWidth), (isNaN(c.objectHeight) && "auto" !== c.objectHeight || c.objectHeight > c.maxHeight) && !b.settings.forceHeight && (c.objectHeight = c.maxHeight)
            }
            b.settings.forceWidth ? c.maxWidth = c.objectWidth : a.attr(b._prefixAttributeName("max-width")) && (c.maxWidth = a.attr(b._prefixAttributeName("max-width"))), b.settings.forceHeight ? c.maxHeight = c.objectHeight : a.attr(b._prefixAttributeName("max-height")) && (c.maxHeight = a.attr(b._prefixAttributeName("max-height"))), b._adjustDimensions(a, c)
        },
        _adjustDimensions: function(a, c) {
            a.css({
                width: c.objectWidth,
                height: c.objectHeight,
                "max-width": c.maxWidth,
                "max-height": c.maxHeight
            }), b.objects.contentInner.css({
                width: a.outerWidth(),
                height: a.outerHeight(),
                "max-width": "100%"
            }), b.objects.case.css({
                width: b.objects.contentInner.outerWidth()
            }), b.objects.case.css({
                "margin-top": parseInt(-(b.objects.case.outerHeight() / 2)),
                "margin-left": parseInt(-(b.objects.case.outerWidth() / 2))
            })
        },
        _loading: function(a) {
            "start" === a ? (b.objects.case.addClass(b.settings.classPrefix + "loading"), b.objects.loading.show()) : "end" === a && (b.objects.case.removeClass(b.settings.classPrefix + "loading"), b.objects.loading.hide())
        },
        getViewportDimensions: function() {
            return {
                windowWidth: a(window).innerWidth(),
                windowHeight: a(window).innerHeight()
            }
        },
        _verifyDataUrl: function(a) {
            return !(!a || void 0 === a || "" === a) && (a.indexOf("#") > -1 && (a = a.split("#"), a = "#" + a[a.length - 1]), b._normalizeUrl(a.toString()))
        },
        _verifyDataType: function(a) {
            var c = b.settings.typeMapping;
            if (!a) return !1;
            for (var d in c)
                if (c.hasOwnProperty(d))
                    for (var e = c[d].split(","), f = 0; f < e.length; f++) {
                        var g = e[f].toLowerCase(),
                            h = new RegExp(".(" + g + ")$", "i"),
                            i = a.toLowerCase().split("?")[0].substr(-5);
                        if (h.test(i) === !0 || "inline" === d && a.indexOf(g) > -1) return d
                    }
            return "iframe"
        },
        _addElements: function() {
            "undefined" != typeof b.objects.case && a("#" + b.objects.case.attr("id")).length || b.settings.markup()
        },
        _showContent: function(a) {
            switch (b.objects.case.attr(b._prefixAttributeName("type"), b.objectData.type), b.cache.object = a, b._calculateDimensions(a), b._callHooks(b.settings.onFinish), b.settings.transitionIn) {
                case "scrollTop":
                case "scrollRight":
                case "scrollBottom":
                case "scrollLeft":
                case "scrollHorizontal":
                case "scrollVertical":
                    b.transition.scroll(b.objects.case, "in", b.settings.speedIn), b.transition.fade(b.objects.contentInner, "in", b.settings.speedIn);
                    break;
                case "elastic":
                    b.objects.case.css("opacity") < 1 && (b.transition.zoom(b.objects.case, "in", b.settings.speedIn), b.transition.fade(b.objects.contentInner, "in", b.settings.speedIn));
                case "fade":
                case "fadeInline":
                    b.transition.fade(b.objects.case, "in", b.settings.speedIn), b.transition.fade(b.objects.contentInner, "in", b.settings.speedIn);
                    break;
                default:
                    b.transition.fade(b.objects.case, "in", 0)
            }
            b._loading("end"), b.isBusy = !1
        },
        _processContent: function() {
            switch (b.isBusy = !0, b.settings.transitionOut) {
                case "scrollTop":
                case "scrollRight":
                case "scrollBottom":
                case "scrollLeft":
                case "scrollVertical":
                case "scrollHorizontal":
                    b.objects.case.is(":hidden") ? (b.transition.fade(b.objects.case, "out", 0, 0, function() {
                        b._loadContent()
                    }), b.transition.fade(b.objects.contentInner, "out", 0)) : b.transition.scroll(b.objects.case, "out", b.settings.speedOut, function() {
                        b._loadContent()
                    });
                    break;
                case "fade":
                    b.objects.case.is(":hidden") ? b.transition.fade(b.objects.case, "out", 0, 0, function() {
                        b._loadContent()
                    }) : b.transition.fade(b.objects.case, "out", b.settings.speedOut, 0, function() {
                        b._loadContent()
                    });
                    break;
                case "fadeInline":
                case "elastic":
                    b.objects.case.is(":hidden") ? b.transition.fade(b.objects.case, "out", 0, 0, function() {
                        b._loadContent()
                    }) : b.transition.fade(b.objects.contentInner, "out", b.settings.speedOut, 0, function() {
                        b._loadContent()
                    });
                    break;
                default:
                    b.transition.fade(b.objects.case, "out", 0, 0, function() {
                        b._loadContent()
                    })
            }
        },
        _handleEvents: function() {
            b._unbindEvents(), b.objects.nav.children().not(b.objects.close).hide(), b.isSlideshowEnabled() && (b.objects.nav.hasClass(b.settings.classPrefix + "paused") ? b._stopTimeout() : b._startTimeout()), b.settings.liveResize && b._watchResizeInteraction(), b.objects.close.click(function(a) {
                a.preventDefault(), b.close()
            }), b.settings.closeOnOverlayClick === !0 && b.objects.overlay.css("cursor", "pointer").click(function(a) {
                a.preventDefault(), b.close()
            }), b.settings.useKeys === !0 && b._addKeyEvents(), b.objectData.isPartOfSequence && (b.objects.nav.attr(b._prefixAttributeName("ispartofsequence"), !0), b.objects.nav.data("items", b._setNavigation()), b.objects.prev.click(function(a) {
                a.preventDefault(), b.settings.navigateEndless !== !0 && b.item.isFirst() || (b.objects.prev.unbind("click"), b.cache.action = "prev", b.objects.nav.data("items").prev.click(), b.isSlideshowEnabled() && b._stopTimeout())
            }), b.objects.next.click(function(a) {
                a.preventDefault(), b.settings.navigateEndless !== !0 && b.item.isLast() || (b.objects.next.unbind("click"), b.cache.action = "next", b.objects.nav.data("items").next.click(), b.isSlideshowEnabled() && b._stopTimeout())
            }), b.isSlideshowEnabled() && (b.objects.play.click(function(a) {
                a.preventDefault(), b._startTimeout()
            }), b.objects.pause.click(function(a) {
                a.preventDefault(), b._stopTimeout()
            })), b.settings.swipe === !0 && (a.isPlainObject(a.event.special.swipeleft) && b.objects.case.on("swipeleft", function(a) {
                a.preventDefault(), b.objects.next.click(), b.isSlideshowEnabled() && b._stopTimeout()
            }), a.isPlainObject(a.event.special.swiperight) && b.objects.case.on("swiperight", function(a) {
                a.preventDefault(), b.objects.prev.click(), b.isSlideshowEnabled() && b._stopTimeout()
            })))
        },
        _addKeyEvents: function() {
            a(document).bind("keyup.lightcase", function(a) {
                if (!b.isBusy) switch (a.keyCode) {
                    case 27:
                        b.objects.close.click();
                        break;
                    case 37:
                        b.objectData.isPartOfSequence && b.objects.prev.click();
                        break;
                    case 39:
                        b.objectData.isPartOfSequence && b.objects.next.click()
                }
            })
        },
        _startTimeout: function() {
            b.objects.play.hide(), b.objects.pause.show(), b.cache.action = "next", b.objects.nav.removeClass(b.settings.classPrefix + "paused"), b.timeout = setTimeout(function() {
                b.objects.nav.data("items").next.click()
            }, b.settings.timeout)
        },
        _stopTimeout: function() {
            b.objects.play.show(), b.objects.pause.hide(), b.objects.nav.addClass(b.settings.classPrefix + "paused"), clearTimeout(b.timeout)
        },
        _setNavigation: function() {
            var c = a(b.cache.selector || b.settings.attr),
                d = b.objectData.sequenceLength - 1,
                e = {
                    prev: c.eq(b.objectData.prevIndex),
                    next: c.eq(b.objectData.nextIndex)
                };
            return b.objectData.currentIndex > 0 ? b.objects.prev.show() : e.prevItem = c.eq(d), b.objectData.nextIndex <= d ? b.objects.next.show() : e.next = c.eq(0), b.settings.navigateEndless === !0 && (b.objects.prev.show(), b.objects.next.show()), e
        },
        item: {
            isFirst: function() {
                return 0 === b.objectData.currentIndex
            },
            isLast: function() {
                return b.objectData.currentIndex === b.objectData.sequenceLength - 1
            }
        },
        _cloneObject: function(a) {
            var c = a.clone(),
                d = a.attr("id");
            return a.is(":hidden") ? (b._cacheObjectData(a), a.attr("id", b.settings.idPrefix + "temp-" + d).empty()) : c.removeAttr("id"), c.show()
        },
        isMobileDevice: function() {
            var a = navigator.userAgent.toLowerCase(),
                c = a.match(b.settings.mobileMatchExpression);
            return !!c
        },
        isTransitionSupported: function() {
            var c = a("body").get(0),
                d = !1,
                e = {
                    transition: "",
                    WebkitTransition: "-webkit-",
                    MozTransition: "-moz-",
                    OTransition: "-o-",
                    MsTransition: "-ms-"
                };
            for (var f in e) e.hasOwnProperty(f) && f in c.style && (b.support.transition = e[f], d = !0);
            return d
        },
        transition: {
            fade: function(a, c, d, e, f) {
                var g = "in" === c,
                    h = {},
                    i = a.css("opacity"),
                    j = {},
                    k = e ? e : g ? 1 : 0;
                !b.isOpen && g || (h.opacity = i, j.opacity = k, a.css(h).show(), b.support.transitions ? (j[b.support.transition + "transition"] = d + "ms ease", setTimeout(function() {
                    a.css(j), setTimeout(function() {
                        a.css(b.support.transition + "transition", ""), !f || !b.isOpen && g || f()
                    }, d)
                }, 15)) : (a.stop(), a.animate(j, d, f)))
            },
            scroll: function(a, c, d, e) {
                var f = "in" === c,
                    g = f ? b.settings.transitionIn : b.settings.transitionOut,
                    h = "left",
                    i = {},
                    j = f ? 0 : 1,
                    k = f ? "-50%" : "50%",
                    l = {},
                    m = f ? 1 : 0,
                    n = f ? "50%" : "-50%";
                if (b.isOpen || !f) {
                    switch (g) {
                        case "scrollTop":
                            h = "top";
                            break;
                        case "scrollRight":
                            k = f ? "150%" : "50%", n = f ? "50%" : "150%";
                            break;
                        case "scrollBottom":
                            h = "top", k = f ? "150%" : "50%", n = f ? "50%" : "150%";
                            break;
                        case "scrollHorizontal":
                            k = f ? "150%" : "50%", n = f ? "50%" : "-50%";
                            break;
                        case "scrollVertical":
                            h = "top", k = f ? "-50%" : "50%", n = f ? "50%" : "150%"
                    }
                    if ("prev" === b.cache.action) switch (g) {
                        case "scrollHorizontal":
                            k = f ? "-50%" : "50%", n = f ? "50%" : "150%";
                            break;
                        case "scrollVertical":
                            k = f ? "150%" : "50%", n = f ? "50%" : "-50%"
                    }
                    i.opacity = j, i[h] = k, l.opacity = m, l[h] = n, a.css(i).show(), b.support.transitions ? (l[b.support.transition + "transition"] = d + "ms ease", setTimeout(function() {
                        a.css(l), setTimeout(function() {
                            a.css(b.support.transition + "transition", ""), !e || !b.isOpen && f || e()
                        }, d)
                    }, 15)) : (a.stop(), a.animate(l, d, e))
                }
            },
            zoom: function(a, c, d, e) {
                var f = "in" === c,
                    g = {},
                    h = a.css("opacity"),
                    i = f ? "scale(0.75)" : "scale(1)",
                    j = {},
                    k = f ? 1 : 0,
                    l = f ? "scale(1)" : "scale(0.75)";
                !b.isOpen && f || (g.opacity = h, g[b.support.transition + "transform"] = i, j.opacity = k, a.css(g).show(), b.support.transitions ? (j[b.support.transition + "transform"] = l, j[b.support.transition + "transition"] = d + "ms ease", setTimeout(function() {
                    a.css(j), setTimeout(function() {
                        a.css(b.support.transition + "transform", ""), a.css(b.support.transition + "transition", ""), !e || !b.isOpen && f || e()
                    }, d)
                }, 15)) : (a.stop(), a.animate(j, d, e)))
            }
        },
        _callHooks: function(c) {
            "object" == typeof c && a.each(c, function(a, c) {
                "function" == typeof c && c.call(b.origin)
            })
        },
        _cacheObjectData: function(c) {
            a.data(c, "cache", {
                id: c.attr("id"),
                content: c.html()
            }), b.cache.originalObject = c
        },
        _restoreObject: function() {
            var c = a('[id^="' + b.settings.idPrefix + 'temp-"]');
            c.attr("id", a.data(b.cache.originalObject, "cache").id), c.html(a.data(b.cache.originalObject, "cache").content)
        },
        resize: function() {
            b.isOpen && (b.isSlideshowEnabled() && b._stopTimeout(), b.dimensions = b.getViewportDimensions(), b._calculateDimensions(b.cache.object))
        },
        _cacheScrollPosition: function() {
            var c = a(window),
                d = a(document),
                e = {
                    top: c.scrollTop(),
                    left: c.scrollLeft()
                };
            b.cache.scrollPosition = b.cache.scrollPosition || {}, d.width() > c.width() && (b.cache.scrollPosition.left = e.left), d.height() > c.height() && (b.cache.scrollPosition.top = e.top)
        },
        _watchResizeInteraction: function() {
            a(window).resize(b.resize)
        },
        _unwatchResizeInteraction: function() {
            a(window).off("resize", b.resize)
        },
        _watchScrollInteraction: function() {
            a(window).scroll(b._cacheScrollPosition)
        },
        _unwatchScrollInteraction: function() {
            a(window).off("scroll", b._cacheScrollPosition)
        },
        _restoreScrollPosition: function() {
            a(window).scrollTop(parseInt(b.cache.scrollPosition.top)).scrollLeft(parseInt(b.cache.scrollPosition.left)).resize()
        },
        _switchToFullScreenMode: function() {
            b.settings.shrinkFactor = 1, b.settings.overlayOpacity = 1, a("html").addClass(b.settings.classPrefix + "fullScreenMode")
        },
        _open: function() {
            switch (b.isOpen = !0, b.support.transitions = !!b.settings.cssTransitions && b.isTransitionSupported(), b.support.mobileDevice = b.isMobileDevice(), b.support.mobileDevice && (a("html").addClass(b.settings.classPrefix + "isMobileDevice"), b.settings.fullScreenModeForMobile && b._switchToFullScreenMode()), b.settings.transitionIn || (b.settings.transitionIn = b.settings.transition), b.settings.transitionOut || (b.settings.transitionOut = b.settings.transition), b.settings.transitionIn) {
                case "fade":
                case "fadeInline":
                case "elastic":
                case "scrollTop":
                case "scrollRight":
                case "scrollBottom":
                case "scrollLeft":
                case "scrollVertical":
                case "scrollHorizontal":
                    b.objects.case.is(":hidden") && (b.objects.close.css("opacity", 0), b.objects.overlay.css("opacity", 0), b.objects.case.css("opacity", 0), b.objects.contentInner.css("opacity", 0)), b.transition.fade(b.objects.overlay, "in", b.settings.speedIn, b.settings.overlayOpacity, function() {
                        b.transition.fade(b.objects.close, "in", b.settings.speedIn), b._handleEvents(), b._processContent()
                    });
                    break;
                default:
                    b.transition.fade(b.objects.overlay, "in", 0, b.settings.overlayOpacity, function() {
                        b.transition.fade(b.objects.close, "in", 0), b._handleEvents(), b._processContent()
                    })
            }
            a("html").addClass(b.settings.classPrefix + "open"), b.objects.case.attr("aria-hidden", "false")
        },
        close: function() {
            switch (b.isOpen = !1, b.isSlideshowEnabled() && (b._stopTimeout(), b.objects.nav.removeClass(b.settings.classPrefix + "paused")), b.objects.loading.hide(), b._unbindEvents(), b._unwatchResizeInteraction(), b._unwatchScrollInteraction(), a("html").removeClass(b.settings.classPrefix + "open"), b.objects.case.attr("aria-hidden", "true"), b.objects.nav.children().hide(), b._restoreScrollPosition(), b._callHooks(b.settings.onClose), b.settings.transitionOut) {
                case "fade":
                case "fadeInline":
                case "scrollTop":
                case "scrollRight":
                case "scrollBottom":
                case "scrollLeft":
                case "scrollHorizontal":
                case "scrollVertical":
                    b.transition.fade(b.objects.case, "out", b.settings.speedOut, 0, function() {
                        b.transition.fade(b.objects.overlay, "out", b.settings.speedOut, 0, function() {
                            b.cleanup()
                        })
                    });
                    break;
                case "elastic":
                    b.transition.zoom(b.objects.case, "out", b.settings.speedOut, function() {
                        b.transition.fade(b.objects.overlay, "out", b.settings.speedOut, 0, function() {
                            b.cleanup()
                        })
                    });
                    break;
                default:
                    b.cleanup()
            }
        },
        _unbindEvents: function() {
            b.objects.overlay.unbind("click"), a(document).unbind("keyup.lightcase"), b.objects.case.unbind("swipeleft").unbind("swiperight"), b.objects.prev.unbind("click"), b.objects.next.unbind("click"), b.objects.play.unbind("click"), b.objects.pause.unbind("click"), b.objects.close.unbind("click")
        },
        _cleanupDimensions: function() {
            var a = b.objects.contentInner.css("opacity");
            b.objects.case.css({
                width: "",
                height: "",
                top: "",
                left: "",
                "margin-top": "",
                "margin-left": ""
            }), b.objects.contentInner.removeAttr("style").css("opacity", a), b.objects.contentInner.children().removeAttr("style")
        },
        cleanup: function() {
            b._cleanupDimensions(), b.objects.loading.hide(), b.objects.overlay.hide(), b.objects.case.hide(), b.objects.prev.hide(), b.objects.next.hide(), b.objects.play.hide(), b.objects.pause.hide(), b.objects.case.removeAttr(b._prefixAttributeName("type")), b.objects.nav.removeAttr(b._prefixAttributeName("ispartofsequence")), b.objects.contentInner.empty().hide(), b.objects.info.children().empty(), b.cache.originalObject && b._restoreObject(), b._callHooks(b.settings.onCleanup), b.cache = {}
        },
        _matchMedia: function() {
            return window.matchMedia || window.msMatchMedia
        },
        _devicePixelRatio: function() {
            return window.devicePixelRatio || 1
        },
        _isPublicMethod: function(a) {
            return "function" == typeof b[a] && "_" !== a.charAt(0)
        },
        _export: function() {
            window.lightcase = {}, a.each(b, function(a) {
                b._isPublicMethod(a) && (lightcase[a] = b[a])
            })
        }
    };
    b._export(), a.fn.lightcase = function(c) {
        return b._isPublicMethod(c) ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist on jQuery.lightcase") : b.init.apply(this, arguments)
    }
}(jQuery);
