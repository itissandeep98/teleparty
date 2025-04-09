import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * Custom hook for managing state in session storage
 * @param key - The key under which the value will be stored in session storage
 * @param initialValue - The initial value to use if no value is stored
 * @param raw - If true, stores the value as-is; if false, JSON stringifies the value
 * @returns A tuple containing the current state and a function to update it
 */
const useSessionStorage = <T>(key: string, initialValue: T, raw: boolean): [T, Dispatch<SetStateAction<T>>] => {
    // Return dummy state if running on server side
    if (typeof window === 'undefined') {
        return [initialValue, () => {}];
    }

    // Initialize state from session storage or initial value
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState<T>(() => {
        try {
            const sessionStorageValue = sessionStorage.getItem(key);
            if (typeof sessionStorageValue !== 'string') {
                // No existing value, set initial value in session storage
                try {
                    sessionStorage.setItem(key, raw ? String(initialValue) : JSON.stringify(initialValue));
                } catch (e) {
                    // Handle storage errors by clearing session
                    console.log(e);
                    sessionStorage.clear();
                    window.sessionStorage.clear();
                }
                return initialValue;
            } else {
                // Parse existing value from session storage
                return raw ? sessionStorageValue : JSON.parse(sessionStorageValue || 'null');
            }
        } catch {
            return initialValue;
        }
    });

    // Sync state changes to session storage
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        try {
            const serializedState = raw ? String(state) : JSON.stringify(state);
            sessionStorage.setItem(key, serializedState);
        } catch {
            console.error('Error Setting Item to Session Storage');
            sessionStorage.clear();
            window.sessionStorage.clear();
        }
    }, [state]);

    return [state, setState];
};

export default useSessionStorage;
