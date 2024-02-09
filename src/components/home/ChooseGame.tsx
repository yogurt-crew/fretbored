import React from "react";
import './ChooseGame.scss';

const ChooseGame = (props: { setShape: () => void, setBoard: () => void, setTriads: () => void }) => {
    return (
        <div className='choose-game-page'>
            <div className='selection-box'>
                <div className='mode-label'>
                    Select Mode
                </div>
                <div className='game-option-box' onClick={props.setShape}>
                    Arpeggios in Shapes
                </div>
                <div className='game-option-box' onClick={props.setBoard}>
                    Arpeggios on Entire Board
                </div>
                <div className='game-option-box' onClick={props.setTriads}>
                    Triads on Entire Board
                </div>
            </div>
        </div>
    )
}

export default ChooseGame;