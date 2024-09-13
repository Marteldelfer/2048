let grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

function addNumber(grid) {
    // first, count the 0
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
document.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "ArrowDown":
            addNumber(grid)
            alert(grid)
            break;
        case "ArrowUp":
            // TODO up()
            break;
            // TODO left()
        case "ArrowLeft":
            break;
        case "ArrowRight":
            // TODO right()
            break;
        default:
            return;
    }
})