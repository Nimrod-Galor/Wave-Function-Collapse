console.log("createPermutations");

let permutations = [];


function createPermutations(templateName){
    let edges = []
    for(let i=0; i < templateTailes[templateName].edges.length; i++){
        let tmpEdge = templateTailes[templateName].edges[i];
        for(let i=0; i < 4; i++){
            if(!edges.includes(tmpEdge[i])){
                edges.push(tmpEdge[i]);
            }
        }
    }

    for(let t=0; t < edges.length; t++){
        for(let r=0; r < edges.length; r++){
            for(let b=0; b < edges.length; b++){
                for(let l=0; l < edges.length; l++){
                    const edgePermutation = [edges[t], edges[r], edges[b], edges[l]];
                    // check that new edg is NOT a roatated version of existing edge
                    let flagEdgeExist = false;
                    for(let r=1; r < 4; r++){
                        if(permutations.length === 0){
                            break;
                        }
                        const rotatedEdeg = [];
                        const len = 4;
                        for (let i = 0; i < len; i++) {
                            rotatedEdeg[i] = edgePermutation[(i - r + len) % len];
                        }

                        for(let p=0; p < permutations.length; p++){
                            if(rotatedEdeg[0] === permutations[p][0] && rotatedEdeg[1] === permutations[p][1] && rotatedEdeg[2] === permutations[p][2] && rotatedEdeg[3] === permutations[p][3]){
                                flagEdgeExist = true;
                                break;
                            }
                        }

                        if(flagEdgeExist){
                            break;
                        }
                    }

                    if(!flagEdgeExist){
                        permutations.push(edgePermutation);
                    }
                }
            }
        }
    }

    console.table(permutations);
}




// function createPermutations(templateName){
//     let up = [];
//     let right = [];
//     let down = [];
//     let left = [];
    
//     // get unique edges for every side
//     for(let i=0; i < templateTailes[templateName].edges.length; i++){
//         let edge = templateTailes[templateName].edges[i];
//         if(!up.includes(edge[0])){
//             up.push(edge[0]);
//         }
//         if(!right.includes(edge[1])){
//             right.push(edge[1]);
//         }
//         if(!down.includes(edge[2])){
//             down.push(edge[2]);
//         }
//         if(!left.includes(edge[3])){
//             left.push(edge[3]);
//         }
//     }

//     for(let d=0; d < down.length; d++){// down
//         for(let l=0; l < left.length; l++){// left
//             for(let u=0; u < up.length; u++){//up
//                 for(let r=0; r < right.length; r++){//right
//                     permutations.push([down[d], left[l], up[u], right[r]]);
//                 }
//             }
//         }
//     }
    
// }

// function checkMissingPermutations(){
//     let missingPermutations = []
//     for(tile of tiles){
//         let arr1 = tile.edges;
//         let flag = false;
//         for(prm of permutations){
//             if(arr1.every((element, index) => {
//                 if(element === prm[index]){
//                     return true;
//                 }
//                 return false;
//             })){
//                 flag = true;
//                 break;
//             }
//         }

//         if(!flag){// no match
//             missingPermutations.push(arr1);
//         }
//     }

//     return missingPermutations;
// }