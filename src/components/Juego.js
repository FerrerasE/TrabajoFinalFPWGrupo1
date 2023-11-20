import React, { useState, useEffect } from 'react';
import './styles.css';
import animalsP from '../Data/animals.json';

function Juego({ playerName1, playerName2, onFinish }) {
    const [targetAnimal, setTargetAnimal] = useState('');
    const [currentOptions, setCurrentOptions] = useState([]);
    const [scores, setScores] = useState({ [playerName1]: 0, [playerName2]: 0 });
    const [currentPlayer, setCurrentPlayer] = useState(playerName1);
    const [currentRound, setCurrentRound] = useState(1);
    const [totalRounds] = useState(Math.floor(Math.random() * 6) + 8);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState('');
    const [eliminationUsedByPlayer, setEliminationUsedByPlayer] = useState({ [playerName1]: false, [playerName2]: false });

    const getRandomAnimal = () => {
        const animals = animalsP.animals;
        const randomIndex = Math.floor(Math.random() * animals.length);
        return animals[randomIndex];
    };

    const getRandomOptions = () => {
        const correctAnimal = getRandomAnimal();
        let randomOptions = [correctAnimal];

        while (randomOptions.length < 3) {
            const option = getRandomAnimal();
            if (!randomOptions.includes(option)) {
                randomOptions.push(option);
            }
        }

        randomOptions = randomOptions.sort(() => Math.random() - 0.5);

        setCurrentOptions(randomOptions);
        setTargetAnimal(correctAnimal);
        // No reiniciar el uso de la eliminación aquí
    };

    const useElimination = () => {
        if (!eliminationUsedByPlayer[currentPlayer]) {
            const remainingOptions = currentOptions.filter(option => option !== targetAnimal);
            const eliminatedOption = remainingOptions[Math.floor(Math.random() * remainingOptions.length)];

            const updatedOptions = currentOptions.filter(option => option !== eliminatedOption);
            setCurrentOptions(updatedOptions);
            setEliminationUsedByPlayer(prevState => ({ ...prevState, [currentPlayer]: true }));
        }
    };

    const checkAnswer = (selectedAnimal) => {
        if (!gameOver) {
            if (selectedAnimal === targetAnimal) {
                const updatedScores = { ...scores };
                updatedScores[currentPlayer] += 1;
                setScores(updatedScores);
            }

            if (currentRound === totalRounds) {
                setGameOver(true);
            } else {
                nextRound();
            }
        }
    };

    const nextRound = () => {
        const nextPlayer = currentPlayer === playerName1 ? playerName2 : playerName1;
        setCurrentRound(currentRound + 1);
        setCurrentPlayer(nextPlayer);
        getRandomOptions();
    };

    useEffect(() => {
        getRandomOptions();
    }, []);

    useEffect(() => {
        if (gameOver) {
            onFinish(scores);
        }
    }, [gameOver, onFinish, scores]);

    useEffect(() => {
        if (scores[playerName1] > scores[playerName2]) {
            setWinner('The Winner of this match is ' + playerName1);
        } else if (scores[playerName1] < scores[playerName2]) {
            setWinner('The Winner of this match is ' + playerName2);
        } else {
            setWinner('It is a draw');
        }
    }, [winner, scores]);

    return (
        <div>
            <h1>{currentPlayer}, 🤔What is this animal? 👀</h1>
            <p>Current round: {currentRound}</p>
            <img src={`img/${targetAnimal}.png`} alt={targetAnimal} />
            <div>
                {currentOptions.map((animal) => (
                    <button key={animal} onClick={() => checkAnswer(animal)}>
                        {animal}
                    </button>
                ))}
            </div>
            <button onClick={useElimination} disabled={eliminationUsedByPlayer[currentPlayer]}>
                Comodin
            </button>
            <p>{playerName1}'s Score: {scores[playerName1]}</p>
            <p>{playerName2}'s Score: {scores[playerName2]}</p>
            {gameOver && (
                <div>
                    <h1>🎉Congratulations 🎊🥳</h1>
                    <p>{winner}</p>
                    <p>{playerName1}'s Score: {scores[playerName1]}</p>
                    <p>{playerName2}'s Score: {scores[playerName2]}</p>
                </div>
            )}
        </div>
    );
}

export default Juego;