import { createClient } from '@/utils/supabase/server'
import { User } from 'lucide-react';
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const body = await request.json();
        console.log(body);
        
        const { workouts } = body

        



        // Insert workouts into the database
        const { data, error } = await supabase
            .from('workouts')
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
        console.log('made it to server')
        const supabase = await createClient();
        const body = await request.json()
        const { Id, DisplayName } = body

        console.log(body);

        // Update workout in the database
        const { data, error } = await supabase
            .from('Users')
            .update({ Username : DisplayName})
            .eq('Id', Id)
            .select()

        if (error) throw error

        return NextResponse.json({ data })
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}