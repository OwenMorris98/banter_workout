'use client'

import { useState, useEffect, useRef } from "react";
import { SubmitButton } from "../submit-button";
import { Exercise } from "@/lib/excerciseInterfaces/IExerciseList"; 
import NameWorkout from "./name-workout";
import WorkoutChat from "./chat/workout-chat";
import { User } from "@supabase/supabase-js";
import { OfflineWorkouts } from "./offline-workouts";
import { WorkoutPlan } from "./chat/chat-interfaces";

interface PlanWorkoutProps {
    exercises: Exercise[];
    user: User | null;
}

export default function PlanWorkout({ exercises, user }: PlanWorkoutProps) {
    const [showNameWorkout, setShowNameWorkout] = useState(true);
    const [showHeaderText, setShowHeaderText] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const workoutPlanRef = useRef<WorkoutPlan | undefined>(undefined);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        
        // Set initial state
        if (typeof navigator !== 'undefined') {
            setIsOffline(!navigator.onLine);
        }
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const handleWorkoutSelect = (plan: WorkoutPlan) => {
        workoutPlanRef.current = plan;
        // Force re-render
        setShowHeaderText(prev => !prev);
        setShowHeaderText(prev => !prev);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
            {isOffline && (
                <div className="mb-4 p-5 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-900/20 dark:border-orange-700 shadow-sm">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                        <span className="mr-2">📵</span>
                        You're Offline
                    </h2>
                    <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                        You can still view your previously saved workouts:
                    </p>
                    <OfflineWorkouts onSelect={handleWorkoutSelect} />
                </div>
            )}

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

                {showHeaderText && (
                    <div className="pt-2">
                        <div className="flex items-center justify-center mb-4">
                            <div className="h-px bg-gray-300 dark:bg-gray-700 w-full mr-3" />
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">OR</span>
                            <div className="h-px bg-gray-300 dark:bg-gray-700 w-full ml-3" />
                        </div>
                        <h2 className="text-xl font-semibold mb-4 text-center">Create Your Own Plan</h2>
                        {showNameWorkout && <NameWorkout exercises={exercises ?? []} />}
                    </div>
                )}
            </div>
        </div>
    );
}