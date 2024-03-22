import React from "react";
import style from "../styles/leader.module.css"

function LeaderBoard(){
    return(
        <div className={`${style.main}`}>
            <h1 className={`${style.LeaderBoard}`}>LeaderBoard</h1>
            <div className={`${style.leaderList}`}>
                <h1 className={`${style.leader1}`}>1. Es</h1>
                <h1 className={`${style.leader2}`}>2. Tu</h1>
                <h1 className={`${style.leader3}`}>3. Kaut kas</h1>
                <h1 className={`${style.leaderRest}`}>4. Jim Beam</h1>
            </div>
        </div>
    )
}

export default LeaderBoard;