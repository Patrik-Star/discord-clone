import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// --- Creating a new User ---
export const initialProfile = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            return redirectToSignIn();
        }

        const profile = await db.profile.findUnique({
            where: {
                userId: user.id
            }
        });

        if (profile) {
            return profile
        }

        // if user is using internal login (eg NOT google login provider),
        // the first and last name will be 'null null'
        // SOLUTION: use everything before @ symbol in the email, 
        // eg: patrik.bolander@datacom.com -> fullName: patrik.bolander
        const fullEmailAddress = user.emailAddresses[0].emailAddress;
        let fullName = `${user.firstName} ${user.lastName}`;

        if (fullName === 'null null') {
            fullName = fullEmailAddress.substring(0, fullEmailAddress.indexOf("@"));
        }

        const newProfile = await db.profile.create({
            data: {
                userId: user.id,
                name: fullName,
                imageUrl: user.imageUrl,
                email: fullEmailAddress
            }
        });

        return newProfile;

    } catch (error) {
        console.error('[INITIAL_PROFILE ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// DONE: if new member name is 'null null', give them a proper name based on email address