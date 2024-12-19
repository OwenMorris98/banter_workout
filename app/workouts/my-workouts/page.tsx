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
    .eq('UserId', user.id)
    .order('Date', {ascending : false});

   

    if(!workoutList || workoutList.length === 0) {
        return(<div>
            <span>No Workouts Found...</span>
        </div>)
    }

    return(
        <div className="w-96 px-4">
            <h1 className="text-2xl text-decoration-line: underline underline-offset-4 mb-2">My Workouts</h1>
            <ul >
                {workoutList.map((workout, index) => (
                    <li key={index}>
                        <div>
                        <p> {new Date(workout.Date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                        <p className="text-sm text-gray-600">{new Date(workout.Date).toLocaleDateString()}</p>
                        </div>
                        <div className="border border-black flex py-4 px-2 justify-between ">
                            
                            <p className="">{workout.Name} </p>
                            <Link href={`/workouts/my-workouts/${workout.Id}`}
                            className="text-decoration-line: underline underline-offset-4"
                            >
                                Go to Workout
                            </Link>
                           
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}
