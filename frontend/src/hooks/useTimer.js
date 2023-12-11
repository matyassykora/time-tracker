import { useCallback, useState, useEffect } from "react";

const intervalValue = 11;

const interval =
    (delay = 0) =>
        callback =>
            useEffect(() => {
                const id = setInterval(callback, delay);

                return () => clearInterval(id);
            }, [callback]);

const useInterval = interval(intervalValue);

export const useTimer = () => {
    const [seconds, setSeconds] = useState(0);
    const [adding, setAdding] = useState(false);
    const [consuming, setConsuming] = useState(false);

    const tick = useCallback(
        () => {
            if (adding) {
                setSeconds(seconds => seconds + intervalValue)
                return
            } else if (consuming) {
                setSeconds(seconds => seconds - intervalValue)
                return
            }
            return undefined

        },
        [adding, consuming],
    );

    const startConsume = () => { setConsuming(true); setAdding(false) }
    const startAdd = () => { setAdding(true); setConsuming(false) }
    const pause = () => { setAdding(false); setConsuming(false) };
    const reset = () => { pause(); setSeconds(0); }

    useInterval(tick);

    return { pause, reset, seconds, startAdd, startConsume };
};
