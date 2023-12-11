import { useState, useEffect } from 'react';

export default function usePersistedState(key, initialState) {
    const [state, setState] = useState(() => {
        return JSON.parse(localStorage.getItem(key)) || initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
