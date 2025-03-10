'use client'
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';

interface Message {
  role: 'user' | 'assistant'; // Define the roles
  content: string;
}

interface Exercise {
  name: string;
  type: "compound" | "isolation";
  sets: number;
  repetitions: number;
}

interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
  schedule: WorkoutDay[];
}

export default function WorkoutChat() {
  const [messages, setMessages] = useState<Message[]>([]); // Specify the type here
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>();
  const [input, setInput] = useState('');

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    const userMessage: Message = { role: 'user', content: input }; // Use the Message type
    setMessages([...messages, userMessage]);
    const updatedMessage : Message[] = [...messages, userMessage]
    console.log(userMessage);
    let plan = await fetchWorkout(updatedMessage);
    setWorkoutPlan(plan);
    setInput('');
  };

  async function fetchWorkout(messages : Message[]) : Promise<WorkoutPlan> {
    const response = await fetch('/api/workouts/chat-workout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages] }),
    });
    console.log(response);
    const data: WorkoutPlan = await response.json();
    return data;
  }

  return (
    <div className="flex flex-col space-y-4 max-w-xl mx-auto p-4">
      <div className="flex flex-col space-y-2">
        {workoutPlan ? (
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Workout Plan</h2>
            {workoutPlan?.schedule?.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-6 border-b pb-4">
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-1">Day:</label>
                  <Input 
                    value={day.day} 
                    onChange={(e) => {
                      const updatedPlan = {...workoutPlan};
                      updatedPlan.schedule[dayIndex].day = e.target.value;
                      setWorkoutPlan(updatedPlan);
                    }}
                    className="w-full"
                  />
                </div>
                
                <h3 className="font-semibold mt-3 mb-2">Exercises:</h3>
                {day.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="border rounded p-3 mb-3">
                    <div className="mb-2">
                      <label className="block text-sm font-medium mb-1">Exercise Name:</label>
                      <Input 
                        value={exercise.name} 
                        onChange={(e) => {
                          const updatedPlan = {...workoutPlan};
                          updatedPlan.schedule[dayIndex].exercises[exerciseIndex].name = e.target.value;
                          setWorkoutPlan(updatedPlan);
                        }}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="mb-2">
                      <label className="block text-sm font-medium mb-1">Type:</label>
                      <select 
                        value={exercise.type}
                        onChange={(e) => {
                          const updatedPlan = {...workoutPlan};
                          updatedPlan.schedule[dayIndex].exercises[exerciseIndex].type = 
                            e.target.value as "compound" | "isolation";
                          setWorkoutPlan(updatedPlan);
                        }}
                        className="w-full p-2 border rounded"
                      >
                        <option value="compound">Compound</option>
                        <option value="isolation">Isolation</option>
                      </select>
                    </div>
                    
                    <div className="mb-2">
                      <label className="block text-sm font-medium mb-1">Sets:</label>
                      <Input 
                        type="number"
                        value={exercise.sets.toString()} 
                        onChange={(e) => {
                          const updatedPlan = {...workoutPlan};
                          updatedPlan.schedule[dayIndex].exercises[exerciseIndex].sets = 
                            parseInt(e.target.value) || 0;
                          setWorkoutPlan(updatedPlan);
                        }}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="mb-2">
                      <label className="block text-sm font-medium mb-1">Repetitions:</label>
                      <Input 
                        type="number"
                        value={exercise.repetitions.toString()} 
                        onChange={(e) => {
                          const updatedPlan = {...workoutPlan};
                          updatedPlan.schedule[dayIndex].exercises[exerciseIndex].repetitions = 
                            parseInt(e.target.value) || 0;
                          setWorkoutPlan(updatedPlan);
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
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

      <form onSubmit={handleSubmit} className="flex space-x-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a workout plan..."
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}