'use client'

import { useState, useEffect, useRef } from "react";
import { Exercise } from "@/lib/excerciseInterfaces/IExerciseList"; 
import WorkoutChat from "@/components/workouts/chat/workout-chat";
import { User } from "@supabase/supabase-js";
import { WorkoutPlan } from "../workouts/chat/chat-interfaces";


interface PlanWorkoutProps {
    exercises: Exercise[];
    user: User | null;
}

export default function CoachPrompt({ exercises, user } : PlanWorkoutProps) {
    const [showNameWorkout, setShowNameWorkout] = useState(true);
    const [showHeaderText, setShowHeaderText] = useState(true);
    const workoutPlanRef = useRef(undefined);


    return (
        <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
                <span className="mr-2">🤖</span>
                AI Workout Planner
            </h2>


<div className="bg-white dark:bg-black rounded-lg border shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-4 text-center">AI Workout Planner</h1>
                <div className="border-b pb-4 mb-4">
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
                        Let our AI create a personalized workout plan just for you
                    </p>
                    <WorkoutChat 
                        onChatStart={() => setShowNameWorkout(false)} 
                        onChatEnd={() => setShowHeaderText(false)} 
                        user={user}
                        initialWorkoutPlan={workoutPlanRef.current}
                    />
                </div>
            </div>
        </div>
    )} 