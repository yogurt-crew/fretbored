import React from "react";
import './ChooseGame.scss';

const ChooseGame = (props: { setShape: () => void, setBoard: () => void }) => {
    return (
        <div className='choose-game-page'>
            <div className='selection-box'>
                <div className='mode-label'>
                    Select Mode
                </div>
                <div className='shape-box' onClick={props.setShape}>
                    Arpeggios in Shapes
                </div>
                <div className='board-box' onClick={props.setBoard}>
                    Arpeggios on Entire Board
                </div>
            </div>
        </div>
    )
}

export default ChooseGame;