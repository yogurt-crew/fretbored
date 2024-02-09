export enum Mode {
    Loading,
    Chord,
    Scale,
    FailedRound
}

export enum NoteType {
    ChordTone,
    ScaleDegree,
    OutOfKey
}

export interface ScaleShape {
    label: string,
    shape: string[][]
}
const cShape: ScaleShape = {
    label: "C Shape",
    shape: [
        ["X", "3", "4", "X", "5"],
        ["X", "7", "1", "X", "2"],
        ["X", "5", "X", "6", "X"],
        ["X", "2", "X", "3", "4"],
        ["X", "6", "X", "7", "1"],
        ["X", "3", "4", "X", "5"]
    ]
}
const aShape: ScaleShape = {
    label: "A Shape",
    shape: [
        ["X", "5", "X", "6", "X"],
        ["X", "2", "X", "3", "4"],
        ["6", "X", "7", "1", "X"],
        ["3", "4", "X", "5", "X"],
        ["7", "1", "X", "2", "X"],
        ["X", "5", "X", "6", "X"]
    ]
};
const gShape: ScaleShape = {
    label: "G Shape",
    shape: [
        ["X", "6", "X", "7", "1"],
        ["X", "3", "4", "X", "5"],
        ["7", "1", "X", "2", "X"],
        ["X", "5", "X", "6", "X"],
        ["X", "2", "X", "3", "4"],
        ["X", "6", "X", "7", "1"]
    ]
};
const eShape: ScaleShape = {
    label: "E Shape",
    shape: [
        ["X", "7", "1", "X", "2"],
        ["X", "X", "5", "X", "6"],
        ["X", "2", "X", "3", "4"],
        ["X", "6", "X", "7", "1"],
        ["X", "3", "4", "X", "5"],
        ["X", "7", "1", "X", "2"]
    ]
};
const dShape: ScaleShape = {
    label: "D Shape",
    shape: [
        ["X", "2", "X", "3", "4"],
        ["X", "6", "X", "7", "1"],
        ["3", "4", "X", "5", "X"],
        ["7", "1", "X", "2", "X"],
        ["X", "5", "X", "6", "X"],
        ["X", "2", "X", "3", "4"]
    ]
};
export const scales: ScaleShape[] = [cShape, aShape, gShape, eShape, dShape];

export interface Chord {
    label: string,
    degrees: Set<string>
}
const majorOne: Chord = {
    label: "Ⅰ",
    degrees: new Set(["1", "3", "5"])
};
const minorTwo: Chord = {
    label: "ⅱ",
    degrees: new Set(["2", "4", "6"])
};
const minorThree: Chord = {
    label: "ⅲ",
    degrees: new Set(["3", "5", "7"])
};
const majorFour: Chord = {
    label: "Ⅳ",
    degrees: new Set(["4", "6", "1"])
};
const majorFive: Chord = {
    label: "Ⅴ",
    degrees: new Set(["5", "7", "2"])
};
const minorSix: Chord = {
    label: "ⅵ",
    degrees: new Set(["6", "1", "3"])
};
const diminishedSeven: Chord = {
    label: "ⅶ°",
    degrees: new Set(["7", "2", "4"])
};
const majorOneSeven: Chord = {
    label: "Ⅰ",
    degrees: new Set(["1", "3", "5", "7"])
};
const minorTwoSeven: Chord = {
    label: "ⅱ",
    degrees: new Set(["2", "4", "6", "1"])
};
const minorThreeSeven: Chord = {
    label: "ⅲ",
    degrees: new Set(["3", "5", "7", "2"])
};
const majorFourSeven: Chord = {
    label: "Ⅳ",
    degrees: new Set(["4", "6", "1", "3"])
};
const dominantFiveSeven: Chord = {
    label: "Ⅴ",
    degrees: new Set(["5", "7", "2", "4"])
};
const minorSixSeven: Chord = {
    label: "ⅵ",
    degrees: new Set(["6", "1", "3", "5"])
};
const halfDiminishedSeven: Chord = {
    label: "ⅶ°",
    degrees: new Set(["7", "2", "4", "6"])
};
export const diatonicChords = [majorOne, minorTwo, minorThree, majorFour, majorFive, minorSix, diminishedSeven];
export const diatonicChordsWithSeven = [majorOneSeven, minorTwoSeven, minorThreeSeven, majorFourSeven, dominantFiveSeven, minorSixSeven, halfDiminishedSeven];

export interface Fret {
    isChordTone: boolean,
    inScale: boolean,
    degree: string,
    wrong: boolean,
    show: boolean
}

export const eMajorScale: string[][] =
    [
        ["X", "2", "X", "3", "4", "X", "5", "X", "6", "X", "7", "1"],
        ["X", "6", "X", "7", "1", "X", "2", "X", "3", "4", "X", "5"],
        ["3", "4", "X", "5", "X", "6", "X", "7", "1", "X", "2", "X"],
        ["7", "1", "X", "2", "X", "3", "4", "X", "5", "X", "6", "X"],
        ["X", "5", "X", "6", "X", "7", "1", "X", "2", "X", "3", "4"],
        ["X", "2", "X", "3", "4", "X", "5", "X", "6", "X", "7", "1"],
    ];

export const randomizeKey = (scale: string[][]): string[][] => {
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