



export type Difficulty = "easy" | "normal" | "hard"
export type SequenceType = "exercise" | "streach" | "break"

export interface Workout {                                                  
    slug: string,
    name: string,
    duration: number,
    difficulty: Difficulty,
    sequence: SequenceItems[]
}

export interface SequenceItems {
    slug: string,
    name: string,
    type: SequenceType,
    duration: number,
    reps?: number
}