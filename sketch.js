let gridSize = 800;
let DIM = 10;
let tileImages = [];
let tiles = [];
let grid = [];

function windowResized() {
  gridSize = Math.min(800, windowWidth * 0.6);
  if(windowWidth <= 600){
    gridSize = windowWidth * 0.9;
  }
  console.log(`win resize grid size: ${gridSize}`);
  resizeCanvas(gridSize, gridSize);
}

function preload(cb) {
  const selectedTemplate = templateTailes.selectedTemplate;
  const path = templateTailes[selectedTemplate].path;
  const numOfTiles = templateTailes[selectedTemplate].numOfTiles;
  tileImages = [];
  // load images
  for (let i = 0; i < numOfTiles; i++) {
    tileImages[i] = loadImage(`${path}/${i}.png`, cb);
  }
}

function setup(){
  gridSize = Math.min(800, windowWidth);
  createCanvas(gridSize, gridSize, document.getElementById("defaultCanvas0"));

  initGrid();
}

function initGrid() {
  DIM = Number(document.getElementById("dim").value) || DIM;
  console.log(`DIM: ${DIM}`);

  // Loaded and created the tiles
  tiles = generateTiles(templateTailes.selectedTemplate);

  grid = [];
  // Create cell for each spot on the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }

  loop();
}

function generateTiles(selectedTemplate){
  // Loaded and created the tiles
  let tmpTiles = [];
  for(let i=0; i < templateTailes[selectedTemplate].numOfTiles; i++){
    tmpTiles[i] = new Tile(tileImages[i], templateTailes[selectedTemplate].edges[i]);
  }

  // // create rotated tiles
  const initialTilesLength = tmpTiles.length;
  // start from 2. no point of rotating first 2 image
  for(let ti = templateTailes[selectedTemplate].rotateStartIndex ; ti < initialTilesLength; ti++){
      //loop 3 rotation variant
       for(let r=1; r<4; r++){
          // rotate function return new obj
          const tileVariant = tmpTiles[ti].rotate(r);
          tmpTiles.push(tileVariant);
      }
  }

  // match Possible Edges
  for (let i = 0; i < tmpTiles.length; i++) {
      const tile = tmpTiles[i];
      tile.matchPossibleEdges(tmpTiles);
  }

  return tmpTiles;
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
          if(cell.options.length > 1){
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
    if(ti < 0){
      ti += DIM * DIM;
    }

    if(!grid[ti].collapsed){
      grid[ti].options = grid[ti].options.filter(o => tiles[o].down.includes(optionPick));
      if(grid[ti].options.length === 0){
        grid[ti].options = getArrayRange(0, tiles.length);
        grid[ti].collapsed = true;
      }
    }

    let li = index % DIM === 0 ? index - 1 + DIM : index - 1; //left
    
    if(!grid[li].collapsed){
      grid[li].options = grid[li].options.filter(o => tiles[o].right.includes(optionPick));
      if(grid[li].options.length === 0){
        grid[li].options = getArrayRange(0, tiles.length);
        grid[li].collapsed = true;
      }
    }

    let ri = (index + 1) % DIM === 0 ? index + 1 - DIM : index + 1;// right

    if(!grid[ri].collapsed){
      grid[ri].options = grid[ri].options.filter(o => tiles[o].left.includes(optionPick));
      if(grid[ri].options.length === 0){
        grid[ri].options = getArrayRange(0, tiles.length);
        grid[ri].collapsed = true;
      }
    }

    let bi = index + DIM;// bottom
    if(bi >= DIM * DIM){
      bi = bi - DIM * DIM;
    }

    if(!grid[bi].collapsed){
      grid[bi].options = grid[bi].options.filter(o => tiles[o].up.includes(optionPick));
      if(grid[bi].options.length === 0){
        grid[bi].options = getArrayRange(0, tiles.length);
        grid[bi].collapsed = true;
      }
    }
    
}

function getArrayRange(start, length){
  let arr = [];
  for(let i = start; i < length; i++){
    arr.push(i);
  }
  return arr;
}

function validateDim(evt){
  if(evt.target.value === undefined || evt.target.value < 5 || evt.target.value > 100){
    evt.target.value = DIM;
  }
}

function tileSelect(evt){
  console.log("tileSelect");
  // remove selected class from old
  document.getElementById(templateTailes.selectedTemplate).classList.remove("selectedTile");
  // add selected class to new
  evt.target.classList.add("selectedTile");

  templateTailes.selectedTemplate = evt.target.id;
  noLoop();
  preload(initGrid);
}