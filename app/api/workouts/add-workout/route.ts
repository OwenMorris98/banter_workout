import { CreateWorkoutProps } from '@/lib/excerciseInterfaces/IExerciseList';
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface CreateWorkoutRequest {
    Id: string;
    Name: string;
    Date : Date;
    UserId: string;
    IsShared: boolean;
    RecSets: string;
    RecReps: string;

}

export async function POST(request: Request) {
    try {
        console.log('Made it to the server')
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser()
        const body = await request.json() as CreateWorkoutRequest;
        console.log(body);

        if(!user?.id) {
            return NextResponse.json({ error: "No user found" }, { status: 401 })
        }
        body.UserId = user.id;
        // Insert workouts into the database
        const { data, error } = await supabase
            .from('Workouts')
            .insert({Id : body.Id, Name: body.Name, Date : body.Date, UserId : body.UserId, IsShared: body.IsShared})
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