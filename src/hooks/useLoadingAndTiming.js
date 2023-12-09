import { useEffect, useState } from "react"

export const useLoadingAndTiming = (sleepTime) => {
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, sleepTime);
    
        // Clear the timeout to prevent potential memory leaks
        return () => clearTimeout(timeout);
    }, [])

    return loading;
}