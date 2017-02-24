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
        var chatTouch = function(){
            var searchBtn = $('.searchBtn');
            var chat = $('.chat');
            searchBtn.on('click' , function(e){
                var chatState = chat.css('bottom');
                if(chatState == 0+'px'){
                    chat.animate({'bottom' :  -400+'px'});
                }else{
                    chat.animate({'bottom' : 0+'px'});
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

        return {
            slideMenu: slideMenu(),
            bodyTouch: bodyTouch(),
            headerBtn: headerBtn(),
            chatTouch :chatTouch()
        }
    };
    init();
}(jQuery));
