import React, { useState } from 'react';
 import './stylesAnimales.css';
import Juego from './Juego';

function InicioAnimales() {
    const [playerName1, setPlayerName1] = useState('');
    const [playerName2, setPlayerName2] = useState('');
    const [showGame, setShowGame] = useState(false);

    const handleStartGame = () => {
        if (playerName1 && playerName2) {
            setShowGame(true);
        }
    }

    if (!showGame) {
        return (
            <div className="animal-body">
                <h1>Enter players' names 😎👍</h1>
                <input
                    type="text"
                    placeholder="Player 1's Name"
                    onChange={(e) => setPlayerName1(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Player 2's Name"
                    onChange={(e) => setPlayerName2(e.target.value)}
                />
                <button className="animal-button" onClick={handleStartGame}>Start Game 👈</button>
            </div>
        );
    } else {
        return (
            <div>
                <Juego
                    playerName1={playerName1}
                    playerName2={playerName2}
                    onFinish={(scores) => {
                        // Aquí puedes manejar la finalización del juego, por ejemplo, mostrar los puntajes.
                        console.log('Game Over!');
                        console.log(scores);
                    }}
                />
            </div>
        );
    }
}

export default InicioAnimales;
