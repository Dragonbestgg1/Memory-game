import React, { useEffect, useState } from "react";
import axios from 'axios';
import style from "../styles/leader.module.css"

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes} minutes ${seconds.toFixed(2)} seconds` : `${seconds.toFixed(2)} seconds`;
}

function LeaderBoard() {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        axios.get('/users') // Replace with your actual API endpoint
            .then(response => {
                const sortedData = response.data
                    .map(user => ({ ...user, timeInSeconds: JSON.parse(user.personal_best_times)[0] / 1000 }))
                    .filter(user => user.timeInSeconds >= 0.1)
                    .sort((a, b) => a.timeInSeconds - b.timeInSeconds);
                setLeaderboardData(sortedData);
            })
            .catch(error => {
                console.error('Error fetching leaderboard data:', error);
            });
    }, []);


    return (
        <div className={`${style.main}`}>
            <h1 className={`${style.LeaderBoard}`}>LeaderBoard</h1>
            <div className={`${style.leaderList}`}>
                {leaderboardData.map((user, index) => {
                    let className = `${style.leaderRest}`;
                    if (index === 0) className = `${style.leader1}`;
                    else if (index === 1) className = `${style.leader2}`;
                    else if (index === 2) className = `${style.leader3}`;

                    return (
                        <h1 key={index} className={className}>
                            {index + 1}. {user.username} - {formatTime(user.timeInSeconds * 1000)}
                        </h1>
                    );
                })}

            </div>
        </div>
    )
}

export default LeaderBoard;
