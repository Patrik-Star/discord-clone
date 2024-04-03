import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
    params: {
        serverId: string;
    }
}

const ServerIdPage = async ({params}: ServerIdPageProps) => {

    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    }

    // find general channel to redirect user to general channnel by default
    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });

    const initialChannel = server?.channels[0]

    // technically should never happen - this is a safeguard
    if (initialChannel?.name !== "general") {
        return null;
    }

    return redirect(`/servers/${params?.serverId}/channels/${initialChannel?.id}`);
}

export default ServerIdPage;

// TODO: instead of redirecting to channel, keep track of the last open channel and redirect to that