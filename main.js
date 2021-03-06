const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scale = 1;
let zoom = 8;

function updateScale() {
    scale = Math.min(window.innerWidth, window.innerHeight) * zoom * 0.0001;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateScale();
    backgroundSetup();
    if (document.readyState === "complete") drawGame();
}

let rocket;
let objects = [];
let startPlanet, endPlanet;

let moonImg;
let logoTextImg;
let logo;

let planetRadius = 2000;
let spawnTime = 0;

const enemyCount = 10;
let enemiesLeft;


function updateEnemyCount() {
    document.getElementById("enemyCount").innerHTML = enemiesLeft + "/" + enemyCount;
}

function setup() {
    time = 0;
    
    document.getElementById("score").style.display = "none";
    window.onkeydown = startGame;
    window.onresize = resize;
    
    enemiesLeft = enemyCount;
    rocket = new Rocket(0, -5200);
    
    endPlanet = new Planet(0, 0, planetRadius);
    endPlanet.image = moonImg;
    objects.push(endPlanet);
    
    startPlanet = new Planet(0, -6000, 750);
    objects.push(startPlanet);
    
    logo = new Drawable(rocket.x, rocket.y);
    logo.draw = function() {
        ctx.drawImage(logoTextImg, -150, -150, 300, 300);
    }
    
    for (let i = 0; i < enemyCount; i++) {
        let a = (Math.PI * 2 / enemyCount) * i + Math.random() * (Math.PI * 2 / enemyCount);
        let dist = planetRadius + 500 + Math.random() * 1500;
        objects.push(new Chair(Math.cos(a) * dist, Math.sin(a) * dist, 200));
    }
    
    resize();
    updateEnemyCount();
    drawGame();
}

window.onload = function() {
    createPlanets();
    chairImg = document.getElementById("chair");
    bugImg = document.getElementById("bug");
    logoTextImg = document.getElementById("text");
    moonImg = document.getElementById("moon");
    setup();
}

