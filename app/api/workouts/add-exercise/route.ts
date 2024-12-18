import { createClient } from '@/utils/supabase/server';
import { Weight } from 'lucide-react';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface CreateWorkoutExerciseRequest {
    ExerciseName: string;
    Reps: number,
    Weight: number,
    WorkoutId : string,
}

export async function POST(request: Request) {
    try {
        console.log('Made it to the server')
        const supabase = await createClient();
        
        const body = await request.json() as CreateWorkoutExerciseRequest;
        let Id = crypto.randomUUID();
        console.log(body);
 
        const { data, error } = await supabase
            .from('Exercises')
            .insert({Id: Id, Name: body.ExerciseName, Sets: 1, Reps : body.Reps, Weight: body.Weight, WorkoutId: body.WorkoutId })
            .select() 

        if (error) throw error
        
        return NextResponse.json({ data }, { status: 201 })
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}