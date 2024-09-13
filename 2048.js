let grid = [
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

function move(grid) {

    let j;
    // first, to the right
    for (let i = 0; i < 15; i++) {
        j = i + 1
        // try to combine
        if (grid[Math.floor(i/4)][i%4] == grid[Math.floor(j/4)][j%4] && !Number.isInteger((j/4))) {
            grid[Math.floor(i/4)][i%4] = 0;
            grid[Math.floor(j/4)][j%4] *= 2;
        } else if (grid[Math.floor(j/4)][j%4] == 0 && !Number.isInteger((j/4))) {
            //try to move
            grid[Math.floor(j/4)][j%4] = grid[Math.floor(i/4)][i%4];
            grid[Math.floor(i/4)][i%4] = 0;
        }

    }
}

document.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "ArrowDown":
            addNumber(grid);
            update(grid);
            break;
        case "ArrowUp":
            // TODO up()
            break;
            // TODO left()
        case "ArrowLeft":
            break;
        case "ArrowRight":
            move(grid);
            addNumber(grid)
            update(grid);
            break;
        default:
            return;
    }
})
