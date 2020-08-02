var cols = 25;
var rows = 25;

var w, h;

var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var done = false;
var winner = 0;

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
		this.f = 0;
		this.g = 0;
		this.h = 0;
		this.previous = undefined;
		this.neighbours = [];
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
	createCanvas(400, 400);

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
	end = grid[cols - 1][rows - 1];

	openSet.push(start);

	console.log(grid);
}

function draw() {
	if (openSet.length > 0 && done == false) {
		for (let i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[winner].f) {
				winner = i;

			}
		}
		var current = openSet[winner];

		if (openSet[winner] == end) {
			done = true;
			console.log("done!");
		} else {
			removeFromArray(openSet, current);
			closedSet.push(current);

			var neighbours = current.neighbours;
			for (let i = 0; i < neighbours.length; i++) {

				var neighbour = neighbours[i];
				if (!closedSet.includes(neighbour)) {
					var tempG = current.g + 1;
					if (openSet.includes(neighbour)) {
						if (tempG < neighbour.g) {
							neighbour.g = tempG;
						}
					} else {
						neighbour.g = tempG;
						openSet.push(neighbour);
					}

					neighbour.g = heuristics(neighbour, end);
					neighbour.f = neighbour.g + neighbour.h;
					neighbour.previous = current;

				}
			}
		}
	} else {
		//console.log("error wala finish");
	}



	//Drawing stuff
	background(0);
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			grid[i][j].show(color(244));
		}
	}
	for (let i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(244, 0, 0));
	}
	for (let i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0, 255, 0));
	}
}