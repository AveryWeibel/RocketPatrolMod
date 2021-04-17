  
// Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;         // track firing status
        this.rotateSpeed = Math.PI/64; // radians per frame
        this.fireSpeed = 3;            // pixels per frame
        this.defaultDist = 50;         // Default distance to rotate about center screen

        //Initial conversion to polar coordinate system
        this.polarRad = Math.sqrt(Math.pow(game.config.width/2 - x, 2) + Math.pow(game.config.height/2 - y, 2));
        this.polarAng = Math.atan(x - game.config.width/2, game.config.height/2 - y);

        //Move player to starting position
        this.PolarTransformBy(0, this.defaultDist);

        //Bind audio
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(time, delta) {
        let deltaMultiplier = (delta/16.66667);

        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown) {
                this.PolarTransformBy(-this.rotateSpeed * deltaMultiplier, 0); //Rotate around center screen
            } else if (keyRIGHT.isDown) {                                    
                this.PolarTransformBy(this.rotateSpeed * deltaMultiplier, 0);
            }
        }

        // Initialize firing
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        if (this.isFiring) {
            this.PolarTransformBy(0, this.fireSpeed * deltaMultiplier); //Translate along the polar radius

        }

        //Reset if we touch any of the borders (thank you 360 firing)
        if(this.x > game.config.width - borderUISize - borderPadding  || 
           this.x <= 0 + borderUISize + borderPadding                 ||
           this.y > game.config.height - borderUISize - borderPadding || 
           this.y <= 0 + borderUISize + borderPadding) 
        {
            this.reset();
        }
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

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.PolarTransformBy(0, -(this.polarRad - this.defaultDist)); //Reset to the default distance
    }
}