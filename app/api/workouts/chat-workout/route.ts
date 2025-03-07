import OpenAI from 'openai';
import { streamText } from 'ai';
import workoutSchema from '@/lib/chat-schemas/workout-schema';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export async function POST(req: Request) {
  console.log('Request: ' + req)
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a professional fitness trainer. Create workouts based on user requirements. Keep responses focused on exercise recommendations. Try defining you workouts as a split',
      },
      {
        role : 'assistant',
        content : 'There are many workout splits like Push-Pull-Legs (PPL), Upper-Lower Split, Full-Body Split, Body Part Split, 5-Day Split, 4-Day Split, 3-Day Split, 2-Day Split, Bro Split, 6-12-24 Split'
      },
      {
        role: 'user',
        content: 'I would like you to build a workout schedule with exercises and format it into a json object. If I do not input a certain number of days per week, then use a default of 3 days per week'
      },
      ...messages,
    ],
    tools: [
      {
        type: "function",
        function: {
            name: "generate_workout",
            description: "Generates a structured workout plan",
            parameters: workoutSchema
        }
    }
    ],
    tool_choice: { type: "function", function: { name: "generate_workout" } } 
  });

  const workoutResponse = response.choices[0].message;

  // The error is because we're returning null, which isn't a valid return type for a Next.js API route
  // We need to return a proper Response object instead
  
  // If there are no tool calls, return an empty response with an appropriate status code
  if(!workoutResponse.tool_calls) {
    return new Response(JSON.stringify({ error: "Failed to generate workout" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  // Return the workout response
  return new Response(workoutResponse.tool_calls[0].function.arguments, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });


}

