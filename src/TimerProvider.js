import React from "react";
import { useState } from "react";

export const TimerContext = React.createContext({});

const TimerProvider = ({ children }) => {
    const [timers, setTimers] = useState([]);
    const [isRunning, setIsRunning] = useState(null);
    const [totalTime, setTotalTime] = useState(0);
    const [isReset, setIsReset] = useState(null);

    // Current running timer
    const [activeTimerIndex, setActiveTimerIndex] = useState(0); 
    
    const totalTimeCalc = () => {
        const totalMin = timers.map((timer) => timer.minutes)
        totalMin.forEach((val) => setTotalTime(totalTime+val))

        const totalSec = timers.map((timer) => timer.seconds)
        totalSec.forEach((val) => setTotalTime(totalTime+val))
    }
    
    const nextTimer = () => {
        if (activeTimerIndex === timers.length-1) {
            timers[activeTimerIndex].status = "complete"
            setTimers(timers)
            restart()
        }
        else {
            timers[activeTimerIndex].status = "complete"
            timers[activeTimerIndex+1].status = "running"
            setActiveTimerIndex(activeTimerIndex+1)
            setTimers(timers)
        }
    }

    // Restart timer
    const restart = () => {
        setIsReset(true)
        setIsRunning(null)
        setActiveTimerIndex(0)
        timers.map((timer) => timer.status = "ready")
        timers[0].status = "running"
        setTimers(timers)
    }

    // Start or stop timer
    const startStop = () => {
        if (isRunning) {
            setIsRunning(null)
        } else {
            setIsRunning(true)
            setIsReset(null)
        }
    }

    // Delete from queue
    const remove = ({id}) => {

        if (timers.length === 1) {
            setTimers([])
        }

        else {
            const match = timers.map((timer) => timer.id === id)
            const i = match.indexOf(true)

            if (i === 0) {
                // Update timer list
                const newTimers = timers.slice(1)
                newTimers[0].status = "running"
                setTimers(newTimers)

                // recalculate total time
                const minusMin = timers.map((timer) => timer.minutes)
                minusMin.forEach((val) => setTotalTime(totalTime-val))

                const minusSec = timers.map((timer) => timer.seconds)
                minusSec.forEach((val) => setTotalTime(totalTime-val))
            }
    
            else {
                // Update timer list
                setTimers([
                 ...timers.slice(0, i),
                 ...timers.slice(i + 1),
               ])

               // recalculate total time
               const minusMin = timers.map((timer) => timer.minutes)
               minusMin.forEach((val) => setTotalTime(totalTime-val))

               const minusSec = timers.map((timer) => timer.seconds)
               minusSec.forEach((val) => setTotalTime(totalTime-val))
            }
        }

        setActiveTimerIndex(0)
    }

    return (
        <TimerContext.Provider
            value={{
                timers,
                setTimers,
                isRunning,
                setIsRunning,
                totalTime,
                setTotalTime,
                totalTimeCalc,
                activeTimerIndex,
                setActiveTimerIndex,
                nextTimer,
                restart,
                startStop,
                isReset,
                setIsReset,
                remove
            }}
        >{children}</TimerContext.Provider>
    )
};

export default TimerProvider