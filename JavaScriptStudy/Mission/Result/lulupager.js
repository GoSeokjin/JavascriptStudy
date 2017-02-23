/**
 * Created by gilbert on 2017. 2. 16..
 */
/*
 * 2017.02.15
 * Copyright 2017, kakao corp
 */

!function(t) {
    "use strict";
    t.fn.simpleSuggest = function(e) {
        if (!e)
            return !1;
        var i = t(this)
            , n = this
            , s = "oninput"in document.body && SF.ua.os.ios ? "input" : "keyup"
            , a = {
            source: 0,
            layer: 0,
            footer: !1,
            showItemCount: 5,
            renderFooter: function() {
                var e = t(o.closeBtn);
                return e.on("click", function() {
                    n.hide()
                }),
                    t(o.footer).append(e)
            },
            renderItem: function(t) {
                var e = o.suggestItem;
                return e.replace("##link##", "?w=tot&q=" + encodeURIComponent(t.keyword)).replace("##keyword##", t.el)
            },
            renderKeyword: function(t) {
                return t
            },
            loadCallback: function(t) {},
            onInputCallback: function(t) {},
            getKeyword: function(t) {
                return t.q
            }
        }
            , o = {
            suggest: '<ul class="list_suggest" ></ul>',
            suggestItem: '<li class="item_suggest"><a class="link_suggest" href="##link##">##keyword##</a></li>',
            footer: '<div class="foot_suggest type_simple"></div>',
            closeBtn: '<button type="button" class="btn_close"><span class="img_sg ico_close"></span>닫기</button>'
        };
        t.extend(a, e);
        function r(t) {
            return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&").replace(/<strong>|<\/strong>/g, "")
        }
        function l(t, e) {
            var i = new RegExp("(" + e.replace(/(\s*)/g, "") + ")","gi");
            return t.replace(i, "<strong class='emph_keyword'>$1</strong>")
        }
        function h(e) {
            a.layer.html("");
            var i, n, s = e.items, h = s.length > a.showItemCount ? a.showItemCount : s.length, c = t(o.suggest), u = "", d = r(a.getKeyword(e));
            if (s.length) {
                for (var g = 0, p = h; g < p; g++)
                    i = s[g],
                        n = l(a.renderKeyword(i), d),
                        u += a.renderItem({
                            el: n,
                            originData: i,
                            query: d,
                            keyword: r(i)
                        });
                c.append(u),
                    a.layer.append(c),
                a.footer && a.layer.append(a.renderFooter()),
                    a.loadCallback("success")
            } else
                a.loadCallback("fail")
        }
        n.hideLayer = function() {
            var e = t(n).val();
            0 === e.length && (a.layer.html(""),
                a.layer.hide(),
                a.loadCallback("fail"))
        }
            ,
            n.inputInp = function(e, i) {
                i.length > 0 && !~t.inArray(e.which, [13, 27, 35, 36, 37, 38, 39, 40]) && (a.source(i, h),
                    a.layer.show())
            }
            ,
            n.hide = function() {
                a.layer.hide()
            }
            ,
            n.show = function() {
                a.layer.show()
            }
            ,
            i.on(s, function(e) {
                var i = t(this).val();
                n.hideLayer(),
                    n.inputInp(e, i),
                    a.onInputCallback(i)
            }),
            i.on("change", function(e) {
                var i = t(this).val();
                n.hideLayer(),
                    n.inputInp(e, i)
            }),
            i.on("blur", function() {
                setTimeout(function() {
                    n.hideLayer()
                }, 350)
            }),
            i.on("focus", function() {
                n.show()
            })
    }
}(jQuery),

    SF.extend = function(t) {
        this.$btn = t.btn || "",
            this.$btnRefresh = t.refreshBtn || "",
            this.$container = t.container || "",
            this.$list = t.list || "",
            this.viewCount = t.viewCount || 4,
            this.source = t.source || "",
            this.isEnd = !1,
            this.type = "ajax",
        "function" != typeof this.source && (this.type = "toggle"),
        "" !== this.btn && this.init()
    }
    ,
    SF.extend.prototype = {
        refresh: function() {
            this.scrollTop(),
                window.location.reload()
        },
        scrollTop: function() {
            "toggle" !== this.type || this.$container || (this.$container = this.$list.parent()),
            this.$container.get(0) && jQuery("body").animate({
                duration: 100,
                scrollTop: this.$container.offset().top - 50
            })
        },
        getQuery: function(t) {
            var e = "";
            return "show" === t ? e = ".hide:lt(" + this.viewCount + ")" : "hide" === t && (e = ":gt(" + (parseInt(this.viewCount, 10) - 1) + ")"),
                e
        },
        toggle: function() {
            var t = "";
            this.$btn.hasClass("open") ? (t = this.getQuery("show"),
                    this.$list.filter(t).removeClass("hide"),
                0 === this.$list.filter(".hide").length && this.$btn.removeClass("open").addClass("close")) : (t = this.getQuery("hide"),
                    this.$list.filter(t).addClass("hide"),
                    this.$btn.removeClass("close").addClass("open"),
                    this.scrollTop())
        },
        render: function(t, e) {
            this.$container.append(jQuery(t)),
                this.isEnd = e,
            this.isEnd && (this.type = "toggle",
                this.$list = this.$container.children(),
                this.toggle())
        },
        ajaxLoad: function() {
            this.isEnd ? this.$btn.hasClass("open") : this.source(this.render.bind(this))
        },
        bindEvent: function() {
            var t = this;
            jQuery(this.$btn).on("click", function() {
                "toggle" === t.type ? t.toggle.call(t) : t.ajaxLoad.call(t)
            }),
            this.$btnRefresh && this.$btnRefresh.get(0) && this.$btnRefresh.on("click", this.refresh.bind(this))
        },
        init: function() {
            this.bindEvent()
        }
    },
    SF.errorImage = function() {
        return function(t) {
            var e = jq(t)
                , i = "data-size"
                , n = e.attr(i) || ""
                , s = e.attr("data-dstype") || ""
                , a = "profile" === s ? "noimg_prof" : "company" === s ? "noimg_com" : "";
            if (n) {
                var o = n.split("x")
                    , r = o[0]
                    , l = o[1]
                    , h = r > l ? r : l
                    , c = h > 100 ? "img_size_l" : h > 80 ? "img_size_m" : "img_size_s"
                    , u = null
                    , d = null;
                u = jq('<span class="thumb_noimg"></span>').addClass(a),
                    d = jq("<span></span>").addClass(c).width(r).height(l),
                    u.append(d),
                    e.parent().append(u),
                    e.remove()
            }
        }
    }(),
    SF.pager = function(t) {
        this.$list = t.list || null,
            this.$navigation = t.navigation || null,
        this.$list && this.$navigation && (this.listCount = this.$list.length,
            this.viewCount = t.viewCount || 4,
            this.pageCount = Math.ceil(this.listCount / this.viewCount),
            this.viewCountQuery = parseInt(this.viewCount, 10) - 1,
            this.wideViewCount = t.wideViewCount || 0,
            this.currentPage = 1,
            this.toggleClass = t.toggleClass || "hide",
            this.toggleSelector = "." + this.toggleClass,
            this.isInfinite = t.isInfinite || !1,
            this.$btnPrev = null,
            this.$btnNext = null,
            this.$labelCurrent = null,
            this.$labelTotalPage = null,
            this.init())
    }
    ,
    SF.pager.prototype = {
        getQuery: function(t) {
            var e = "";
            return "next" === t ? e = "." + this.toggleClass + ":gt(" + this.viewCountQuery + ")" : "prev" === t && (e = "." + this.toggleClass + ":lt(" + this.viewCountQuery + ")"),
                e
        },
        renderNavigation: function() {
            this.$labelCurrent && this.$labelCurrent.get(0) && this.$labelCurrent.text(this.currentPage)
        },
        setPageInfo: function() {
            this.pageCount = Math.ceil(this.listCount / this.viewCount),
                this.viewCountQuery = parseInt(this.viewCount, 10) - 1
        },
        setWide: function() {
            if (this.wideViewCount > 0 && jq("body").hasClass("wide") && this.viewCount !== this.wideViewCount) {
                this.viewCount = this.wideViewCount,
                    this.setPageInfo();
                var t = this.$list.not(this.toggleSelector)
                    , e = this;
                t.length != this.viewCount && (this.$list.each(function(t, i) {
                    t < e.viewCount ? jq(i).removeClass("hide") : jq(i).hasClass("hide") || jq(i).addClass("hide")
                }),
                    this.$labelTotalPage.text(this.pageCount))
            }
        },
        setNavigationStyle: function() {
            this.isInfinite || (this.isLastPage() ? this.$btnNext.addClass("btn_off") : this.$btnNext.removeClass("btn_off"),
                this.isFirstPage() ? this.$btnPrev.addClass("btn_off") : this.$btnPrev.removeClass("btn_off"))
        },
        isLastPage: function() {
            return this.currentPage === this.pageCount
        },
        isFirstPage: function() {
            return 1 === this.currentPage
        },
        setNavigation: function(t) {
            "next" === t ? this.isLastPage() ? this.isInfinite && (this.currentPage = 1) : this.currentPage++ : this.isFirstPage() ? this.isInfinite && (this.currentPage = this.pageCount) : this.currentPage--
        },
        togglePage: function() {
            var t = this;
            this.$list.not(this.toggleSelector).addClass(this.toggleClass),
                1 === this.viewCount ? this.$list.eq(this.currentPage - 1).removeClass(this.toggleClass) : this.$list.each(function(e, i) {
                        var n = t.currentPage * t.viewCount
                            , s = n - t.viewCount;
                        e >= s && n > e && jQuery(i).removeClass(t.toggleClass)
                    })
        },
        toggle: function(t) {
            this.setNavigation(t),
                this.setNavigationStyle(),
                this.renderNavigation(),
                this.togglePage()
        },
        bindEvents: function() {
            var t = this;
            this.$btnPrev && this.$btnPrev.get(0) && this.$btnPrev.on("click", function() {
                t.toggle.call(t, "prev")
            }),
            this.$btnNext && this.$btnNext.get(0) && this.$btnNext.on("click", function() {
                t.toggle.call(t, "next")
            })
        },
        initNavigationElements: function() {
            var t = this.$navigation.find(".btn_page")
                , e = this;
            t && t.length > 0 && t.each(function(t, i) {
                var n = jQuery(i);
                n.find(".ico_prev").get(0) && (e.$btnPrev = n),
                n.find(".ico_next").get(0) && (e.$btnNext = n)
            }),
                this.$labelCurrent = this.$navigation.find("em.emph_num"),
                this.$labelTotalPage = this.$navigation.find(".total_page")
        },
        init: function() {
            this.initNavigationElements(),
                this.setWide(),
                this.bindEvents()
        }
    },
    SF.searchOption = function(t) {
        this.$btn = t.btn || null,
            this.$container = t.container || null,
            this.$btnReset = t.btnReset || null,
            this.$btnClose = t.btnClose || null,
            this.params = location.search ? SF.urlParameter : {},
            this.params.DA = "STC",
            this.baseParams = t.baseParams || {},
            this.$listBtn = null,
            this.$listContainer = null,
            this.wrapperSelector = "select" === t.uiType ? ".select_comp_d" : ".menu_opt",
            this.labelSelector = "[data-so-label]",
        this.$container && this.init()
    }
    ,
    SF.searchOption.prototype = {
        reset: function() {
            jq.extend(this.params, this.baseParams),
                location.href = SF.changeUrlParam(this.baseParams)
        },
        checkEmptyObj: function(t) {
            return jq.each(t, function(e, i) {
                ("" === i || null === i || jq.isEmptyObject(i)) && delete t[e]
            }),
                t
        },
        setPeriodParam: function() {
            if (this.params.period && "u" !== this.params.period && "a" !== this.params.period) {
                var t, e = new Date, i = this.getCurrentTime(e);
                "d" === this.params.period ? e.setDate(e.getDate() + 1) : "w" === this.params.period ? e.setDate(e.getDate() + 7) : "m" === this.params.period && e.setDate(e.getDate() + 30),
                    t = this.getCurrentTime(e),
                    this.params.sd = i,
                    this.params.ed = t
            } else
                "" === this.params.period && (this.params.sd = "",
                    this.params.ed = "")
        },
        setMultiColorParam: function(t) {
            if (this.params.ColorByName) {
                var e = decodeURIComponent(this.params.ColorByName)
                    , i = e.split(" ");
                if (t.ColorByName && i.indexOf(t.ColorByName) > -1)
                    i = jq.grep(i, function(e, i) {
                        return e !== t.ColorByName
                    }),
                        t.ColorByName = encodeURIComponent(i.join(" "));
                else if ("y" === this.params.ColorGroup && "y" === t) {
                    if (3 === i.length)
                        return alert("컬러는 최대 3건 까지만 선택 가능합니다."),
                            !1;
                    e && (t.ColorByName = encodeURIComponent([e, t.ColorByName].join(" ")))
                }
            }
            return t
        },
        setParam: function(t) {
            t = this.setMultiColorParam(t),
            t && (jq.extend(this.params, t),
                this.setPeriodParam(),
                location.href = SF.changeUrlParam(this.params))
        },
        getDateString: function(t, e) {
            var i = "";
            return t && ("yymmdd" === e ? i = t.replace(/\./gi, "") : "yy.mm.dd" === e && (i = [t.substring(0, 4), t.substring(4, 6), t.substring(6, 8)].join("."))),
                i
        },
        getCurrentTime: function(t) {
            var e = "";
            t || (t = new Date);
            var i = t.getMonth() + 1
                , n = t.getDate()
                , s = t.getHours()
                , a = t.getMinutes()
                , o = t.getSeconds();
            return e = [t.getFullYear(), (i > 9 ? "" : "0") + i, (n > 9 ? "" : "0") + n, (s > 9 ? "" : "0") + s, (a > 9 ? "" : "0") + a, (o > 9 ? "" : "0") + o].join("")
        },
        setCalendar: function() {
            var t = this.$container.find('[data-so-param="period=u"]')
                , e = this.getParentWrapper(t).find(".btn_confirm");
            if (self = this,
                    startDate = this.getDateString(this.getCurrentTime(), "yy.mm.dd"),
                    endDate = startDate,
                    $inpStart = null,
                    $inpEnd = null,
                t.get(0) && e.get(0)) {
                $inpStart = jq(t.get(0)),
                    $inpEnd = jq(t.get(1));
                var i = {
                    showAnim: "slideDown",
                    showOtherMonths: !0,
                    showButtonPanel: !0,
                    selectOtherMonths: !0,
                    changeMonth: !0,
                    changeYear: !0,
                    maxDate: "0",
                    yearSuffix: "",
                    monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
                };
                this.params.sd && (startDate = this.getDateString(this.params.sd, "yy.mm.dd")),
                this.params.ed && (endDate = this.getDateString(this.params.ed, "yy.mm.dd")),
                    $inpStart.datepicker(i).val(startDate).trigger("change"),
                    $inpEnd.datepicker(i).val(endDate).trigger("change"),
                    e.on("click", function() {
                        var t = self.getDateString($inpStart.val(), "yymmdd")
                            , e = self.getDateString($inpEnd.val(), "yymmdd");
                        if (e < t) {
                            var i = t;
                            t = e,
                                e = i
                        }
                        self.setParam({
                            sd: t + "000000",
                            ed: e + "595959",
                            period: "u"
                        })
                    }),
                    t.on("focus", function() {
                        jq(this).parent().addClass("date_open")
                    }),
                    t.on("blur", function() {
                        jq(this).parent().removeClass("date_open")
                    })
            }
        },
        getElement: function(t) {
            return this.$container.find(t)
        },
        getParentWrapper: function(t) {
            return jq(t).closest(this.wrapperSelector)
        },
        getParantLabel: function(t) {
            return this.getParentWrapper(t).find(this.labelSelector)
        },
        paramToObject: function(t) {
            if (t) {
                var e, i = t.split("&"), n = {};
                return i.forEach(function(t, i) {
                    e = t.split("="),
                        n[decodeURIComponent(e[0])] = decodeURIComponent(e[1])
                }),
                    n
            }
        },
        toggleContainer: function() {
            this.$btn.hasClass("btn_fold") ? (this.$container.hide(),
                    this.$btn.removeClass("btn_fold")) : (this.$container.show(),
                    this.$btn.addClass("btn_fold"))
        },
        hideAllListContainer: function() {
            this.getParentWrapper(this.$listContainer).removeClass("opt_open")
        },
        bindEvent: function() {
            var t = this;
            if (this.$listBtn.get(0) && this.$listContainer.get(0)) {
                var e = {};
                this.$listBtn.on("click", function(t) {
                    var e = this.getParentWrapper(jq(t.target));
                    e.hasClass("opt_open") ? e.removeClass("opt_open") : (this.hideAllListContainer(),
                            e.addClass("opt_open"))
                }
                    .bind(this)),
                    this.$items.on("click", function() {
                        var i = jq(this).attr("data-so-param");
                        "period=u" !== i && "ColorGroup=y" !== i && (e = t.paramToObject(i),
                            t.setParam(e))
                    }),
                    jq(document).on("click", function(t) {
                        0 === this.getParentWrapper(jq(t.target)).length && this.hideAllListContainer()
                    }
                        .bind(this))
            }
            this.$btn && this.$btn.on("click", this.toggleContainer.bind(this)),
            this.$btnClose && this.$btnClose.on("click", this.toggleContainer.bind(this)),
            this.$btnReset && this.$btnReset.on("click", this.reset.bind(this))
        },
        isSelected: function(t) {
            var e = this
                , i = !0;
            return Object.keys(t).forEach(function(n, s) {
                var a = t[n];
                i && (i = e.params[n] == a)
            }),
                i
        },
        setLabel: function(t, e) {
            this.getParentWrapper(jq(t)).find("li.on").removeClass("on"),
                jq(t).parent().addClass("on");
            var i = this.getParantLabel(t).find(".txt_data")
                , n = "";
            e.period ? n = this.getDateString(this.params.sd, "yy.mm.dd") + "-" + this.getDateString(this.params.ed, "yy.mm.dd") : e.ColorByName || (n = jq(t).find(".txt_data").text()),
            !!n && i.text(n)
        },
        setLabelCp: function() {
            if (this.params.cpname) {
                var t = this.$container.find("[data-so-label=cpname] .txt_data");
                this.$container.find("[data-so-wrapper=cpname] li.on").removeClass("on"),
                    t.text(decodeURIComponent(this.params.cpname))
            }
        },
        setColor: function() {
            var t = this.getElement(".multi_opt > .inp_multi")
                , e = this;
            if (t.get(0)) {
                if (this.params.ColorByName) {
                    var i = decodeURIComponent(this.params.ColorByName).split(" ")
                        , n = ""
                        , s = null;
                    $container = this.getElement('[data-so-wrapper="ColorByName"]'),
                        $container.find(".check_on").removeClass("check_on"),
                        jq(i).each(function(t, i) {
                            n = "[data-so-param*='ColorByName=" + i + "']",
                                s = e.getElement(n),
                            s.get(0) && s.parent().addClass("check_on")
                        })
                }
                "y" === this.params.ColorGroup && t.attr("checked", "checked"),
                    t.on("click", function() {
                        t.attr("checked") ? (t.removeAttr("checked"),
                                e.params.ColorGroup = "") : (t.attr("checked", "checked"),
                                e.params.ColorGroup = "y")
                    })
            }
        },
        initElements: function() {
            this.$listBtn = this.$container.find("[data-so-label]"),
                this.$listContainer = this.$container.find("[data-so-wrapper]"),
                this.$items = this.$listContainer.find("[data-so-param]"),
                this.$items.each(function(t, e) {
                    var i = this.paramToObject(jq(e).attr("data-so-param"))
                        , n = this.isSelected(this.checkEmptyObj(i));
                    n && this.setLabel(e, i)
                }
                    .bind(this)),
                this.setCalendar(),
                this.setLabelCp(),
                this.setColor()
        },
        init: function() {
            this.initElements(),
                this.bindEvent()
        }
    };
