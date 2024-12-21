import EndWorkoutButton from "@/components/workouts/end-workout";
import Exercise from "@/components/workouts/exercise";
import { IWorkout } from "@/lib/workoutInterfaces/IWorkout";
import { fetchWorkoutById, fetchWorkoutExercises, fetchWorkoutExercisesByName } from "@/services/workouts/workout-store";
import { createClient } from "@/utils/supabase/server";
import { checkUserAuth } from "@/services/users/check-user";
import { redirect } from "next/navigation";


export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    const user = await checkUserAuth();
    const data = await fetchWorkoutById(slug);

    if (!data) {
      return <div>Workout not found</div>;
    }

    const workout: IWorkout = data;
    console.log("Workout:", workout)

    const exerciseData = await fetchWorkoutExercisesByName(user.id, workout)


    if (!exerciseData || exerciseData.length === 0) {
      return <div>No Exercises</div>;
    }

    const completed = workout.Exercises.map(exercise => ({
        Name: exercise.Name,
        Reps : exercise.Reps,
        Weight: exercise.Weight,
    }));    

    return( 
    <div>
      My Workout: {workout.Name}
      {exerciseData?.length > 0 && <ul>
      {exerciseData.map((exercise, index) => (
        <li key={index} className="my-2">
          <Exercise ExerciseName={exercise.ExerciseName} WorkoutId={workout.Id} Completed={completed}/>
          </li>
      ))}
    </ul>}
    <EndWorkoutButton  />
    
    </div>)
  }