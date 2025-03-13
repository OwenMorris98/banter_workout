'use client'
import { useState } from 'react';
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

export default function WorkoutChat({ onChatStart, onChatEnd, user }: WorkoutChatProps) {
  const {
    messages,
    workoutPlan,
    input,
    setInput,
    setWorkoutPlan,
    isLoading,
    isSaving,
    submitted,
    handleSubmit,
    handleSave
  } = useWorkoutChat({ 
    onChatStart, 
    onChatEnd,
    onSaveSuccess: () => console.log('Workouts saved successfully'),
    onSaveError: (error) => console.error('Error saving workouts:', error.message)
  });

  return (
    <div className="flex flex-col space-y-4 max-w-xl mx-auto">
      <div className="flex flex-col space-y-2">
        {workoutPlan ? (
          <div>
            <div className='flex justify-between'>
              <h2 className="text-xl font-bold underline mb-4 borderrounded-lg p-1">Workout Plan</h2>
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