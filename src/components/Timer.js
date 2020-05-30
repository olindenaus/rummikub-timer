import React, { useState, useEffect } from 'react';

export const Timer = ({ name, onSwitch }) => {

    const [countdown, setCountdown] = useState();
    const [intervalRef, setIntervalRef] = useState();
    const [running, setRunning] = useState();
    const [displayTime, setDisplayTime] = useState('');

    useEffect(() => {
        return () => {
            clearInterval(intervalRef);
        }
    }, [])

    useEffect(() => {
        updateDisplayTime(countdown);
        checkConditions();
    }, [countdown]);

    useEffect(() => {
        clearInterval(intervalRef);
        setCountdown(60);
        toggleTimer();
    }, [name]);

    const switchPlayer = () => {
        clearInterval(intervalRef);
        toggleTimer();
        onSwitch();
    }

    const toggleTimer = () => {
        if (running) {
            setRunning(false);
            stop();
        } else {
            setRunning(true);
            start();
        }
    }

    const start = () => {
        let x = setInterval(tick, 1000);
        setIntervalRef(x);
    }

    const stop = () => {
        clearInterval(intervalRef);
    }

    const tick = () => (setCountdown(countdown => countdown - 1))

    const updateDisplayTime = (time) => {
        let displayTens = Math.floor((time / 10) % 10);
        let displayUnits = time % 10;
        setDisplayTime(`${displayTens}${displayUnits}`)
    }

    const checkConditions = () => {
        if (countdown <= 0) {
            switchPlayer();
        }
    }

    return (
        <div>
            <h1>{name}</h1>
            <h2 onClick={toggleTimer}>{displayTime}</h2>
            <button onClick={switchPlayer}>
                Next
            </button>
        </div>
    )
};