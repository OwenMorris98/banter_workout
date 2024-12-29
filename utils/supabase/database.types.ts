export type Workout = {
    Id : string;
        Name : string;
        Date : Date;
        UserId: string;
        IsShared : boolean;
}

export type Workouts = Workout[];

export type Group = {
    Id : string;
    Name : string;
    Description : string;
    CreatorId: string;
}

export type Groups = Group[];

export type GroupUser = {
    GroupsId : string;
    MembersId : string;
};

export type GroupWithUser = {
    Group : Group;
    GroupUser : {
        MembersId : string[];
    }[];
    
}