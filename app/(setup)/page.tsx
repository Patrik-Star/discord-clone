import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
  // try {
    const profile = await initialProfile();

    // finds all servers where this user is a member
    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (server) {
      return redirect(`/servers/${server.id}`);
    }

    // If user doesnt own or belong to any server, show the initial modal
    return <InitialModal />;


  // } catch (error) {
  //   console.error(error);
  //   return redirect('/maintenance');
  // }

};

export default SetupPage;
