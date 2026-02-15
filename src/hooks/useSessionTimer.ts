import { useState, useEffect, useRef } from 'react';

export const useSessionTimer = (startTime: number | null) => {
    const [duration, setDuration] = useState<string>('00:00');
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!startTime) {
            setDuration('00:00');
            return;
        }

        const updateTimer = () => {
            const now = Date.now();
            const diff = Math.floor((now - startTime) / 1000);

            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;

            const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            setDuration(formatted);
        };

        // Initial update
        updateTimer();

        timerRef.current = setInterval(updateTimer, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [startTime]);

    return duration;
};
