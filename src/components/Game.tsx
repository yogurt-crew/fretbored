import React, { useEffect, useState } from 'react';
import './Game.scss'
import Fretboard from './fretboard/Fretboard';
import { scales, diatonicChords, diatonicChordsWithSeven, Mode, Fret, ScaleShape, Chord } from '../variables/constants';
import Label from './labels/Label';
import Score from './labels/Score';
import Lives from './labels/Lives';
import Settings from './settings/Settings';
import HomeIcon from './home/HomeIcon';

const Game = (props: { setChoose: () => void }) => {
    const [scale, setScale] = useState<ScaleShape | null>(null);
    const [chord, setChord] = useState<Chord | null>(null);
    const [withSeven, setWithSeven] = useState(true);
    const [useScaleMode, setUseScaleMode] = useState(false);
    const [board, setBoard] = useState<Fret[][]>([]);
    const [mode, setMode] = useState(Mode.Loading);
    const [label, setLabel] = useState('');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);

    useEffect(() => {
        newScaleAndChord();
    }, []);

    useEffect(() => {
        if (mode === Mode.Chord && checkAllChordTonesClicked()) {
            if (useScaleMode) {
                setMode(Mode.Scale);
                setLabel(scale?.label ?? '');
            }
            else {
                setMode(Mode.Loading);
                setLabel('');
                winRound();
            }
        }
        else if (mode === Mode.Scale && checkAllScaleDegreesClicked()) {
            setMode(Mode.Loading);
            setLabel('');
            winRound();
        }
    }, [board]);

    useEffect(() => {
        if (scale && chord) {
            resetBoard();
        }
    }, [scale, chord]);

    const newScaleAndChord = () => {
        setScale(scales[Math.floor(Math.random() * scales.length)]);
        if (withSeven) {
            setChord(diatonicChordsWithSeven[Math.floor(Math.random() * diatonicChordsWithSeven.length)]);
        }
        else {
            setChord(diatonicChords[Math.floor(Math.random() * diatonicChords.length)]);
        }
    }

    const resetBoard = () => {
        let firstOptions: number[][] = [];
        let tempBoard: Fret[][] = [];
        scale?.shape.forEach((row, i) => {
            tempBoard.push(new Array<Fret>(5));
            row.forEach((num, j) => {
                let fret: Fret = {
                    isChordTone: chord?.degrees.has(num) ?? false,
                    inScale: num !== "X",
                    degree: num,
                    wrong: num === "X",
                    show: false
                }
                if (fret.isChordTone) {
                    firstOptions.push([i, j])
                }
                tempBoard[i][j] = fret;
            })
        })
        const first = firstOptions[Math.floor(Math.random() * firstOptions.length)];
        tempBoard[first[0]][first[1]].show = true;
        setBoard(tempBoard);
        setMode(Mode.Chord);
        setLabel(chord?.label ?? '');
    }

    const checkAllChordTonesClicked = (): boolean => {
        if (board.find(row => row.find(fret => fret.isChordTone && !fret.show))) {
            return false;
        }
        return true;
    }

    const checkAllScaleDegreesClicked = () => {
        if (board.find(row => row.find(fret => fret.inScale && !fret.show))) {
            return false;
        }
        return true;
    }

    const failedChord = () => {
        setLives(lives - 1);
        setMode(Mode.FailedRound);
        const newBoard = [...board];
        newBoard.forEach((row, i) => row.forEach((fret, j) => {
            if (fret.isChordTone && !fret.show) {
                fret.wrong = true;
                fret.show = true;
            }
        }));
        setBoard(newBoard);
    }

    const failedScale = () => {
        setLives(lives - 1);
        setMode(Mode.FailedRound);
        const newBoard = [...board];
        newBoard.forEach((row, i) => row.forEach((fret, j) => {
            if (fret.inScale && !fret.show) {
                fret.wrong = true;
                fret.show = true;
            }
        }));
        setBoard(newBoard);
    }

    const handleFretClick = (i: number, j: number) => {
        if (lives === 0) {
            loseGame();
        }
        if (mode === Mode.FailedRound) {
            newScaleAndChord();
        }
        if (mode === Mode.Chord) {
            if (board[i][j].isChordTone) {
                const newBoard = [...board];
                newBoard[i][j].show = true;
                setBoard(newBoard);
            }
            else {
                failedChord();
            }
        }
        else if (mode === Mode.Scale) {
            if (board[i][j].inScale) {
                const newBoard = [...board];
                newBoard[i][j].show = true;
                setBoard(newBoard);
            }
            else {
                failedScale();
            }
        }
    }

    const winRound = () => {
        setScore(score + 1);
        newScaleAndChord();
    }

    const loseGame = () => {
        if (lives === 0) {
            const highScore = Number(localStorage.getItem('high-score') || 0);
            if (score > highScore) {
                localStorage.setItem('high-score', score.toString());
            }
            setScore(0);
            setLives(3);
        }
    }

    return <div className="game">
        <div className="header">
            <Score currentScore={score} />
            <Label label={label} />
            <div className='settings-lives'>
                <Lives lives={lives} />
                <Settings withSeven={withSeven} setWithSeven={setWithSeven} useScaleMode={useScaleMode} setUseScaleMode={setUseScaleMode} />
                <HomeIcon setChoose={props.setChoose} />
            </div>
        </div>
        <Fretboard board={board} handleFretClick={handleFretClick} />
    </div>
}

export default Game;