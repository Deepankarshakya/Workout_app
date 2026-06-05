export interface WorkoutLog {
    id: string,
    workoutSlug: string,
    workoutName: string,
    completedAt: string,
    totalDuration: number,
    exercisesCompleted: number,
}



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