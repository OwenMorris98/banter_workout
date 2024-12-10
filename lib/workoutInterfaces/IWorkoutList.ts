export interface IWorkoutList {
    workouts: {
        Id: string;
        Name: string;
        Date: string;
        UserId : string;
        IsShared : boolean;
    }[];
}