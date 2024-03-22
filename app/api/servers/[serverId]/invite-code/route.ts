import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
    req: Request,
    { params }: { params: { serverId: string } }
) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        if (!params.serverId) {
            return new NextResponse("Server Id missing", { status: 400 })
        }

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id,
                // members: { some: {role: MemberRole.MODERATOR}} - if want to enable Moderators to generate new invite link
            },
            data: {
                inviteCode: uuidv4(),
            }
        });

        return NextResponse.json(server)

    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Error", { status: 50 });
    }
}