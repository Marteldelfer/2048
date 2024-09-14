const grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

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
        square.innerText = grid[Math.floor(i/4)][i%4];
    }
}

function move(grid, direction) {

    let j;

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
                        if (row[comp] > row[index]) {
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
                            if (row[comp] > row[index]) {
                                row[index] = row[comp];
                                row[comp] = 0;
                            }
                        }
                    }
                }
            break;
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