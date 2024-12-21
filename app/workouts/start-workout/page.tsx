
import WorkoutPlanDDL from "@/components/workouts/workout-plan-ddl";
import WorkoutScheme from "@/components/workouts/workout-scheme";
import { checkUserAuth } from "@/services/users/check-user";
import { fetchWorkoutExercises, fetchWorkoutNames } from "@/services/workouts/workout-store";
import Link from "next/link";
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const user = await checkUserAuth();
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const data = await fetchWorkoutExercises(user.id);

    if(!data || data.length === 0) {
      return(
      <p>No workouts available, 
        please create a workout plan 
        <Link href={'/workouts/add-workout'} className="text-primary underline ml-1">here...</Link>
      </p>
      )
    }

  const workoutNames = await fetchWorkoutNames(user.id);

  const filteredWorkouts =
    data?.filter((item) => item.WorkoutName === query) ?? [];
  const exercies = Array.from(
    new Set(filteredWorkouts?.map((item) => item.ExerciseName)) ?? []
  );

  return (
    <div>
      <span>Start Workout</span>
      <WorkoutPlanDDL WorkoutNames={workoutNames} />

      {exercies.length > 0 && (
        <div>
          <WorkoutScheme ExersiceNames={exercies} SelectedWorkout={query} UserId={user.id}/>
        </div>
      )}
    </div>
  );
}

