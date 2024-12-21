import NameWorkout from "@/components/workouts/name-workout";
import { fetchExerciseList } from "@/services/workouts/workout-store";
import { createClient } from "@/utils/supabase/server";
import { checkUserAuth } from "@/services/users/check-user";

export default async function Page() {
    await checkUserAuth();
    const exerciseList = await fetchExerciseList();

    return(
       <NameWorkout exercises={exerciseList ?? []}/>
        
    );
}