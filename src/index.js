import Escena0 from "./escenas/Escena0.js"
import Escena1 from "./escenas/Escena1.js"
import Escena2 from "./escenas/Escena2.js"
import GameOver from "./escenas/GameOver.js"
import Menu from "./escenas/Menu.js"
import Win from "./escenas/Win.js"
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:300},
            debug:false
        }
    },
    scene:[Menu,Escena0,Escena1,Escena2,GameOver,Win]
}
let game = new Phaser.Game(config);