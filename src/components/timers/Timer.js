import React from 'react'
import { useState, useEffect, useContext } from "react";
import DisplayTime from "../generic/DisplayTime/DisplayTime";
import { TimerContext } from '../../TimerProvider';
import TimerForm from '../selectors/TimerForm';

const Timer = ({minutes, seconds, status, rounds, type, description, work, rest, id}) => {
    const {isRunning, nextTimer, isReset, isEditing, totalTime, setTotalTime} = useContext(TimerContext)
    const [time, setTime] = useState(localStorage.getItem("Time") ? parseInt(localStorage.getItem("Time")):0);
    const [roundsCount, setRoundsCount] = useState(localStorage.getItem("Rounds") ? parseInt(localStorage.getItem("Rounds")):1)
    const [workStatus, setWorkStatus] = useState(localStorage.getItem("Work") ? localStorage.getItem("Work"):true)
    
    // Handle timers
    useEffect(() => {
        
        let intervalId
        
        // Stopwatch
        if (type === "Stopwatch") {
            if (isRunning && status === "running" && time >= 0) {
                intervalId = setTimeout(() => {setTime(time + 1);setTotalTime(totalTime-1)}, 8);
            }
         
            if (isRunning && time === (minutes+seconds) && status === "running") {
                nextTimer()
                setTime(0)
            }
    
            else if (status === "complete" || isReset){
                setTime(0)
            }
        }

        // Countdown
        if (type === "Countdown") {
            if (isRunning && status === "running" && time > 0) {
                intervalId = setTimeout(() => {setTime(time - 1);setTotalTime(totalTime-1)}, 8);
            }
         
            else if (isRunning && time === 0 && status === "running") {
                nextTimer()
                setTime(minutes+seconds)
            }
            else if (status === "complete" || isReset){
                setTime(minutes+seconds)
            }
        }

        // XY
        if (type === "XY") {
            if (isRunning && status === "running" && time > 0) {
                // setting time from 0 to 1 every 10 millisecond using javascript setInterval method
                intervalId = setTimeout(() => {setTime(time - 1);setTotalTime(totalTime-1)}, 8);
                }
            else if (isRunning && status === "running" && time === 0 && rounds >= 1) {
                setTime(minutes+seconds)
                setRoundsCount(roundsCount-1)
                intervalId = setTimeout(() => {setTime(time - 1);setTotalTime(totalTime-1)}, 8);
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
        }

        // Tabata
        if (type === "Tabata") {
            if (isRunning && status === "running" && time !==0 && roundsCount > 0) {
                // setting time from 0 to 1 every 10 millisecond using javascript setInterval method
                intervalId = setTimeout(() => {setTime(time - 1);setTotalTime(totalTime-1)}, 8);
                }
    
            if (isRunning && status === "running" && workStatus && time === 0 && roundsCount > 0) {
                setTime(rest)
                setWorkStatus(null)
                intervalId = setTimeout(() => {setTime(time - 1);setTotalTime(totalTime-1)}, 8);
            }
    
            if (isRunning && status === "running" && workStatus === null && time === 0 && roundsCount > 0) {
                setTime(work)
                setWorkStatus(true)
                setRoundsCount(roundsCount-1) 
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
        }

        return () => clearTimeout(intervalId);

    }, [isRunning,
        type, 
        nextTimer, 
        status, 
        time, 
        minutes, 
        seconds, 
        rounds, 
        roundsCount, 
        isReset,  
        rest, 
        work, 
        workStatus,
        totalTime,
        setTotalTime])

     // Minutes calculation
     const minutesCalc = Math.floor((time % 360000) / 6000);
 
     // Seconds calculation
     const secondsCalc = Math.floor((time % 6000) / 100);

    useEffect(( ) => {
        
        if (isRunning) {
            localStorage.setItem('Time', time);
            localStorage.setItem('Rounds', roundsCount);
            localStorage.setItem('TotalTime', totalTime)
            if (type === 'Tabata'){
                localStorage.setItem('Work', workStatus)
            }
        }

        
     }, [isRunning, secondsCalc, roundsCount, time, workStatus, totalTime, type])


     return (
        <div className="grid-container">
            {/* Form for edit state */}
            <TimerForm
            displayStyle={isEditing === id ? "grid-container": "hidden"}/>

            {/* Description and times */}
            {description !== '' ? <h3>{description}</h3> : ''}
            <strong>{type}</strong>: 

            {type === "Tabata" ? 
                <span>{work/100}s work, {rest/100}s rest</span> : 
                <span>{minutes/6000}m{seconds/100}s</span>}

            {type === "Tabata" || type === "XY" ? 
                <div><strong>Rounds:</strong> {rounds}</div> : ''}

            {type === "Tabata" || type === "XY" ? 
                <div><strong>Rounds remaining:</strong> {roundsCount}</div> : ''}
            
            {/* Display with time */}
            {type === "Tabata" ? 
                <DisplayTime
                minutes="0"
                seconds={secondsCalc}
                displayStyle={isEditing === id ? "hidden" : (status === "running" ? "Default-display Running" : (status === "complete" ? "Default-display Complete" : "Default-display"))}/> :
                
                <DisplayTime
                minutes={minutesCalc}
                seconds={secondsCalc}
                displayStyle={isEditing === id ? "hidden" : (status === "running" ? "Default-display Running" : (status === "complete" ? "Default-display Complete" : "Default-display"))}/>}
        </div>
    )
   
}

export default Timer;