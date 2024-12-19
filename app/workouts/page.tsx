import Image from 'next/image';
import ExerciseList from '@/components/workouts/excercise-list';
import WorkoutButton from '@/components/workouts/workout-button';
import MyWorkoutList from '@/components/workouts/workout-list';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import Link from 'next/link';

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
      <h1 className="text-2xl text-decoration-line: underline underline-offset-4 mb-2">
      Banter Workout
      </h1>
      <Image
        src="/img/horse_bant.jpg"
        alt="Banter Workout Logo"
        width={200}
        height={100}
      />
      <WorkoutButton buttonName="Start Workout" href='/workouts/start-workout'/>
      <WorkoutButton buttonName="Plan Workout" href='/workouts/add-workout'/>
      <WorkoutButton buttonName="View Workouts" href='/workouts/my-workouts'/>
      <Link href={'/workouts/add-exercise'}>Add Exercise...</Link>
    </div>
  );
}
{/* <MyWorkoutList workouts={workoutList ?? []} /> */}
    {/* <ExerciseList exercises={exerciseList ?? []}/> */}