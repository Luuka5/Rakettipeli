
let chairImg;

class Chair extends Destructable {
    constructor(x, y, radius) {
        super(x, y, radius, 10);
        this.rotation = Math.random() * Math.PI * 2;
    }
    
    remove() {
        enemiesLeft--;
        updateEnemyCount();
        super.remove();
    }
    
    draw() {
        let a = Math.atan2(this.x, this.y);
        let dist = Math.sqrt(this.x ** 2 + this.y ** 2)
        a += 0.002;
        this.x = Math.sin(a) * dist;
        this.y = Math.cos(a) * dist;
        
        this.rotation += 0.01;
        
        ctx.rotate(this.rotation);
        ctx.drawImage(chairImg, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
        ctx.rotate(-this.rotation);
        super.drawHealthBar()
    }
}