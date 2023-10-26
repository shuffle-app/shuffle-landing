const accordionGal = document.querySelectorAll('.accordion-gallery');

if (accordionGal.length > 0) {
    accordionGal.forEach(gal=>{
        var item = gal.querySelectorAll('.item');
        item.forEach(i=>{
            i.addEventListener('click', ()=>{
                i.closest('.accordion-gallery').querySelectorAll('.item').forEach((e)=>{
                    e.classList.remove('active');
                })
                i.classList.add('active');
            })
        })
    })
}


