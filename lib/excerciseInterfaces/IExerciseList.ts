export interface IExerciseList {
    exercises: {
        Id: string | number;
        Name: string;
    }[];
}

export interface CreateWorkoutProps {
    workoutName : string;
    exercises: {
        Id: string | number;
        Name: string;
    }[];
}