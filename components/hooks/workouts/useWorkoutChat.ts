import { useState } from 'react';
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

async function fetchWorkout(messages: Message[]): Promise<WorkoutPlan> {
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
    if (!user || !workoutPlan?.schedule) {
        copyWorkoutToClipboard();
      console.log('User not authenticated or no workout plan');
      return false;
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
  };
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
    submitted,
    handleSubmit,
    handleSave,
    resetChat
  };
}
