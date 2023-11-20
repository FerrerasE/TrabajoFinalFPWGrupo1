import Escena0Dude from "../components/scenesPhaser/Dude/Escena0Dude.js";
import Escena1Dude from "../components/scenesPhaser/Dude/Escena1Dude.js";;
import Escena2Dude from "../components/scenesPhaser/Dude/Escena2Dude.js";;
import GameOverDude from "../components/scenesPhaser/Dude/GameOverDude.js";;
import MenuDude from "../components/scenesPhaser/Dude/MenuDude.js";;
import WinDude from "../components/scenesPhaser/Dude/WinDude.js";;

import { useState, useEffect } from 'react';

function Dude(){
    const Escenas = [MenuDude,Escena0Dude,Escena1Dude,Escena2Dude,GameOverDude, WinDude];
    const crearEscena = Scene => new Scene();
    const iniciarEscena = () => Escenas.map(crearEscena);

    const [listo, setListo] = useState(false);
    
    useEffect(() => {
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
            //scene: [Play]
            scene:iniciarEscena()
        };
        let game = new Phaser.Game(config)
        game.events.on("LISTO", setListo)

        return () => {
            setListo(false);
            game.destroy(true);
        }


    }, [listo]);



}
export default Dude;