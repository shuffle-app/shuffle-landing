var swiperEventsMain = new Swiper(".features", {
    
    slidesPerView: 4,
    // initialSlide:1,
    slideClass: 'item',
    spaceBetween: 32,
    // loop: true,
    // centeredSlides:true,
    // effect: "creative",
    // creativeEffect: {
    //     prev: {
    //         translate: ['-77.5%',-40,-400], //([horizontal, vertical, depth])
    //     },
    //     next: {
    //         translate: ['77.5%',-40,-400], //([horizontal, vertical, depth])
    //     },
    // },




    //   pagination: {
    //   el: '.pagination_dots .dots',
    //         clickable: true,
    //       renderBullet: function (index, className) {
    //           return '<span class="' + className + '"></span>';
    //       },
    //   },
    //   navigation: {
    //       nextEl: ".events_main .events .btn_prev",
    //       prevEl: ".events_main .events .btn_next"
    //     },

        breakpoints: {
            // when window width is >= 320px
            300: {
                slidesPerView: 'auto',
                // initialSlide:1,
            },
            // 400: {
            //     slidesPerView: 3,
            //     spaceBetween: 16,
            //     initialSlide:1,
            // },
            1400: {
                slidesPerView: 4,
            }
          }
  });