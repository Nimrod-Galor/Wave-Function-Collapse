const DIM = 10;
const tileImages = [];

let tiles = [];
let grid = [];

function preload() {
  const path = './tiles/roads';
  for (let i = 0; i < 8; i++) {
    tileImages[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup(){
    createCanvas(800, 800);

    // Loaded and created the tiles
    tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA']);
    tiles[1] = new Tile(tileImages[1], ['ABA', 'ABA', 'AAA', 'ABA']);
    tiles[2] = new Tile(tileImages[2], ['ABA', 'ABA', 'ABA', 'AAA']);
    tiles[3] = new Tile(tileImages[3], ['AAA', 'ABA', 'ABA', 'ABA']);
    tiles[4] = new Tile(tileImages[4], ['ABA', 'AAA', 'ABA', 'ABA']);
    tiles[5] = new Tile(tileImages[5], ['ABA', 'ABA', 'ABA', 'ABA']);
    tiles[6] = new Tile(tileImages[6], ['AAA', 'ABA', 'AAA', 'ABA']);
    tiles[7] = new Tile(tileImages[7], ['ABA', 'AAA', 'ABA', 'AAA']);

    // // create rotated tiles
    // const initialTilesLength = tiles.length;
    // // start from 1. no point of rotating first image
    // for(let ti = 1 ; ti < initialTilesLength; ti++){
    //     //loop 3 rotation variant
    //      for(let r=1; r<4; r++){
    //         // rotate function return new obj
    //         const tileVariant = tiles[ti].rotate(r);
    //         tiles.push(tileVariant);
    //     }
    // }

    // match Possible Edges
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        tile.matchPossibleEdges(tiles);
    }
    
    console.log(tiles);

    initGrid();
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
    let gridCopy = grid.slice();
    gridCopy = gridCopy.filter((a) => !a.collapsed);
    // console.table(grid);
    // console.table(gridCopy);

    if (gridCopy.length == 0) {
        // we are finish!
        noLoop();
        return;
    }

    // sort by entropy
    gridCopy.sort((a, b) => {
        return a.options.length - b.options.length;
    });

    // remove items with more entropy
    let minEntropy = gridCopy[0].options.length;
    gridCopy = gridCopy.filter(a => {
        return a.options.length <= minEntropy;
    });

    // pick random cell (from min entropy arr)
    const cell = random(gridCopy);
    cell.collapsed = true;

    // pick random option (of picked cell)
    const optionPick = random(cell.options);
    //??????
    // if (pick === undefined) {
    //     startOver();
    //     return;
    // }
    cell.options = [optionPick];

    // find cell index
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
        try{
            grid[ti].options = grid[ti].options.filter(o => tiles[o].down.includes(optionPick));
        }catch(err){
            console.log(`ti: ${ti} optionPick: ${optionPick} cell.options: ${cell.options}`)
        }
    }
    
     let li = index - 1; //left
     if(li >= 0){
        try{
            grid[li].options = grid[li].options.filter(o => tiles[o].right.includes(optionPick));
        }catch(err){
            console.log(`li: ${li} optionPick: ${optionPick} cell.options: ${cell.options}`)
        }
     }
    
     let ri = index + 1;// right
     if(ri < DIM * DIM){
        try{
            grid[ri].options = grid[ri].options.filter(o => tiles[o].left.includes(optionPick));
        }catch(err){
            console.log(`ri: ${ri} optionPick: ${optionPick} cell.options: ${cell.options}`)
        }
     }
    
     let bi = index + DIM;// bottom
     if(bi < DIM * DIM){
        try{
            grid[bi].options = grid[bi].options.filter(o => tiles[o].up.includes(optionPick));
        }catch(err){
            console.log(`bi: ${bi} optionPick: ${optionPick} cell.options: ${cell.options}`)
        }
     }

}


function initGrid() {
    // Create cell for each spot on the grid
    for (let i = 0; i < DIM * DIM; i++) {
        grid[i] = new Cell(tiles.length);
    }
}