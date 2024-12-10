import { CreateWorkoutProps } from '@/lib/excerciseInterfaces/IExerciseList';
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface CreateWorkoutRequest {
    workoutName : string,
    exercises: {
        Id: string | number;
        Name: string;
    }[]
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser()
        const body = await request.json() as CreateWorkoutRequest;
        console.log(body);
        
        
        const workouts = body.exercises.map(exercise => ({
            WorkoutName: body.workoutName,
            ExerciseName: exercise.Name,
            UserId: user?.id
        }));
        
        // Insert workouts into the database
        const { data, error } = await supabase
            .from('WorkoutExercises')
            .insert(workouts)
            .select()

        if (error) throw error
        
        return NextResponse.json({ data }, { status: 201 })
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const supabase = await createClient();
        const body = await request.json()
        const { id, updates } = body

        // Update workout in the database
        const { data, error } = await supabase
            .from('workouts')
            .update(updates)
            .eq('id', id)
            .select()

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}