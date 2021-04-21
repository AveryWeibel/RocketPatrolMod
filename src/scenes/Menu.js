class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');

        this.load.spritesheet('MMSpriteSheet', './assets/MainMenuAnim.png', {
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 0,
            endFrame: 7
        });

        this.load.image('display', './assets/display.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,                
            },
            fixedWidth: 0
        }

        // animation config
        this.anims.create({
            key: 'MainMenuAnim',
            frames: this.anims.generateFrameNumbers('MMSpriteSheet', { //Create frames object
                start: 0,
                end: 7,
                first: 0
            }),
            frameRate: 6,
            repeat: -1
        });

        this.menuBackground = this.add.sprite(0, 0, 'MMSpriteSheet', 0).setOrigin(0,0);
        this.menuBackground.anims.play('MainMenuAnim');

        /*
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use (<-->) arrow keys to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press (<-) for novice or (->) for Expert', menuConfig).setOrigin(0.5);
        */

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    } //End create()

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy
            game.settings = {
                spaceshipSpeed: 1,
                gameTimer: 60 //Game len in seconds
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //hard
            game.settings = {
                spaceshipSpeed: 1.25,
                gameTimer: 45 //Game len in seconds
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');            
        }

    }
}