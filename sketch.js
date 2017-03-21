var cells = []
const cellwidth = 10

function setup () {
  createCanvas(windowWidth, windowHeight)
  frameRate(10)
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
  console.log('This is created by splintah: https://www.github.com/splintah')

}

function draw () {
  background(0)

  // drawing properties
  fill(255)
  noStroke()

  // display
  for (let x = 1; x < width / cellwidth - 1; x++) {
    for (let y = 1; y < height / cellwidth - 1; y++) {
      cells[x][y].display()
      // reset neighbours
      cells[x][y].neighbours = 0
    }
  }

  for (let x = 1; x < (width / cellwidth) - 1; x++) {
    for (let y = 1; y < (height / cellwidth) - 1; y++) {
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
}

function Cell (x, y, cellwidth) {
  this.x = x * cellwidth
  this.y = y * cellwidth
  this.neighbours = 0
  this.alive = true

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
  }

  this.live = function () {
    this.alive = true
  }
}
