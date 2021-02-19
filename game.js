
const guide = ["Aloita painamalla mitä tahansa näppäintä.",
               "Liiku käyttämällä nuolinäppäimiä tai W, A, ja D.",
               "Ammu painamalla välilyöntiä.",
               "Tuhoa kaikki toimistotuolit ja vältä bugeja.",
               "Laskeudu lopuksi kuun pinnalle turvallisesti laskeutumisteline edellä." ]
let currentTip = -1;

document.getElementById("miniguide").innerHTML = "Ohjeet<br/><br/>" + guide.join("<br/><br/>")

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
    nextTip();
    loopIntervalId = window.setInterval(loop, 20);
    timeIntervalId = window.setInterval(function() {
        time += 1;
        document.getElementById("clock").innerHTML = (time / 10).toFixed(1);
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


let gradientStrength = 0;

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);s
    drawBackground();
    
    for (let obj of objects) {
        obj.show();
    }
    
    rocket.show();
    logo.show();
    
    if (gradientStrength > 0) {
        ctx.resetTransform();
        var grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, 
                                           canvas.width/2, canvas.height/2,
                                           Math.max(canvas.width, canvas.height)/0.5);
        grd.addColorStop(0, "#ff000000");
        grd.addColorStop(1, "rgb(255, 0, 0, "+ (gradientStrength / 100) +")");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        gradientStrength--;
    }
}

function gameFinished() {
    window.clearInterval(loopIntervalId);
    window.clearInterval(timeIntervalId);
    zoomInIntrervelId = window.setInterval(zoomIn, 20);
    
    showScore();
}


let zoomInIntrervelId;
function zoomIn() {
    zoom *= 1.03;
    updateScale();
    drawGame();
    if (zoom > 5) {
        window.clearInterval(zoomInIntrervelId);
        window.onkeydown = setup;
    }
}

function showScore() {
    document.getElementById("time").innerHTML = "Aika: " + time / 10 + "s";
    document.getElementById("kills").innerHTML = "Tuhottuja esineitä tai asioita: " + rocket.kills + "x";
    document.getElementById("hits").innerHTML = "Osumia bugeihin tai taivaankappaleisiin: " + rocket.hits + "x";
    document.getElementById("bullets").innerHTML = "Käytettyjä luoteja: " + rocket.bulletsUsed + "x";
    document.getElementById("landing").innerHTML = "Täydellisiä laskeutumisia: " + (rocket.perfectLanding ? "1x" : "0x");
    
    
    let scores = [];
    
    scores.unshift(Math.round(3000000 / time));
    document.getElementById("timeScore").innerHTML = "+" + scores[0];
    
    scores.unshift(rocket.kills*100);
    document.getElementById("killsScore").innerHTML = "+" + scores[0];
    
    scores.unshift(-rocket.hits * 250);
    document.getElementById("hitsScore").innerHTML = scores[0];
    
    scores.unshift(-rocket.bulletsUsed);
    document.getElementById("bulletsScore").innerHTML = scores[0];
    
    scores.unshift(-rocket.perfectLanding ? 200 : 0);
    document.getElementById("landingScore").innerHTML = "+" + scores[0];
    
    
    let totalScore = 0;
    for (let s of scores) {
        totalScore += s;
    }
    document.getElementById("totalScore").innerHTML = "" + totalScore;
    document.getElementById("score").style.display = "block";
}
