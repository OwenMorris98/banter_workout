'use client'

import { Routine, Routines } from "@/lib/routines/routine"
import WorkoutButton from "../workouts/workout-button"
import RoutineButton from "./routine-button"

type MyRoutinesProps = {
    routines: Routine[]
}

export default function MyRoutines({ routines }: MyRoutinesProps) {
    return (
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
            <div className="bg-white dark:bg-black rounded-lg border shadow-sm p-6">
                <h2 className="text-md text-gray-500 font-semibold mb-3 flex items-center">
                    My Routines ({routines?.length || 0})
                </h2>
                <div className="flex flex-col gap-2">
                    {routines?.length > 0 ? (
                        routines.map((routine: Routine) => (
                            <RoutineButton 
                                key={routine?.Id} 
                                routineName={routine?.Name} 
                            />
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No routines created yet</p>
                    )}
                </div>
            </div>
        </div>
    )
}