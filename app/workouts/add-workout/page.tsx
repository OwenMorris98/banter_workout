import NameWorkout from "@/components/workouts/name-workout";
import { fetchExerciseList } from "@/services/workouts/workout-store";
import { createClient } from "@/utils/supabase/server";
import { checkUserAuth } from "@/services/users/check-user";
import WorkoutChat from "@/components/workouts/chat/workout-chat";

export default async function Page() {
    await checkUserAuth();
    const exerciseList = await fetchExerciseList();

    return(
        <>
       <NameWorkout exercises={exerciseList ?? []}/>

       <h2 className="text-2xl font-bold mb-4">Get AI Workout Suggestions</h2>
                <p className="text-sm text-gray-500 mb-4">
                    Chat with our AI trainer to get personalized workout recommendations.
                    Try asking something like "Create a chest workout for beginners" or
                    "I need a 30-minute HIIT workout".
                </p>
                <WorkoutChat />

       </>
    );
}