
import { Group, Groups, GroupWithUser } from "@/utils/supabase/database.types";
import { User } from "@supabase/supabase-js";

export const getOpenGroups = (groups: GroupWithUser[], user: User, open : boolean) => {
  let groupList: Groups = [];
        if(open) {     
          groups.forEach((group) => {
            group.GroupUser.forEach((member) => {
              // Logic to be filled in
              if(member.MembersId === user.id) {
                groups.splice(groups.indexOf(group), 1)
              }
              groupList = groups
                .map((group) => ({
                  Id: group.Id,
                  Name: group.Name,
                  Description: group.Description,
                  CreatorId: group.CreatorId,
                }));
            });
          }); 
      }
      else  {
          groups.forEach((group) => {
            group.GroupUser.forEach((member) => {
              // Logic to be filled in
              if(member.MembersId !== user.id) {
                groups.splice(groups.indexOf(group), 1)
              }
              groupList = groups
                .map((group) => ({
                  Id: group.Id,
                  Name: group.Name,
                  Description: group.Description,
                  CreatorId: group.CreatorId,
                }));
            });
          });
        
      }
      if(groupList.length === 1 && !groupList[0].Id) {
        groupList = [];
      }
      return groupList;
      
    
    }




