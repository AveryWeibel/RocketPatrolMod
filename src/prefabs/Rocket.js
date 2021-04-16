  
// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;      // track rocket firing status
        this.moveSpeed = 2;         // pixels per frame
        this.rad2deg = 180/Math.PI;
        this.polarRad = Math.sqrt(Math.pow(game.config.width/2 - x, 2) + Math.pow(game.config.height/2 - y, 2));
        this.polarAng = Math.atan(x - game.config.width/2, game.config.height/2 - y);
        this.PolarTransformBy(0, 0);
        console.log("X:" + this.x);
        console.log("Y:" + this.y);

        //Bind audio
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(time, delta) {
        let deltaMultiplier = (delta/16.66667);

        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown /*&& this.x >= borderUISize + this.width*/) {
                //this.x -= this.moveSpeed * deltaMultiplier;
                this.PolarTransformBy(-Math.PI/64, 0);
            } else if (keyRIGHT.isDown /*&& /*this.x <= game.config.width - borderUISize - this.width*/) {
                //this.x += this.moveSpeed * deltaMultiplier;
                this.PolarTransformBy(Math.PI/64, 0);
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed * deltaMultiplier;

        }

        if(this.y <= borderUISize * 3 + borderPadding) {
            //this.reset();
        }
    }

    PolarTransformBy(angle, dist) {
        this.polarRad += dist;
        this.polarAng += angle;

        this.x = game.config.width/2 + (this.polarRad * (Math.cos(this.polarAng)));
        this.y = game.config.height/2 + (this.polarRad * (Math.sin(this.polarAng)));

        console.log("X:" + this.x);
        console.log("Y:" + this.y);
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}