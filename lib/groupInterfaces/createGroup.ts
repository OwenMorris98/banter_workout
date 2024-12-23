export interface CreateGroupRequest {
    Name: string;
    Description: string;
  }

export interface CreateGroup{
    Id : string;
    CreatorId: string;
    Request : CreateGroupRequest;
}

export interface CreateGroupUser {
    GroupsId : string;
};