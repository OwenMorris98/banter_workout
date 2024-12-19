import Timer from "@/components/timer";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import CreateUsername from "@/components/users/create-username";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  
  const {
    data: UserInfo, error
  } = await supabase.from('Users').select().eq('Id', `${user.id}`).single()

  if(error) {
    console.error('Error fetching user: ', error)
  }


  if(!UserInfo.username) {
    return(
      <CreateUsername UserId={user?.id}/>
    )
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <p className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          Welcome {UserInfo.Username}!
        </p>
        <Timer />
        <div className="mt-4">
          <p className="text-sm text-gray-500">Checking credientials...</p>
        </div>
      </div>
   
    </div>
  );
}
