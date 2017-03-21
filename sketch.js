var cells = []
const cellwidth = 10
var rounds = 0
var maxAlive = 0

function setup () {
  createCanvas(windowWidth, windowHeight)
  frameRate(10)
  colorMode(HSB, 100)
  // init cells
  for (let x = 0; x < width / cellwidth; x++) {
    var row = []
    for (let y = 0; y < height / cellwidth; y++) {
      row.push(new Cell(x, y, cellwidth))
    }
    cells.push(row)
  }

  console.clear()
  console.log('Hi there!🙌')
  console.log('Welcome to this implementation of Conway\'s Game of Life.')
  console.log('This is based on code by splintah: https://www.github.com/splintah')

}

function draw () {
    background(0)
    
    // drawing properties
    fill(255)
    noStroke()
    
    if (rounds > 1000) {
        endScreen()
        console.log("Game is finshed, round "+rounds);
    }
    else {
        display()
        calculateNeighbours()
        update()
    }
}

function display() {
  // display
  for (let x = 1; x < width / cellwidth - 1; x++) {
    for (let y = 1; y < height / cellwidth - 1; y++) {
      cells[x][y].display()
      cells[x][y].neighbours = 0
    }
  }
}

function calculateNeighbours() {
  for (let x = 1; x < (width / cellwidth) - 1; x++) {
    for (let y = 1; y < (height / cellwidth) - 1; y++) {
      //cells[x][y].neigbours = 0
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x + i > 0 && x + i <= width / cellwidth && y + j > 0 && y + j <= height / cellwidth) {
            if (cells[x + i][y + j].alive) {
              cells[x][y].neighbours++
            }
          }
        }
      }
      // remove neighbour because the cell itself is counted as one
      if (cells[x][y].alive) {
        cells[x][y].neighbours--
      }
    }
  }
}

function update() {
  // update cells
  for (let x = 0; x < (width / cellwidth); x++) {
    for (let y = 0; y < (height / cellwidth); y++) {
      if (cells[x][y].alive && cells[x][y].neighbours < 2) {
        cells[x][y].kill()
      } else if (cells[x][y].alive && cells[x][y].neighbours === 2 || cells[x][y].neighbours === 3) {
        cells[x][y].live()
      } else if (cells[x][y].alive && cells[x][y].neighbours > 3) {
        cells[x][y].kill()
      } else if (!cells[x][y].alive && cells[x][y].neighbours === 3) {
        cells[x][y].live()
      }
    }
  }
  
  rounds++
}

function endScreen() {
    for (let x = 0; x < (width / cellwidth); x++) {
        for (let y = 0; y < (height / cellwidth); y++) {
            cells[x][y].calculateColor()
        }
    }
}



function Cell (x, y, cellwidth) {
  this.x = x * cellwidth
  this.y = y * cellwidth
  this.neighbours = 0
  this.alive = true
  this.deadCounter = 0
  this.aliveCounter = 0

  var chance = round(random(0, 2))
  if (chance === 1) {
    this.alive = true
  } else {
    this.alive = false
  }

  this.display = function () {
    if (this.alive === true) {
      rect(this.x, this.y, 10, 10)
    }
  }

  this.kill = function () {
    this.alive = false
    this.deadCounter++
  }

  this.live = function () {
    this.alive = true
    this.aliveCounter++
    if (this.aliveCounter > maxAlive) {maxAlive = this.aliveCounter}
  }
  
  this.calculateColor = function () {
    var percentageAlive = this.aliveCounter / ((this.deadCounter + this.aliveCounter) - maxAlive) * 100 
    fill(percentageAlive, 100, 100)
    rect(this.x, this.y, cellwidth, cellwidth)
    }
}
