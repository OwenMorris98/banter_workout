import { createClient } from '@/utils/supabase/server';
import { Weight } from 'lucide-react';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface CreateExerciseDemographicRequest {
    value: string;
}

export async function POST(request: Request) {
    try {
        console.log('Made it to the server')
        const supabase = await createClient();
        
        const body = await request.json() as CreateExerciseDemographicRequest;
        console.log(body)
        //let Id = crypto.randomUUID();
        let ExerciseName = body.value;
        
        const { data: nameCheck, error: nameCheckError } = await supabase
            .from('ExerciseDemographics')
            .select()
            .eq('Name', ExerciseName);
        if (nameCheck && nameCheck.length > 0) {
            return NextResponse.json({ error: 'conflict', message: 'Item already exists' }, { status: 409 });
        }
        console.log('nameCheck for',ExerciseName + ' ' + nameCheck)
 
        const { data, error } = await supabase
            .from('ExerciseDemographics')
            .insert({Name : ExerciseName})
            .select() 

        if (error) throw error
        
        return NextResponse.json({ data }, { status: 201 })
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}