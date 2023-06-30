import { useEffect } from 'react';

export const setLocalStorage = (key) => {
    const setValue = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            setValue(JSON.parse(storedValue));
        }
    }, [key]);

    return setValue;
};

