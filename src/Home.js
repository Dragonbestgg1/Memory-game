import React, { useEffect, useState } from "react";
import style from "../src/styles/home.module.css";
import Cookies from 'js-cookie';
import { findLastIndex } from 'lodash';
import { Link } from "react-router-dom";

function Home() {
    const [nextLevel, setNextLevel] = useState(0);
    const [user, setUser] = useState(null); // Define 'user' here

    useEffect(() => {
        const userData = Cookies.get('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);
            setUser(parsedData); // Set 'user' here
            const personalBestTimes = JSON.parse(parsedData.personal_best_times);
            const lastCompletedLevel = findLastIndex(personalBestTimes, time => time > 0);
            setNextLevel(lastCompletedLevel + 2); // +2 because array is 0-indexed and we want the next level
        }
    }, []);

    return (
        <div className={`${style.main}`}>
            <div className={`${style.title}`}>
                {user && (
                    <h1 className={`${style.titleName}`}>Welcome back</h1>
                )}
            </div>
            <div className={`${style.suggest}`}>
                {user && (
                    <div className={`${style.suggestBox}`}>
                        <h1 className={`${style.suggestionName}`}>Next level on your list</h1>
                        <div className={`${style.levelNext}`}>
                            {nextLevel > 20 ? (
                                <p>You have completed the game</p>
                            ) : (
                                <Link className={`${style.nextLevel}`} to={`/levels/game?level=${nextLevel}`}>Level {nextLevel}</Link>
                            )}
                        </div>
                    </div>
                )}
                {user && (
                    <div className={`${style.suggestBox}`}>
                        <h1 className={`${style.suggestionName}`}>Daily challenge</h1>
                        <div className={`${style.levelDaily}`}>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Home;
