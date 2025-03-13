import NameWorkout from "@/components/workouts/name-workout";
import { fetchExerciseList } from "@/services/workouts/workout-store";
import { createClient } from "@/utils/supabase/server";
import { checkIfUserAuth } from "@/services/users/check-user";
import WorkoutChat from "@/components/workouts/chat/workout-chat";
import PlanWorkout from "@/components/workouts/PlanWorkout";
import { User } from "@supabase/supabase-js";

export default async function Page() {
    const user : User | null = await checkIfUserAuth();
    const exerciseList = await fetchExerciseList() || [];

    return(
        <div>
            <PlanWorkout exercises={exerciseList} user={user}/>
        </div>
       
    );
}