import { containsKey, getData, removeItem, storeData } from ".";
import data from "../data.json";
import { Workout } from "../types/data";



export const getWorkouts = async (): Promise<Workout[]> => {
    const workouts = await getData("workout-data");
    return workouts;
}

export const getWorkoutBySlug = async(slug: string): Promise<Workout>  => {
    const workouts = await getWorkouts();
    const workout = workouts.filter(w => w.slug === slug)[0]
    return workout;
}

export const saveWorkouts = async (
  workouts: Workout[]
): Promise<void> => {
  await storeData("workout-data", workouts);
};

export const initWorkouts = async ():Promise<boolean> => {
    const hasWorkouts = await containsKey("workout-data");
    if (!hasWorkouts) {
        await storeData("workout-data", data);
        return true;
    }

    return false;
}

export const storeWorkout = async (newWorkout: Workout): Promise<boolean> => {
    const workouts = await getWorkouts();
    await storeData("workout-data", [...workouts, newWorkout]);
    return true;
}

export const deleteWorkout = async (slug: string): Promise<void> => {
    const workouts = await getWorkouts();
    const filtered = workouts.filter(w => w.slug !== slug);
    await storeData("workout-data", filtered);
}

export const clearWorkouts = async() => {
    await removeItem("workout-data");
}