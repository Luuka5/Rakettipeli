let w, a, s, d, space;

function setKey(keyCode, value) {
    switch (event.keyCode) {
        case 87:
        case 38:
            w = value;
            break;
        case 65:
        case 37:
            a = value;
            break;
        case 83:
        case 40:
            s = value;
            break;
        case 68:
        case 39:
            d = value;
            break;
        case 32:
            space = value;
            break;
    }
}

function handleKeyDown(event) {
    setKey(event.keyCode, true);
}

function handleKeyUp(event) {
    setKey(event.keyCode, false);
}

window.addEventListener('keydown', handleKeyDown, true)
window.addEventListener('keyup', handleKeyUp, true)