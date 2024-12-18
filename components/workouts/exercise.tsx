"use client";
interface CreateWorkoutExerciseProps {
  ExerciseName: string;
  WorkoutId: string;
  Completed: {
    Name: string;
    Reps: number;
    Weight: number;
  }[];
}

import { use, useState } from "react";
export default function Exercise({
  ExerciseName,
  WorkoutId,
  Completed,
}: CreateWorkoutExerciseProps) {

  const [showForm, setShowForm] = useState(false);

  const [reps, setReps] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const filterCompleted = Completed.filter(item => item.Name === ExerciseName);

  const [completedExercises, setCompletedExercises] = useState([...filterCompleted]);

  const handleSubmit = async () => {
    const exerciseData = {
      ExerciseName,
      Reps: reps,
      Weight: weight,
      WorkoutId,
    };

    console.log("Exercise Data: ", exerciseData);
    try {
      const response = await fetch("/api/workouts/add-exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exerciseData),
      });
      if (!response.ok) {
        throw new Error("Failed to add exercise");
      }
      console.log("Exercise added successfully");
      setShowForm(false); // Close the form after successful submission
    setCompletedExercises([...completedExercises, { 
        Name : exerciseData.ExerciseName, 
        Reps : exerciseData.Reps, 
        Weight : exerciseData.Weight
    }]);
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  return (
    <div>
      <label className="text-2xl font-bold">{ExerciseName}</label>
      {completedExercises.length > 0 && 
      <div>
        {completedExercises.map( (item, idx) => (
            <p key={idx}>{`Set ${idx + 1}: ${item.Reps} reps, ${item.Weight} lbs`}</p>
        ))}
      </div>
      
      }
      {showForm && (
        <form className="mt-4">
          <div className="mb-2">
            <label
              htmlFor="reps"
              className="block text-sm font-medium text-gray-700"
            >
              Reps
            </label>
            <input
              type="number"
              name="reps"
              id="reps"
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => {
                setReps(Number(e.target.value));
              }}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => {
                setWeight(Number(e.target.value));
              }}
            />
          </div>
        </form>
      )}
      {showForm ? (
        <>
          <div className="flex justify-between">
            <button
              onClick={() => setShowForm(false)}
              className="max-w-md bg-gray-800 hover:bg-gray-700 text-white 
                  font-semibold py-2 px-14 border-2 border-black 
                  rounded-lg shadow-lg duration-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="max-w-md bg-gray-800 hover:bg-gray-700 text-white 
                  font-semibold py-2 px-14 border-2 border-black
                  rounded-lg shadow-lg duration-200 transition"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full max-w-md bg-gray-800 hover:bg-gray-700 text-white 
                font-semibold py-2 px-4 border-2 border-black 
                rounded-lg shadow-lg duration-200 mt-4 transition"
        >
          Add set
        </button>
      )}
      
    </div>

  );
}
