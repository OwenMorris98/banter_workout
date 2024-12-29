'use client'
import { Group, Groups, GroupWithUser } from "@/utils/supabase/database.types";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { group } from "console";


export default function GroupList({groups, user, open} : {groups: GroupWithUser[], user: User, open : boolean }) {
    const router = useRouter();

    let groupList: Groups = [];
    console.log(groups);
    if(groups && open) {
      console.log('filtered groups: ', groups.filter((group) => group.GroupUser.MembersId?.includes(user.id)));
      groupList = groups.filter((group) => group.MembersId?.includes(user.id)).map((filteredGroup) => ({
        Id: filteredGroup.Group?.Id,
        Name: filteredGroup.Group?.Name,
        Description: filteredGroup.Group?.Description,
        CreatorId: filteredGroup.Group?.CreatorId,
      }));
      console.log("My Groups ", groupList)
      if(groupList.length === 1 && !groupList[0].Id) {
        groupList = [];
      }
     
    }
    else  {
      console.log('groups :', groups )
      groupList = groups.filter((group) => !group.MembersId?.includes(user.id)).map((filteredGroup) => ({
        Id: filteredGroup.Group?.Id,
        Name: filteredGroup.Group?.Name,
        Description: filteredGroup.Group?.Description,
        CreatorId: filteredGroup.Group?.CreatorId,
      }));
      console.log("Open Groups ", groupList)
      if(groupList.length === 1 && !groupList[0].Id) {
        groupList = [];
      }
    }
    

    const joinGroup = async (group: Group) => {
        const requestBody = {
            GroupsId : group.Id
        }
        const response = await fetch('/api/groups/group-users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    };

    return (
      
        <div className="overflow-x-auto">
          {groupList.length == 0 &&
            <div className="ml-2">
          <span>There are no groups to join right now... :(</span>
    <br />
    <span>Try creating one!</span>
    </div>}
    {groupList.length > 0 &&
        <div className="min-w-full bg-black-800 shadow-md rounded my-6">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 bg-black-700 text-left text-xs font-medium uppercase tracking-wider">
                  Group
                </th>
                <th className="px-5 py-3 bg-black-700 text-left text-xs font-medium uppercase tracking-wider">
                  Description
                </th>
                <th className="px-5 py-3 bg-black-700 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody> 
              {groupList?.map((group) => (
                <tr key={group?.Id}>
                  <td className="px-5 py-5 border-b border-black-600 bg-black-800 text-sm">
                    {group.Name}
                  </td>
                  <td className="px-5 py-5 border-b border-black-600 bg-black-800 text-sm">
                    {group.Description?.length > 50
                      ? `${group.Description.substring(0, 50)}...`
                      : group.Description}
                  </td>
                  <td className="px-1 py-5 border-b border-black-600 bg-black-800 text-sm">
                    <div className="flex justify-between">
                    {/* <Link className="border border-input bg-background py-3 px-4 hover:bg-accent hover:text-accent-foreground" href={`/groups/${group.Id}`}>
                      View
                    </Link> */}
                    <Button variant={"outline"} className="py-5" onClick={() => router.push(`/groups/${group.Id}`)}>
                      View
                    </Button>
                    <Button variant={"outline"} className="py-5" onClick={() => joinGroup(group)}>
                      Join
                    </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
}
      </div>
    )
}