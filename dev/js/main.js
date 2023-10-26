//BG
// function showBg(e){
     
// 	if (e.key == "H") {
// 		document.body.classList.toggle("bg");
// 	}
    
// }
 
// addEventListener("keydown", showBg);




//Lazy Load
  // Set the options globally
  // to make LazyLoad self-initialize
  window.lazyLoadOptions = {
    //use_native: true
  };
  // Listen to the initialization event
  // and get the instance of LazyLoad
  // window.addEventListener(
  //   "LazyLoad::Initialized",
  //   function (event) {
  //   	console.log('Lazy');
  //     window.lazyLoadInstance = event.detail.instance;
  //   },
  //   false
  // );
window.addEventListener("load", function(event) {
	//console.log('lazy');
	// window.lazyLoadInstance = event.detail.instance;
	var lazyLoadInstance = new LazyLoad({
	  // Your custom settings go here
	});
//LOTTIE AMNIMATION
const animation = lottie.loadAnimation({
	container: document.getElementById('shuffle-logo'), // контейнер для анимации
	renderer: 'svg', // тип рендерера (может быть 'svg', 'canvas' или 'html')
	loop: true, // зацикливание анимации
	autoplay: true, // автоматический запуск анимации
	path: 'js/libs/shuffle-logo.json' // путь к вашему JSON-файлу с анимацией
  });
  animation.setSpeed(0.5)
	// new VenoBox({
	//     selector: ".venobox"
	// });
	
});


//SWIPERS
var swiper = new Swiper(".panel-slider", {
	spaceBetween: 16,
	centeredSlides: true,
	// speed:3000,
	slidesPerView: 'auto',
	// loop: true,
	// loopedSlides:1,
	initialSlide: 1,
	// touchMoveStopPropagation: true,
	// autoplay: {
	//   delay: 0,
	// //   disableOnInteraction: false,
	// //   pauseOnMouseEnter: true,
	// 	waitForTransition: true,
	// },
	// freeMode: true,
	pagination: {
	  el: ".swiper-pagination",
	  clickable: true,
	},
	// navigation: {
	//   nextEl: ".swiper-slide-next",
	//   prevEl: ".swiper-slide-prev",
	// },

  });

  const panelSlides = document.querySelectorAll('.panel-slider .swiper-slide');
  if (panelSlides) {
	panelSlides.forEach((sl,index)=>{
		sl.addEventListener('click', ()=>{
			swiper.slideTo(index, 300)
		})
	})
  }
  