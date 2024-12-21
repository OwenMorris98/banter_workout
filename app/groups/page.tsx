import { fetchGroupList } from "@/services/groups/group-store";
import Link from "next/link";

export default async function GroupPage() {
  const data = await fetchGroupList();

  return (
    <div className="container mx-auto px-4 bg-black-800 text-gray-300">
      <h1 className="text-2xl font-bold">Groups</h1>
      <p>Find groups of people to workout with</p>
      <div className="overflow-x-auto">
        <div className="min-w-full bg-black-700 shadow-md rounded my-6">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 md:px-24 md:py:24 px-12 md:py:12 bg-black-600 text-left text-xs font-medium uppercase tracking-wider">
                  Group
                </th>
                <th className="px-5 py-3 md:px-24 md:py:24 bg-black-600 text-left text-xs font-medium uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((group) => (
                <tr key={group?.Id}>
                  <td className="px-5 py-5 md:px-24 md:py:24 border-b border-black-600 bg-black-700 text-sm">
                    {group.Name}
                  </td>
                  <td className="px-5 py-5 md:px-24 md:py:24 border-b border-black-600 bg-black-700 text-sm">
                    {group.Description.length > 50
                      ? `${group.Description.substring(0, 50)}...`
                      : group.Description}
                  </td>
                  <td>
                    <Link href={`/groups/${group.Id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
