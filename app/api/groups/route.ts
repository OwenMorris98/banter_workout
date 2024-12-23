import { CreateGroup, CreateGroupRequest } from "@/lib/groupInterfaces/createGroup";
import { checkUserAuth } from "@/services/users/check-user";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        console.log('Made it to the server')
        const Creator = await checkUserAuth();
        const supabase = await createClient();
        const body = await request.json() as CreateGroupRequest;
        let Id = crypto.randomUUID();

        
        console.log(body);
        console.log(Id);
        console.log(Creator.id);
 
        const { data, error } = await supabase
            .from('Groups')
            .insert({Id: Id, Name : body.Name, Description : body.Description, CreatorId: Creator.id})
            .select() 

        const {data : GroupUser, error : GroupUserError} = await supabase
            .from('GroupUser')
            .insert({GroupsId : Id, MembersId : Creator.id})
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