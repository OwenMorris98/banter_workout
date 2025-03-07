import { checkUserAuth } from "@/services/users/check-user";

export default async function Page() {
    await checkUserAuth();
}