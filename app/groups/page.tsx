import { fetchGroupList } from "@/services/groups/group-store";
import Link from "next/link";

export default async function GroupPage() {
  const data = await fetchGroupList();

  return (
    <div className="container mx-auto px-4 bg-black-900 text-black-300">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Groups</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Create Group
        </button>
      </div>
      <p>Find groups of people to workout with</p>
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
              {data?.map((group) => (
                <tr key={group?.Id}>
                  <td className="px-5 py-5 border-b border-black-600 bg-black-800 text-sm">
                    {group.Name}
                  </td>
                  <td className="px-5 py-5 border-b border-black-600 bg-black-800 text-sm">
                    {group.Description.length > 50
                      ? `${group.Description.substring(0, 50)}...`
                      : group.Description}
                  </td>
                  <td className="px-5 py-5 border-b border-black-600 bg-black-800 text-sm">
                    <Link className="text-blue-500 hover:text-blue-600" href={`/groups/${group.Id}`}>
                      View
                    </Link>
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
