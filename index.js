let arr = [];
let bwidth = 25;
let bheight = 25;
var cnv;
function setup() {
	cnv = createCanvas(1800, 1200);
	var x = (windowWidth - width) / 2;
	cnv.position(x, 0);
	//background(255, 255, 255);
	button = createButton('Start Algorithm');
	button.position((windowWidth / 2) - 50, 65);
	button.mousePressed(startAstarAlgo);

	for (let i = 0; i < 1225; i++) { //should be a perfect square
		arr.push(i);
	}

}

function draw() {
	background(220);
	textAlign(CENTER, CENTER);
	let rowlen = sqrt(arr.length);
	let xoffset = (cnv.width / 2) - (bwidth * rowlen) / 2;
	let yoffset = (cnv.height / 2) - (bheight * rowlen) / 2;
	for (let y = 0; y < rowlen; y++) {
		for (let x = 0; x < rowlen; x++) {
			let xpos = (x * bwidth) + xoffset;
			let ypos = (y * bheight) + yoffset;

			let index = y * rowlen + x;

			if (inside(xpos, ypos, bwidth, bheight)) {
				// were inside
				fill(255, 0, 0);
			} else {
				// not inside
				fill(255);
			}
			//rectMode(CENTER);
			//stroke(0);
			rect(xpos, ypos, bwidth, bheight);
			fill(0);
			//noStroke();
			//text(arr[index], xpos, ypos, bwidth, bheight);
			colorMode(RGB);
		}
	}

	colorMode(RGB);

}


function inside(x, y, w, h) {
	if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
		return true;
	} else {
		return false;
	}
}

function startAstarAlgo() {

}