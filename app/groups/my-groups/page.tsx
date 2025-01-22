import GroupHeader from "@/components/groups/group-header";
import GroupList from "@/components/groups/group-list";
import { fetchGroupList } from "@/services/groups/group-store";
import { checkUserAuth } from "@/services/users/check-user";

export default async function GroupPage() {
    const user = await checkUserAuth();
    const data = await fetchGroupList(user.id) ?? [];

    return (
        <div className="container mx-auto px-4 bg-black-900 text-black-300">
        <GroupHeader />
        {data.length > 0 && 
        <GroupList groups={data} user={user} open={false}/>
        } 
        {data.length === 0 && 
        <div className="ml-2">
        <span>You are not in any groups right now... :(</span>
        <br />
        <span>Try creating one!</span>
        </div>
        }
        </div>
      );
}