const planetImages = [];
const imageCount = 3;

function createPlanets() {
    for (let i = 0; i < imageCount; i++) {
        planetImages.push(document.getElementById("planet" + (i + 1)));
    }
}

class Planet extends Drawable {
    
    constructor(x, y, size) {
        super(x, y);
        this.radius = size;
        this.image = Math.floor(Math.random() * planetImages.length);
    }
    
    draw() {
        ctx.drawImage(planetImages[this.image], -this.radius, -this.radius, this.radius * 2, this.radius * 2);
    }
    
}