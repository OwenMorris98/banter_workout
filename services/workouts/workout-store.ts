import { createClient } from "@/utils/supabase/server";
// Function to fetch workout exercises for a user
export const fetchWorkoutExercises = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("WorkoutExercises")
    .select("ExerciseName, WorkoutName")
    .eq("UserId", userId)
    .neq("WorkoutName", null);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
// Function to fetch workout names for a user
export const fetchWorkoutNames = async (userId: string) => {
  const exercises = await fetchWorkoutExercises(userId);
  return Array.from(new Set(exercises.map((item) => item.WorkoutName))) ?? [];
};

export const fetchWorkoutById = async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("Workouts")
    .select(
      "Id, Name, Date, UserId, IsShared, Exercises(Id, Name, Sets, Reps, Weight, WorkoutId)"
    )
    .eq("Id", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchWorkoutExercisesByName = async (
  userId: string,
  workout: any
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("WorkoutExercises")
    .select("ExerciseName")
    .eq("UserId", userId)
    .eq("WorkoutName", workout.Name)
    .neq("WorkoutName", null);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchMyWorkouts = async (userId : string) => {
  const supabase = await createClient()
  const { data, error  } = await supabase
  .from('Workouts')
  .select()
  .eq('UserId', userId)
  .order('Date', {ascending : false});

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchMyWorkoutById = async (id : string) => {
  const supabase = await createClient();
  const {
      data : workoutData,
      error : workoutError
  } = await supabase
  .from('Workouts')
  .select()
  .eq('Id', id)
  .single()

  const {
      data : exerciseData,
      error : exerciseError
  } = await supabase
  .from('Exercises')
  .select()
  .eq('WorkoutId', id)

  if (exerciseError || workoutError) {
    throw new Error(exerciseError?.message || workoutError?.message);
  }

  return { exerciseData, workoutData }

}

export const fetchExerciseList = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ExerciseDemographics')
    .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;

}

