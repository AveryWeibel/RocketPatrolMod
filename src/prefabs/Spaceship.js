class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); //Add to existing scene
        this.points = pointValue; //Store instance pointvalue
        this.moveSpeed = game.settings.spaceshipSpeed;       //Gaming
    }

    update (time, delta) {
        let deltaMultiplier = (delta/16.66667);

        // Move spaceship
        this.x -= this.moveSpeed * deltaMultiplier;
        //Wrap around from left to right edge
        if(this.x  <= 0 - this.width) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;

    }
}