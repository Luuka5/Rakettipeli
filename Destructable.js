
class Destructable extends Drawable {
    
    constructor(x, y, radius, health) {
        super(x, y);
        this.radius = radius;
        this.maxHealth = health;
        this.health = health;
    }
    
    isDestructed() {
        for (let bullet of rocket.bullets) {
            if (this.distance(bullet) < this.radius) {
                return true;
            }
        }
        return false;
    }
    
    remove() {
        const index = objects.indexOf(this);
        if (index > -1) {
          objects.splice(index, 1);
        }
    }
    
    drawHealthBar() {
        ctx.fillStyle = "#f008";
        ctx.fillRect(-200, 220, 400, 50);
        ctx.fillStyle = "#0f0";
        ctx.fillRect(-200, 220, 400 * (this.health / this.maxHealth), 50);
    }
    
    show() {
        if (this.isDestructed()) this.health--;
        if (this.health <= 0) {
            this.remove();
            rocket.addKill();
        }
        super.show();
    }
    
    draw() {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius, this.radius, 0, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
        this.drawHealthBar();
    }
}