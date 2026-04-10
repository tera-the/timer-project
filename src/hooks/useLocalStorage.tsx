import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);

            if (storedValue !== null) {
                return JSON.parse(storedValue);
            }

            return typeof initialValue === "function"
                ? (initialValue as () => T)()
                : initialValue;
        } catch (error) {
            console.error('Error reading from localstorage', error);

            return typeof initialValue === "function"
                ? (initialValue as () => T)()
                : initialValue;
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {

            console.error('Error reading from localstorage', error);
        }
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue];
}

