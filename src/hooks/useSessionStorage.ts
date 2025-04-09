import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useSessionStorage = <T>(key: string, initialValue: T, raw: boolean): [T, Dispatch<SetStateAction<T>>] => {
    if (typeof window === 'undefined') {
        return [initialValue, () => {}];
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState<T>(() => {
        try {
            const sessionStorageValue = sessionStorage.getItem(key);
            if (typeof sessionStorageValue !== 'string') {
                try {
                    sessionStorage.setItem(key, raw ? String(initialValue) : JSON.stringify(initialValue));
                } catch (e) {
                    console.log(e);
                    sessionStorage.clear();
                    window.sessionStorage.clear();
                }
                return initialValue;
            } else {
                return raw ? sessionStorageValue : JSON.parse(sessionStorageValue || 'null');
            }
        } catch {
            return initialValue;
        }
    });

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
