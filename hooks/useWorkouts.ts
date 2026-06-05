import { Workout } from "../types/data";
import { getWorkouts } from "../storage/workout";
import { useEffect, useState } from "react";

import { useIsFocused } from "@react-navigation/native";

import { supabase } from "../lib/supabase";
import { fetchWorkouts } from "../lib/supabaseWorkouts";
import { saveWorkouts } from "../storage/workout";

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getData() {
      const localWorkouts = await getWorkouts();

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const remoteWorkouts = await fetchWorkouts(user.id);

          if (remoteWorkouts) {
  await saveWorkouts(remoteWorkouts);

  setWorkouts(remoteWorkouts);
  return;
}
        }
      } catch (error) {
        console.log("Supabase fetch failed", error);
      }

      setWorkouts(localWorkouts);
    }

    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  return workouts;
};