
import { useEffect, useRef } from "react";

export function useInterval(callback, delay) {
    const savedCallback = useRef();
    // Remember The Latest Callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set Up The Interval
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [delay]);
};
