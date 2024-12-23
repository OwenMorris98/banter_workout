'use client'
import { Group, Groups } from "@/utils/supabase/database.types";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


export default function GroupList({groups} : {groups: Groups}) {
    const router = useRouter();

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
              {groups?.map((group) => (
                <tr key={group?.Id}>
                  <td className="px-5 py-5 border-b border-black-600 bg-black-800 text-sm">
                    {group.Name}
                  </td>
                  <td className="px-5 py-5 border-b border-black-600 bg-black-800 text-sm">
                    {group.Description.length > 50
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
      </div>
    )
}