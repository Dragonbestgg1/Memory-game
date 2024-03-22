import React from "react";
import style from "../styles/levels.module.css"
import { Link } from "react-router-dom";

function getColor(level) {
    const red = Math.min(255, level * 12);
    const green = 255 - red;
    return `rgb(${red}, ${green}, 0)`;
}


function Levels() {
    const levels = Array.from({ length: 20 }, (_, i) => i + 1);

    return (
        <div className={`${style.main}`}>
            <h1 className={`${style.levelsH1}`}>Levels</h1>
            <div className={`${style.levelsDisplay}`}>
                {levels.map(level => (
                    <Link
                        key={level}
                        to={`/levels/game?level=${level}`}
                        className={`${style.level}`}
                        style={{
                            backgroundColor: getColor(level),
                        }}
                    >
                        {`Level ${level}`}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Levels;