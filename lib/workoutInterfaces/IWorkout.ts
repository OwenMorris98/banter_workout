export interface IWorkout {
        Id: string;
        Name: string;
        Date: string;
        UserId : string;
        IsShared : boolean;
        Exercises : {
            Id : string;
            Name : string;
            Sets: number;
            Reps : number;
            Weight : number;
            WorkoutId : string;

        }[];
    }