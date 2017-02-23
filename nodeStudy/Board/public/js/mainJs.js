$(function ($) {
    "use strict";
    var init = function () {
        //메뉴 슬라이드
        var slideMenu = function () {
            var leftMenu = $('.headerMenu');
            var menuImgBtn = $('#menuImgBtn')
            menuImgBtn.on('click', function (e) {
                leftMenu.animate({left: 0}, 200);
            });
        };
        //메뉴부분을 제외한 영역
        var bodyTouch = function () {
            var leftMenu = $('.headerMenu');
            $('body').on('click', function (e) {
                if (!$(e.target).hasClass("headerMenu")) {
                    if (leftMenu.css("left") == 0 + 'px') {
                        leftMenu.animate({left: -250}, 200);
                    }
                }
            });
        };
        //위치에따른 헤더변환
        var headerBtn = function () {
            var headerTitle = $('.headerTitle');
            var subTitle = $('.subTitle');
            var headerBtn = $('.headerBtn');
            $(window).on('scroll', function (e) {
                if(90 <= $(this).scrollTop() && 120 >= $(this).scrollTop()){
                    console.log('hoho ');
                    headerTitle.css({visibility:'hidden'});
                    subTitle.css({visibility:'visible'});
                    if(140 <= $(this).scrollTop() && 170 >= $(this).scrollTop()){
                        console.log('ho');
                        headerBtn.animate({height: 60+'px'},200);
                    }
                }else if($(this).scrollTop() <90){
                    headerTitle.css({visibility:'visible'});
                    subTitle.css({visibility:'hidden'});
                }
            });
        };
        //검색창
        var searchBtn = function(){
            var searchBtn = $('#searchBtn');
            var searchText = $('#searchText');
            searchBtn.on('click' , function(e){
                console.log('hoho');
                searchText.css({visibility : 'visible'});
                searchText.animate({visibility : 'visible' , width: 100+'px'},300);
            });
        };


        return {
            slideMenu: slideMenu(),
            bodyTouch: bodyTouch(),
            headerBtn: headerBtn(),
            searchBtn :searchBtn()
        }
    };
    init();
}(jQuery));
