const rocketImg = document.getElementById("rocket");
const turningSpeed = 0.1, power = 0.5, speedLimit = 30;


class Fire extends Drawable {
    constructor(x, y, velX, velY) {
        super(x, y);
        this.time = 0;
        this.velocity = {x:velX + (Math.random() - 0.5)*5, y:velY + (Math.random() - 0.5)*5}
    }
    
    update() {
        this.time++;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    
    draw() {
        ctx.fillStyle = this.color();
        
        ctx.beginPath();
        ctx.ellipse(0, 0, this.time*5 +2, this.time*5 +2, 0, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    
    color() {
        let alpha = Math.max(255 - this.time*10, 0);
        let green = Math.min(this.time*8, 255);
        return "rgba(255, "+green+", 0, "+ (alpha / 255.0) +")";
    }
 
}
class Bullet extends Drawable {
    constructor(x, y, direction) {
        super(x, y);
        this.time = 0;
        this.velocity = { x:Math.cos(direction)*100, y:Math.sin(direction)*100 }
    }
    
    update() {
        this.time++;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
    
    draw() {
        ctx.strokeStyle = "#0f0";
        
        ctx.lineWidth = 20;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.velocity.x*2, this.velocity.y*2);
        ctx.closePath();
        ctx.stroke();
    }

}


class Rocket extends Drawable {
    
    constructor(x, y) {
        super(x, y);
        this.direction = Math.PI / 2;
        this.velocity = {x: 0, y:0}
        this.fire = [];
        this.bullets = [];
        this.reloadTime = 0;
        this.hits = 0;
    }
    
    update() {
        if (d) this.direction += turningSpeed;
        if (a) this.direction -= turningSpeed;
        if (w) {
            this.fire.push(new Fire(this.x, this.y,
                                    -Math.cos(this.direction)*30 + this.velocity.x,
                                    -Math.sin(this.direction)*30 + this.velocity.y));
            
            this.velocity.x += Math.cos(this.direction) * power;
            this.velocity.y += Math.sin(this.direction) * power;
            if (this.getSpeed() > speedLimit) {
                this.velocity.x *= 0.9;
                this.velocity.y *= 0.9;
            }
        }
        if (s) {
            this.velocity.x *= 0.95;
            this.velocity.y *= 0.95;
        }
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
        
        if (this.distance(startPlanet) < startPlanet.radius) {
            this.bounce(startPlanet);
        }
        if (this.distance(endPlanet) < endPlanet.radius - 50) {
            if (enemiesLeft > 0) this.bounce(endPlanet);
            else this.tryLanding();
        }
        
        
        this.reloadTime++;
        if (space && this.reloadTime > 10) {
            this.reloadTime = 0;
            this.bullets.push(new Bullet(this.x, this.y, this.direction));
        }
        
        for (let particle of this.fire) particle.update();
        if (this.fire[0] !== undefined && this.fire[0].time > 20) this.fire.shift();
        
        for (let bullet of this.bullets) bullet.update();
        if (this.bullets[0] != undefined && this.bullets[0].time > 60) this.bullets.shift();
    }
    
    show() {
        ctx.resetTransform();
        for (let particle of this.fire) particle.show();
        for (let bullet of this.bullets) bullet.show();
        
        super.show();
    }
    
    draw() {
        ctx.rotate(this.direction - Math.PI/2);
        ctx.drawImage(rocketImg, -150, -150, 300, 300);
    }
    
    rotate(angle) {
        this.direction += angle;
    }
        
    getSpeed() {
        return Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    }
    
    hit() {
        this.hits++;
    }
    
    bounce(planet) {
        let dist = this.distance(planet);
        this.velocity.x = (this.x - planet.x) / dist * 50;
        this.velocity.y = (this.y - planet.y) / dist * 50;
        this.hit();
    }
    
    tryLanding() {
        let a = this.direction - Math.PI/2 - Math.atan2(endPlanet.x - this.x, - endPlanet.y + this.y);
        let error = mod(a + Math.PI, Math.PI*2) - Math.PI;
        if (Math.abs(error) < 1) {
            gameFinished();
            this.stop();
        } else this.bounce(endPlanet);
    }
    
    stop() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
}
