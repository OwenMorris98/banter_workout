'use client'

import WorkoutButton from "../workouts/workout-button"

export default function RoutinesOptions() {

    return (
        <div className="flex flex-row gap-6 w-full max-w-3xl mx-auto">
            <div className="bg-white dark:bg-black rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
                <span className="mr-2">🏋️‍♂️</span>
                My Routines
            </h2>
                <WorkoutButton buttonName="Create Routine" href='/routines/create-routine' />
            </div>
        </div>
    )
}