(function ($) {
  // =========================================================================
  // Function Table of Contents
  // =========================================================================
  //
  //  01. initSmoothScroll
  //  02. preloader
  //  03. initMobileMenu
  //  04. initSearchToggle
  //  05. initCartSidebarToggle
  //  06. initNumberAddMinus
  //  07. setBackgroundImages
  //  08. initCloudKitchenSlider
  //  09. setHoverActiveClass
  //  10. setCurrentYear
  //  11. initGalleryCarousel
  //  12. counterUp
  //  13. handleVideoModal
  //  14. funMarquee
  //  15. currentYear
  //  16. testimonialTwoSlider
  //  17. locationCloudKtchenSlider
  //  18. testimonialFourSlider
  //  19. testimonialFiveSlider
  //  20. storyFourSlider
  //  21. aboutThreeTextAnimation
  //  22. instagramThreeSlider
  //  23. categoryFiveSlider
  //  24. initFadeAnim
  //  25. initHeroFourThumbAnim
  //  26. initShapeMove
  //  27. initTextRevealAnim
  //  28. initLenisParallax
  //  29. initTestimonialPinning
  //  30. initFlatpickr
  //  31. initPasswordToggle
  //  32. calculateCartTotal
  //  33. initCartRemove
  //  34. initCartQuantity
  //  35. heroFiveThumbSlider
  //  36. initShopSortDropdown
  //  37. initPriceFilter
  //  38. initQuantityControl
  //  39. initRelatedSlider
  //  40. initSimpleParallax
  //  41. initClipPathAnim
  //  42. heroThreeBgSlider
  //
  // =========================================================================

  // =================== [01] Lenis Scroll Js Start ===================
  const initSmoothScroll = () => {
    const isLenisLoaded = typeof Lenis !== "undefined";

    if (isLenisLoaded) {
      const lenis = new Lenis();

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }
  };

  initSmoothScroll();
  // =================== Lenis Scroll Js End ===================

  // =================== [02] Preloader Js Start ===================
  function preloader() {
    $(".preloader")
      .delay(1000)
      .fadeOut("slow")
      .queue(function () {
        $(this).remove();
        ScrollTrigger.refresh();
      });
  }

  $(window).on("load", function () {
    preloader();
  });

  // =================== preloader Scroll Js End ===================

  // =================== [03] initMobileMenu Js Start ===================
  const initMobileMenu = () => {
    $(".mainmenu").meanmenu({
      meanMenuContainer: ".mobile_menu",
      meanScreenWidth: "991",
      meanExpand: ['<i class="fa-light fa-plus"></i>'],
    });
    $(".header__right-hamburger").on("click", function () {
      $(".hamburger-area").addClass("opened");
      $(".hamburger_bg").addClass("opened");
    });
    const closeMobileMenu = () => {
      $(".hamburger-area").removeClass("opened");
      $(".hamburger_bg").removeClass("opened");
      $(".header__right-hamburger").removeClass("on");
    };
    $(".hamburger_close_btn").on("click", closeMobileMenu);
    $(".hamburger_bg").on("click", closeMobileMenu);
  };
  initMobileMenu();
  // =================== initMobileMenu Js End ===================

  // =================== [04] Search Toggle Js Start ===================
  const initSearchToggle = () => {
    if (!document || !document.addEventListener) return;

    document.addEventListener("click", (event) => {
      if (!event?.target) return;

      const searchToggle = event.target.closest?.(".search-icon");
      const searchField = event.target.closest?.(".search-field");

      if (searchToggle) {
        searchToggle.classList.toggle("active");
      } else if (!searchField) {
        const activeSearchIcons = document.querySelectorAll(
          ".search-icon.active",
        );
        activeSearchIcons.forEach((icon) => icon.classList.remove("active"));
      }
    });
  };

  initSearchToggle();
  // =================== Search Toggle Js End ===================

  // =================== [05] Cart Sidebar Toggle Js Start ===================
  const initCartSidebarToggle = () => {
    if (!document?.querySelectorAll) return;

    const toggleIcons = document.querySelectorAll(".cart-toggle");
    const closeIcons = document.querySelectorAll(".cross-icon");
    const sidebarWraps = document.querySelectorAll(
      ".menu-toggle-btn-full-shape",
    );

    // null / empty validation
    if (!toggleIcons.length && !closeIcons.length && !sidebarWraps.length)
      return;

    const showSidebar = () => {
      if (!sidebarWraps?.length) return;
      sidebarWraps.forEach((el) => el?.classList?.add("show-sidebar"));
    };

    const hideSidebar = () => {
      if (!sidebarWraps?.length) return;
      sidebarWraps.forEach((el) => el?.classList?.remove("show-sidebar"));
    };

    // open
    toggleIcons?.forEach?.((el) => {
      if (!el?.addEventListener) return;
      el.addEventListener("click", showSidebar);
    });

    // close button
    closeIcons?.forEach?.((el) => {
      if (!el?.addEventListener) return;
      el.addEventListener("click", hideSidebar);
    });

    // click outside (wrapper only)
    window?.addEventListener?.("click", (event) => {
      if (!event?.target || !sidebarWraps?.length) return;

      sidebarWraps.forEach((wrap) => {
        if (event.target === wrap) {
          wrap?.classList?.remove("show-sidebar");
        }
      });
    });
  };

  initCartSidebarToggle();
  // =================== Cart Sidebar Toggle Js End ===================

  // =================== [06] Number Add Minus Js Start ===================
  const initNumberAddMinus = () => {
    if (!document?.querySelectorAll) return;

    const buttons = document.querySelectorAll(".number-btn");
    if (!buttons?.length) return;

    const minValue = 0;
    const maxValue = 120;
    const defaultValue = 100;

    buttons.forEach((button) => {
      if (!button?.addEventListener) return;

      const parent = button.parentNode;
      if (!parent) return;

      const numberContainer = parent.querySelector?.(".number");
      if (!numberContainer) return;

      numberContainer.textContent = `${defaultValue} rp`;

      button.addEventListener("click", (event) => {
        const element = event?.currentTarget;
        if (!element) return;

        const wrap = element.parentNode;
        if (!wrap) return;

        const numberEl = wrap.querySelector?.(".number");
        if (!numberEl) return;

        const increment = wrap.querySelector?.(".plus");
        const decrement = wrap.querySelector?.(".minus");

        // safely extract number (remove non-numeric chars)
        const current = parseFloat(
          numberEl.textContent.replace(/[^\d.-]/g, ""),
        );

        if (Number.isNaN(current)) return;

        const isPlus = element.classList?.contains("plus");
        const newNumber = isPlus ? current + 1 : current - 1;

        if (newNumber < minValue) return;

        // update value
        if (newNumber >= maxValue) {
          numberEl.textContent = `${newNumber}+ rp`;
          increment && (increment.disabled = true);
          decrement && (decrement.disabled = false);
          return;
        }

        numberEl.textContent = `${newNumber} rp`;

        if (newNumber === minValue) {
          decrement && (decrement.disabled = true);
        } else {
          decrement && (decrement.disabled = false);
          increment && (increment.disabled = false);
        }
      });
    });
  };

  initNumberAddMinus();
  // =================== Number Add Minus Js End ===================

  // =================== [07] setBackgroundImages Js Start ===================
  const setBackgroundImages = () => {
    var elements = document.querySelectorAll("[data-background]");
    if (elements?.length > 0) {
      elements.forEach(function (element) {
        var src = element.getAttribute("data-background");
        element.style.backgroundImage = "url(" + src + ")";
        element.classList.add("background-image");
        element.removeAttribute("data-background");
      });
    }
  };
  setBackgroundImages();
  // =================== setBackgroundImages Js End ===================

  // =================== [08] Cloud Kitchen Slider Js Start ===================
function initCloudKitchenSlider($scope, $) {

    const sliderWrapper = $scope.find('.categories-cloud-ktchen-wrapper');

    if (!sliderWrapper.length) return;

    // Get unique class
    let uniqueClass = '';

    sliderWrapper.attr('class').split(' ').forEach(function(cls) {

        if (cls.startsWith('unique-slider-')) {
            uniqueClass = cls;
        }

    });

    if (!uniqueClass) return;

    // Navigation selector
    const navigationClass = '.nav-' + uniqueClass;

    // Slider
    const slider = sliderWrapper.find('.categories-cloud-ktchen__slider');

    if (!slider.length) return;

    // Swiper Init
    new Swiper(slider[0], {

        slidesPerView: 1,
        spaceBetween: 32,
        loop: true,
        speed: 1000,

        breakpoints: {
            575: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },

        navigation: {
            nextEl: navigationClass + ' .button-next',
            prevEl: navigationClass + ' .button-prev',
        },

        pagination: {
            el: $scope.find('.categories-cloud-ktchen__pagination')[0],
            clickable: true,
        },

    });

    // ================= Active Hover =================

    const prevBtn = $(navigationClass).find('.button-prev');
    const nextBtn = $(navigationClass).find('.button-next');

    if (prevBtn.length && nextBtn.length) {

        nextBtn.addClass('active');

        const updateActive = ($btn) => {

            prevBtn.removeClass('active');
            nextBtn.removeClass('active');

            $btn.addClass('active');

        };

        prevBtn.on('mouseenter', function () {
            updateActive(prevBtn);
        });

        nextBtn.on('mouseenter', function () {
            updateActive(nextBtn);
        });

    }
}

  // =================== [09] Set Hover Active Class JS ===================
  const setHoverActiveClass = (
    listenerSelector,
    targetSelector,
    activeClass = "active",
  ) => {
    if (
      typeof listenerSelector !== "string" ||
      typeof targetSelector !== "string"
    ) {
      return;
    }

    const listeners = document.querySelectorAll(listenerSelector);

    if (listeners.length === 0) {
      return;
    }

    let currentActiveItem = null;

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      const targetElement = listener.querySelector(targetSelector) || listener;
      if (targetElement.classList.contains(activeClass)) {
        currentActiveItem = targetElement;
        break;
      }
    }

    if (!currentActiveItem) {
      currentActiveItem =
        listeners[0].querySelector(targetSelector) || listeners[0];
      currentActiveItem.classList.add(activeClass);
    }

    listeners.forEach((listener) => {
      const targetElement = listener.querySelector(targetSelector) || listener;

      listener.addEventListener("mouseenter", function () {
        if (currentActiveItem && currentActiveItem !== targetElement) {
          currentActiveItem.classList.remove(activeClass);
        }
        targetElement.classList.add(activeClass);
        currentActiveItem = targetElement;
      });
    });
  };

  setHoverActiveClass(
    ".testimonials-cloud-ktchen__item",
    ".testimonials-cloud-ktchen__item",
    "active",
  );
  setHoverActiveClass(".shop-five__item", ".shop-five__item", "active");
  setHoverActiveClass(
    ".choose-us-five__item",
    ".choose-us-five__item",
    "active",
  );
  setHoverActiveClass(".category-two__item", ".category-two__item", "active");
  setHoverActiveClass(".choose-us-two__item", ".choose-us-two__item", "active");
  setHoverActiveClass(
    ".testimonial-three__item",
    ".testimonial-three__item",
    "active",
  );
  setHoverActiveClass(
    ".testimonial-six__item",
    ".testimonial-six__item",
    "active",
  );
  setHoverActiveClass(
    ".branding-cloud-ktchen__brands .brand-item",
    ".branding-cloud-ktchen__brands .brand-item",
    "active",
  );
  setHoverActiveClass(
    ".widget__tags .tag-list a",
    ".widget__tags .tag-list a",
    "active",
  );

  // =================== [10] Current Year (setCurrentYear) ===================
  const setCurrentYear = () => {
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  };
  setCurrentYear();
  // =================== Set Hover Active Class JS End ===================
  // =================== [11] Gallery Carousel Js Start ===================
  const initGalleryCarousel = () => {
    var galleryTwoSlider = new Swiper(".gallery-two__slider .swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      speed: 4500,
      centeredSlides: true,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      breakpoints: {
        575: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 2.5,
        },
        1200: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 3.8,
        },
      },
      pagination: {
        el: ".gallery-two__pagination",
        clickable: true,
      },
    });
  };

  initGalleryCarousel();
  // =================== Gallery Carousel Js End ===================

  // =================== [12] Counter Up Js Start ===================
  const counterUp = () => {
    const counterItems = document.querySelectorAll(".counter-item");
    if (!counterItems.length) return;

    counterItems.forEach((item) => {
      const originalText = item.textContent.trim();
      const match = originalText.match(/^([\d.]+)(.*)$/);

      if (!match) return;

      const numberString = match[1];
      const hasDecimal = numberString.includes(".");
      const decimalCount = hasDecimal ? numberString.split(".")[1].length : 0;

      let targetValue = parseFloat(numberString);
      const originalSuffix = match[2] || "";
      let multiplier = 1;
      let cleanSuffix = originalSuffix;

      if (originalSuffix.toLowerCase().includes("k")) {
        multiplier = 1000;
        cleanSuffix = originalSuffix.replace(/k/i, "");
      } else if (originalSuffix.toLowerCase().includes("m")) {
        multiplier = 1000000;
        cleanSuffix = originalSuffix.replace(/m/i, "");
      }

      const endValue = targetValue * multiplier;
      const proxy = { val: 0 };

      gsap.to(proxy, {
        val: endValue,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          let current = this.targets()[0].val;
          let formatted;
          let suffixToAdd = cleanSuffix;

          if (current >= 1000000) {
            formatted = Number.isInteger(current / 1000000)
              ? current / 1000000
              : (current / 1000000).toFixed(1);
            suffixToAdd = "M" + cleanSuffix;
          } else if (current >= 1000) {
            formatted = Number.isInteger(current / 1000)
              ? current / 1000
              : (current / 1000).toFixed(1);
            suffixToAdd = "k" + cleanSuffix;
          } else {
            if (hasDecimal) {
              formatted = current.toFixed(decimalCount);
            } else {
              formatted = Math.floor(current);
            }
          }

          if (current >= 1000) {
            if (formatted.toString().endsWith(".0")) {
              formatted = parseInt(formatted);
            }
          }

          item.textContent = formatted + suffixToAdd;
        },
      });
    });
  };
  counterUp();
  // =================== Counter Up Js End ===================

  // =================== [13] handleVideoModal Js Start ===================
  const handleVideoModal = (modalId, videoFrameId) => {
    const videoModal = document.getElementById(modalId);
    const videoFrame = document.getElementById(videoFrameId);
    if (videoModal && videoFrame) {
      videoModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget;
        const videoId = button.getAttribute("data-video-id");

        if (videoId) {
          videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
      });
      videoModal.addEventListener("hide.bs.modal", () => {
        videoFrame.src = "";
      });
    }
  };
  handleVideoModal("globalVideoModal", "globalVideoIFrame");
  // =================== handleVideoModal Js End ===================
  // =================== [14] Marquee Js Start ===================
  const funMarquee = () => {
    $(".slide-track").each(function () {
      const t = $(this);
      const gap = Number(t.attr("data-gap")) || 60;
      const direction = t.attr("data-direction") || "left";
      const speed = Number(t.attr("data-speed")) || 50;
      t.marquee({
        speed: speed,
        gap: gap,
        delayBeforeStart: 0,
        direction: direction,
        duplicated: true,
        startVisible: true,
      });
    });
  };
  funMarquee();

  // =================== Marquee Js End ===================
  // =================== [15] Current Year Js Start ===================
  const currentYear = () => {
    const currentYearElement = document.querySelector(".current-year");
    if (!currentYearElement) return;
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  };
  currentYear();
  // =================== Current Year Js End ===================
  // =================== [16] Testimonial Two Slider Js Start ===================
  const testimonialTwoSlider = () => {
    const element = document.querySelector(".testimonial-two__slider");
    if (!element) return;

    new Swiper(element, {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".testimonial-two-next",
        prevEl: ".testimonial-two-prev",
      },
    });
  };
  testimonialTwoSlider();
  // =================== Testimonial Two Slider Js End ===================

  // =================== [17] Location Cloud Kitchen Slider Js Start ===================
  function locationSliderActive($scope, $) {
    var $slider = $scope.find(".location-cloud-ktchen__slider");

    if ($slider.length) {

      // Destroy if already initialized (important for Elementor editor)
      if ($slider[0].swiper) {
        $slider[0].swiper.destroy(true, true);
      }

      new Swiper($slider[0], {
        spaceBetween: 20,
        slidesPerView: 4,
        loop: true,
        speed: 1000,

        pagination: {
          el: $scope.find(".location-cloud-ktchen__pagination")[0],
          type: "progressbar",
        },

        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },

        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        },
      });
    }
  }
  // =================== Location Cloud Kitchen Slider Js End ===================

  // =================== [18] Testimonial Four Slider Js Start ===================
  const testimonialFourSlider = () => {
    const element = document.querySelector(".testimonial-four__slider");
    if (!element) return;

    new Swiper(element, {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      speed: 4000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      breakpoints: {
        575: {
          slidesPerView: "auto",
        },
      },
    });
  };
  testimonialFourSlider();
  // =================== Testimonial Four Slider Js End ===================

  // =================== [19] Testimonial Five Slider Js Start ===================
  const testimonialFiveSlider = () => {
    const swiperContainer = document.querySelector(".testimonial-five__slider");
    if (!swiperContainer) return;

    const swiper = new Swiper(swiperContainer, {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      speed: 2500,
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
      on: {
        init: function () {
          const allSlides = swiperContainer.querySelectorAll(".swiper-slide");
          const total = swiperContainer.querySelectorAll(
            ".swiper-slide:not(.swiper-slide-duplicate)",
          ).length;

          allSlides.forEach((slide) => {
            const currentSlideNum = slide.querySelector(".current-slide");
            const totalSlideNum = slide.querySelector(".total-slide");

            if (totalSlideNum) {
              totalSlideNum.textContent = total < 10 ? "0" + total : total;
            }

            if (currentSlideNum) {
              const index = slide.getAttribute("data-swiper-slide-index");
              if (index !== null) {
                const current = parseInt(index, 10) + 1;
                currentSlideNum.textContent =
                  current < 10 ? "0" + current : current;
              }
            }
          });
        },
      },
    });
  };
  testimonialFiveSlider();
  // =================== Testimonial Five Slider Js End ===================

  // =================== [20] Story Four Slider Js Start ===================
  const storyFourSlider = () => {
    const element = document.querySelector(".story-four__slider");
    if (!element) return;

    new Swiper(element, {
      slidesPerView: 1,
      spaceBetween: 15,
      loop: true,
      speed: 4000,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      breakpoints: {
        575: {
          slidesPerView: "auto",
          spaceBetween: 30,
        },
      },
    });
  };
  storyFourSlider();
  // =================== Story Four Slider Js End ===================

  // =================== [21] About Three Text Animation Js Start ===================
  const aboutThreeTextAnimation = () => {
    const elements = document.querySelectorAll(".t_line-element");
    if (elements.length > 0) {
      let mm = gsap.matchMedia();
      mm.add("(min-width: 992px)", () => {
        elements.forEach((element) => {
          var tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              scrub: 1,
              start: "top 40%",
              end: "bottom bottom",
            },
          });

          const textElement = element.querySelector(".t_line");
          if (textElement) {
            const t_line = new SplitText(textElement, { type: "lines" });
            tl.to(t_line.lines, {
              backgroundPosition: "0% 0%",
              ease: "none",
              stagger: 1,
              duration: 1,
            });
          }
        });
      });
    }
  };
  aboutThreeTextAnimation();
  // =================== About Three Text Animation Js End ===================

  // =================== [22] Instagram Three Slider Js Start ===================
  const instagramThreeSlider = () => {
    const wheel = document.querySelector(".instagram-three__slider");

    if (!wheel) {
      return;
    }

    const baseItems = Array.from(
      wheel.querySelectorAll(".instagram-three__item"),
    );

    if (!baseItems.length) {
      return;
    }

    baseItems.forEach((item) => {
      const clone = item.cloneNode(true);
      wheel.appendChild(clone);
    });

    const allItems = Array.from(
      wheel.querySelectorAll(".instagram-three__item"),
    );

    const totalItems = allItems.length;

    allItems.forEach((item, index) => {
      const angle = (360 / totalItems) * index;
      item.style.setProperty("--angle", `${angle}deg`);
    });
  };

  instagramThreeSlider();
  // =================== Instagram Three Slider Js End ===================

  // =================== [23] Category Five Slider Js Start ===================
  const categoryFiveSlider = () => {
    let swiper = new Swiper(".category-five__slider", {
      loop: true,
      slidesPerView: "auto",
      spaceBetween: 30,
      speed: 1500,
      // speed: 3000,
      // autoplay: {
      //   delay: 1,
      //   disableOnInteraction: false,
      // },
    });
  };
  categoryFiveSlider();
  // =================== Category Five Slider Js End ===================

  // =================== [24] initFadeAnim Js Start ===================
  const initFadeAnim = () => {
    let fadeArray_items = document.querySelectorAll(".fade-anim");
    if (fadeArray_items.length > 0) {
      const fadeArray = gsap.utils.toArray(".fade-anim");
      fadeArray.forEach((item, i) => {
        var fade_direction = "bottom";
        var onscroll_value = 1;
        var duration_value = 1.15;
        var fade_offset = 50;
        var delay_value = 0.25;
        var ease_value = "power2.out";
        if (item.getAttribute("data-offset")) {
          fade_offset = parseFloat(item.getAttribute("data-offset"));
        }
        if (item.getAttribute("data-duration")) {
          duration_value = parseFloat(item.getAttribute("data-duration"));
        }
        if (item.getAttribute("data-direction")) {
          fade_direction = item.getAttribute("data-direction");
        }
        if (item.getAttribute("data-on-scroll")) {
          onscroll_value = parseInt(item.getAttribute("data-on-scroll"));
        }
        if (item.getAttribute("data-delay")) {
          delay_value = parseFloat(item.getAttribute("data-delay"));
        }
        if (item.getAttribute("data-ease")) {
          ease_value = item.getAttribute("data-ease");
        }
        let animation_settings = {
          opacity: 0,
          ease: ease_value,
          duration: duration_value,
          delay: delay_value,
        };
        if (fade_direction == "top") {
          animation_settings["y"] = -fade_offset;
        }
        if (fade_direction == "left") {
          animation_settings["x"] = -fade_offset;
        }
        if (fade_direction == "bottom") {
          animation_settings["y"] = fade_offset;
        }
        if (fade_direction == "right") {
          animation_settings["x"] = fade_offset;
        }
        if (onscroll_value == 1) {
          animation_settings["scrollTrigger"] = {
            trigger: item,
            start: "top 85%",
          };
        }
        gsap.from(item, animation_settings);
      });
    }
  };
  initFadeAnim();
  // =================== initFadeAnim Js End ===================

  // =================== [25] Hero Four Thumb Anim Js Start ===================
  const initHeroFourThumbAnim = () => {
    const thumbImg = document.querySelector(".hero-four__thumb");
    if (!thumbImg) return;

    gsap.fromTo(
      thumbImg.querySelector("img"),
      { rotation: -45 },
      {
        rotation: 0,
        duration: 1,
        delay: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: thumbImg,
          start: "top 85%",
        },
      },
    );
  };
  initHeroFourThumbAnim();
  // =================== Hero Four Thumb Anim Js End ===================

  // initShapeMove();
  // =================== [26] Shape Move Js Start ===================
  const initShapeMove = () => {
    const containers = document.querySelectorAll(".shape-move");

    if (!containers.length) return;

    containers.forEach((container) => {
      // select only shapes inside this container
      const shapes = container.querySelectorAll(".shape-image .shape");

      if (!shapes.length) return;

      container.addEventListener("mousemove", (e) => {
        const wx = window.innerWidth;
        const wy = window.innerHeight;

        const rect = container.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // relative to window center
        const newx = x - wx / 2;
        const newy = y - wy / 2;

        shapes.forEach((shape) => {
          let speed = parseFloat(shape.dataset.speed || 0.4);

          if (shape.dataset.revert !== undefined) {
            speed *= -1;
          }

          gsap.to(shape, {
            duration: 1,
            x: 1 - newx * speed,
            y: 1 - newy * speed,
          });
        });
      });
    });
  };

  // initialize
  initShapeMove();
  // =================== Shape Move Js End ===================

  // =================== [27] Text Reveal Anim Js Start ===================
  const initTextRevealAnim = () => {
    const tp_anim_reveal = document.querySelectorAll(".tp-text-revel-anim");

    if (!tp_anim_reveal || tp_anim_reveal.length === 0) {
      return;
    }

    tp_anim_reveal.forEach((areveal) => {
      const getAttributeValue = (attr, defaultValue) =>
        areveal.getAttribute(attr) || defaultValue;
      const duration_value = parseFloat(getAttributeValue("data-duration", 1));
      const onscroll_value = parseInt(getAttributeValue("data-on-scroll", 1));
      const stagger_value = parseFloat(getAttributeValue("data-stagger", 0.02));
      const data_delay = parseFloat(getAttributeValue("data-delay", 0.1));
      const ease_value = getAttributeValue("data-ease", "circ.out");

      areveal.split = new SplitText(areveal, {
        type: "lines,words,chars",
        linesClass: "tp-revel-line",
      });
      const animationProps = {
        duration: duration_value,
        delay: data_delay,
        ease: ease_value,
        y: 100,
        stagger: stagger_value,
        opacity: 0,
      };

      if (onscroll_value === 1) {
        areveal.anim = gsap.from(areveal.split.chars, {
          scrollTrigger: {
            trigger: areveal,
            start: "top 85%",
          },
          ...animationProps,
        });
      } else {
        areveal.anim = gsap.from(areveal.split.chars, animationProps);
      }
    });
  };
  initTextRevealAnim();
  // =================== Text Reveal Anim Js End ===================

  // =================== [28] Parallax Js Start ===================
  const initLenisParallax = () => {
    const items = document.querySelectorAll(".parallax");

    if (!items.length) return;

    items.forEach((el) => {
      const speed = parseFloat(el.dataset.speed);

      gsap.to(el, {
        yPercent: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  };
  initLenisParallax();
  // =================== Parallax Js End ===================

  // =================== [29] Testimonial Pinning Js Start ===================
  const initTestimonialPinning = () => {
    const testimonialSections = document.querySelectorAll(
      ".gallery-three.section",
    );
    if (testimonialSections.length === 0) return;
    const tm = gsap.matchMedia();
    tm.add("(min-width: 992px)", () => {
      testimonialSections.forEach((section) => {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            pin: section.querySelector(".restaurant__header"),
            scrub: 1,
            start: "top 17%",
            end: "bottom 90%",
            endTrigger: section.querySelector(".gallery-three__rows"),
            pinSpacing: false,
            markers: false,
          },
        });
      });
    });
  };
  // initTestimonialPinning();
  // =================== Testimonial Js End ===================

  // =================== [30] Flatpickr Init Start ===================
  const initFlatpickr = () => {
    const timePickers = document.querySelectorAll(".custom-date-picker");
    if (timePickers.length > 0) {
      flatpickr(timePickers, {
        enableTime: true,
        dateFormat: "Y-m-d h:i K",
        minDate: "today",
      });
    }
  };
  initFlatpickr();
  // =================== Flatpickr Init End ===================

  // =================== [31] Password Toggle Js Start ===================
  const initPasswordToggle = () => {
    const togglePassword = document.querySelectorAll(".toggle-password");
    if (togglePassword.length > 0) {
      togglePassword.forEach((toggle) => {
        toggle.addEventListener("click", function () {
          const input = this.parentElement.querySelector("input");
          if (!input) return;
          const type =
            input.getAttribute("type") === "password" ? "text" : "password";
          input.setAttribute("type", type);

          if (type === "password") {
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
          } else {
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
          }
        });
      });
    }
  };
  initPasswordToggle();
  // =================== Password Toggle Js End ===================
  // =================== [32] Cart Total Calculation Start ===================
  const calculateCartTotal = () => {
    const subtotalElements = document.querySelectorAll(
      ".cart-item .subtotal p",
    );
    let total = 0;

    subtotalElements.forEach((el) => {
      const value = parseFloat(el.textContent.replace("$", "")) || 0;
      total += value;
    });

    const formattedTotal = `$${total.toFixed(2)}`;

    const totalListSpans = document.querySelectorAll(
      ".total-box .total-list .value",
    );
    if (totalListSpans.length >= 2) {
      totalListSpans[0].textContent = formattedTotal;
      totalListSpans[1].textContent = formattedTotal;
    }
  };
  // =================== Cart Total Calculation End ===================

  // =================== [33] Cart Item Remove Js Start ===================
  const initCartRemove = () => {
    const removeBtns = document.querySelectorAll(".cart-item .remove-btn");
    if (removeBtns.length > 0) {
      removeBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const cartItem = this.closest(".cart-item");
          if (cartItem) {
            cartItem.remove();
            calculateCartTotal();
          }
        });
      });
    }
  };
  initCartRemove();
  // =================== Cart Item Remove Js End ===================

  // =================== [34] Cart Item Quantity Js Start ===================
  const initCartQuantity = () => {
    const quantityInputs = document.querySelectorAll(".number-input");
    if (quantityInputs.length > 0) {
      quantityInputs.forEach((input) => {
        const plusBtn = input.querySelector(".plus");
        const minusBtn = input.querySelector(".minus");
        const numberField = input.querySelector(".number-field");

        const cartItem = input.closest(".cart-item");
        const priceElement = cartItem
          ? cartItem.querySelector(".price p")
          : null;
        const subtotalElement = cartItem
          ? cartItem.querySelector(".subtotal p")
          : null;

        let basePrice = 0;
        if (priceElement) {
          basePrice =
            parseFloat(priceElement.textContent.replace("$", "")) || 0;
        }

        const updateSubtotal = (quantity) => {
          if (subtotalElement) {
            const newSubtotal = (basePrice * quantity).toFixed(2);
            subtotalElement.textContent = `$${newSubtotal}`;
            calculateCartTotal();
          }
        };

        if (plusBtn && minusBtn && numberField) {
          updateSubtotal(parseInt(numberField.textContent, 10) || 0);

          plusBtn.addEventListener("click", () => {
            let currentValue = parseInt(numberField.textContent, 10) || 0;
            currentValue++;
            numberField.textContent = currentValue;
            updateSubtotal(currentValue);

            if (currentValue > 1) {
              minusBtn.disabled = false;
            }
          });

          minusBtn.addEventListener("click", () => {
            let currentValue = parseInt(numberField.textContent, 10) || 0;
            if (currentValue > 1) {
              currentValue--;
              numberField.textContent = currentValue;
              updateSubtotal(currentValue);

              if (currentValue <= 1) {
                minusBtn.disabled = true;
              }
            }
          });
        }
      });
    }

    calculateCartTotal();
  };
  initCartQuantity();
  // =================== Cart Item Quantity Js End ===================
  // =================== [35] Hero Five Thumb Slider Start ===================
  const heroFiveThumbSlider = () => {
    const element = document.querySelector(".hero-five__thumb-slider");
    const pagination = document.querySelector(".hero-five__thumb-pagination");

    if (!element) return;

    new Swiper(element, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 1000,
      effect: "fade",
      pagination: {
        el: pagination,
        clickable: true,
      },
      autoplay: {
        delay: 1000,
        disableOnInteraction: false,
      },
    });
  };

  heroFiveThumbSlider();
  // =================== Hero Five Thumb Slider End ===================

  // =================== [36] Shop Sort Dropdown Js Start ===================
  const initShopSortDropdown = () => {
    const sortWrap = document.getElementById("sort-wrap");
    if (!sortWrap) return;

    const trigger = document.getElementById("sort-selected");
    const dropdown = document.getElementById("sort-dropdown");
    const label = trigger?.querySelector(".sort-label");
    const items = dropdown?.querySelectorAll(".sort-item");

    if (!trigger || !dropdown || !label || !items?.length) return;

    // Toggle open/close
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle("open");
      trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Select item
    items.forEach((item) => {
      item.addEventListener("click", () => {
        items.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        label.textContent = item.textContent;
        dropdown.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!sortWrap.contains(e.target)) {
        dropdown.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  };

  initShopSortDropdown();
  // =================== Shop Sort Dropdown Js End ===================

  // =================== [37] Price Filter Slider Js Start ===================
  const initPriceFilter = () => {
    const rangeMin = document.querySelector(".price-filter__range-min");
    const rangeMax = document.querySelector(".price-filter__range-max");
    const progress = document.querySelector(".price-filter__progress");
    const valMin = document.querySelector(".price-filter__val-min");
    const valMax = document.querySelector(".price-filter__val-max");

    if (!rangeMin || !rangeMax || !progress || !valMin || !valMax) return;

    let priceGap = 1;

    const updateSlider = (e) => {
      let minVal = parseInt(rangeMin.value);
      let maxVal = parseInt(rangeMax.value);

      if (maxVal - minVal < priceGap) {
        if (e && e.target === rangeMin) {
          rangeMin.value = maxVal - priceGap;
          minVal = parseInt(rangeMin.value);
        } else {
          rangeMax.value = minVal + priceGap;
          maxVal = parseInt(rangeMax.value);
        }
      }

      valMin.textContent = `$${minVal}`;
      valMax.textContent = `$${maxVal}`;

      const percent1 = (minVal / rangeMin.max) * 100;
      const percent2 = (maxVal / rangeMax.max) * 100;

      progress.style.left = percent1 + "%";
      progress.style.right = 100 - percent2 + "%";
    };

    rangeMin.addEventListener("input", updateSlider);
    rangeMax.addEventListener("input", updateSlider);

    updateSlider(); // Init
  };

  initPriceFilter();
  // =================== Price Filter Slider Js End ===================

  // =================== [38] Quantity Control Js Start ===================
  const initQuantityControl = () => {
    const qtyControls = document.querySelectorAll(".qty-control");

    qtyControls.forEach((control) => {
      const minusBtn = control.querySelector(".minus");
      const plusBtn = control.querySelector(".plus");
      const numberSpan = control.querySelector(".number-fill");

      if (!minusBtn || !plusBtn || !numberSpan) return;

      let currentValue = parseInt(numberSpan.textContent) || 1;

      minusBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentValue > 1) {
          currentValue--;
          numberSpan.textContent = currentValue;
        }
      });

      plusBtn.addEventListener("click", (e) => {
        e.preventDefault();
        currentValue++;
        numberSpan.textContent = currentValue;
      });
    });
  };

  initQuantityControl();
  // =================== Quantity Control Js End ===================


  // =================== [39] Related Products Slider Js Start ===================
  const initRelatedSlider = () => {
    const sliderEl = document.querySelector(".related-one__slider");
    const paginationEl = document.querySelector(
      ".related-one__slider-pagination",
    );

    if (!sliderEl) return;

    const swiperOptions = {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 1000,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      breakpoints: {
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: "auto",
          spaceBetween: 20,
        },
      },
    };

    if (paginationEl) {
      swiperOptions.pagination = {
        el: paginationEl,
        clickable: true,
      };
    }

    new Swiper(sliderEl, swiperOptions);
  };

  initRelatedSlider();
  // =================== Related Products Slider Js End ===================


  // =================== [40] Simple Parallax Js Start ===================
  const initSimpleParallax = () => {
    const elements = document.querySelectorAll(".parallax-img");

    if (!elements.length) return;

    elements.forEach((el) => {
      let img = null;

      if (el.tagName.toLowerCase() !== "img") {
        img = el.querySelector("img");
      } else {
        img = el;
      }

      if (!img) return;

      const orientation = el.dataset.orientation || "up";
      const scale = parseFloat(el.dataset.scale) || 1.4;

      new simpleParallax(img, {
        scale: scale,
        delay: 0.2,
        transition: "cubic-bezier(0,0,0,1)",
        orientation: orientation,
      });
    });
  };

  initSimpleParallax();
  // =================== Simple Parallax Js End ===================
  // =================== [41] Clip Path Anim Js Start ===================
  const initClipPathAnim = () => {
    const initialClipPaths = [
      "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
      "polygon(25% 0%, 25% 0%, 25% 0%, 25% 0%)",
      "polygon(50% 0%, 50% 0%, 50% 0%, 50% 0%)",
      "polygon(75% 0%, 75% 0%, 75% 0%, 75% 0%)",
      "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
      "polygon(25% 33.33%, 25% 33.33%, 25% 33.33%, 25% 33.33%)",
      "polygon(50% 33.33%, 50% 33.33%, 50% 33.33%, 50% 33.33%)",
      "polygon(75% 33.33%, 75% 33.33%, 75% 33.33%, 75% 33.33%)",
      "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
      "polygon(25% 66.66%, 25% 66.66%, 25% 66.66%, 25% 66.66%)",
      "polygon(50% 66.66%, 50% 66.66%, 50% 66.66%, 50% 66.66%)",
      "polygon(75% 66.66%, 75% 66.66%, 75% 66.66%, 75% 66.66%)",
    ];
    const finalClipPaths = [
      "polygon(0% 0%, 26% 0%, 26% 34.33%, 0% 34.33%)",
      "polygon(24% 0%, 51% 0%, 51% 34.33%, 24% 34.33%)",
      "polygon(49% 0%, 76% 0%, 76% 34.33%, 49% 34.33%)",
      "polygon(74% 0%, 100% 0%, 100% 34.33%, 74% 34.33%)",
      "polygon(0% 32.33%, 26% 32.33%, 26% 67.66%, 0% 67.66%)",
      "polygon(24% 32.33%, 51% 32.33%, 51% 67.66%, 24% 67.66%)",
      "polygon(49% 32.33%, 76% 32.33%, 76% 67.66%, 49% 67.66%)",
      "polygon(74% 32.33%, 100% 32.33%, 100% 67.66%, 74% 67.66%)",
      "polygon(0% 65.66%, 26% 65.66%, 26% 100%, 0% 100%)",
      "polygon(24% 65.66%, 51% 65.66%, 51% 100%, 24% 100%)",
      "polygon(49% 65.66%, 76% 65.66%, 76% 100%, 49% 100%)",
      "polygon(74% 65.66%, 100% 65.66%, 100% 100%, 74% 100%)",
    ];
    // Create mask divs for each wrapper
    document.querySelectorAll(".tw-clip-anim").forEach((wrapper) => {
      const img = wrapper.querySelector(".tw-anim-img[data-animate='true']");
      if (!img) return;
      const url = img.src;
      // Remove old masks if any (reuse safe)
      wrapper.querySelectorAll(".mask").forEach((m) => m.remove());
      for (let i = 0; i < 12; i++) {
        const mask = document.createElement("div");
        mask.className = `mask mask-${i + 1}`;
        Object.assign(mask.style, {
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          inset: "0",
        });
        wrapper.appendChild(mask);
      }
    });
    // Animate masks
    gsap.utils.toArray(".tw-clip-anim").forEach((wrapper) => {
      const masks = wrapper.querySelectorAll(".mask");
      if (!masks.length) return;
      gsap.set(masks, { clipPath: (i) => initialClipPaths[i] });
      const order = [
        [".mask-1"],
        [".mask-2", ".mask-5"],
        [".mask-3", ".mask-6", ".mask-9"],
        [".mask-4", ".mask-7", ".mask-10"],
        [".mask-8", ".mask-11"],
        [".mask-12"],
      ];
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: "top 90%", markers: false },
      });
      order.forEach((targets, i) => {
        const validTargets = targets
          .map((c) => wrapper.querySelector(c))
          .filter((el) => el);

        if (validTargets.length) {
          tl.to(
            validTargets,
            {
              clipPath: (j, el) =>
                finalClipPaths[Array.from(masks).indexOf(el)],
              duration: 1,
              ease: "power4.out",
              stagger: 0.1,
            },
            i * 0.125,
          );
        }
      });
    });
  };

  initClipPathAnim();
  // =================== Clip Path Anim Js End ===================

  // =================== [42] Hero Three Background Slider Start ===================
  const heroThreeBgSlider = () => {
    const sliderEl = document.querySelector(".hero-three__bg-slider");

    if (!sliderEl) return;

    new Swiper(sliderEl, {
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      speed: 2000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
    });
  };

  heroThreeBgSlider();
  // =================== Hero Three Background Slider end ===================


  jQuery(window).on('elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction(
      'frontend/element_ready/wpr-product-cat-slider.default',
      initCloudKitchenSlider
    );

    elementorFrontend.hooks.addAction(
      'frontend/element_ready/wpr-repeater-box.default',
      locationSliderActive
    );
  });
  
})(jQuery);
