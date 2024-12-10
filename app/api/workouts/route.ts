import { createClient } from '@/utils/supabase/server'
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