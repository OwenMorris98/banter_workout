import Image from 'next/image';
import WorkoutButton from '@/components/workouts/workout-button';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { checkIfUserAuth } from '@/services/users/check-user';

export default async function Page() {
  const user : User | null = await checkIfUserAuth();
  

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
      /> {user ? (
      <div className='flex flex-col items-center space-y-4 p-4'>
        <WorkoutButton buttonName="Start Workout" href='/workouts/start-workout' />
      <WorkoutButton buttonName="Plan Workout" href='/workouts/add-workout'/>
      <WorkoutButton buttonName="View Workouts" href='/workouts/my-workouts'/>
      <Link href={'/workouts/add-exercise'}>Add Exercise...</Link>
      <Link href={'/groups'}>Join Group...</Link>
      <Link href={'/groups/my-groups'}>My Groups...</Link>

      </div>
       ) : (
       <div className='flex flex-col items-center space-y-4 p-4'>
        <WorkoutButton buttonName="Plan Workout" href='/workouts/add-workout'/>
        </div>
       )
        }
      
    </div>
  );
}
{/* <MyWorkoutList workouts={workoutList ?? []} /> */}
    {/* <ExerciseList exercises={exerciseList ?? []}/> */}