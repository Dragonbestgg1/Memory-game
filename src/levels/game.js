import React, { useState, useEffect, useRef, useReducer } from "react";
import style from "../styles/levels.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Cookies from 'js-cookie';
import axios from "axios";

const initialState = {
    stage: 0,
    cards: [],
    flipped: [],
    solved: [],
    numSolved: 0,
    gameStatus: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'ADVANCE_STAGE':
            return {
                ...state,
                stage: state.stage + 1,
                cards: [],
                flipped: [],
                solved: [],
                numSolved: 0,
                gameStatus: '',
            };
        case 'END_GAME':
            return {
                ...state,
                gameStatus: 'endGame',
            };
        case 'SET_LEVEL':
            return {
                ...state,
                cards: [],
                flipped: [],
                solved: [],
                numSolved: 0,
                gameStatus: '',
            };
        case 'RESET_GAME':
            return {
                ...state,
                cards: [],
                flipped: [],
                solved: [],
                numSolved: 0,
                gameStatus: '',
            };
        case 'SET_CARDS':
            return {
                ...state,
                cards: action.payload,
            };
        case 'SET_FLIPPED':
            return {
                ...state,
                flipped: action.payload,
            };
        case 'SET_SOLVED':
            return {
                ...state,
                solved: action.payload,
            };
        case 'SET_NUM_SOLVED':
            return {
                ...state,
                numSolved: action.payload,
            };
        case 'SET_DISABLE_CLICK':
            return {
                ...state,
                disableClick: action.payload,
            };
        default:
            throw new Error();
    }
}
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}


