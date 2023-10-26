var whyEls = document.querySelectorAll('.why__item.animate');

if (whyEls.length > 0) {
    const observer = new IntersectionObserver(scrollTracking, {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      });
      whyEls.forEach(e=>{
            observer.observe(e);
      })
      
}

function scrollTracking(entries) {
    var i = 0;
  for (const entry of entries) {
    if (entry.target.classList.contains('animate') && entry.intersectionRatio > 0.6) {
        i++;
        // console.log(entry.intersectionRatio);
        // console.log(i);
        showWhyEl(entry.target,i);
        // whyBg.classList.add('collapsed');
        // setTimeout(function(){
        //     whyBg.style.zIndex = -1;
        // }, 900);
    }
  }
}

function showWhyEl(obj, index) {
    setTimeout(function(){
        obj.classList.add('a-1');
    }, 600 * (index + 1) - 500);
    setTimeout(function(){
        obj.classList.add('a-2');
        }, 600 * (index + 1) + 200);
    setTimeout(function(){
        obj.classList.remove('a-hidden');
        obj.classList.remove('a-1');
        obj.classList.remove('a-2');
        obj.classList.remove('animate');
        whyEls = document.querySelectorAll('.why__item.animate');
        }, 600 * (index + 2) + 100);
}

// Определяем функцию задержки в которую передаем время
// const delay = (time) => {
//     return new Promise((resolve, reject) => setTimeout(resolve, time))
//  }
if (whyEls) {

    // whyEls.forEach(function(obj, index) {
    //     setTimeout(function(){
    //       obj.classList.add('a-1');
    //     }, 600 * (index + 1) - 300);
    //     setTimeout(function(){
    //         obj.classList.add('a-2');
    //       }, 600 * (index + 1) + 200);
    //     setTimeout(function(){
    //         obj.classList.remove('a-hidden');
    //         obj.classList.remove('a-1');
    //         obj.classList.remove('a-2');
    //       }, 600 * (index + 2) + 100);
    // });

}

// 300 a1      900
// 800 a2      1400    2000
// 1300 none   1900    2500