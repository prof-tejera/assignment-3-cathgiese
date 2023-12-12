import React from 'react'
import { useState, useEffect, useContext } from "react";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import { TimerContext } from '../../TimerProvider';

const Countdown = ({minutes, seconds, id, status}) => {
    // Store the time and button
    const {isRunning, nextTimer, isReset} = useContext(TimerContext)
    const [time, setTime] = useState(minutes+seconds);

    useEffect(() => {
        let intervalId;
        
        if (isRunning && status === "running" && time > 0) {
            intervalId = setInterval(() => {setTime(time - 1)}, 7);
        }
     
        else if (isRunning && time === 0 && status === "running") {
            nextTimer()
            setTime(minutes+seconds)
        }
        else if (status === "complete" || isReset){
            setTime(minutes+seconds)
        }
        return () => clearInterval(intervalId);

      }, [isRunning, nextTimer, status, time, minutes, seconds, isReset]);

    // Minutes calculation
    const minutesCalc = Math.floor((time % 360000) / 6000);
 
    // Seconds calculation
    const secondsCalc = Math.floor((time % 6000) / 100);

    return (
        <div className="grid-container">
            Countdown: {minutes/6000}m{seconds/100}s
            <DisplayTime
                minutes={minutesCalc}
                seconds={secondsCalc}
                displayStyle={status === "running" ? "Default-display Running" : (status === "complete" ? "Default-display Complete" : "Default-display")}/>
        </div>
    )
};

export default Countdown;
