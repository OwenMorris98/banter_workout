'use client'
import { Group, Groups, GroupWithUser } from "@/utils/supabase/database.types";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { getOpenGroups } from "@/services/groups/group-service";
import { useEffect, useState } from "react";


export default function GroupList({groups, user, open} : {groups: GroupWithUser[], user: User, open : boolean }) {
    const router = useRouter();
    const [Groups, setGroups] = useState<Group[]>([]);
   
    useEffect(() => {
      console.log(groups)
      setGroups(getOpenGroups(groups, user, open) || []);
    },[groups]);
    

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
        setGroups(Groups.filter(g => g.Id !== group.Id));
    };

    return (
      
        <div className="overflow-x-auto">
          {Groups.length == 0 &&
            <div className="ml-2">
          <span>There are no groups to join right now... :(</span>
    <br />
    <span>Try creating one!</span>
    </div>}
    {Groups.length > 0 &&
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
              {Groups?.map((group) => (
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
                    {open ? (
                     <div className="flex justify-between">
                     <Button variant={"outline"} className="py-5" onClick={() => router.push(`/groups/${group.Id}`)}>
                       View
                     </Button>
                     <Button variant={"outline"} className="py-5" onClick={async () => {
                       await joinGroup(group);
                     }}>
                       Join
                     </Button>
                     </div>
                    ) : (
                      <Button variant={"outline"} className="py-5" onClick={() => router.push(`/groups/${group.Id}`)}>
                       View
                     </Button>
                    )}
                   
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