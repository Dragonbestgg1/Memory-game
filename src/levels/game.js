import React, { useState, useEffect, useRef } from "react";
import style from "../styles/levels.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-modal';

function Game() {
    const location = useLocation();
    const navigate = useNavigate();
    const level = new URLSearchParams(location.search).get('level');
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [solved, setSolved] = useState([]);
    const [hasStarted, setHasStarted] = useState(false);
    const [stage, setStage] = useState(0);
    const [disableClick, setDisableClick] = useState(false);
    const [totalStages, setTotalStages] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const stageRef = useRef(stage);
    const [gameHasEnded, setGameHasEnded] = useState(false);

    useEffect(() => {
        // Calculate number of cards based on level
        let totalCards = level * 3;
        if (totalCards % 2 !== 0) {
            totalCards += 1; // If totalCards is odd, add 1 to make it even
        }
        const numStages = Math.ceil(totalCards / 20); // Calculate number of stages
        setTotalStages(numStages); // Add this line
        const numCards = totalCards <= 20 ? totalCards : 20;
        console.log(numStages);

        const faces = ['🍎', '🍌', '🍒', '🍇', '🍓', '🍍', '🍑', '🍉', '🍏', '🍆'];
        while (faces.length < numCards / 2) {
            faces.push(...faces);
        }
        let cardFaces = faces.slice(0, numCards / 2).flatMap(face => [face, face]);
        setCards(cardFaces.sort(() => Math.random() - 0.5));

        setFlipped(cardFaces.map((_, index) => index));

        const timeoutId = setTimeout(() => {
            setFlipped([]);
            setHasStarted(true);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [level, stage]);

    const handleClick = (index) => {
        if (!hasStarted || flipped.length === 2 || solved.includes(index) || disableClick) {
            return;
        }
        setFlipped((flipped) => [...flipped, index]);
    }


    useEffect(() => {
        if (flipped.length === 2) {
            const match = cards[flipped[0]] === cards[flipped[1]];
            if (match) {
                setSolved((solved) => [...solved, ...flipped]);
                setFlipped([]);
            } else {
                setDisableClick(true);
                setTimeout(() => {
                    setFlipped([]);
                    setDisableClick(false); 
                }, 500);
            }
        }
    }, [flipped]);
    
    useEffect(() => {
        stageRef.current = stage;
    }, [stage]);

    useEffect(() => {
        if (hasStarted && solved.length === cards.length) {
            console.log('beigas')
            setGameHasEnded(true);
        }
    }, [solved, cards.length]);
    
    useEffect(() => {
        if (gameHasEnded === true) {
            console.log('paslaik ir stage', stageRef.current)
            console.log('paslaik ir', totalStages)
            if (stageRef.current < totalStages - 1) {
                setStage(prevStage => prevStage + 1);
                console.log('paslaik ir kartis', cards.length)
                console.log('paslaik ir atrisinatas', solved.length)
                console.log('spele ir', gameHasEnded)
                setCards([]);
                setFlipped([]);
                setSolved([]);
                setGameHasEnded(false);
            } else {
                setTimeout(() => {
                    setStage(0);
                    setTotalStages(0);
                    setIsModalOpen(true);
                    setHasStarted(false);
                }, 1000);
            }
        }
    }, [gameHasEnded]);

    return (
        <div className={style.mainGame}>
            <h1 className={style.gameH1}>Level {parseInt(level)}</h1>
            <div className={style.gameContainer}>
                {cards.map((card, index) => (
                    <div
                        className={`${style.card} ${flipped.includes(index) || solved.includes(index) ? style.flipped : ''}`}
                        onClick={() => handleClick(index)}
                    >
                        <div>
                            {card}
                        </div>
                    </div>
                ))}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="End Game Modal"
                    className={`${style.modal}`}
                    style={{
                        overlay: {
                            backgroundColor: 'black',
                        }
                    }}
                >
                    <h2>Congratulations!</h2>
                    {level < 20 ? (
                        <>
                            <p>You've completed Level {level}!</p>
                            <div className={`${style.modalButtonAlign}`}>
                                <button className={`${style.modalButton}`} onClick={() => { navigate(`/home`); setIsModalOpen(false); }}>Go to Home Page</button>
                                <button className={`${style.modalButton}`} onClick={() => { navigate(`/levels/game?level=${parseInt(level) + 1}`); setIsModalOpen(false); }}>Go to Level {parseInt(level) + 1}</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>You've completed the game! Well done!</p>
                            <button className={`${style.modalButton}`} onClick={() => { navigate(`/home`); setIsModalOpen(false); }}>Go to Home Page</button>
                        </>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default Game;
