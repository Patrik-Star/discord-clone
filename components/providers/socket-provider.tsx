"use client"
import { 
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import {io as ClientIO } from 'socket.io-client';

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children}: { children: React.ReactNode}) => {

    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: '/api/socket/io',
            addTrailingSlash: false
        });

        socketInstance.on('connect', () => {
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        })

        setSocket(socketInstance);

        return () =>{
            socketInstance.disconnect();
        }
    }, [])

    return (
        <SocketContext.Provider value={{ socket, isConnected}}>
            {children}
        </SocketContext.Provider>
    )
    

}
// SERVER CONSOLE ERROR: Error handling upgrade request TypeError: Cannot read properties of undefined (reading 'bind')
// https://github.com/vercel/next.js/issues/55802

// go to node_modules/next/dist/server/base-server.js
// line 460 - const origSetHeader = _res.setHeader.bind(_res);
// replace it with const origSetHeader = _res && typeof _res.setHeader === 'function' ? _res.setHeader.bind(_res) : null;
// This has fixed my issue