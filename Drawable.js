class Drawable {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    show() {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scale, scale);
        ctx.translate((this.x - rocket.x), (this.y - rocket.y));
        this.draw();
        ctx.resetTransform();
    }
    
    draw() {
        ctx.fillStyle = "#fff";
        ctx.fillRect(-10, -10, 20, 20);
    }
    
    distance(drawable) {
        return Math.sqrt((this.x - drawable.x) ** 2 + (this.y - drawable.y) ** 2);
    }
}