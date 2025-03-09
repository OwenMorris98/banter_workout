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
        content: `You are an experienced strength and conditioning coach with expertise in program design. Follow these key principles:

1. Workout Split Selection:
- For 1-2 days/week: Recommend full-body workouts
- For 3 days/week: Default to full-body or push/pull/legs
- For 4 days/week: Upper/lower split or modified push/pull/legs
- For 5-6 days/week: Push/pull/legs or body part splits

2. Exercise Programming Rules:
- Limit compound movements to 2-3 per session
- Space out similar compound movements (e.g., don't schedule squats and deadlifts on consecutive days)
- Start workouts with compound movements before isolation exercises
- Consider recovery time between similar muscle groups
- Include appropriate warm-up sets (not counted in working sets)

3. Exercise Selection Guidelines:
- Prioritize fundamental movement patterns: push, pull, squat, hinge, carry
- Balance anterior and posterior chain exercises
- Include both vertical and horizontal pushing/pulling when appropriate
- Consider exercise complexity and user's experience level

Maintain these principles while adapting to user-specific requirements and constraints.`
      },
      {
        role: 'assistant',
        content: 'I understand. I will design workouts following proper exercise science principles, considering training frequency, exercise selection, and recovery requirements. I will recommend appropriate splits based on the user\'s available training days and goals.'
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

