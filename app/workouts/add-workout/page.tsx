import NameWorkout from "@/components/workouts/name-workout";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data: exerciseList, error : exercisListError } = await supabase
    .from('ExerciseDemographics')
    .select();
    // .eq('UserId', `${user?.id}` );
    
  
    return(
       <NameWorkout exercises={exerciseList ?? []}/>
        
    );
}