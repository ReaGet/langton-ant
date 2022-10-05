class Grid {
  constructor(size) {
    this.size = size;
    this.grid = [];
    // this.x = ~~(Math.random() * this.size);
    // this.y = ~~(Math.random() * this.size);
    this.x = ~~(size / 2);
    this.y = ~~(size / 2);
    this.deg = 0;

    this.create();
    this.grid[this.y][this.x] = true;
  }
  create() {
    for (let y = 0; y < this.size; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.size; x++) {
        this.grid[y].push(false)
      }
    }
  }
  update() {
    const currentCell = this.grid[this.y][this.x];
    if (currentCell) {
      this.grid[this.y][this.x] = false;
      this.deg -= 90;
    } else {
      this.grid[this.y][this.x] = true;
      this.deg += 90;
    }

    // this.grid[this.y][this.x] = !this.currentCell;
    // this.move = Math.max(0, Math.min(3, this.move));
    // if (this.move < 0)
    //   this.move = 3;
    // if (this.move > 3)
    //   this.move = 0;

    // console.log(this.move)

    // switch(this.move) {
    //   case 0:
    //     this.x -= 1;
    //     break;
    //   case 1:
    //     this.y -= 1;
    //     break;
    //   case 2:
    //     this.x += 1;
    //     break;
    //   case 3:
    //     this.y += 1;
    //     break;
    // }

    this.x += Math.cos(this.deg*(Math.PI/180));
    this.y += Math.sin(this.deg*(Math.PI/180));

    this.deg %= 360;

    // console.log(this.y, this.x, this.deg)

    // this.x = Math.max(0, Math.min(this.size - 1, this.x));
    // this.y = Math.max(0, Math.min(this.size - 1, this.y));

    if (this.x < 0) this.x = this.size - 1;
    if (this.x > this.size - 1) this.x = 0;
    if (this.y < 0) this.y = this.size - 1;
    if (this.y > this.size - 1) this.y = 0;

  }
}

const canvas = document.querySelector('canvas'),
  ctx = canvas.getContext('2d'),
  COUNT = 100;

const W = canvas.width = 360,
      H = canvas.height = 480;
  
const cellSize = W / COUNT;
let iterations = 0;

const grid = new Grid(COUNT);

function loop() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, W, H);

  grid.update();

  for (let y = 0; y < grid.grid.length; y++) {
    const row = grid.grid[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      ctx.fillStyle = cell ? '#000' : '#fff';
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(grid.x * cellSize, grid.y * cellSize, cellSize, cellSize);

  iterations += 1;
  ctx.font = 'Arial 14px';
  ctx.fillStyle = '#000';
  ctx.fillText(`Iterations: ${iterations}`, 10, 20)
}

setInterval(loop, 1000 / 60);