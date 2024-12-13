import WorkoutPlanDDL from "@/components/workouts/workout-plan-ddl";
import WorkoutScheme from "@/components/workouts/workout-scheme";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page(props: {
    searchParams?: Promise<{
      query?: string;
    }>;
  }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';

    console.log(query)

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
  
    if(!user) {
      return redirect("/sign-in");
    }
   
    const { data, error } = await supabase
        .from('WorkoutExercises')
        .select('ExerciseName, WorkoutName')
        .eq('UserId', user.id)
        .neq('WorkoutName', null);

    const workoutNames = Array.from(new Set(data?.map(item => item.WorkoutName))) ?? [];

    const filteredWorkouts = data?.filter(item => item.WorkoutName === query) ?? [];
    const exercies = Array.from(new Set(filteredWorkouts?.map(item => item.ExerciseName)) ?? []);
    console.log(exercies);
 
   

    

    return (
        <div>
            <span>Start Workout</span>
            <WorkoutPlanDDL WorkoutNames={workoutNames} />
           
            <div> 
            {exercies && 
            <WorkoutScheme ExersiceNames={exercies} />
            }
            </div>
            
        </div>
    );
}