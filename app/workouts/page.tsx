import WorkoutList from '@/components/workouts/workout-list';
import { createClient } from '@/utils/supabase/server'
import { IWorkoutList } from '@/lib/workoutInterfaces/IWorkoutList';

export default async function Page() {
  const supabase = await createClient()
  const { data } = await supabase.from('ExerciseDemographics').select()

  return ( 
    <WorkoutList workouts={data ?? []}/>
  );
}
