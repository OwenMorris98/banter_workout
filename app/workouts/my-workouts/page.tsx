import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
  
    if(!user) {
      return redirect("/sign-in");
    }
    console.log(user.id)

    const { data : workoutList , error : error } = await supabase
    .from('Workouts')
    .select()
    .eq('UserId', user.id);

   

    if(!workoutList || workoutList.length === 0) {
        return(<div>
            <span>No Workouts Found...</span>
        </div>)
    }

    return(
        <div>
            <ul>
                {workoutList.map((workout, index) => (
                    <li key={index}>
                        <div>
                        <p> {new Date(workout.Date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                        <p className="text-sm text-gray-600">{new Date(workout.Date).toLocaleDateString()}</p>
                        </div>
                        <div className="border border-black py-2.5 px-12 my-2.5 flex justify-between">
                            <p className="mr-9">{workout.Name} </p>
                            <Link href={`/workouts`}>Go to Workout</Link>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}
