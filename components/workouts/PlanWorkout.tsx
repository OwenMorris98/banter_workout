'use client'

import { useState } from "react";
import { SubmitButton } from "../submit-button";
import { Exercise } from "@/lib/excerciseInterfaces/IExerciseList"; 
import NameWorkout from "./name-workout";
import WorkoutChat from "./chat/workout-chat";
import { User } from "@supabase/supabase-js";

interface PlanWorkoutProps {
    exercises: Exercise[];
    user : User | null;
}

export default function PlanWorkout({ exercises, user }: PlanWorkoutProps) {
    const [showNameWorkout, setShowNameWorkout] = useState(true);
    const [showHeaderText, setShowHeaderText] = useState(true);

    return(
        <div className="flex flex-col gap-4 max-w-5x1">
       
       {showHeaderText && (
         <div>
             <h1 className="text-2xl font-bold">Create</h1>
         {showNameWorkout && <NameWorkout exercises={exercises ?? []}/>}
        <h2 className="my-4">OR</h2>
           <h2 className="text-2xl font-bold mb-4">Get AI Workout Suggestions</h2>
           <p className="text-sm text-gray-500 mb-4">
             Chat with our AI trainer to get personalized workout recommendations.
             Try asking something like "Create a chest workout for beginners" or
             "I need a 30-minute HIIT workout".
           </p>
         </div>
       )}
        <div>
        <WorkoutChat onChatStart={() => setShowNameWorkout(false)} onChatEnd={() => setShowHeaderText(false)} user={user} />
        </div>
        </div>
    )
}