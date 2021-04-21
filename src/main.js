
/***********************/
//Avery Weibel
//Rocket Patrol Mod
//4/21/21

//FULL MOD TIME: 13.25hrs

//Initial polar coordinate movement - 3 hrs
//Firing and reset - 1hr
//Comments/freshening variables .5hrs
//Give enemies polar movement .5hrs
//Enemies polar resetting .5hrs
//Player animations 1.5hrs
//Enemy animations .5hrs
//Env art 3hrs
//Menu art 1.5hrs
//new text 1hrs
//Timer functionality 1.5hrs\
//New sounds - .75hrs
//New music - 1hr

//Score: Polar gameplay 30
//       Art overhaul (Molecule Combination/Mars Base Theme) 60
//       Timer on screen 10
//       Timer updates on hit 20
//       Enemies randomized direction 5
//       New animated sprite for enemies 10 (The art overhaul doesn't say animated sprite so seems like thats added)

/********************** */

// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT, keyN, keyH, keyM;