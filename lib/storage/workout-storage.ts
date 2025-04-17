import { WorkoutPlan } from '@/components/workouts/chat/chat-interfaces';

const WORKOUT_STORAGE_KEY = 'workout_plans';

export function saveWorkoutToLocalStorage(plan: WorkoutPlan): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Get existing saved workouts
    const savedWorkouts = getSavedWorkouts();
    
    // Add the new workout with a timestamp
    savedWorkouts.push({
      plan,
      savedAt: new Date().toISOString(),
      id: `local-${Date.now()}`
    });
    
    // Save back to localStorage
    localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(savedWorkouts));
  } catch (error) {
    console.error('Error saving workout to localStorage:', error);
  }
}

export function getSavedWorkouts(): Array<{plan: WorkoutPlan, savedAt: string, id: string}> {
  if (typeof window === 'undefined') return [];
  
  try {
    const saved = localStorage.getItem(WORKOUT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading workouts from localStorage:', error);
    return [];
  }
}

export function clearSavedWorkouts(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(WORKOUT_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing saved workouts:', error);
  }
}

export function removeSavedWorkout(id: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const savedWorkouts = getSavedWorkouts();
    const filteredWorkouts = savedWorkouts.filter(workout => workout.id !== id);
    localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(filteredWorkouts));
  } catch (error) {
    console.error('Error removing saved workout:', error);
  }
} 