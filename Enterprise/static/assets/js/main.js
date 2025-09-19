/* ===================================================================
        Author          : Kazi Sahiduzzaman
    Template Name   : Bizos - Creative Agency HTML Template
    Version         : 1.0
* ================================================================= */

(function ($) {
    "use strict";

    $(function () {
        /* ==================================================
            Preloader Init
        ===============================================*/
        $(window).on('load', function () {
            // Animate loader off screen
            $(".preloader").fadeOut("slow");
        });

        /* ==================================================
            # Circular Text
        =============================================== */
        const $text = $(".text"); // Select the element with class "text"
        const originalText = $text.text(); // Get the original text

        // Create a new HTML string with rotated spans
        const rotatedText = originalText
            .split("")
            .map((char, i) => `<span style="transform:rotate(${i * 10.3}deg)">${char}</span>`)
            .join("");

        $text.html(rotatedText); // Set the modified HTML back to the element

        /* ==================================================
            # Pricing toggle Text
        =============================================== */

        // Pricing toggle elements
        var $pricingToggle = $('#pricing-toggle-input'),
            $paidLabel = $('.paid-label'),
            $freeLabel = $('.free-label');

        // Update both cards *and* label colors
        function onPricingChange() {
            var isFree = $pricingToggle.prop('checked');

            // 1) swap card views
            $('.pricing-card .card-content').hide();
            $('.pricing-card .card-content.' + (isFree ? 'free' : 'paid')).show();

            // 2) swap label styles
            $paidLabel.toggleClass('active', !isFree);
            $freeLabel.toggleClass('active', isFree);
        }

        // bind and initialize
        $pricingToggle.on('change', onPricingChange);
        $paidLabel.on('click', function () {
            $pricingToggle.prop('checked', false).trigger('change');
        });
        $freeLabel.on('click', function () {
            $pricingToggle.prop('checked', true).trigger('change');
        });
        onPricingChange();

        /* ==================================================
            # Faq
        =============================================== */

        var $items = $('.faq-item'),
            $first = $items.first(),
            $toggle = $('.faq-question');

        // Open the first item on load
        $first
            .addClass('active')
            .find('.faq-answer')
            .show(); // or .slideDown(0) for consistency

        // Accordion behavior
        $toggle.on('click', function () {
            var $item = $(this).closest('.faq-item'),
                $answer = $item.find('.faq-answer');

            // Close any open item
            $items
                .not($item)
                .removeClass('active')
                .find('.faq-answer')
                .slideUp(400);

            // Toggle this one
            if (!$item.hasClass('active')) {
                $item
                    .addClass('active')
                    .find('.faq-answer')
                    .slideDown(400);
            } else {
                $item
                    .removeClass('active')
                    .find('.faq-answer')
                    .slideUp(400);
            }
        });

        /* ==================================================
            # Scroll to top
        =============================================== */

        //Get the button
        var mybutton = document.getElementById("scrtop");

        // When the user scrolls down 20px from the top of the document, show the button
        window.addEventListener('scroll', scrollFunction);

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }

        /* ==================================================
            # Portfolio Filter
        =============================================== */

        $('.filter-tab').on('click', function () {
            var filter = $(this).data('filter');

            // set active class
            $('.filter-tab').removeClass('active');
            $(this).addClass('active');

            // show/hide items
            if (filter === 'all') {
                $('.portfolio-item').show();
            } else {
                $('.portfolio-item').hide();
                $('.portfolio-item.' + filter).show();
            }
        });

        /* ==================================================
            # Smooth Scroll
        =============================================== */

        $('a.smooth-menu').on('click', function (event) {
            var $anchor = $(this);
            var headerH = '65';
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });

        /* ==================================================
            # Circuler Progressbar
        =============================================== */

        $('.chart').easyPieChart({
            size: 140,
            barColor: '#ec096f',
            scaleColor: false,
            lineWidth: 15,
            trackColor: '#f5f5f5'
        });

        /* ==================================================
            # imagesLoaded active
        ===============================================*/

        $('.filter-active').imagesLoaded(function () {
            var $filter = '.filter-active',
                $filterItem = '.filter-item',
                $filterMenu = '.filter-menu-active';

            if ($($filter).length > 0) {
                var $grid = $($filter).isotope({
                    itemSelector: $filterItem,
                    filter: '*',
                    masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: '.filter-item'
                    }
                });

                // filter items on button click
                $($filterMenu).on('click', 'button', function () {
                    var filterValue = $(this).attr('data-filter');
                    $grid.isotope({
                        filter: filterValue
                    });
                });

                // Menu Active Class
                $($filterMenu).on('click', 'button', function (event) {
                    event.preventDefault();
                    $(this).addClass('active');
                    $(this).siblings('.active').removeClass('active');
                });
            }
        });

        /* ==================================================
            # Magnific popup init
        ===============================================*/

        $(".popup-link").magnificPopup({
            type: 'image',
            // other options
        });

        $(".popup-gallery").magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            // other options
        });

        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $("#videoLink").magnificPopup({
            type: "inline",
            midClick: true
        });

        $('.magnific-mix-gallery').each(function () {
            var $container = $(this);
            var $imageLinks = $container.find('.item');

            var items = [];
            $imageLinks.each(function () {
                var $item = $(this);
                var type = 'image';
                if ($item.hasClass('magnific-iframe')) {
                    type = 'iframe';
                }
                var magItem = {
                    src: $item.attr('href'),
                    type: type
                };
                magItem.title = $item.data('title');
                items.push(magItem);
            });

            $imageLinks.magnificPopup({
                mainClass: 'mfp-fade',
                items: items,
                gallery: {
                    enabled: true,
                    tPrev: $(this).data('prev-text'),
                    tNext: $(this).data('next-text')
                },
                type: 'image',
                callbacks: {
                    beforeOpen: function () {
                        var index = $imageLinks.index(this.st.el);
                        if (-1 !== index) {
                            this.goTo(index);
                        }
                    }
                }
            });
        });

        /* ==================================================
            # Quantity
        ===============================================*/

        function wcqib_refresh_quantity_increments() {
            jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function (a, b) {
                var c = jQuery(b);
                c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />')
            })
        }

        String.prototype.getDecimals || (String.prototype.getDecimals = function () {
            var a = this,
                b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
        }), jQuery(function () {
            wcqib_refresh_quantity_increments()
        }), jQuery(document).on("updated_wc_div", function () {
            wcqib_refresh_quantity_increments()
        }), jQuery(document).on("click", ".plus, .minus", function () {
            var a = jQuery(this).closest(".quantity").find(".qty"),
                b = parseFloat(a.val()),
                c = parseFloat(a.attr("max")),
                d = parseFloat(a.attr("min")),
                e = a.attr("step");
            b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change")
        });

        /* ==================================================
            # Typed
        ===============================================*/

        $(".typed").typed({
            strings: ["IT Company ", "Software Company ", "Digital Marketplace "],
            // Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
            stringsElement: null,
            // typing speed
            typeSpeed: 100,
            // time before typing starts
            startDelay: 1200,
            // backspacing speed
            backSpeed: 10,
            // time before backspacing
            backDelay: 600,
            // loop
            loop: true,
            // false = infinite
            loopCount: Infinity,
            // show cursor
            showCursor: false,
            // character for cursor
            cursorChar: "|",
            // attribute to type (null == text)
            attr: null,
            // either html or text
            contentType: 'html',
            // call when done callback function
            callback: function () {
            },
            // starting callback function before each string
            preStringTyped: function () {
            },
            //callback for every typed string
            onStringTyped: function () {
            },
            // callback for reset
            resetCallback: function () {
            }
        });

        /* ==================================================
            # Fun Factor Init
        ===============================================*/

        $('.timer').countTo();
        $('.fun-fact').appear(function () {
            $('.timer').countTo();
        }, {
            accY: -100
        });

        /* ==================================================
            # Wow Init
        ===============================================*/

        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();

        /* ==================================================
            # Range Slider
        ===============================================*/

        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function (event, ui) {
                $("#amount").val("" + ui.values[0] + " - " + ui.values[1]);
            }
        });
        $("#amount").val("" + $("#slider-range").slider("values", 0) +
            " - " + $("#slider-range").slider("values", 1));

        /* ==================================================
            Contact Form Validations
        ================================================== */

        $('.contact-form').each(function () {
            var formInstance = $(this);
            formInstance.on('submit', function () {

                var action = $(this).attr('action');

                $("#message").slideUp(750, function () {
                    $('#message').hide();

                    $('#submit')
                        .after('<img src="assets/img/logo/ajax-loader.gif" class="loader" />')
                        .attr('disabled', 'disabled');

                    $.post(action, {
                            name: $('#name').val(),
                            email: $('#email').val(),
                            comments: $('#comment').val()
                        },
                        function (data) {
                            document.getElementById('message').innerHTML = data;
                            $('#message').slideDown('slow');
                            $('.contact-form img.loader').fadeOut('slow', function () {
                                $(this).remove()
                            });
                            $('#submit').removeAttr('disabled');
                        }
                    );
                });
                return false;
            });
        });

        /* ==================================================
            # Hero Init
        ===============================================*/

        var swiper = new Swiper(".hero-sldr", {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
        });

        /* ==================================================
            # Service Slider
        ===============================================*/

        var swiper = new Swiper('.team-sldr', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            spaceBetween: 30,
            slidesPerColumn: 1,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                650: {
                    slidesPerView: 1.5,
                },
                768: {
                    slidesPerView: 1.5,
                },
                1201: {
                    slidesPerView: 2.5,
                },
                1300: {
                    slidesPerView: 2.5,
                },
            },
        });

        /* ==================================================
            # Work Slider
        ===============================================*/

        var swiper = new Swiper('.work-sldr-3', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            spaceBetween: 30,
            slidesPerColumn: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
                formatFractionCurrent: function (number) {
                    return ('0' + number).slice(-2); // Ensures double digits
                },
                formatFractionTotal: function (number) {
                    return ('0' + number).slice(-2); // Ensures double digits
                },
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,

                },
                992: {
                    slidesPerView: 3,
                },
            },
        });

        /* ==================================================
            # Project Carousel
        ===============================================*/

        const swiperStageRight = new Swiper(".review-sldr-stage", {
            // Optional parameters
            loop: true,
            freeMode: true,
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            // Navigation arrows
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                650: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                1201: {
                    slidesPerView: 2,
                },
                1300: {
                    slidesPerView: 2,
                },
            },
        });

        /* ==================================================
            # Review Slider
        ===============================================*/

        var swiper = new Swiper('.review-sldr', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            spaceBetween: 30,
            slidesPerColumn: 2,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,

                },
                1024: {
                    slidesPerView: 2,
                },
            },
        });

        /* ==================================================
            # Partner Slider
        ===============================================*/

        var swiper = new Swiper('.ptnr-sldr', {
            loop: true,
            centeredSlides: true,
            autoplay: {
                delay: 5000,
            },
            spaceBetween: 50,
            slidesPerColumn: 1,
            breakpoints: {
                0: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 3.5,
                },
                768: {
                    slidesPerView: 4.5,

                },
                1024: {
                    slidesPerView: 6.1,
                },
            },
        });

        /* ==================================================
            # Infinite Slider
        ===============================================*/
        var swiper = new Swiper(".infinite-sldr", {
            // Optional parameters
            // slidesPerView: 5,
            spaceBetween: 0,
            centeredSlides: true,
            speed: 1500,
            autoplay: {
                delay: 0,
            },
            loop: true,
            slidesPerView: 'auto',
            allowTouchMove: false,
            disableOnInteraction: true,
        });

        /* ==================================================
            # Date Picker Style
        ===============================================*/

        $("#datepicker").datepicker({
            dateFormat: "dd-mm-yy",
            duration: "fast"
        });

        /* ==================================================
            # Select Style
        ===============================================*/

        // Iterate over each select element
        $('select').each(function () {

            // Cache the number of options
            var $this = $(this),
                numberOfOptions = $(this).children('option').length;

            // Hides the select element
            $this.addClass('s-hidden');

            // Wrap the select element in a div
            $this.wrap('<div class="select"></div>');

            // Insert a styled div to sit over the top of the hidden select element
            $this.after('<div class="styledSelect"></div>');

            // Cache the styled div
            var $styledSelect = $this.next('div.styledSelect');

            // Show the first select option in the styled div
            $styledSelect.text($this.children('option').eq(0).text());

            // Insert an unordered list after the styled div and also cache the list
            var $list = $('<ul />', {
                'class': 'options'
            }).insertAfter($styledSelect);

            // Insert a list item into the unordered list for each select option
            for (var i = 0; i < numberOfOptions; i++) {
                $('<li />', {
                    text: $this.children('option').eq(i).text(),
                    rel: $this.children('option').eq(i).val()
                }).appendTo($list);
            }

            // Cache the list items
            var $listItems = $list.children('li');

            // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
            $styledSelect.on('click', function (e) {
                e.stopPropagation();
                // Check if the styled select already has the "active" class
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active').next('ul.options').hide();
                } else {
                    // If it doesn't have the class, remove it from other elements and show the options
                    $('div.styledSelect.active').each(function () {
                        $(this).removeClass('active').next('ul.options').hide();
                    });
                    $(this).addClass('active').next('ul.options').show();
                }
            });

            // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
            // Updates the select element to have the value of the equivalent option
            $listItems.on('click', function (e) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));
                $list.hide();
                /* alert($this.val()); Uncomment this for demonstration! */
            });

            // Hides the unordered list when clicking outside of it
            $(document).on('click', function () {
                $styledSelect.removeClass('active');
                $list.hide();
            });

        });

    }); // end ready
})(jQuery); // End jQuery

/* ==================================================
    # Gsap
=============================================== */

// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
    if (!window.gsap) {
        console.error('GSAP didn’t load.');
        return;
    }
    gsap.registerPlugin(SplitText);

    gsap.set(".hero-title", {opacity: 1});

    let split = SplitText.create(".hero-title", {type: "chars"});
    //now animate each character into place from 20px below, fading in:
    gsap.from(split.chars, {
        y: 20,
        autoAlpha: 0,
        stagger: 0.05,
    });
});

/* ==================================================
  # Sidenav
=============================================== */

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.overflowX = "visible";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.overflowX = "hidden";
}
