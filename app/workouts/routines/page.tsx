import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import {  checkUserAuth } from '@/services/users/check-user';
import RoutinesOptions from '@/components/routines/routines-options';
import MyRoutines from '@/components/routines/my-routines';
import { fetchRoutineList } from '@/services/workouts/workout-store';
import { Routine } from '@/lib/routines/routine';



export default async function Page() { 
    const user : User = await checkUserAuth();
    const routineList : Routine[] = await fetchRoutineList(user.id);


    return (
        <div className='flex flex-col lg:flex-row  items-start w-full mx-auto gap-2'>
        <div className='w-full'>
            <RoutinesOptions />
        </div>
        <div className='w-full'>
            <MyRoutines routines={routineList}/>
        </div>
    </div>
    )
}
