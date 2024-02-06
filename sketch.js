let gridSize = 800;
let DIM = 10;
const tileImages = [];

let tiles = [];
let grid = [];

function preload() {
  const path = './tiles/roads';
  for (let i = 0; i < 5; i++) {
    tileImages[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup(){
    createCanvas(gridSize, gridSize, document.getElementById("defaultCanvas0"));

    // Loaded and created the tiles
    tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA']);
    tiles[1] = new Tile(tileImages[1], ['ABA', 'ABA', 'ABA', 'ABA']);
    tiles[2] = new Tile(tileImages[2], ['ABA', 'ABA', 'AAA', 'ABA']);
    tiles[3] = new Tile(tileImages[3], ['AAA', 'ABA', 'AAA', 'ABA']);
    tiles[4] = new Tile(tileImages[4], ['ABA', 'ABA', 'AAA', 'AAA']);
    // // create rotated tiles
    const initialTilesLength = tiles.length;
    // start from 2. no point of rotating first 2 image
    for(let ti = 2 ; ti < initialTilesLength; ti++){
        //loop 3 rotation variant
         for(let r=1; r<4; r++){
            // rotate function return new obj
            const tileVariant = tiles[ti].rotate(r);
            tiles.push(tileVariant);
        }
    }

    // match Possible Edges
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        tile.matchPossibleEdges(tiles);
    }

    initGrid();
}

function initGrid() {
  DIM = Number(document.getElementById("dim").value) || DIM;
  console.log(`DIM: ${DIM}`);
  grid = [];
  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }

  loop();
}

function draw(){
    background(0);

    const w = width / DIM;
    const h = height / DIM;
    for (let j = 0; j < DIM; j++) {
      for (let i = 0; i < DIM; i++) {
        let cell = grid[i + j * DIM];
        if (cell.collapsed) {
          let index = cell.options[0];
          if(index === undefined){
            fill(255, 0 , 0);
            rect(i * w, j * h, w, h);
          }else{
            image(tiles[index].img, i * w, j * h, w, h);
          }
        } else {
          noFill();
          stroke(51);
          rect(i * w, j * h, w, h);
        }
      }
    }

    // Pick cell with least entropy
    gridCopy = grid.filter(a =>  a.collapsed === false);

    if (gridCopy.length == 0) {
        // we are finish!
        noLoop();
        return;
    }

    // sort by entropy
    gridCopy.sort((a, b) => {
        return a.options.length - b.options.length;
    });

    // get only items with min entropy
    const minEntropy = gridCopy[0].options.length;
    gridCopy = gridCopy.filter(a => a.options.length <= minEntropy);

    // pick random cell (from min entropy array)
    const cell = random(gridCopy);
    cell.collapsed = true;

    // pick random option (of picked cell)
    const optionPick = random(cell.options);
    cell.options = [optionPick];

    // find cell pick grid index 
    let index = 0;
    for(item of grid){
        if(item === cell){
            break;
        }
        index++;
    }

    // update neighbors option
    let ti = index - DIM;// top ondex
    if(ti >= 0){
        if(!grid[ti].collapsed){
            grid[ti].options = grid[ti].options.filter(o => tiles[o].down.includes(optionPick));;
        }
    }
    
     let li = index - 1; //left
     if(li >= 0){
        if(!grid[li].collapsed){
            grid[li].options = grid[li].options.filter(o => tiles[o].right.includes(optionPick));;
        }
     }
    
     let ri = index + 1;// right
     if(ri < DIM * DIM){
        if(!grid[ri].collapsed){
            grid[ri].options = grid[ri].options.filter(o => tiles[o].left.includes(optionPick));;
        }
     }
    
     let bi = index + DIM;// bottom
     if(bi < DIM * DIM){
        if(!grid[bi].collapsed){
            grid[bi].options = grid[bi].options.filter(o => tiles[o].up.includes(optionPick));;
        }1
     }
}

function validateDim(evt){
  if(evt.target.value === undefined || evt.target.value < 5 || evt.target.value > 100){
    evt.target.value = DIM;
  }
}