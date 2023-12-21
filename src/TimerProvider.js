import React from "react";
import { useState } from "react";

export const TimerContext = React.createContext({});

const TimerProvider = ({ children }) => {
    const [timers, setTimers] = useState(window.location.hash ? JSON.parse(decodeURIComponent(window.location.hash).slice(1)):[]);
    const [isRunning, setIsRunning] = useState(null);
    const [totalTime, setTotalTime] = useState(localStorage.getItem("TotalTime") ? parseInt(localStorage.getItem("TotalTime")):0);
    const [isReset, setIsReset] = useState(null);
    const [isEditing, setIsEditing] = useState(null);

    // Current running timer
    const [activeTimerIndex, setActiveTimerIndex] = useState(0); 
    
    const totalTimeCalc = () => {
        let globalCount = 0

        for (let i = 0; i < timers.length; i++) {
            if (timers[i].status !== "complete"){
                if (timers[i].type === "XY") {
                    const totalMin = (timers[i].minutes * parseInt(timers[i].rounds))
                    const totalSec = (timers[i].seconds * parseInt(timers[i].rounds))
                    globalCount += (totalMin + totalSec)
                }

                else if (timers[i].type === "Tabata") {
                    globalCount += timers[i].seconds
                }

                else {
                    globalCount += (timers[i].minutes + timers[i].seconds)
                }
            }
        }
        setTotalTime(globalCount)
    }
    
    const nextTimer = () => {
        if (activeTimerIndex === timers.length-1) {
            timers[activeTimerIndex].status = "complete"
            setTimers(timers)
            restart()

            if (localStorage.getItem('history')) {
                localStorage.setItem('history', localStorage.getItem('history')+JSON.stringify(timers));
            }

            else {
                localStorage.setItem('history', JSON.stringify(timers));  
            }
        }
        else {
            timers[activeTimerIndex].status = "complete"
            timers[activeTimerIndex+1].status = "running"
            setActiveTimerIndex(activeTimerIndex+1)
            setTimers(timers)
            totalTimeCalc()
        }

        // Update URL
        window.location.hash = encodeURIComponent(JSON.stringify(timers))
    }

    // Restart timer
    const restart = () => {
        setIsReset(true)
        setIsRunning(null)
        setActiveTimerIndex(0)
        timers.map((timer) => timer.status = "ready")
        timers[0].status = "running"
        setTimers(timers)
        setTotalTime(0)

        // Update URL
        window.location.hash = encodeURIComponent(JSON.stringify(timers))
    }

    // Start or stop timer
    const startStop = () => {
        if (isRunning) {
            setIsRunning(null)
        } 
        else if (totalTime === 0){
            totalTimeCalc()
            setIsRunning(true)
            setIsReset(null)
        }
        else {
            setIsRunning(true)
            setIsReset(null)
        }

        // Update URL
        window.location.hash = encodeURIComponent(JSON.stringify(timers))
    }

    // Edit timer
    const edit = ({id}) => {
        setIsEditing(id)
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
            }
    
            else {
                // Update timer list
                setTimers([
                 ...timers.slice(0, i),
                 ...timers.slice(i + 1),
               ])
            }
        }

        setTotalTime(0)
        setActiveTimerIndex(0)

        // Update URL
        window.location.hash = encodeURIComponent(JSON.stringify(timers))
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
                remove,
                edit,
                isEditing,
                setIsEditing,
            }}
        >{children}</TimerContext.Provider>
    )
};

export default TimerProvider