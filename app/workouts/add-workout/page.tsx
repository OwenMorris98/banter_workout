import NameWorkout from "@/components/workouts/name-workout";
import { createClient } from "@/utils/supabase/server";
import { checkUserAuth } from "@/utils/users/check-user";

export default async function Page() {
    await checkUserAuth();
    const supabase = await createClient()
    
    
    const { data: exerciseList, error : exercisListError } = await supabase
    .from('ExerciseDemographics')
    .select();

    return(
       <NameWorkout exercises={exerciseList ?? []}/>
        
    );
}