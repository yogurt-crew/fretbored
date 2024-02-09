import React, { useEffect, useState } from 'react';
import './TriadGame.scss'
import Fretboard from './fretboard/Fretboard';
import { diatonicChords, diatonicChordsWithSeven, eMajorScale, Mode, Fret, ScaleShape, Chord, randomizeKey } from '../variables/constants';
import Label from './labels/Label';
import Score from './labels/Score';
import Lives from './labels/Lives';
import Settings from './settings/Settings';
import HomeIcon from './home/HomeIcon';

const chordsEqual = (chord1?: Chord | null, chord2?: Chord): boolean => {
    if (!chord1 || !chord2) {
        return false;
    }
    return chord1?.degrees && chord2?.degrees && chord1.degrees.size === chord2.degrees.size && Array.from(chord1.degrees).every(value => chord2.degrees.has(value));
}

const TriadGame = (props: { setChoose: () => void }) => {
    const [scale, setScale] = useState<string[][] | null>(null);
    const [chord, setChord] = useState<Chord | null>(null);
    const [withSeven, setWithSeven] = useState(false);
    const [board, setBoard] = useState<Fret[][]>([]);
    const [mode, setMode] = useState(Mode.Loading);
    const [label, setLabel] = useState('');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [useAllStrings, setUseAllStrings] = useState(false);

    useEffect(() => {
        newScaleAndChord();
    }, []);

    useEffect(() => {
        if (mode === Mode.Chord && checkAllChordTonesClicked()) {
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

    const randomizeKey = (scale: string[][]): string[][] => {
        let newScale: string[][] = [];
        const startInd: number = Math.floor(Math.random() * scale[0].length);
        for (let r = 0; r < scale.length; r++) {
            newScale.push([]);
            for (let c = 0; c < scale[0].length; c++) {
                newScale[r].push(scale[r][(startInd + c) % scale[0].length]);
            }
        }
        return newScale;
    }

    const newScaleAndChord = () => {
        let randomScale = eMajorScale;
        randomScale = randomizeKey(randomScale);
        setScale(randomScale);
        if (withSeven) {
            let randomChordWithSeven = diatonicChordsWithSeven[Math.floor(Math.random() * diatonicChordsWithSeven.length)];
            if (chordsEqual(chord, randomChordWithSeven)) {
                randomChordWithSeven = diatonicChordsWithSeven[(Math.floor(Math.random() * diatonicChordsWithSeven.length) + 1) % diatonicChordsWithSeven.length];
            }
            setChord(randomChordWithSeven);
        }
        else {
            let randomChord = diatonicChords[Math.floor(Math.random() * diatonicChords.length)];
            if (chordsEqual(chord, randomChord)) {
                randomChord = diatonicChords[(Math.floor(Math.random() * diatonicChordsWithSeven.length) + 1) % diatonicChordsWithSeven.length];
            }
            setChord(randomChord);
        }
    }

    const resetBoard = () => {
        let firstOptions: number[][] = [];
        let tempBoard: Fret[][] = [];
        const bottomString = useAllStrings ? Math.floor(Math.random() * 4) : 0;
        const topString = bottomString + 2;
        scale?.forEach((row, i) => {
            tempBoard.push(new Array<Fret>(5));
            const inRange = i >= bottomString && i <= topString;
            console.log(bottomString, topString, i, inRange);
            row.forEach((num, j) => {
                let fret: Fret = {
                    isChordTone: (inRange && chord?.degrees.has(num)) ?? false,
                    inScale: false,
                    degree: num,
                    wrong: num === "X" || !inRange,
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
                <Settings withSeven={withSeven} setWithSeven={setWithSeven} useAllStrings={useAllStrings} setUseAllStrings={setUseAllStrings} />
                <HomeIcon setChoose={props.setChoose} />
            </div>
        </div>
        <Fretboard board={board} handleFretClick={handleFretClick} />
    </div>
}

export default TriadGame;