import { fetchMyWorkouts } from "@/services/workouts/workout-store";
import { createClient } from "@/utils/supabase/server";
import { checkUserAuth } from "@/services/users/check-user";
import Link from "next/link";

export default async function Page() {
    const user = await checkUserAuth();
    const workoutList = await fetchMyWorkouts(user.id);
    
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
