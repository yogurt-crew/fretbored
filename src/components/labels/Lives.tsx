import React from "react";
import "./Lives.scss";

const Lives = (props: { lives: number }) => {
    return (
        <div className="lives">
            <div className={props.lives < 1 ? 'dead' : ''}>
                ♥ 
            </div>
            <div className={props.lives < 2 ? 'dead' : ''}>
                ♥
            </div>
            <div className={props.lives < 3 ? 'dead' : ''}>
                ♥
            </div>
        </div>
    )
}

export default Lives;