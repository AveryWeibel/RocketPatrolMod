class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, pAng, pRad) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);        // Add to existing scene
        this.points = pointValue;        // Store instance pointvalue
        this.rotateSpeed = Math.PI/128;   // radians per frame
        this.defaultDist = pRad;         // Default distance to rotate about center screen

        //Initial conversion to polar coordinate system
        this.polarRad = Math.sqrt(Math.pow(game.config.width/2 - x, 2) + Math.pow(game.config.height/2 - y, 2));
        this.polarAng = Math.atan(x - game.config.width/2, game.config.height/2 - y);
        this.PolarTransformBy(0, this.defaultDist);

        //Move player to starting position
        this.PolarSet(pAng, this.defaultDist);
    }

    update (time, delta) {
        let deltaMultiplier = (delta/16.66667);

        // Move spaceship
        //this.x -= this.moveSpeed * deltaMultiplier;
        this.PolarTransformBy(this.rotateSpeed * deltaMultiplier, 0);
        //Wrap around from left to right edge
        //if(this.x  <= 0 - this.width) {
        //    this.reset();
        //}
    }

    PolarTransformBy(angle, dist) {
        //Edit polar coordinates
        this.polarRad += dist;
        this.polarAng += angle;

        //Convert back to cartesian (+ offset to center of screen)
        this.x = game.config.width/2 + (this.polarRad * (Math.cos(this.polarAng)));
        this.y = game.config.height/2 + (this.polarRad * (Math.sin(this.polarAng)));

        console.log("X:" + this.x);
        console.log("Y:" + this.y);
    }

    PolarSet(angle, dist) {
                //Edit polar coordinates
                this.polarRad = dist;
                this.polarAng = angle;
        
                //Convert back to cartesian (+ offset to center of screen)
                this.x = game.config.width/2 + (this.polarRad * (Math.cos(this.polarAng)));
                this.y = game.config.height/2 + (this.polarRad * (Math.sin(this.polarAng)));
        
                console.log("X:" + this.x);
                console.log("Y:" + this.y);
    }

    reset() {
        //this.x = game.config.width;
        console.log("Reset ship");

    }
}