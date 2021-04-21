class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('foreground', './assets/H2OForeground.png');
        this.load.image('background', './assets/H2OBackground.png');
        this.load.image('display', './assets/display.png');
        this.load.image('displayText', './assets/DisplayThing.png');
        //Load spritesheet
        this.load.spritesheet('target', './assets/targetHydrogen.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 7
        });
        this.load.spritesheet('player', './assets/playerOxygen.png', {
            frameWidth: 32,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 5
        });
        /*this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });*/
        this.load.spritesheet('hitSpriteSheet', './assets/HitAnim.png', {
            frameWidth: 64,
            frameHeight: 64,
            startFrame: 0,
            endFrame: 11
        });
    }

    create() {

        // green UI background
        //this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // place background
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0);

        // animation config
        this.anims.create({
            key: 'hitTarget',
            frames: this.anims.generateFrameNumbers('hitSpriteSheet', { //Create frames object
                start: 0,
                end: 11,
                first: 0
            }),
            frameRate: 12
        });

        this.anims.create({
            key: 'playerSpin',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 5,
                first: 0
            }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: 'targetSpin',
            frames: this.anims.generateFrameNumbers('target', {
                start: 7,
                end: 0,
                first: 7
            }),
            frameRate: 11,
            repeat: -1
        });

        // add rocket (player 1)
        this.player = new Rocket(this, game.config.width/2, game.config.height/2, 'player', 0).setOrigin(0.5, 0.5);
        this.player.anims.play('playerSpin');
        //this.player.on('animationcomplete', () => {this.player.anims.play('playerSpin')});

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6,  borderUISize*4,
            'target', 0, 30, 0, 200).setOrigin(0.5, 0.5);
        this.ship01.anims.play('targetSpin');

        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3,  borderUISize*5 + 
            borderPadding*2, 'target', 0, 20, Math.PI/2, 175).setOrigin(0.5, 0.5);
        this.ship02.anims.play('targetSpin');

        this.ship03 = new Spaceship(this, game.config.width,  borderUISize*6 + borderPadding*4,
            'target', 0, 10, Math.PI, 150).setOrigin(0.5, 0.5);
        this.ship03.anims.play('targetSpin');

        // white borders
        /*
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        */

        // place foreground
        this.foreground = this.add.sprite(0, 0, 'foreground').setOrigin(0, 0);

        //Place displays
        this.displayScore = this.add.sprite(55, 15, 'display').setOrigin(0, 0);

        //Place displays
        this.scoreLabel = this.add.sprite(10, 12, 'displayText').setOrigin(0, 0);

        //init score
        this.p1score = 0;

        //Display score
        let scoreConfig = {
            fontFamily: 'Segment7',
            fontSize: '32px',
            color: '#00FF00',
            align: 'left',
            padding: {
                top: 1,
                bottom: 1,
                left: 1,
                right: 1            
            },
            fixedWidth: 40
        }

        let gameOverConfig = {
            fontFamily: 'Segment7',
            fontSize: '32px',
            color: '#00FF00',
            background: '#000000',
            align: 'center',
            padding: {
                top: 1,
                bottom: 1,
                left: 1,
                right: 1            
            },
            fixedWidth: 40
        }

        this.scoreLeft = this.add.text(60, 35, this.p1score, scoreConfig);

        //GAMEOVER flag
        this.gameOver = false;

        // clock
        this.gameLen = 60; //Game length in seconds

        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer * 1000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or (<-) for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    } //End create()

    update(time, delta) {
        let deltaMultiplier = (delta/16.66667);
        //this.starfield.tilePositionX -= starSpeed * deltaMultiplier;

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        if(!this.gameOver) {
            // update rocket
            this.player.update(time, delta);
            //Update Spaceship
            this.ship01.update(time, delta);
            this.ship02.update(time, delta);
            this.ship03.update(time, delta);
        }

        //CheckCollision
        if(this.checkCollision(this.player, this.ship01)){
            this.player.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.player, this.ship02)){
            this.player.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.player, this.ship03)){
            this.player.reset();
            this.shipExplode(this.ship03);
        }
    }

    checkCollision(rocket, ship) {
        if( rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;

        }
        else {
            return false;
        }
    }

    shipExplode(ship) {
        //Hide ship
        ship.alpha = 0;
        // Create explosion sprite on ship
        let shipExplosion = this.add.sprite(ship.x, ship.y, 'hitSpriteSheet').setOrigin(.5,.5);
        shipExplosion.anims.play('hitTarget');
        shipExplosion.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            shipExplosion.destroy();
        });
        //Do sscoring for hit
        this.p1score += ship.points;
        this.scoreLeft.text = this.p1score;

        this.sound.play('sfx_explosion');
    }

}