var swiperEventsMain = new Swiper(".phglr", {
    
    spaceBetween: 30,
    initialSlide:1,
    // loop: true,
    centeredSlides:true,
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
                slidesPerView: 1.6,
                spaceBetween: 16,
                // initialSlide:1,
            },
            // 380: {
            //     slidesPerView: 1.8,
            //     spaceBetween: 16,
            //     // initialSlide:1,
            // },

            // 470: {
            //     slidesPerView: 2.2,
            //     spaceBetween: 16,
            // },
            310: {
                slidesPerView: 2.5,
                spaceBetween: 16,
            },
            655: {
                slidesPerView: 2.45,
            },
            768: {
                slidesPerView: 3,
            }
          }
  });