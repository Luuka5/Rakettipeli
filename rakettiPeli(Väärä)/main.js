const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scale = 1;
let zoom = 10;

function updateScale() {
    scale = Math.min(window.innerWidth, window.innerHeight) * zoom * 0.0001;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateScale();
    backgroundSetup();
}
window.onresize = resize;

let rocket;
let objects = [];
let startPlanet, endPlanet;

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
    window.onkeydown = startGame;
    
    resize();
    
    enemiesLeft = enemyCount;
    rocket = new Rocket(0, -5000);
    
    logo = new Drawable(rocket.x, rocket.y);
    logo.draw = function() {
        ctx.drawImage(logoTextImg, -150, -150, 300, 300);
    }
    
    endPlanet = new Planet(0, 0, planetRadius);
    objects.push(endPlanet);
    
    startPlanet = new Planet(0, -6000, 1000);
    objects.push(startPlanet);
    
    for (let i = 0; i < enemyCount; i++) {
        let a = (Math.PI * 2 / enemyCount) * i + Math.random() * (Math.PI * 2 / enemyCount);
        let dist = planetRadius + 500 + Math.random() * 1500;
        objects.push(new Chair(Math.cos(a) * dist, Math.sin(a) * dist, 200));
    }
    
    updateEnemyCount();
    nextTip();
    drawGame();
}
window.onload = function() {
    createPlanets();
    chairImg = document.getElementById("chair");
    bugImg = document.getElementById("bug");
    logoTextImg = document.getElementById("text");
    setup();
}