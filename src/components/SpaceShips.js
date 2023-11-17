import Phaser from 'phaser';

import Inicio from "../components/scenesPhaser/Naves/Inicio";
import Escena1 from "../components/scenesPhaser/Naves/Escena1";
import Escena2 from "../components/scenesPhaser/Naves/Escena2";

import Perdiste from "../components/scenesPhaser/Naves/Perdiste";
import Win from "../components/scenesPhaser/Naves/Win";
import { useState, useEffect } from 'react';

function Spaceships(){

    const Escenas = [Inicio,Escena1,Escena2,Perdiste, Win];
    const crearEscena = Scene => new Scene();
    const iniciarEscena = () => Escenas.map(crearEscena);

    const [listo, setListo] = useState(false);
    
    useEffect(() => {
        let config = {
            type: Phaser.AUTO,
            width: 1050,
            height: 630,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
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
export default Spaceships;