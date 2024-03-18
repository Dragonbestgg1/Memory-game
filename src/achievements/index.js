import React from "react";
import style from "../styles/achievements.module.css";

function Achievements() {
    return (
        <div className={`${style.main}`}>
            <h1 className={`${style.title}`}>Achievements</h1>
            <div className={`${style.wholeAchievements}`}>
                <div className={`${style.doneAchievements}`}>
                    <h1 className={`${style.completedH1}`}>Completed achievements</h1>
                    <div className={`${style.contain}`}>
                        <div className={`${style.achievementBox}`}>
                            <h1 className={`${style.achievementTitle}`}>It's litterary the first Level</h1>
                            <h1 className={`${style.achievementH1}`}>Fail level 1</h1>
                            <h1 className={`${style.achievementPro}`}>0.01% Achieved this</h1>
                        </div>
                        <div className={`${style.achievementBox}`}>
                            <h1 className={`${style.achievementTitle}`}>It's litterary the first Level</h1>
                            <h1 className={`${style.achievementH1}`}>Fail level 1</h1>
                            <h1 className={`${style.achievementPro}`}>0.01% Achieved this</h1>
                        </div>
                    </div>
                </div>
                <div className={`${style.notAchieved}`}>
                    <h1 className={`${style.notH1}`}>Haven't achieved yet</h1>
                    <div className={`${style.contain}`}>
                        <div className={`${style.achievementBox}`}>
                            <h1 className={`${style.achievementTitle}`}>It's litterary the first Level</h1>
                            <h1 className={`${style.achievementH1}`}>Fail level 1</h1>
                            <h1 className={`${style.achievementPro}`}>0.01% Achieved this</h1>
                        </div>
                        <div className={`${style.achievementBox}`}>
                            <h1 className={`${style.achievementTitle}`}>It's litterary the first Level</h1>
                            <h1 className={`${style.achievementH1}`}>Fail level 1</h1>
                            <h1 className={`${style.achievementPro}`}>0.01% Achieved this</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievements;
