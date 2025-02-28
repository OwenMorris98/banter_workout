import OpenAI from 'openai';
import { streamText } from 'ai';
import workout_schema from '@/lib/chat-schemas/workout-schema';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
export async function POST(req: Request) {
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
        content: 'I would like you to build a workout schedule for 3 days a week and consists of compound and isolation exercises'
      },
      ...messages,
    ],
    tools: [
      {
        "type": "function",
        "function": {
            "name": "generate_workout",
            "description": "Generates a structured workout plan",
            "parameters": workout_schema
        }
    }
    ],
    tool_choice: { type: "function", function: { name: "generate_workout" } } 
  });

  return new Response(JSON.stringify(response.choices[0].message), {
    headers: { 'Content-Type': 'application/json' },
  });
}

