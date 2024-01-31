import { useCallback } from 'react';

export const useTextScramble = () =>
    useCallback((text) => {
        const parts = [];
        for (let i = 2; i <= text.length; i++) {
            if (i % 2 === 0) {
                parts.push(text.substring(i - 2, i));
            } else if (i === text.length) {
                parts.push(text.substring(i - 1));
            }
        }
        return parts;
    }, []);
