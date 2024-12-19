import SubmitItem from "@/components/submit-item";
import NameWorkout from "@/components/workouts/name-workout";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    

    return(
       <SubmitItem labelValue="Exercise" />
        
    );
}