function Game() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const location = useLocation();
    const navigate = useNavigate();
    const level = new URLSearchParams(location.search).get('level');
    const [hasStarted, setHasStarted] = useState(false);
    const [totalStages, setTotalStages] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const stageRef = useRef(state.stage);
    const [cardsGenerated, setCardsGenerated] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const userData = Cookies.get('userData');
    const userId = JSON.parse(userData).id; 

    useEffect(() => {
        stageRef.current = state.stage;
    }, [state.stage]);

    // Reset game state and generate cards
    useEffect(() => {
        dispatch({ type: 'RESET_GAME' });
        dispatch({ type: 'SET_LEVEL' });

        setCardsGenerated(true); // Set cardsGenerated to true
        let totalCards = level * 3;
        if (totalCards % 2 !== 0) {
            totalCards += 1;
        }
        const numStages = Math.ceil(totalCards / 20);
        setTotalStages(numStages);

        let numCards;
        if (state.stage < numStages - 1) {
            numCards = 20;
        } else {
            numCards = totalCards - (numStages - 1) * 20;
            if (numCards < 4) {
                numCards += 2;
            }
        }

        const faces = ['🍎', '🍌', '🍒', '🍇', '🍓', '🍍', '🍑', '🍉', '🍏', '🍆'];
        while (faces.length < numCards / 2) {
            faces.push(...faces);
        }
        let cardFaces = faces.slice(0, numCards / 2).flatMap(face => [face, face]);
        dispatch({ type: 'SET_CARDS', payload: cardFaces.sort(() => Math.random() - 0.5) });

        dispatch({ type: 'SET_FLIPPED', payload: cardFaces.map((_, index) => index) });

        const timeoutId = setTimeout(() => {
            dispatch({ type: 'SET_FLIPPED', payload: [] });
            setHasStarted(true);
            setStartTime(Date.now());
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [level, state.stage, cardsGenerated]);
    const handleClick = (index) => {
        if (!hasStarted || state.flipped.length === 2 || state.solved.includes(index) || state.disableClick) {
            return;
        }
        dispatch({ type: 'SET_FLIPPED', payload: [...state.flipped, index] });
    }

    useEffect(() => {
        if (hasStarted && !isModalOpen) {
            const intervalId = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [hasStarted, isModalOpen, startTime]);


    // Handle card flipping
    useEffect(() => {
        if (state.flipped.length === 2) {
            const match = state.cards[state.flipped[0]] === state.cards[state.flipped[1]];
            if (match) {
                dispatch({ type: 'SET_SOLVED', payload: [...state.solved, ...state.flipped] });
                dispatch({ type: 'SET_FLIPPED', payload: [] });
                dispatch({ type: 'SET_NUM_SOLVED', payload: state.numSolved + 2 });
            } else {
                dispatch({ type: 'SET_DISABLE_CLICK', payload: true });
                setTimeout(() => {
                    dispatch({ type: 'SET_FLIPPED', payload: [] });
                    dispatch({ type: 'SET_DISABLE_CLICK', payload: false });
                }, 500);
            }
        }
    }, [state.flipped]);

    useEffect(() => {
        if (hasStarted && state.numSolved === state.cards.length && cardsGenerated) {
            setTimeout(() => {
                if (stageRef.current <= totalStages) {
                    dispatch({ type: 'ADVANCE_STAGE' });
                } else {
                    dispatch({ type: 'END_GAME' });
                    setIsModalOpen(true)
                }
            }, 1000); // Delay of 10 seconds
        }
    }, [state.numSolved, state.cards.length, state.stage, cardsGenerated]);

    useEffect(() => {
        if (state.gameStatus === 'endGame') {
            clearInterval(intervalIdRef.current);
        }
    }, [state.gameStatus]);

    useEffect(() => {
        if (state.gameStatus === 'endGame') {
            clearInterval(intervalIdRef.current);
    
            // Adjust the level to match the array index
            const adjustedLevel = level - 1;
    
            // Get the user's current personal best time for this level from the database
            axios.get(`/users/${userId}`).then(response => {
                const user = response.data;
                const currentBestTime = JSON.parse(user.personal_best_times)[adjustedLevel];
    
                // Only update the time if it's a new personal best or if the current best time is 0
                if (elapsedTime < currentBestTime || currentBestTime === 0) {
                    const updatedTimes = [...JSON.parse(user.personal_best_times)];
                    updatedTimes[adjustedLevel] = elapsedTime;
    
                    // update the database with the new times
                    axios.put(`/users/${userId}`, {
                        personal_best_times: JSON.stringify(updatedTimes)
                    });
    
                    // update the cookie with the new times
                    const userData = Cookies.get('userData');
                    const parsedData = JSON.parse(userData);
                    parsedData.personal_best_times = JSON.stringify(updatedTimes);
                    Cookies.set('userData', JSON.stringify(parsedData));
                }
    
                // If the level is 3 and the game is completed, update unlocked_styles
                if (level === '3') {
                    const unlocked_styles = JSON.parse(user.unlocked_styles);
                    unlocked_styles[1] = 1;
    
                    // update the database with the new unlocked_styles
                    axios.put(`/users/${userId}`, {
                        unlocked_styles: JSON.stringify(unlocked_styles)
                    });
    
                    // update the cookie with the new unlocked_styles
                    const userData = Cookies.get('userData');
                    const parsedData = JSON.parse(userData);
                    parsedData.unlocked_styles = JSON.stringify(unlocked_styles);
                    Cookies.set('userData', JSON.stringify(parsedData));
                }
            });
    
            setIsModalOpen(true);
        }
    }, [state.gameStatus]);
    
    
    
    return (
        <div className={style.mainGame}>
            <h1 className={style.gameH1}>Level {parseInt(level)}</h1>
            <div className={style.gameContainer}>
                {state.cards.map((card, index) => (
                    <div
                        className={`${style.card} ${state.flipped.includes(index) || state.solved.includes(index) ? style.flipped : ''}`}
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
                            <p>
                                Your time {formatTime(elapsedTime)}!
                            </p>
                            <div className={`${style.modalButtonAlign}`}>
                                <button className={`${style.modalButton}`} onClick={() => { navigate(`/`); setIsModalOpen(false); }}>Go to Home Page</button>
                                <button className={`${style.modalButton}`} onClick={() => { navigate(`/levels/game?level=${parseInt(level) + 1}`); setIsModalOpen(false); }}>Go to Level {parseInt(level) + 1}</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p>You've completed the game! Well done!</p>
                            <button className={`${style.modalButton}`} onClick={() => { navigate(`/`); setIsModalOpen(false); }}>Go to Home Page</button>
                        </>
                    )}
                </Modal>
            </div>
        </div>
    )
}

export default Game;
