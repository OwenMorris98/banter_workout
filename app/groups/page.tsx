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
    <GroupList groups={data} />
    </div>
  );
}
