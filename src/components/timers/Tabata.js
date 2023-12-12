import React from 'react'
import { useState, useEffect, useContext } from "react";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import { TimerContext } from '../../TimerProvider';

const Tabata = ({work, rest, rounds, id, status}) => {
    // Store the time and button
    const {isRunning, nextTimer, isReset} = useContext(TimerContext)
    const [time, setTime] = useState(work);
    const [roundsCount, setRoundsCount] = useState(rounds)
    const [workStatus, setWorkStatus] = useState(true)

    useEffect(() => {
        let intervalId;

        if (isRunning && status === "running" && time !==0 && roundsCount > 0) {
            // setting time from 0 to 1 every 10 millisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time - 1), 7);
            }

        if (isRunning && status === "running" && workStatus && time === 0 && roundsCount > 0) {
            setTime(rest+99)
            setWorkStatus(null)
            intervalId = setInterval(() => setTime(time - 1), 7);
        }

        if (isRunning && status === "running" && workStatus === null && time === 0 && roundsCount > 0) {
            setTime(work+99 )
            setWorkStatus(true)
            setRoundsCount(roundsCount-1) 
            intervalId = setInterval(() => setTime(time - 1), 7);
        }
        
        else if(roundsCount === 0){
            nextTimer()
            setTime(work)
            setRoundsCount(rounds)
            setWorkStatus(true)
        }

        else if (status === "complete" || isReset){
            setTime(work)
            setRoundsCount(rounds)
            setWorkStatus(true)
        }

        return () => clearInterval(intervalId);

      }, [isReset, isRunning, nextTimer, rest, rounds, roundsCount, status, time, work, workStatus]);
 
    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    return (
    <div className="grid-container">
        Tabata: {work/100}s work, {rest/100}s rest for {rounds} rounds
        <DisplayTime
            minutes="0"
            seconds={seconds}
            displayStyle={status === "running" ? "Default-display Running" : (status === "complete" ? "Default-display Complete" : "Default-display")}/>
        </div>
    )
};

export default Tabata;
