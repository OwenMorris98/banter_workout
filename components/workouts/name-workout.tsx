'use client'

import { useState } from "react";
import { SubmitButton } from "../submit-button";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
                <Input type="text"
                    name="workoutName" 
                    id="workoutName" 
                    className="flex-grow mt-2" 
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    readOnly={saveWorkoutName}
                    required />
            </div> 
            {!saveWorkoutName && <Button onClick={saveName}>Save</Button>}
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