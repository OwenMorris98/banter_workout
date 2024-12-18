import EndWorkoutButton from "@/components/workouts/end-workout";
import Exercise from "@/components/workouts/exercise";
import { IWorkout } from "@/lib/workoutInterfaces/IWorkout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const slug = (await params).slug
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/sign-in");
    }
    
    const { data, error } = await supabase
        .from("Workouts")
        .select("Id, Name, Date, UserId, IsShared, Exercises(Id, Name, Sets, Reps, Weight, WorkoutId)")
        .eq("Id", slug)
        .single();

    if (!data) {
      return <div>Workout not found</div>;
    }

    const workout: IWorkout = data;
    console.log("Workout:", workout)

    const { data: exerciseData, error: exerciseError } = await supabase
      .from("WorkoutExercises")
      .select("ExerciseName")
      .eq("UserId", user.id)
      .eq("WorkoutName", workout.Name)
      .neq("WorkoutName", null);

    

    if (exerciseError) {
      console.error("Error fetching workout:", exerciseError);
      return;
    }

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