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
        content: 'You are a professional fitness trainer. Create workouts based on user requirements. Keep responses focused on exercise recommendations.',
      },
      {
        role: 'user',
        content: 'I would like you to build a workout schedule for 3 days a week and consists of compound and isolation exercises and format it into a json object'
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

