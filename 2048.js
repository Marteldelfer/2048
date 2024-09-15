const grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

const colors = ['#EEE4DA', '#EEE1C9', '#F2B27A', '#F69664', '#F77C5F', '#F55F3B',
    '#EDD073', '#EDCC62', '#EDC950', '#EDC53F', '#EDC22E'
]

function addNumber(grid) {
    // first, count the 0s
    let count = 0;
    for (let i = 0; i < 16; i++) {
        if (grid[Math.floor(i/4)][i%4] == 0) {
            count++;
        }
    }

    // now, create number randomly
    for (let i = 0; i<16; i++) {
        if (grid[Math.floor(i/4)][i%4] == 0) {
            if (Math.random() <= (1/count)) {
                grid[Math.floor(i/4)][i%4] = Math.random() > 0.75 ? 4 : 2;
                break;
            } else {
                count--;
            }
        }
    }
}

function update(grid) {

    let id = ''
    for (let i = 0; i < 16; i++) {
        id = `${Math.floor(i/4) + 1}-${i%4 + 1}`;
        let square = document.getElementById(id);
        if (grid[Math.floor(i/4)][i%4] == 0) {
            square.innerText = '';
            square.style.background = 'transparent';
            continue;
        } else if (grid[Math.floor(i/4)][i%4] < 8){
            square.style.color = '#776e65';
        } else {
            square.style.color = 'white';
        }
        square.innerText = grid[Math.floor(i/4)][i%4];
        square.style.background = colors[Math.log2(grid[Math.floor(i/4)][i%4]) - 1];
    }
}

function move(grid, direction) {

    switch (direction) {
        
        case 'right':
            //first, combining the squares
            for (row of grid) {
                for (let index = 3; index > -1; index--) {
                    //ignore zeros
                    if (row[index] == 0) {
                        continue;
                    }
                    for (let comp = 3; comp > -1; comp--) {
                        //cant combine with itself nor to the right
                        if (comp >= index) {
                            continue;
                        }
                        //combining
                        if (row[index] == row[comp]) {
                            row[index] *= 2;
                            row[comp] = 0;
                            break;
                        }
                        //if number is not zero nor equal, break
                        if (row[comp] > 0) {
                            break;
                        }
                    }
                }
            }
            //then, move the numbers
            for (row of grid) {
                for (let index = 3; index > -1; index--) {
                    //cant replace if not zero
                    if (row[index] != 0) {
                        continue;
                    }
                    for (let comp = 3; comp > -1; comp--) {
                        //only move numbers fromr the left
                        if (comp >= index) {
                            continue;
                        }
                        //moving the numbers
                        if (row[index] == 0) {
                            row[index] = row[comp];
                            row[comp] = 0;
                        }
                    }
                }
            }
            break;
            case 'left':
                //same as right, except it goes from left to right
                for (row of grid) {
                    for (let index = 0; index < 4; index++) {
                        //ignore zeros
                        if (row[index] == 0) {
                            continue;
                        }
                        for (let comp = 0; comp < 4; comp++) {
                            //cant combine with itself nor to the right
                            if (comp <= index) {
                                continue;
                            }
                            //combining
                            if (row[index] == row[comp]) {
                                row[index] *= 2;
                                row[comp] = 0;
                                break;
                            }
                            //if number is not zero nor equal, break
                            if (row[comp] > 0) {
                                break;
                            }
                        }
                    }
                }
                //then, move the numbers
                for (row of grid) {
                    for (let index = 0; index < 4; index++) {
                        //cant replace if not zero
                        if (row[index] != 0) {
                            continue;
                        }
                        for (let comp = 0; comp < 4; comp++) {
                            //only move numbers fromr the left
                            if (comp <= index) {
                                continue;
                            }
                            //moving the numbers
                            if (row[index] == 0) {
                                row[index] = row[comp];
                                row[comp] = 0;
                            }
                        }
                    }
                }
            break;
            case 'up':
                //same logic as the others, but row and col are reversed
                //combining
                for (let colindex = 0; colindex < 4; colindex++) {
                    for (let index = 0; index < 4; index++) {
                        //ignore the zeros
                        if (grid[index][colindex] == 0) {
                            continue;
                        }
                        for (let comp = 0; comp < 4; comp++) {
                            //cant combine with itself nor downward
                            if (comp <= index) {
                                continue;
                            }
                            //combine
                            if (grid[index][colindex] == grid[comp][colindex]) {
                                grid[index][colindex] *= 2;
                                grid[comp][colindex] = 0;
                                break;
                            }
                            //if not equal nor zero, break
                            if (grid[comp][colindex] > 0) {
                                break;
                            }
                        }
                    }
                }
                //move the squares
                for (let colindex = 0; colindex < 4; colindex++) {
                    for (let index = 0; index < 4; index++) {
                        //cant move to if not zero
                        if (grid[index][colindex] != 0) {
                            continue;
                        }
                        for (let comp = 0; comp < 4; comp++) {
                            // only compare upwards
                            if (comp <= index) {
                                continue;
                            }
                            // move
                            if (grid[index][colindex] == 0) {
                                grid[index][colindex] = grid[comp][colindex];
                                grid[comp][colindex] = 0;
                            }
                        }
                    }
                }
            break;
            case 'down':
                //combining
                for (let colindex = 3; colindex > -1; colindex--) {
                    for (let index = 3; index > -1; index--) {
                        //ignore the zeros
                        if (grid[index][colindex] == 0) {
                            continue;
                        }
                        for (let comp = 3; comp > -1; comp--) {
                            //cant combine with itself nor downward
                            if (comp >= index) {
                                continue;
                            }
                            //combine
                            if (grid[index][colindex] == grid[comp][colindex]) {
                                grid[index][colindex] *= 2;
                                grid[comp][colindex] = 0;
                                break;
                            }
                            //if not equal nor zero, break
                            if (grid[comp][colindex] > 0) {
                                break;
                            }
                        }
                    }
                }
                //move the squares
                for (let colindex = 3; colindex > -1; colindex--) {
                    for (let index = 3; index > -1; index--) {
                        //cant move to if not zero
                        if (grid[index][colindex] != 0) {
                            continue;
                        }
                        for (let comp = 3; comp > -1; comp--) {
                            // only compare upwards
                            if (comp >= index) {
                                continue;
                            }
                            // move
                            if (grid[index][colindex] == 0) {
                                grid[index][colindex] = grid[comp][colindex];
                                grid[comp][colindex] = 0;
                            }
                        }
                    }
                }
    }
}

document.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "ArrowDown":
            move(grid, 'down')
            break;
        case "ArrowUp":
            move(grid, 'up')
            break;
        case "ArrowLeft":
            move(grid, 'left');
            break;
        case "ArrowRight":
            move(grid, 'right');
            break;
        default:
            return;        
    }
    addNumber(grid);
    update(grid);
})