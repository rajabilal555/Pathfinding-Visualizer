var cols = 50;
var rows = 50;

var w, h;

var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var done = false;
var current;
//var winner = 0;
var started = false;


const Colors = {
	Normal: (0, 255, 0),
	Wall: (244, 255, 0),
	Start: (0, 255, 0),
	End: (0, 255, 0)
};

function removeFromArray(arr, el) {
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] = el) {
			arr.splice(i, 1);
		}
	}
}

function heuristics(a, b) {
	var d = dist(a.x, a.y, b.x, b.y);
	return d;
}

class Cell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.f = 0; //g+h
		this.g = 0;
		this.h = 0;
		this.previous = undefined;
		this.neighbours = [];
		this.isWall = false;
	}

	addNeighbours(grid) {
		if (this.x < cols - 1)
			this.neighbours.push(grid[this.x + 1][this.y]);
		if (this.x > 0)
			this.neighbours.push(grid[this.x - 1][this.y]);
		if (this.y < rows - 1)
			this.neighbours.push(grid[this.x][this.y + 1]);
		if (this.y > 0)
			this.neighbours.push(grid[this.x][this.y - 1]);
	}

	show(col) {
		fill(col);
		stroke(0);
		rect(this.x * w, this.y * h, w, h)
	}

}

function setup() {
	createCanvas(600, 600);

	button = createButton('START');
	button.position(650, 80);
	button.mousePressed(() => { started = true; });

	w = width / cols;
	h = height / rows;

	for (let i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
		for (let j = 0; j < rows; j++) {
			grid[i][j] = new Cell(i, j);
		}
	}
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].addNeighbours(grid)
		}
	}
	start = grid[0][0];
	//start.type = CellType.Start;
	end = grid[cols - 1][rows - 1];
	//end.type = CellType.End;

	for (let i = 0; i < 80; i++) {
		ranx = Math.ceil(random(20, cols - 2));
		rany = Math.ceil(random(20, rows - 2));
		grid[ranx][rany].isWall = true;
	}

	openSet.push(start);

	console.log(grid);
}

function draw() {
	//Draw is already a loop so no need for a while loop
	if (openSet.length > 0 && done == false && started) {
		var winner = 0;
		for (let i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[winner].f) {
				winner = i;
			}
		}
		current = openSet[winner];
		if (current == end) {
			removeFromArray(openSet, current);
			closedSet.push(current);
			done = true;
			console.log("Done!");
		} else {
			removeFromArray(openSet, current);
			closedSet.push(current);

			var neighbours = current.neighbours;
			for (let i = 0; i < neighbours.length; i++) {

				var neighbour = neighbours[i];

				if (!closedSet.includes(neighbour) && !neighbour.isWall) {

					var tempG = current.g + heuristics(neighbour, current);
					if (openSet.includes(neighbour)) {
						if (tempG < neighbour.g) {
							neighbour.g = tempG;
							neighbour.h = heuristics(neighbour, end);
							neighbour.f = neighbour.g + neighbour.h;
							neighbour.previous = current;
						}
					} else {
						neighbour.g = tempG;
						neighbour.h = heuristics(neighbour, end);
						neighbour.f = neighbour.g + neighbour.h;
						neighbour.previous = current;
						openSet.push(neighbour);
					}


				}
			}
		}
	} else {
		//Not processing
	}



	//Drawing stuff
	background(255);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (grid[i][j].isWall) {
				grid[i][j].show(color(44));
			} else {
				grid[i][j].show(color(244));
			}
		}
	}
	for (let i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(244, 0, 0));
	}
	for (let i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0, 255, 0));
	}
	if (done) {
		path = [];
		var temp = current;
		path.push(temp);
		while (temp.previous) {
			path.push(temp.previous);
			temp = temp.previous;
		}

		noFill();
		stroke(255, 0, 200);
		strokeWeight(w / 3);
		beginShape();
		for (var i = 0; i < path.length; i++) {
			vertex(path[i].x * w + w / 2, path[i].y * h + h / 2);
		}
		endShape();
		strokeWeight(1);
	}
}