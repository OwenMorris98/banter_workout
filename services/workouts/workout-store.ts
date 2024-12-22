import { createClient } from "@/utils/supabase/server";

/**
 * Fetches exercises for a given user's workouts.
 * 
 * This function queries the database for exercises associated with a user's workouts.
 * It filters out exercises that are not part of a workout (i.e., WorkoutName is null).
 * 
 * @param {string} userId - The ID of the user for whom to fetch exercises.
 * @returns {Array} An array of exercises with their names and the workouts they belong to.
 * @throws {Error} Throws an error if the database query fails.
 */
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
/**
 * Function to fetch workout names for a user
 * @param {string} userId - The ID of the user
 * @returns {Array} - An array of unique workout names
 */
export const fetchWorkoutNames = async (userId: string) => {
  const exercises = await fetchWorkoutExercises(userId);
  return Array.from(new Set(exercises.map((item) => item.WorkoutName))) ?? [];
};

/**
 * Fetches a workout by its ID.
 * 
 * This function queries the database for a workout with a given ID. It retrieves the workout's details including its exercises.
 * 
 * @param {string} slug - The ID of the workout to fetch.
 * @returns {Object} The workout object with its details and exercises.
 * @throws {Error} Throws an error if the database query fails.
 */
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

/**
 * Fetches exercises for a specific workout by its name.
 * 
 * This function queries the database for exercises associated with a workout identified by its name. It filters the results to only include exercises for the specified workout and user.
 * 
 * @param {string} userId - The ID of the user.
 * @param {Object} workout - The workout object containing the workout's name.
 * @returns {Array} An array of exercise names associated with the specified workout.
 * @throws {Error} Throws an error if the database query fails.
 */
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

/**
 * Fetches all workouts for a specific user.
 * 
 * This function queries the database for all workouts associated with a specific user. It filters the results to only include workouts for the specified user and orders them by date in descending order.
 * 
 * @param {string} userId - The ID of the user.
 * @returns {Array} An array of workout objects associated with the specified user.
 * @throws {Error} Throws an error if the database query fails.
 */

export const fetchMyWorkouts = async (userId : string) => {
  const supabase = await createClient()
  const { data, error  } = await supabase
  .from('Workouts')
  .select('')
  .eq('UserId', userId)
  .order('Date', {ascending : false});

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * Fetches a workout and its associated exercises by the workout's ID.
 * 
 * This function queries the database for a specific workout identified by its ID and fetches all exercises associated with that workout. It returns an object containing both the workout data and exercise data.
 * 
 * @param {string} id - The ID of the workout.
 * @returns {Object} An object containing the workout data and exercise data.
 * @throws {Error} Throws an error if the database query fails.
 */
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

/**
 * Fetches the list of exercises from the database.
 * 
 * This function queries the database for all exercises and returns them in a list. It is used to populate the exercise selection for workout creation or editing.
 * 
 * @returns {Array} An array of exercise objects.
 * @throws {Error} Throws an error if the database query fails.
 */
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

