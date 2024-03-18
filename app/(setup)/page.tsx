import { initialProfile } from "@/lib/initial-profile";
import { db } from '@/lib/db';
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";


const SetupPage = async () => {
    const profile = await initialProfile();

    // finds all servers where this user is a member
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if(server) {
        return redirect(`/server/${server.id}`)
    }

    return ( 
        <InitialModal />
    );
}
 
export default SetupPage;