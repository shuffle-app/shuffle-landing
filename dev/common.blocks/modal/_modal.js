const openModalBtns = document.querySelectorAll('.open-modal');
const overlay = document.querySelector('.overlay')
if (openModalBtns) {
    openModalBtns.forEach(btn=>{
        btn.addEventListener('click', (e)=>{
            e.preventDefault();
            let target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('opened');
            showOverlay();
        })
    })
}
const closeModalBtns = document.querySelectorAll('.modal__close');

if (closeModalBtns) {
    closeModalBtns.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            btn.closest('.modal').classList.remove('opened');
            hideOverlay();
            // document.getElementById(target).classList.add('opened');
        })
    })
}
function showOverlay(){
    overlay.classList.add('opened');
}
function hideOverlay(){
    overlay.classList.remove('opened');
}