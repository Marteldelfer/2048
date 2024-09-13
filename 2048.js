document.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "ArrowDown":
            // TODO down()
            break;
        case "ArrowUp":
            // TODO up()
            break;
        case "ArrowLeft":
            // TODO left()
            break;
        case "ArrowRight":
            // TODO right()
            break;
        default:
            return;
    }
})

