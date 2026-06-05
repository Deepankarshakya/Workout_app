import { getData, storeData, removeItem } from ".";
import { WorkoutLog } from "../types/data";

const STORAGE_KEY = "workout-log-data";

export const getWorkoutLogs = async (): Promise<WorkoutLog[]> => {
    const logs = await getData(STORAGE_KEY);
    return logs ?? [];
}

export const storeWorkoutLog = async (log: WorkoutLog) : Promise<void> => {
    const logs = await getWorkoutLogs();
    await storeData(STORAGE_KEY, [log, ...logs]);
}

export const clearWorkoutLogs = async (): Promise<void> => {
    await removeItem(STORAGE_KEY);
}