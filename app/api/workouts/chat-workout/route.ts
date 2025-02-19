import OpenAI from 'openai';
import { streamText } from 'ai';
 
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
  });

  return new Response(JSON.stringify(response.choices[0].message), {
    headers: { 'Content-Type': 'application/json' },
  });
}

