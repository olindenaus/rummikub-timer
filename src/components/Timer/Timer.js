import React, { useState, useEffect, useCallback } from 'react';
import './Timer.css';

export const Timer = ({ name, onSwitch }) => {

    const [countdown, setCountdown] = useState();
    const [intervalRef, setIntervalRef] = useState();
    const [running, setRunning] = useState();
    const [displayTime, setDisplayTime] = useState('');

    const handleSpaceBarButton = useCallback(({ keyCode }) => {
        if (keyCode === 32)
            switchPlayer();
    }, [running]);

    const handleEnterButton = useCallback(({ keyCode }) => {
        if (keyCode === 13)
            toggleTimer();
    }, [running]);

    const clearTimerInterval = () => {
        setIntervalRef(intervalId => { clearInterval(intervalId); return null });
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEnterButton)
        window.addEventListener('keydown', handleSpaceBarButton);
        return () => {
            window.removeEventListener('keydown', handleEnterButton)
            window.removeEventListener('keydown', handleSpaceBarButton);
        }
    }, [handleEnterButton, handleSpaceBarButton])

    useEffect(() => {
        return () => {
            clearTimerInterval();
        }
    }, [])

    useEffect(() => {
        updateDisplayTime(countdown);
        checkConditions();
    }, [countdown]);

    useEffect(() => {
        setCountdown(60);
        runTimer();
    }, [name]);

    const switchPlayer = () => {
        stopTimer();
        onSwitch();
    }

    const runTimer = () => {
        setRunning(true);
        setIntervalRef(setInterval(tick, 1000));
    }

    const stopTimer = () => {
        setRunning(false);
        clearTimerInterval();
    }

    const toggleTimer = () => {
        if (running)
            stopTimer();
        else
            runTimer();
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
        <div className={`timer-container ${running ? '' : 'blink'}`}>
            <h1>{name}</h1>
            <h1 onClick={toggleTimer}>{displayTime}</h1>
            {/* <button onClick={switchPlayer}>
                Next
            </button> */}
        </div>
    )
};