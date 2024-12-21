import SupabaseLogo from "@/components/supabase-logo";
import { createClient } from "@/utils/supabase/server";
import { GroupUsersResponse } from "@/lib/groupsInterfaces";

export const fetchGroupList = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("Groups")
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
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
  