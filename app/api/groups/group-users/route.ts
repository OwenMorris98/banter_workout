import { CreateGroup, CreateGroupRequest, CreateGroupUser } from "@/lib/groupInterfaces/createGroup";
import { checkUserAuth } from "@/services/users/check-user";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        console.log('Made it to the server')
        const user = await checkUserAuth();
        const supabase = await createClient();
        const body = await request.json() as CreateGroupUser;

        
        console.log(body);
        
        const {data , error } = await supabase
            .from('GroupUser')
            .insert({GroupsId : body.GroupsId, MembersId : user.id})
            .select()

            if (error) {
                console.log(error.message)
                throw error
            } 
           
        return NextResponse.json({ data }, { status: 201 })
    } catch (error : any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}