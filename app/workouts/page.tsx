import ExerciseList from '@/components/workouts/excercise-list';
import WorkoutButton from '@/components/workouts/workout-button';
import MyWorkoutList from '@/components/workouts/workout-list';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if(!user) {
    return redirect("/sign-in");
  }
  
  // const { data: exerciseList, error : exercisListError } = await supabase
  // .from('ExerciseDemographics')
  // .select()
  // .eq('UserId', `${user?.id}` );
  
  // const {data : workoutList } = await supabase.from('Workouts').select();


  // const { data : userData, error } = await supabase
  // .from('Users')
  // .select()
  // .eq('Id', `${user?.id}`)

  

  return (
    <div className='flex flex-col items-center space-y-4 p-4'>
      <WorkoutButton buttonName="Start Workout" href='/workouts/start-workout'/>
      <WorkoutButton buttonName="Plan Workout" href='/workouts/add-workout'/>
      <WorkoutButton buttonName="View Workouts" href='/workouts/my-workouts'/>
    </div>
  );
}
{/* <MyWorkoutList workouts={workoutList ?? []} /> */}
    {/* <ExerciseList exercises={exerciseList ?? []}/> */}