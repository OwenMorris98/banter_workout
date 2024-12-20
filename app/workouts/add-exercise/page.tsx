import { SubmitButton } from "@/components/submit-button";
import SubmitItem from "@/components/submit-item";
import NameWorkout from "@/components/workouts/name-workout";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    let url = '/api/exercise-demographics'
    

    return(
        <div>
       <SubmitItem labelValue="Exercise" endpoint={url} />
       
       </div>
        
    );
}