'use client'

interface WorkoutSchemeProps {
    ExersiceNames: string[];
    SelectedWorkout : string;
    UserId : string;
}
import { useEffect, useState } from "react";
import WorkoutButton from "./workout-button";
import { SubmitButton } from "../submit-button";
import { redirect } from "next/navigation";
export default function WorkoutScheme({ ExersiceNames, SelectedWorkout, UserId} : WorkoutSchemeProps) {
const [guid, setGuid] = useState('');

useEffect(() => {
  const newGuid = crypto.randomUUID();
  setGuid(newGuid);
  console.log("guid: ", guid.toString())
}, []);

const postWorkout = async () => {
  console.log('Posting workout')
  const currentDate = new Date();
  const workoutData = {
    Id: guid,
    Name: SelectedWorkout,
    Date: currentDate,
    IsShared: false
  };
  const response = await fetch('/api/workouts/add-workout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(workoutData)
  });

  if (!response.ok) {
    console.error('Failed to add workout');
  }

  else {console.log('posted workout')
    return redirect(`/workouts/start-workout/${guid}`)
  }
 
}

return (
  <div>
  <ul>
    {ExersiceNames.map((exerciseName, index) => (
      <li key={index}>{exerciseName}</li>
    ))}
  </ul>

<SubmitButton className="w-full max-w-md bg-gray-800 hoverF:bg-gray-700 text-white 
      font-semibold py-6 px-9 border-2 border-black 
      rounded-lg shadow-lg transition duration-200 mt-4" 
      onClick={postWorkout}>Confirm Workout</SubmitButton>
</div>
)}