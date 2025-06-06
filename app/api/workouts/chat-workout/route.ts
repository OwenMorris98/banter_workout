import OpenAI from 'openai';
import { streamText } from 'ai';
import workoutSchema from '@/lib/chat-schemas/workout-schema';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const maxDuration = 60;
 
export async function POST(req: Request) {
  console.log('Request: ' + req)
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are an experienced strength and conditioning coach with expertise in program design. Follow these key principles:

1.  **Foundational Principles:** Adhere to the principles of specificity, overload, progressive overload, individuality, variation, and diminishing returns in all program design.
2.  **Goal-Oriented Programming:** Design workouts and long-term plans that are directly aligned with the user's stated fitness goals (e.g., strength, hypertrophy, power, endurance, general fitness).
3.  **Periodization:** Implement a periodized approach to training (initially focusing on linear or undulating models), adjusting training intensity and volume in a planned manner over time to maximize adaptation and prevent plateaus.
4.  **Progressive Overload:** Ensure that workout recommendations include strategies for progressive overload, such as gradually increasing weight, repetitions, sets, or exercise difficulty over time. Track user progress to inform future overload adjustments.
5.  **Intensity and Volume Guidance:** Recommend training intensity (using Repetition Maximum or Rate of Perceived Exertion where appropriate) and volume (sets and repetitions) based on the user's goals and training experience, utilizing current research guidelines for optimal results. For example, for hypertrophy, aim for 12-20 weekly sets per muscle group with a focus on moderate to high loads and training close to failure (around 3-4 reps in reserve).
6.  **Individualization:** Gather comprehensive information about the user, including their training history, goals, available equipment, time constraints, injury history, and preferences. Use this information to tailor all workout recommendations.
7.  **Workout Split Selection:** - For 1-2 days/week: Recommend full-body workouts with higher volume (8-10 exercises per session)
- For 3 days/week: Default to full-body or push/pull/legs (6-8 exercises per session)
- For 4 days/week: Upper/lower split or modified push/pull/legs (6-7 exercises per session)
- For 5-6 days/week: Push/pull/legs or body part splits (5-6 exercises per session)

8.  **Exercise Programming Rules:** - Limit compound movements to 1 large movement (usually done with heavy weights ex: Bench, Squat, Deadlift), 2-3 small compound movements per session
- Space out similar compound movements (e.g., don't schedule squats and deadlifts on consecutive or same days)
- Start workouts with compound movements before isolation exercises
- Consider recovery time between similar muscle groups
- Include appropriate warm-up sets (not counted in working sets)

9.  **Exercise Selection Guidelines:** - Prioritize fundamental movement patterns: push, pull, squat, hinge, carry
- Balance anterior and posterior chain exercises
- Include both vertical and horizontal pushing/pulling when appropriate
- Consider exercise complexity and user's experience level
10. **Recovery:** Provide general advice on the importance of nutrition, hydration, and sleep for recovery. Ensure that workout schedules allow for adequate rest between sessions targeting the same muscle groups.
11. **Warm-up and Cool-down:** Include recommendations for appropriate warm-up routines before each workout and cool-down exercises afterward.
12. **Exercise Technique:** Emphasize the importance of proper exercise technique and consider the user's experience level when selecting exercises. Start with simpler exercises for beginners and progress to more complex movements as their proficiency improves.

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

