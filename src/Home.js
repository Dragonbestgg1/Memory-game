import React, { useEffect, useState } from "react";
import style from "../src/styles/home.module.css";
import Cookies from 'js-cookie';
import { findLastIndex } from 'lodash';
import { Link } from "react-router-dom";

function Home() {
    const [nextLevel, setNextLevel] = useState(0);

    useEffect(() => {
        const userData = Cookies.get('userData');
        if (userData) {
            const parsedData = JSON.parse(userData);
            const personalBestTimes = JSON.parse(parsedData.personal_best_times);
            const lastCompletedLevel = findLastIndex(personalBestTimes, time => time > 0);
            setNextLevel(lastCompletedLevel + 2); // +2 because array is 0-indexed and we want the next level
        }
    }, []);
    

    return(
        <div className={`${style.main}`}>
            <div className={`${style.title}`}>
                 <h1 className={`${style.titleName}`}>Welcome back</h1>{/*if logged in - welcome back, if first time log in - hello, else - Welcome to Casual Memory Game */}
            </div>
            <div className={`${style.suggest}`}>
                <div className={`${style.suggestBox}`}>
                    <h1 className={`${style.suggestionName}`}>Next level on your list</h1>
                    <div className={`${style.levelNext}`}>
                        <Link className={`${style.nextLevel}`} to={`/levels/game?level=${nextLevel}`}>Level {nextLevel}</Link>
                    </div>
                </div>
                <div className={`${style.suggestBox}`}>
                    <h1 className={`${style.suggestionName}`}>Daily challenge</h1>
                    <div className={`${style.levelDaily}`}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
