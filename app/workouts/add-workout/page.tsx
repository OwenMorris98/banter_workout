import NameWorkout from "@/components/workouts/name-workout";
import { fetchExerciseList } from "@/services/workouts/workout-store";
import { createClient } from "@/utils/supabase/server";
import { checkUserAuth } from "@/services/users/check-user";
import WorkoutChat from "@/components/workouts/chat/workout-chat";
import PlanWorkout from "@/components/workouts/PlanWorkout";

export default async function Page() {
    await checkUserAuth();
    const exerciseList = await fetchExerciseList();

    return(
        <div>
            <PlanWorkout exercises={exerciseList} />
        </div>
       
    );
}