
function mod(a, n) {
    return (a % n + n) % n;
}

class Star extends Drawable {
    
    constructor(x, y) {
        super(x, y);
        this.z = Math.random() * 10 + 5;
    }
    
    show() {
        let size = 30 / this.z * scale;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.ellipse(mod(this.x - rocket.x / this.z *scale, canvas.width),
                     mod(this.y - rocket.y / this.z *scale, canvas.height), size, size, 0, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
}

let stars = [];

function backgroundSetup() {
    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function drawBackground() {
    for (star of stars) {
        star.show();
    }
}