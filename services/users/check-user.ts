import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function checkUserAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }
  return user;
}

export async function checkIfUserAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }
  return user;
}

export const fetchUsername = async (userId : string) => {
  const supabase = await createClient();
  const {data, error} = await supabase.from('Users').select("Username").eq('Id', userId).single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}