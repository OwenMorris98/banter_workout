import { useState, useEffect } from 'react';
import { Message, WorkoutPlan, ExerciseRequest } from '@/components/workouts/chat/chat-interfaces';
import { User } from '@supabase/supabase-js';

interface UseWorkoutChatProps {
  onChatStart?: () => void;
  onChatEnd?: () => void;
  onSaveSuccess?: () => void;
  onSaveError?: (error: Error) => void;
}

export function useWorkoutChat({ 
  onChatStart, 
  onChatEnd,
  onSaveSuccess,
  onSaveError
}: UseWorkoutChatProps = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  // Add offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    // Set initial state
    if (typeof navigator !== 'undefined') {
      setIsOffline(!navigator.onLine);
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  async function fetchWorkout(messages: Message[]): Promise<WorkoutPlan> {
    if (isOffline) {
      // Check cache for previously generated plans when offline
      try {
        if (typeof caches !== 'undefined') {
          const cache = await caches.open('workout-app-v1');
          const cachedResponse = await cache.match('/api/workouts/chat-workout');
          
          if (cachedResponse) {
            return await cachedResponse.json();
          }
        }
      } catch (e) {
        console.error('Error accessing cache:', e);
      }
      
      throw new Error('You are offline and no cached workouts are available');
    }
    
    // Original implementation for online mode
    const response = await fetch('/api/workouts/chat-workout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages] }),
    });
    
    const data: WorkoutPlan = await response.json();
    return data;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isOffline) {
      // Show an error or notification that user is offline
      console.error('Cannot generate workouts while offline');
      return;
    }
    
    setIsLoading(true);
    onChatStart?.();
    
    const userMessage: Message = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    try {
      const plan = await fetchWorkout(updatedMessages);
      setWorkoutPlan(plan);
      setSubmitted(true);
    } catch (error) {
      console.error('Error fetching workout plan:', error);
    } finally {
      setInput('');
      setIsLoading(false);
      onChatEnd?.();
    }
  };

  const handleSave = async (user: User | null) => {
    if (!workoutPlan?.schedule) {
      console.log('No workout plan');
      return false;
    }

    // Always save to localStorage for offline access
    try {
      // Import dynamically to avoid issues with SSR
      const { saveWorkoutToLocalStorage } = await import('@/lib/storage/workout-storage');
      saveWorkoutToLocalStorage(workoutPlan);
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }

    // If offline or no user, just save locally and return
    if (isOffline || !user) {
      copyWorkoutToClipboard();
      onSaveSuccess?.();
      return true;
    }

    setIsSaving(true);
    
    try {
      await Promise.all(workoutPlan.schedule.map(async (day) => {
        const request: ExerciseRequest = {
          name: day.name,
          exercises: day.exercises.map(ex => ({
            Name: ex.name,
            RecSets: ex.sets.toString(),
            RecReps: ex.repetitions.toString()
          }))
        };

        const response = await fetch('/api/workouts/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }));
      
      console.log('All workouts saved successfully');
      onSaveSuccess?.();
      return true;
    } catch (error) {
      console.error('An error occurred:', error);
      onSaveError?.(error instanceof Error ? error : new Error(String(error)));
      return false;
    } finally {
      copyWorkoutToClipboard();
      setIsSaving(false);
    }
  };

  // Add function to share workout using Web Share API if available
  const shareWorkout = async () => {
    if (!workoutPlan) return false;
    
    // Format the workout for sharing
    const formattedWorkout = formatWorkoutForSharing(workoutPlan);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Workout Plan',
          text: formattedWorkout,
          url: window.location.href
        });
        return true;
      } catch (error) {
        // Fall back to clipboard
        console.log('Error sharing:', error);
        navigator.clipboard.writeText(formattedWorkout);
        return true;
      }
    } else {
      // Use clipboard API as before
      navigator.clipboard.writeText(formattedWorkout);
      return true;
    }
  };

  // Helper function to format workout for sharing
  const formatWorkoutForSharing = (plan: WorkoutPlan): string => {
    let result = '📅 MY WORKOUT PLAN\n\n';
    
    plan.schedule.forEach(day => {
      result += `🔹 ${day.day}: ${day.name || 'Workout'}\n`;
      
      day.exercises.forEach(exercise => {
        result += `   • ${exercise.name}: ${exercise.sets} sets x ${exercise.repetitions} reps\n`;
      });
      
      result += '\n';
    });
    
    result += '💪 Created with AI Workout Planner';
    return result;
  };

  const copyWorkoutToClipboard = () => {
    if (!workoutPlan?.schedule) {
      console.log('No workout plan to copy');
      return false;
    }

    try {
      // Format the workout plan as a readable string
      let formattedWorkout = "MY WORKOUT PLAN\n\n";
      
      workoutPlan.schedule.forEach((day) => {
        formattedWorkout += `${day.day}: ${day.name}\n`;
        formattedWorkout += "====================\n";
        
        day.exercises.forEach((exercise, index) => {
          formattedWorkout += `${index + 1}. ${exercise.name} ${exercise.sets} X ${exercise.repetitions}\n`;
        });
        
        formattedWorkout += "\n";
      });
      navigator.clipboard.writeText(formattedWorkout);
      alert('Workout copied to clipboard!');
      return true;
    } catch (error) {
      console.error('Failed to copy workout to clipboard:', error);
      return false;
    }
  };

  const resetChat = () => {
    setMessages([]);
    setWorkoutPlan(undefined);
    setInput('');
    setSubmitted(false);
  };

  return {
    messages,
    workoutPlan,
    input,
    setInput,
    setWorkoutPlan,
    isLoading,
    isSaving,
    isOffline,
    submitted,
    setSubmitted,
    handleSubmit,
    handleSave,
    shareWorkout,
    resetChat
  };
}
