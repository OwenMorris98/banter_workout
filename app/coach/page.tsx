
import { fetchExerciseList } from "@/services/workouts/workout-store";
import { checkIfUserAuth } from "@/services/users/check-user";
import PlanWorkout from "@/components/workouts/PlanWorkout";
import { User } from "@supabase/supabase-js";
import CoachPrompt from "@/components/coach/coach-prompt";

export default async function Page() {
    const user : User | null = await checkIfUserAuth();
    const exerciseList = await fetchExerciseList() || [];

    return(
        <div>
            <CoachPrompt exercises={exerciseList} user={user}/>
        </div>
       
    );
}