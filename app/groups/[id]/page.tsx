import { GroupUsersResponse } from "@/lib/groupsInterfaces";
import { fetchGroupUsers } from "@/services/groups/group-store";
import Link from "next/link";

export default async function GroupUserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  console.log('connection');
  const groupId = (await params).id;

  const groupUsers: GroupUsersResponse = await fetchGroupUsers(groupId);

  //totally used AI for this one, why does it need so many new dates like that
  let weeksWorkouts = 0;
  groupUsers.forEach((group) => {
    weeksWorkouts += group.Users.Workouts.filter(
      workout => new Date(workout.Date) >= new Date(new Date().setDate(new Date().getDate() - 7))).length;
  });
  
  console.log(groupUsers);

  return (
    <div>
      <p>Group Users</p>
      <ol>
        {groupUsers.map((group) => (
          <li key={group.MembersId} className="my-2 flex">
            <div className="flex flex-col items-start">
              <p className="text-decoration-line: underline underline-offset-4">{group.Users.Username}</p>
              {group.Users.Workouts.length && 
              <p className="text-sm text-gray-600 ml-2">Workouts this week: {weeksWorkouts}</p>
              }
            </div>
            <Link className="text-blue-500 hover:text-blue-600 mt-2 ml-8" href={`/workouts/my-workouts/?user=${group.MembersId}`}>
                      View
                    </Link>
            {/* <ul>
              {group.Users.Workouts.slice(0,5).map((workout) => (
                <li key={workout.Id}>
                  <div className="flex">
                  <p>{workout.Name}</p>
                  <p>{new Date(workout.Date).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul> */}
          </li>
        ))}
      </ol>
    </div>
  );
}
