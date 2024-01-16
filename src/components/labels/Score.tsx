import React, { useEffect, useState } from "react";
import { Mode } from "../../variables/constants";
import "./Score.scss";

const Score = (props: { currentScore: number }) => {

    const [highScore, setHighScore] = useState<string>(localStorage.getItem('high-score') || '0');

    useEffect(() => {
        setHighScore(localStorage.getItem('high-score') || '0');
    }, [localStorage.getItem('high-score')]);

    return (
        <div className="score">
            <div>
                Current Score: {props.currentScore}
            </div>
            <div>
                High Score: {highScore}
            </div>
        </div>
    )
}

export default Score;