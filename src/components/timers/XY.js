import React from 'react'
import { useState, useEffect, useContext } from "react";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import { TimerContext } from '../../TimerProvider';

const XY = ({minutes, seconds, rounds, id, status}) => {
    // Store the time and button
    const {isRunning, nextTimer, isReset} = useContext(TimerContext)
    const [time, setTime] = useState(minutes+seconds);
    const [roundsCount, setRoundsCount] = useState(rounds)

    useEffect(() => {
        let intervalId;

        if (isRunning && status === "running" && time > 0) {
            // setting time from 0 to 1 every 10 millisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time - 1), 7);
            }
        else if (isRunning && status === "running" && time === 0 && rounds >= 1) {
            setTime(minutes+seconds+99)
            setRoundsCount(roundsCount-1)
            intervalId = setInterval(() => setTime(time - 1), 7);
        }
        if (roundsCount === 0){
            nextTimer()
            setTime(minutes+seconds)
            setRoundsCount(rounds)
        }
        else if (status === "complete" || isReset){
            setTime(minutes+seconds)
            setRoundsCount(rounds)
        }
        return () => clearInterval(intervalId);

      }, [isRunning, time, roundsCount, minutes, seconds, rounds, isReset, nextTimer, status]);

    // Minutes calculation
    const minutesCalc = Math.floor((time % 360000) / 6000);
 
    // Seconds calculation
    const secondsCalc = Math.floor((time % 6000) / 100);

    return (
        <div className="grid-container">
            XY: {minutes/6000}m{seconds/100}s for {rounds} rounds
            <DisplayTime
                minutes={minutesCalc}
                seconds={secondsCalc}
                displayStyle={status === "running" ? "Default-display Running" : (status === "complete" ? "Default-display Complete" : "Default-display")}/>
        </div>
    )
};

export default XY;
