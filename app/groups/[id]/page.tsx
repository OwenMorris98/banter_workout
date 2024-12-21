import { GroupUsersResponse } from "@/lib/groupsInterfaces";
import { fetchGroupUsers } from "@/services/groups/group-store";

export default async function GroupUserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  console.log('connection');
  const groupId = (await params).id;

  const groupUsers: GroupUsersResponse = await fetchGroupUsers(groupId);
  console.log(groupUsers);

  return (
    <div>
      Hi
      <ol>
        {groupUsers.map((group) => (
          <li key={group.MembersId} className="my-2">
            <p className="text-decoration-line: underline underline-offset-4">{group.Users.Username}</p>
            <ul>
              {group.Users.Workouts.slice(0,5).map((workout) => (
                <li key={workout.Id}>
                  <div className="flex">
                  <p>{workout.Name}</p>
                  <p>{new Date(workout.Date).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
