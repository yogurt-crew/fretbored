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
export const cShape: ScaleShape = {
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
export const aShape: ScaleShape = {
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
export const gShape: ScaleShape = {
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
export const eShape: ScaleShape = {
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
export const dShape: ScaleShape = {
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

export interface Chord {
    label: string,
    degrees: Set<string>
}
export const majorOne: Chord = {
    label: "Ⅰ",
    degrees: new Set(["1", "3", "5", "7"])
};
export const minorTwo: Chord = {
    label: "ⅱ",
    degrees: new Set(["2", "4", "6", "1"])
};
export const minorThree: Chord = {
    label: "ⅲ",
    degrees: new Set(["3", "5", "7", "2"])
};
export const majorFour: Chord = {
    label: "Ⅳ",
    degrees: new Set(["4", "6", "1", "3"])
};
export const majorFive: Chord = {
    label: "Ⅴ",
    degrees: new Set(["5", "7", "2", "4"])
};
export const minorSix: Chord = {
    label: "ⅵ",
    degrees: new Set(["6", "1", "3", "5"])
};
export const diminishedSeven: Chord = {
    label: "ⅶ°",
    degrees: new Set(["7", "2", "4", "6"])
};
export interface Fret {
    isChordTone: boolean,
    inScale: boolean,
    degree: string,
    wrong: boolean,
    show: boolean
}