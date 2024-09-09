import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

// TODO: if the DB is down, address this.
const SetupPage = async () => {
  try {
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
  } catch (error) {
    return redirect('/maintenance');
  }

  return <InitialModal />;
};

export default SetupPage;
