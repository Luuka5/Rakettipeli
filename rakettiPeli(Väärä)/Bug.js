let bugImg;

class Bug extends Destructable {
    
    constructor(x, y, radius) {
        super(x, y, radius, 2);
        this.target = {x: x * 2, y: y * 2};
        this.rotation = Math.random() * Math.PI * 2;
    }
    
    draw() {
        let deltaX = (this.target.x - this.x);
        let deltaY = (this.target.y - this.y);
        let dist = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
        if (dist > 20) {
            this.x += deltaX / dist * 10;
            this.y += deltaY / dist * 10;
        } else {
            this.target.x += (rocket.x - this.target.x) * 0.1;
            this.target.y += (rocket.y - this.target.y) * 0.1;
        }
        if (this.distance(rocket) < this.radius) {
            rocket.hit();
            this.remove();
        }
        
        let a = this.rotation - Math.atan2(deltaX, -deltaY);
        let error = mod(a + Math.PI, Math.PI*2) - Math.PI;
        this.rotation -= a * 0.05;
        
        ctx.rotate(this.rotation);
        ctx.drawImage(bugImg, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
        ctx.rotate(-this.rotation);
        super.drawHealthBar();
    }
}