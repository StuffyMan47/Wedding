import React, { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { Typography } from '@mui/material';

interface CountdownTimerProps {
    targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(
        differenceInSeconds(targetDate, new Date())
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(differenceInSeconds(targetDate, new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <Typography variant="h4" component="div">
            {days}d {hours}h {minutes}m {seconds}s
        </Typography>
    );
};

export default CountdownTimer;