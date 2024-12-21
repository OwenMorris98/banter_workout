import { SubmitButton } from "@/components/submit-button";
import SubmitItem from "@/components/submit-item";
import NameWorkout from "@/components/workouts/name-workout";
import { createClient } from "@/utils/supabase/server";
import { checkUserAuth } from "@/services/users/check-user";

export default async function Page() {
    await checkUserAuth();
    
    let url = '/api/exercise-demographics'
    

    return(
        <div>
       <SubmitItem labelValue="Exercise" endpoint={url} />
       
       </div>
        
    );
}