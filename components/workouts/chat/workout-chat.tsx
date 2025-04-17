'use client'
import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { ExerciseInput } from './workout-card';
import type { 
  Message, 
  WorkoutPlan, 
  ExerciseRequest, 
  WorkoutChatProps 
} from './chat-interfaces';
import { useWorkoutChat } from '../../hooks/workouts/useWorkoutChat';
// Removed the import for toast as it's causing an error due to missing module or type declarations.

export default function WorkoutChat({ onChatStart, onChatEnd, user, initialWorkoutPlan }: WorkoutChatProps) {
  const {
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
    shareWorkout
  } = useWorkoutChat({ 
    onChatStart, 
    onChatEnd,
    onSaveSuccess: () => console.log('Workouts saved successfully'),
    onSaveError: (error) => console.error('Error saving workouts:', error.message)
  });

  useEffect(() => {
    if (initialWorkoutPlan && setWorkoutPlan) {
      setWorkoutPlan(initialWorkoutPlan);
      setSubmitted(true);
    }
  }, [initialWorkoutPlan, setWorkoutPlan, setSubmitted]);

  return (
    <div className="flex flex-col space-y-4 max-w-xl mx-auto">
      <div className="flex flex-col space-y-2">
        {workoutPlan ? (
          <div>
            <div className='flex justify-between'>
              <h2 className="text-xl font-bold underline mb-4 borderrounded-lg p-1">Workout Plan</h2>
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  onClick={() => shareWorkout()}
                  disabled={isSaving}
                  variant="outline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                  Share
                </Button>
                <Button 
                  type="submit" 
                  onClick={() => handleSave(user)}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    'Save'
                  )}
                </Button>
              </div>
            </div>
            {workoutPlan?.schedule?.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-6  pb-4 border rounded-lg p-4">
                <div className="mb-2"> 
                  <h3 className="text-xl font-bold mb-4">{day.day}</h3>               
                </div>
                <div className="mb-2">
                <label className="block text-sm font-medium font-bold mb-1">Name: </label>
                  <Input 
                    placeholder={day.name} 
                    onChange={(e) => {
                      const updatedPlan = {...workoutPlan};
                      updatedPlan.schedule[dayIndex].name = e.target.value;
                      setWorkoutPlan(updatedPlan);
                    }}
                    className="w-full"
                    
                  />
                </div>              
                <h3 className="font-semibold mt-3 mb-2">Exercises: {day.exercises.length}</h3>
                {day.exercises.map((exercise, exerciseIndex) => (
                  <ExerciseInput
                    key={exerciseIndex}
                    exercise={exercise}
                    onExerciseChange={(updatedExercise) => {
                      const updatedPlan = {...workoutPlan};
                      updatedPlan.schedule[dayIndex].exercises[exerciseIndex] = updatedExercise;
                      setWorkoutPlan(updatedPlan);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          messages.map((m, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                m.role === 'assistant'
                  ? 'bg-black-800 text-white'
                  : 'bg-black-700 text-white'
              }`}
            >
              <p className="text-sm font-semibold mb-1">
                {m.role === 'assistant' ? 'AI Trainer' : 'You'}:
              </p>
              <p className="text-sm whitespace-pre-wrap">{m.content}</p>
            </div>
          ))
        )}
      </div>
      {!submitted && 
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a workout plan..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              'Send'
            )}
          </Button>
        </form>
      }
    </div>
  );
}