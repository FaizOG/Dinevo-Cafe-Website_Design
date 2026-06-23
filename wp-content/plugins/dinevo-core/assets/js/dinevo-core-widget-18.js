(function ($) {
    "use strict";
    /**
       * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */


    function mybe_note_undefined($selector, $data_atts) {
        return ($selector.data($data_atts) !== undefined) ? $selector.data($data_atts) : '';
    }


    /**
     * Swiper activation
     * @param $scope
     * @param $
    */
    var WidgetSliderHandler = function ($scope, $) {
        var slider_el = $scope.find(".tp-demo-active").eq(0);
        if (slider_el.length === 0)
            return;
        var settings = slider_el.data('settings');
        var arrows = settings['arrows'];
        var dots = settings['dots'];
        var autoplay = settings['autoplay'];
        var autoplay_speed = parseInt(settings['autoplay_speed']) || 2500;
        var infinite = settings['infinite'];
        var for_xl_desktop = settings['for_xl_desktop'];
        var slidesToShow = settings['slidesToShow'];
        var for_laptop = settings['for_laptop'];
        var for_tablet = settings['for_tablet'];
        var for_mobile = settings['for_mobile'];
        var for_xs_mobile = settings['for_xs_mobile'];


        var tpslider = new Swiper('.tp-demo-active', {
            slidesPerView: for_xl_desktop,
            spaceBetween: 30,
            // direction: 'vertical',
            loop: infinite,
            autoplay: {
                delay: autoplay_speed,
            },
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
            breakpoints: {
                0: {
                    slidesPerView: for_xs_mobile,
                },
                550: {
                    slidesPerView: for_mobile,
                },
                768: {
                    slidesPerView: for_tablet,
                },
                992: {
                    slidesPerView: for_laptop,
                },
                1200: {
                    slidesPerView: slidesToShow,
                },
                1599: {
                    slidesPerView: for_xl_desktop,
                },
            }
        });

        if (true !== autoplay) {
            tpslider.autoplay.stop();
        }

    };

    // Make sure you run this code under Elementor.
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/portfolio.default', WidgetSliderHandler);
    });

    // Counter
    $(window).on("elementor/frontend/init", function () {
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/wpr-counter.default",
            function ($scope) {
                // Iterate over each counter item within the widget
                $scope.find(".counter-count").each(function () {
                    var $counterItem = $(this);

                    // Use isInViewport to trigger the counter animation
                    $counterItem.isInViewport(function (status) {
                        if (status === "entered") {
                            $counterItem.find(".odometer").each(function () {
                                var el = this;
                                el.innerHTML = el.getAttribute("data-odometer-final");
                            });
                        }
                    });
                });
            }
        );
    });

    // Services Thumb Hover effect
    $(window).on("elementor/frontend/init", function () {
        elementorFrontend.hooks.addAction(
            "frontend/element_ready/wpr-project-tab.default",
            function ($scope) {
                // Function to initialize hover effect
                function initializeServiceHoverEffect(titleSelector, imageSelector) {
                    const serviceTitles = $scope.find(titleSelector);
                    const serviceImages = $scope.find(imageSelector);

                    if (serviceTitles.length > 0 && serviceImages.length > 0) {
                        // Set initial active classes
                        serviceTitles.first().addClass("active");
                        const firstLink = serviceTitles.first().find("a");
                        if (firstLink.length) {
                            firstLink.addClass("active");
                        }
                        serviceImages.first().addClass("active");

                        // Add hover event listeners
                        serviceTitles.each(function (index) {
                            const title = $(this);
                            const link = title.find("a");

                            const activate = () => {
                                // Remove active classes from all titles, links, and images
                                serviceTitles.removeClass("active");
                                serviceTitles.find("a").removeClass("active");
                                serviceImages.removeClass("active");

                                // Add active class to the parent title, its link, and the corresponding image
                                title.addClass("active");
                                if (link.length) {
                                    link.addClass("active");
                                }
                                if (serviceImages.eq(index).length) {
                                    serviceImages.eq(index).addClass("active");
                                }
                            };

                            if (link.length) {
                                link.on("mouseenter", activate);
                            }

                            // Add hover event listener on the title itself
                            title.on("mouseenter", activate);
                        });
                    }
                }

                // Initialize hover effects for different selectors within the widget scope
                initializeServiceHoverEffect(".service-title", ".services-2__thumbs img");
                initializeServiceHoverEffect(".featcher", ".services-3__thumb img");
            }
        );
    });





    //  Marqueue Text
    $(window).on("elementor/frontend/init", function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/wpr-marqueue-text.default', function ($scope) {

        });
    });



}(jQuery));
