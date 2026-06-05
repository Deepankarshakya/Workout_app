import { supabase } from "./supabase";
import { Workout, WorkoutLog } from "../types/data";

// ─── WORKOUTS ───

export const fetchWorkouts = async (userId: string): Promise<Workout[]> => {
  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data.map((w: any) => ({
    slug: w.slug,
    name: w.name,
    duration: w.duration,
    difficulty: w.difficulty,
    sequence: w.sequence,
  }));
};

export const saveWorkoutToSupabase = async (userId: string, workout: Workout): Promise<void> => {
  const { error } = await supabase.from("workouts").upsert({
    user_id: userId,
    slug: workout.slug,
    name: workout.name,
    duration: workout.duration,
    difficulty: workout.difficulty,
    sequence: workout.sequence,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id,slug" });

  if (error) throw error;
};

export const deleteWorkoutFromSupabase = async (userId: string, slug: string): Promise<void> => {
  const { error } = await supabase
    .from("workouts")
    .delete()
    .eq("user_id", userId)
    .eq("slug", slug);

  if (error) throw error;
};

// ─── WORKOUT LOGS ───

export const fetchWorkoutLogs = async (userId: string): Promise<WorkoutLog[]> => {
  const { data, error } = await supabase
    .from("workout_logs")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });

  if (error) throw error;
  return data.map((l: any) => ({
    id: l.id,
    workoutSlug: l.workout_slug,
    workoutName: l.workout_name,
    completedAt: l.completed_at,
    totalDuration: l.total_duration,
    exercisesCompleted: l.exercises_completed,
  }));
};

export const saveWorkoutLogToSupabase = async (userId: string, log: WorkoutLog): Promise<void> => {
  const { error } = await supabase.from("workout_logs").insert({
    user_id: userId,
    workout_slug: log.workoutSlug,
    workout_name: log.workoutName,
    completed_at: log.completedAt,
    total_duration: log.totalDuration,
    exercises_completed: log.exercisesCompleted,
  });

  if (error) throw error;
};