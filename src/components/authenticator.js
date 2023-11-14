import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Authenticator({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            router.push('/login')
        }        
    }, [router])


    if (isAuthenticated) {
        return <>{children}</>
    }

    return null;

}