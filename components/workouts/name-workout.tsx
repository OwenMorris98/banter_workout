'use client'

import { useState } from "react";
import { SubmitButton } from "../submit-button";
import { IExerciseList } from "@/lib/excerciseInterfaces/IExerciseList";
import ExerciseList from "./excercise-list";

export default function NameWorkout({ exercises }: IExerciseList) {

    const [workoutName, setWorkoutName] = useState('');
    const [saveWorkoutName, setSaveWorkoutName] = useState(false);

    const saveName = () => {
        setSaveWorkoutName(!saveWorkoutName);
    };

    return(
        <div>
            <div className="mb-4">
                <label htmlFor="workoutName" className="block text-lg font-medium text-gray-300">Workout Plan Name</label>
                <input type="text"
                    name="workoutName" 
                    id="workoutName" 
                    className="mt-2 block w-full rounded-lg border-gray-500 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg" 
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    readOnly={saveWorkoutName}
                    required />
            </div> 
            {!saveWorkoutName && <SubmitButton onClick={saveName}>Save</SubmitButton>}
            {saveWorkoutName && (
                <div>
                    <div className="my-2">
                    <SubmitButton onClick={saveName}>Change</SubmitButton>
                    </div>
                    <div>
                    <ExerciseList exercises={exercises ?? []} workoutName={workoutName}/>
                    </div>
                </div>
                )}
            </div>
    );
}