//Relations
const SVG_NS = 'http://www.w3.org/2000/svg';
// let mainBox = bubbles.getBoundingClientRect();
let svg = document.getElementById('bubbles_svg');
svg.setAttributeNS(null,"viewBox",'0 0 '+svg.clientWidth +' '+svg.clientHeight);
let dots = Array.from(document.querySelectorAll("#bubbles .dot[data-target]"));
let dotsAll = Array.from(document.querySelectorAll("#bubbles .dot"));
let dotsContainer = document.getElementById('bubbles');

function createRelations(){//Создаем "связи между объектами"
	dots.forEach(d=>{
		let targetBox = document.querySelector('#'+d.getAttribute('data-target'));

        let a = getCoords(d);
        let b = getCoords(targetBox);
		drawConnectorStraight(a,b, d.getAttribute('id'), d.getAttribute('data-target'));
	})
}
function getCoords(el){//Получаем координаты конкретной точки, для обновления пути
	// расчёт  x и y координат для контактных разъемов на блоках числом от 0 до 100 
	let x = el.offsetLeft + el.clientWidth/2;
	let y = el.offsetTop + el.clientHeight/2;
	return {'x':x,'y':y};
}
//РИСУЕМ СОЕДИНЯЮЩИЕ ПРЯМЫЕ ЛИНИИ
function drawConnectorStraight(a,b, start, finish){//Рисуем path, соединяющие точки
  let path = document.createElementNS(SVG_NS, 'path');
//   C - искривление
//   let d = `M${a.x},${a.y} C ${a.x} ${a.y}, ${a.x + 50} ${a.y + 50}, ${b.x},${b.y} L${b.x} ${b.y}`;
  let d = mapPath(a,b);
  
  path.setAttributeNS(null,"d",d);
  let letgth = path.getTotalLength();
  path.setAttributeNS(null,"data-start",start);
  path.setAttributeNS(null,"data-end",finish);
  path.setAttributeNS(null,"letgth",letgth);
  svg.appendChild(path);
  //рисуем такой же путь, который для фона
//   let path2 = document.createElementNS(SVG_NS, 'path');
//   path2.setAttributeNS(null,"d",d);
//   path2.setAttributeNS(null,"data-start",start);
//   path2.setAttributeNS(null,"data-end",finish);
//   path2.setAttributeNS(null,"class","light");
//   path2.setAttributeNS(null,"stroke-dasharray",letgth);
//   path2.setAttributeNS(null,"stroke-dashoffset",letgth);
//   path2.setAttributeNS(null,"stroke","url(#path_gradient)");
//   svg.appendChild(path2)
}
function mapPath(a, b) {
	// return `M${a.x},${a.y} C ${a.x + 50} ${a.y + 50}, ${b.x + 100} ${b.y + 50}, ${b.x},${b.y} L${b.x} ${b.y}`;
	return `M${a.x},${a.y} L${b.x} ${b.y}`;
}
if (dots) {
	createRelations();
}
//РИСУЕМ СОЕДИНЯЮЩИЕ КРИВЫЕ ЛИНИИ
// function drawConnector(a,b, start, finish){//Рисуем path, соединяющие точки
//   let path = document.createElementNS(SVG_NS, 'path');
//   let d = `M${a.x},${a.y} C50,${a.y} 50 ${b.y} ${b.x} ${b.y}`;
//   path.setAttributeNS(null,"d",d);
//   path.setAttributeNS(null,"data-start",start);
//   path.setAttributeNS(null,"data-end",finish);
//   svg.appendChild(path)
// }
// if (dots) {
// 	createRelations();
// }

// CHANGE PATH FOR FLOATING BUBBLES
setInterval(changePath, 100);

function changePath(){
	var paths = document.querySelectorAll('#bubbles_svg path:not(.light)');
	paths.forEach((p)=>{
        let a = dotsContainer.querySelector('#'+p.getAttribute('data-start'));
        let b = dotsContainer.querySelector('#'+p.getAttribute('data-end'));
		a = getCoords(a);
		b = getCoords(b);
		let d = mapPath(a,b);
		p.setAttributeNS(null,"d",d);
		// p.setAttributeNS(null,"fill",'red');
		// p.setAttributeNS(null,"stroke",'green');

		
	})
	//Обновляем и анимируем пути
	// var pathsLight = document.querySelectorAll('#bubbles_svg path.light');
	// pathsLight.forEach((p)=>{
    //     let a = dotsContainer.querySelector('#'+p.getAttribute('data-start'));
    //     let b = dotsContainer.querySelector('#'+p.getAttribute('data-end'));
	// 	a = getCoords(a);
	// 	b = getCoords(b);
	// 	let d = mapPath(a,b);
	// 	p.setAttributeNS(null,"d",d);
	// 	let letgth = p.getTotalLength();
	// })
}

// setInterval(animatePath, 1000);
// function animatePath(){
// 	//Обновляем и анимируем пути
// 	var pathsLight = document.querySelectorAll('#bubbles_svg path.light');
// 	pathsLight.forEach((p)=>{
// 		let letgth = p.getTotalLength();
// 		p.setAttributeNS(null,"class","light");
// 		p.setAttributeNS(null,"stroke-dashoffset",letgth);
// 		setTimeout(()=>{
// 			p.setAttributeNS(null,"class","light animated");
// 			p.setAttributeNS(null,"stroke-dashoffset",-letgth);
// 					},Math.random() * 2000)
		
//         // let a = dotsContainer.querySelector('#'+p.getAttribute('data-start'));
//         // let b = dotsContainer.querySelector('#'+p.getAttribute('data-end'));
// 		// a = getCoords(a);
// 		// b = getCoords(b);
// 		// let d = mapPath(a,b);
// 		// p.setAttributeNS(null,"d",d);
		
// 		// p.setAttributeNS(null,"data-start",start);
// 		// p.setAttributeNS(null,"data-end",finish);
// 		// p.setAttributeNS(null,"class","light");
// 		// p.setAttributeNS(null,"stroke-dasharray",letgth);
		

// 	})
// }
// FLOAT BUBBLES
setInterval(function() { floatBlocks(dotsAll) }, 2000);

function floatBlocks(dots){
	dots.forEach(d=>{
		// let dcoord = d.getBoundingClientRect();
		setTimeout(()=>{
			let x = Math.random() * 30 -15;
			let y =Math.random() * 30 -15;
			d.style.transform = `translate(${x}px,${y}px)`;
		},Math.random() * 1000)
		
		// d.style.transform = "translate(10px,10px)";

	})
}