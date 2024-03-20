"use client"
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";

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
        </>
    )
}

//Hydration error happens when if there is one state while its being rendered on the server and another state when its being rendered on the client