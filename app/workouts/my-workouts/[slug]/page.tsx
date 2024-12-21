import DisplayExercise from "@/components/workouts/display-exercise";
import { fetchMyWorkoutById } from "@/services/workouts/workout-store";
import { checkUserAuth } from "@/services/users/check-user";
import Link from "next/link";

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    await checkUserAuth();
    
    const { exerciseData, workoutData } = await fetchMyWorkoutById(slug);
  
   

    const groupedExercises: { [key: string]: { Reps: number; Weight: number }[] } = {};

// Loop through exerciseData to group by Name
exerciseData?.forEach((exercise) => {
    if (!groupedExercises[exercise.Name]) {
        groupedExercises[exercise.Name] = []; // Create a new array for this workout name
    }
    // Push the current workout's Reps and Weight into the array
    groupedExercises[exercise.Name].push({ Reps: exercise.Reps, Weight: exercise.Weight });
});
console.log(groupedExercises);

    

    return(
    <div>
        <h1 className="text-2xl">{workoutData?.Name}</h1>
        <span>Date: {new Date(workoutData?.Date).toLocaleDateString()}</span>
        <ul>
        {Object.entries(groupedExercises).map(([name, exercises]) => (
                <li key={name}>
                    <DisplayExercise name={name} sets={exercises} />
                </li>
            ))}
        </ul>
        <div className="flex align-center">
        <Link href="/workouts/my-workouts" className="w-full mt-4 max-w-md bg-gray-800 hover:bg-gray-700 text-white 
            font-semibold py-3 px-6 border-2 border-black 
            rounded-lg shadow-lg duration-200 transition text-center">
            Back to My Workouts
        </Link>
        </div>
    </div>
    )
}