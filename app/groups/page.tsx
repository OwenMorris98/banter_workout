import GroupHeader from "@/components/groups/group-header";
import GroupList from "@/components/groups/group-list";
import { fetchGroupList } from "@/services/groups/group-store";
import { checkUserAuth } from "@/services/users/check-user";
import { Groups } from "@/utils/supabase/database.types";


export default async function GroupPage() {
  const user = await checkUserAuth();
  const data = await fetchGroupList(user.id) ?? [];
  // let openGroups: Groups = [];

  // if(data) {
  //   openGroups = data.filter((group) => !group.MembersId?.includes(user.id)).map((filteredGroup) => ({
  //     Id: filteredGroup.Group?.Id,
  //     Name: filteredGroup.Group?.Name,
  //     Description: filteredGroup.Group?.Description,
  //     CreatorId: filteredGroup.Group?.CreatorId,
  //   }));
  //   if(openGroups.length === 1 && !openGroups[0].Id) {
  //     openGroups = [];
  //   }
  // }
  


  return (
    <div className="container mx-auto px-4 bg-black-900 text-black-300">
    <GroupHeader />
    {data.length > 0 && 
    <GroupList groups={data} user={user} open={true}/>
    } 
    {data.length === 0 && 
    <div className="ml-2">
    <span>There are no groups to join right now... :(</span>
    <br />
    <span>Try creating one!</span>
    </div>
    }
    </div>
  );
}
