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

        this.load.image('displayBig', './assets/displayBig.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Segment7',
            fontSize: '22px',
            color: '#00FF00',
            align: 'left',
            lineSpacing: 5,
            padding: {
                top: 1,
                bottom: 1,
                left: 1,
                right: 1            
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

        this.menuDisplay = this.add.sprite(110, 260, 'displayBig');

        this.add.text(30,212, 'Arrow Keys Move\nF fires\n\nN play normal\nH play hard', menuConfig).setOrigin(0, 0);
        /*
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use (<-->) arrow keys to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press (<-) for novice or (->) for Expert', menuConfig).setOrigin(0.5);
        */

        // define keys
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

    } //End create()

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyN)) {
            //easy
            game.settings = {
                spaceshipSpeed: 1,
                gameTimer: 60 //Game len in seconds
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyH)){
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