import { User } from '@supabase/supabase-js';

export interface Message {
    role: 'user' | 'assistant'; // Define the roles
    content: string;
  }
  
  export interface Exercise {
    name: string;
    type: "compound" | "isolation";
    sets: number;
    repetitions: number;
    description: string;
  }
  
  export interface ExerciseRequest {
    name: string;
    exercises : {
      Name: string;
      RecSets: string;
      RecReps: string;
    }[]
  }
  
  export interface WorkoutDay {
    day: string;
    name: string;
    exercises: Exercise[];
  }
  
  export interface WorkoutPlan {
    schedule: WorkoutDay[];
  }
  
  export interface WorkoutChatProps {
    onChatStart: () => void;
    onChatEnd: () => void;
    user : User | null;
  }