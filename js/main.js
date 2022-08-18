ymaps.ready(function () {
    var map = new ymaps.Map('map', {
            center: [55.708820, 37.651475],
            zoom: 15,
            controls: []
        }, {
            searchControlProvider: 'yandex#search',
            suppressMapOpenBlock: true

        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(map.getCenter(), {
            hasBalloon:false,
            hintContent: 'Собственный значок метки'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/pin.png',
            // Размеры метки.
            iconImageSize: [80, 114],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-40, -114]
        });

    map.geoObjects.add(myPlacemark);
    console.log(map.container.getElement());
});

$(document).ready(function () {

    var menuH;
    $nav = $(".navbar-collapse");
    $togler = $(".navbar-toggler");


    $togler.click(function () {
        $nav.slideDown(400,function () {
                $(".navbar .navbar-nav, .navbar .btn-row, .navbar .close-menu").fadeIn();
            }
        );
        $(this).toggleClass("hide");
    });

    function closeMenu(){
        $(".mob .navbar-nav, .mob .btn-row, .mob .close-menu").fadeOut(
            function () {
                $nav.slideUp(400, function () {
                    $togler.toggleClass("hide");
                });
            }
        );
    }

    $(".nav-link, .close-menu, .navbar .reg-btn").click(function () {
        closeMenu()
    });

    $(document).on('click', 'a[href^="#"]:not(.control)', function (event) {
        console.log(menuH);
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - menuH
        }, 500);
    });

    $( ".expand-btn a" ).click(function(){
        $text = $('.action:first').text();
        $(".arrow").toggleClass( "arrow-expanded" );
        $('.action').text(
            $text === "РАЗВЕРНУТЬ" ? "СВЕРНУТЬ" : "РАЗВЕРНУТЬ"
        );
    });

   window.addEventListener("resize", onResize);

    function toggleCarousel() {
        $('.speaker-row').toggleClass("carousel");
        $('.speaker-row .line').toggleClass("carousel-inner");
        $('.speaker-row .line .speaker').toggleClass("carousel-item");
    }

    function onResize() {
        menuH = $('.navbar').height();

        if (window.innerWidth <= 991) {
            if (!$('.navbar').hasClass("mob")) {
                $('.navbar').toggleClass("mob");
            }

            if (!$('.speaker-row').hasClass("carousel")) {
                toggleCarousel();
            }
            $('.carousel').carousel();
        } else {
            if ($('.navbar').hasClass("mob")) {
                $('.navbar').toggleClass("mob");
            }

            if ($('.speaker-row').hasClass("carousel")) {
                toggleCarousel();
            }
        }
    }
    onResize();
});
