
const guide = ["Aloita painamalla mitä tahansa näppäintä.",
               "Liiku käyttämällä nuolinäppäimiä tai W, A, S ja D.",
               "Ammu painamalla välilyöntiä.",
               "Tuhoa kaikki toimistotuolit ja vältä bugeja.",
               "Laskeudu lopuksi kuun pinnalle turvallisesti laskeutumisteline edellä." ]
let currentTip = -1;

function nextTip() {    
    currentTip++;
    if (currentTip < guide.length) {
        window.setTimeout(nextTip, 3000);
        document.getElementById("guide").innerHTML = guide[currentTip];
    } else {
        document.getElementById("guide").style.display = "none";
    }
}

let loopIntervalId;
let timeIntervalId;

let time = 0;

function startGame() {
    loopIntervalId = window.setInterval(loop, 20);
    timeIntervalId = window.setInterval(function() {
        time += 1;
        document.getElementById("time").innerHTML = (time / 10).toFixed(1);
    }, 100);
}

function loop() {
    if (zoom > 2) {
        zoom /= 1.05;
        updateScale();
    }
    
    spawnTime++;
    if (spawnTime > 150) {
        spawnTime = 0;
        let a = Math.random() * (Math.PI * 2);
        objects.push(new Bug(Math.cos(a) * planetRadius,
                             Math.sin(a) * planetRadius, 200));
    }
    rocket.update();
    
    drawGame();
    window.onkeydown = function() {};
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);s
    drawBackground();
    
    for (let obj of objects) {
        obj.show();
    }
    
    rocket.show();
    logo.show();
}

function gameFinished() {
    window.clearInterval(loopIntervalId);
    window.clearInterval(timeIntervalId);
    zoomInIntrervelId = window.setInterval(zoomIn, 20);
    
    showScore();
}


let zoomInIntrervelId;
function zoomIn() {
    zoom *= 1.05;
    updateScale();
    drawGame();
    if (zoom > 5) {
        window.clearInterval(zoomInIntrervelId);
        window.onkeydown = setup;
    }
}

function showScore() {
    let text = "Aika: " + time / 10 + "s";
    
    document.getElementById("score").innerHTML = text;
    document.getElementById("score").style.display = "block";
}

