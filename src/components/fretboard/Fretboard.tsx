import React, { useState, useEffect } from 'react';
import './Fretboard.scss';
import { Fret as FretObj } from '../../variables/constants';
import Fret from './fret/Fret';
import { NoteType } from '../../variables/constants';

const Fretboard = (props: { board: FretObj[][], handleFretClick: (i: number, j: number) => void }) => {

    const getNoteType = (i: number, j: number) => {
        if(props.board[i][j].isChordTone) {
            return NoteType.ChordTone;
        }
        else if(props.board[i][j].inScale) {
            return NoteType.ScaleDegree;
        }
        return NoteType.OutOfKey;
    }

    return (
        <div className="fretboard">
            {props.board.map((row, i) => {
                return <div key={i} className={`row ${i == 5 ? 'bottom' : ''}`}>
                    {row.map((fret, j) =>
                        <Fret key={`${i} ${j}`} show={fret.show} handleFretClick={props.handleFretClick} row={i} col={j} bottom={i == 5} degree={fret.degree} noteType={getNoteType(i, j)} wrong={fret.wrong}/>
                    )}
                </div>
            })}
        </div>
    )
}

export default Fretboard;