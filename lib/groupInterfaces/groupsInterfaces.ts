interface Workout {
    Id: string;
    Date: string;
    Name: string;
  }
  
  interface User {
    Id: string;
    Username: string;
    Workouts: Workout[];
  }
  
   interface GroupUser {
    GroupsId: string;
    MembersId: string;
    Users: User;
  }
  
  export type GroupUsersResponse = GroupUser[];
  
  export interface GroupWithUser {
    Group: {
        Id: string;
        Name: string;
        Description : string;
        CreatorId : string;
    };
    MembersId: string[]; 
  }
  
  