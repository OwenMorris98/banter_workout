import SupabaseLogo from "@/components/supabase-logo";
import { createClient } from "@/utils/supabase/server";
import { GroupUsersResponse } from "@/lib/groupInterfaces/groupsInterfaces";
import { Groups, GroupWithUser } from "@/utils/supabase/database.types";
import { UUID } from "crypto";

export const fetchGroupList = async (Id: string): Promise<GroupWithUser[]> => {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("Groups")
        .select('*, GroupUser (MembersId)');
        // .neq("GroupUser.MembersId", Id);

    if (error) {
      throw new Error(error.message);
    }

    return data as GroupWithUser[]; 
};

  export const fetchGroupUsers = async (groupId: string) => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('GroupUser')
      .select(`
        GroupsId,
        MembersId,
        Users(
          Id,
          Username,
          Workouts (
            Id,
            Name,
            Date
          )
        ) as User
      `)
      .eq('GroupsId', groupId)
      
      
  
    if (error) {
      throw new Error(error.message);
    }
    return data as GroupUsersResponse | [];
  };
  