"use client"
import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true)
    }, [])
    
    if(!isMounted){
        return null
    }

    return (
        <>
            <CreateServerModal />
            <InviteModal />
        </>
    )
}

//Hydration error happens when if there is one state while its being rendered on the server and another state when its being rendered on the client