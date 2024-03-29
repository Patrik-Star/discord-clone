import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// --- Admin Kicks a User ---
export async function DELETE(req: Request, { params }: { params: { memberId: string } }) {
    try {
        const profile = await currentProfile();
        const { searchParams} = new URL(req.url);

        const serverId = searchParams.get("serverId");

        if(!profile){
            return new NextResponse("unauthorised", {status: 401});
        }

        if(!serverId){
            return new NextResponse("Server ID missing", { status: 400 });
        }

        if (!params.memberId) {
            return new NextResponse("Member ID missing", {status: 400})
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id // not able to kick themselves via api
                        }
                    }
                }
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        });

        return NextResponse.json(server);

    } catch (error) {
        console.log("[MEMBER_ID_DELETE]", error)
        return new NextResponse("Internal Error", {status: 500})
    }

}

// --- Admin changes role of a Member ---
export async function PATCH(req: Request, { params }: { params: { memberId: string } }) {

    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();

        const serverId = searchParams.get("serverId");

        if (!profile) {
            return new NextResponse("Unauthorised", { status: 401 })
        }

        if (!serverId) {
            return new NextResponse("Server ID missing", { status: 400 })
        }

        if (!params.memberId) {
            return new NextResponse("member ID missing", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: {
                                not: profile.id // check it cant change its own role via api (Admin user cant demote themselves)
                            }
                        },
                        data: {
                            role
                        }
                    }
                }
            },
            include: { // includes the following to be used on the return call
                members: {
                    include: {
                        profile: true
                    },
                    orderBy: {
                        role: "asc"
                    }
                }
            }
        });

        return NextResponse.json(server)

    } catch (error) {
        console.log("[MEMBERS_ID_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}