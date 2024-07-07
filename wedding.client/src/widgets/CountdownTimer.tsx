import React, { useState, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { Grid, Typography } from '@mui/material';

interface CountdownTimerProps {
    targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {

    const [timeLeft, setTimeLeft] = useState(
        differenceInSeconds(new Date(targetDate), new Date())
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(differenceInSeconds(new Date(targetDate), new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft % 86400) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item>
                <Typography variant="h4" component="div" style={{ fontFamily: "Cormorant Infant" }}>
                    {days} *
                </Typography>
                <Typography variant="body1" component="div" style={{ textAlign: "center" }}>
                   дней
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h4" component="div" style={{ fontFamily: "Cormorant Infant" }}>
                    {hours} *
                </Typography>
                <Typography variant="body1" component="div" style={{ textAlign: "center" }}>
                    часов
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h4" component="div" style={{ fontFamily: "Cormorant Infant" }}>
                    {minutes} *
                </Typography>
                <Typography variant="body1" component="div" style={{ textAlign: "center" }}>
                    минут
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h4" component="div" style={{ fontFamily: "Cormorant Infant" }}>
                    {seconds}
                </Typography>
                <Typography variant="body1" component="div" style={{ textAlign: "center" }}>
                    секунд
                </Typography>
            </Grid>
        </Grid>
    );
};

export default CountdownTimer;