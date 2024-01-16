import React, { useEffect } from 'react';
import { NoteType } from '../../../variables/constants';
import './Fret.scss';

const Fret = (props: { show: boolean, handleFretClick: (i: number, j: number) => void, row: number, col: number, bottom: boolean, degree: string, noteType: NoteType, wrong: boolean }) => {

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

    return (
        <div className={`fret ${props.bottom ? 'bottom' : ''}`}>
            <div className="hitbox" onClick={handleClick}>
                {props.show && <div className={`fret-number ${getNoteTypeClassName(props.noteType)}`}>
                    {props.degree}
                </div>}
            </div>
        </div>
    )
}

export default Fret;