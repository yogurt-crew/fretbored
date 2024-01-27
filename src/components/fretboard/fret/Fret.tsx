import React, { useEffect } from 'react';
import { NoteType } from '../../../variables/constants';
import './Fret.scss';

const Fret = (props: { show: boolean, handleFretClick: (i: number, j: number) => void, row: number, col: number, bottom: boolean, degree: string, noteType: NoteType, wrong: boolean, numFrets: number }) => {

    const handleClick = () => {
        props.handleFretClick(props.row, props.col);
    }

    const getNoteTypeClassName = (noteType: NoteType): string => {
        if (noteType === NoteType.ChordTone) {
            if(props.wrong) {
                return "wrong-chord";
            }
            return "chord-tone";
        }
        else if (noteType === NoteType.ScaleDegree) {
            if(props.wrong) {
                return "wrong-scale";
            }
            return "scale-degree";
        }
        else if (noteType === NoteType.OutOfKey) {
            return "wrong";
        }
        throw new Error("Unrecognized note type");
    }

    const getFretClassName = () => {
        let fretClassName = '';
        if(props.bottom) {
            fretClassName += 'bottom ';
        }
        if(props.numFrets === 5) {
            fretClassName += 'five-frets ';
        }
        else if(props.numFrets === 12) {
            fretClassName += 'twelve-frets ';
        }
        return fretClassName;
    }

    return (
        <div className={getFretClassName()}>
            <div className="hitbox" onClick={handleClick}>
                {props.show && <div className={`fret-number ${getNoteTypeClassName(props.noteType)}`}>
                    {props.degree}
                </div>}
            </div>
        </div>
    )
}

export default Fret;