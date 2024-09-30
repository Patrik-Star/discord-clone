import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const currentProfile = async () => {
  // try {
    const { userId } = auth();

    if (!userId) {
      return null;
    }

    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  // } catch (error) {
  //   console.error(error);
  //   return redirect("/maintenance");
  // }
};
