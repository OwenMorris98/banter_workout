import { IWorkoutList } from "@/lib/workoutInterfaces/IWorkoutList";

export default function MyWorkoutList({ workouts }: IWorkoutList)  {
return(
    <div>
        <h1>My Workouts</h1>
           <table className='max-h-[600px] overflow-y-auto'>
            <tbody>
                {workouts?.map((workout) => (
                    
                    <tr key={workout.Id}
                    className='my-2 p-2 hover:bg-black cursor-pointer rounded'
                    
                    >
                        <td className="w-12">{workout.Name} </td>
                        <td className="ml-12">
                            <button>
                            Edit
                            </button>
                            </td>
                       
                             
                    
                    </tr>
                ))}
                </tbody>
            </table>
    </div>
    
)


};