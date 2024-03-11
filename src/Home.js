import React from "react";
import style from "../src/styles/home.module.css";

function Home() {
    return(
        <div className={`${style.main}`}>
            <div className={`${style.title}`}>
                 <h1 className={`${style.titleName}`}>Welcome back</h1>{/*if logged in - welcome back, if first time log in - hello, else - Welcome to Casual Memory Game */}
            </div>
            <div className={`${style.suggest}`}>
                <div className={`${style.suggestBox}`}>
                    <h1 className={`${style.suggestionName}`}>Next level on your list</h1>
                    <div className={`${style.levelNext}`}>

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