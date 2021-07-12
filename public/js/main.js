/*  ---------------------------------------------------
    Template Name: Loanday
    Description:  Loanday loan HTML Template
    Author: Colorlib
    Author URI: https://colorlib.com
    Version: 1.0
    Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Canvas Menu
    $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });

    //Search Switch
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400);
    });

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('');
        });
    });

    //Accordin Active
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).prev().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).prev().removeClass('active');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*--------------------------
        Testimonial Slider
    ----------------------------*/
    var testimonialSlider = $(".testimonial__slider");
    testimonialSlider.owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: false,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*-----------------------------
        Blog Details Slider
    -------------------------------*/
    $(".blog__details__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-long-arrow-left'></i>", "<i class='fa fa-long-arrow-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    /*-----------------------
		Range Slider
	------------------------ */
    var rangeSliderPrice = $(".price-range"),
        price = $("#price");
    rangeSliderPrice.slider({
        range: 'min',
        min: 0,
        max: 3800000,
        value: 2458000,
        slide: function (event, ui) {
            price.val(ui.value);
        }
    });
    price.val(rangeSliderPrice.slider("value"));

    var rangeSliderPrice = $(".price-range-month"),
        month = $("#month");
    rangeSliderPrice.slider({
        range: 'min',
        min: 0,
        max: 10,
        value: 4,
        slide: function (event, ui) {
            month.val(ui.value);
        }
    });
    month.val(rangeSliderPrice.slider("value"));

    var rangeSliderPrice = $(".price-range-percent"),
        percent = $("#percent");
    rangeSliderPrice.slider({
        range: 'min',
        min: 0,
        max: 72,
        value: 18,
        slide: function (event, ui) {
            percent.val(ui.value + ' Percent');
        }
    });
    percent.val(rangeSliderPrice.slider("value") + ' Percent');

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*-------------------
		History Scroll
	--------------------- */
    $(".nice-scroll").niceScroll({
        cursorcolor: "rgba(135, 196, 23, 0.3)",
        cursorwidth: "6px",
        background: "rgba(255, 255, 255, 0.1)",
        cursorborder: "",
        autohidemode: false,
        horizrailenabled: false
    });

    /*------------------
		Magnific
	--------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Counter Up
    --------------------*/
    $('.counter-add').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

})(jQuery);