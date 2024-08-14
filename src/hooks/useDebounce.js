import { useState, useEffect } from 'react';

/**
 * A custom hook that debounces a value, delaying the update until after a specified delay period.
 * 
 * @param {any} value - The value to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * 
 * @returns {any} The debounced value.
 */

const useDebounce = (value, delay) => {
    // State to hold the debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up a timeout to update the debounced value after the specified delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear the timeout if the component unmounts or if `value` or `delay` changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Only re-run the effect if `value` or `delay` changes

    return debouncedValue;
};

export default useDebounce;
