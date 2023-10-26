const infList = document.querySelectorAll('.inf-list__wrapper');
const infGap = 20;
let infTimeout = 10;
let listTimeout = [];
if (infList.length > 0) {
    infList.forEach((list, index)=>{
        listTimeout[index] = infTimeout;
        let direction = -1
        list.addEventListener('mouseover', ()=>{
            listTimeout[index] = 40;
        })
        list.addEventListener('mouseout', ()=>{
            listTimeout[index] = infTimeout;
        })
        if (list.classList.contains('inf-list__wrapper_right')) {
            direction = 1;
        }
        let children = list.querySelectorAll('.item');
        let allWidth = (children[0].clientWidth + infGap) * children.length;
        //Клонируем сразу элементы
        cloneElements(list, direction);
        let distantion = 0;
        setTimeout(()=>{
            infPlay(distantion, list, allWidth, index, direction)
        }, listTimeout[index]);
    })
}

function cloneElements(el, direction) {
    let children = el.querySelectorAll('.item');
    children.forEach(c => {
        let newEl = c.cloneNode(true);
        if (direction == -1) {
            el.appendChild(newEl);
        } else {
            el.insertBefore(newEl, el[0]);
        }
        
    });
}

function infPlay(distantion, list, allWidth, index, direction) {
    distantion += 1*direction;
    list.style = `transform: translateX( ${distantion}px)`;
    if (Math.abs(distantion) > allWidth) {
        distantion = 0;
    }
    // console.log(index);
    // console.log(listTimeout[index]);
    setTimeout(()=>{
            infPlay(distantion, list, allWidth, index,direction)
        }, listTimeout[index]);
}


