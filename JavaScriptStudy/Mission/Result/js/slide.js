/**
 * Created by gilbert on 2017. 2. 8..
 */

var slide = function page(viewCount) {
    this.viewCount = viewCount;
    var mainWidth = $('.main_wrap');
    var ul = $('.content_wrap li');
    var liCount = $('.content_wrap li').length;
    var viewPage = $('.viewPage');
    var lBtn = $('.leftBtn');
    var rBtn = $('.rightBtn');
    var currentPage = 1;
    var maxPage = Math.ceil(liCount / viewCount);

    var init = function () {
        mainWidth.css('width', 101 * viewCount + 'px');
        event();
        showPage(currentPage);
        changeText(currentPage);
    };
    var event = function () {
        lBtn.on('click', function (e) {
            currentPage -= 1;
            if (currentPage == 0) {
                currentPage = maxPage;
                showPage(currentPage);
                changeText(currentPage);
            } else {
                showPage(currentPage);
                changeText(currentPage);
            }
        });
        rBtn.on('click', function (e) {
            currentPage += 1;
            if (currentPage > maxPage) {
                currentPage = 1;
                showPage(currentPage);
                changeText(currentPage);
            } else {
                showPage(currentPage);
                changeText(currentPage);
            }
        });
    };
    var showPage = function (index) {
        ul.fadeOut(400);
        for (var i = (viewCount * index) - viewCount; i < viewCount * index; i++) {
            ul.eq(i).show(400);
        }
        ;
    };
    var changeText = function (count) {
        viewPage.html(count + '/' + maxPage);
    }
    return {
        init: init()
    };
};

module.exports = slide;