import React, { useContext, useState, useEffect } from 'react'
import Button from "../generic/Button/Button";
import Selector from "../generic/Selector/Selector";
import Input from "../generic/Input/Input";
import { TimerContext } from '../../TimerProvider';
import { makeId, minNumbers, roundNumbers, secNumbers, timersTypes } from '../../utils/helpers';
import "./TimerForm.css";

const TimerForm = ({displayStyle}) => { 

    const {timers, setTimers, isEditing, setIsEditing, setTotalTime} = useContext(TimerContext)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(500)
    const [clicked, setClicked] = useState(null)
    const [rounds, setRounds] = useState(1)
    const [work, setWork] = useState(500)
    const [rest, setRest] = useState(500)
    const [type, setType] = useState('Stopwatch')
    const [description, setDescription] = useState('')

    useEffect(() => {
        let intervalId;
        
        if (clicked) {
            intervalId = setTimeout(() => {setClicked(null)}, 1000);
        }
        return () => clearTimeout(intervalId);

      }, [clicked, setClicked]);

    const handleTimer = () => {
        if (isEditing !== null) {
            // Get timer index
            const match = timers.map((timer) => timer.id === isEditing)
            const i = match.indexOf(true)

            const timersCopy = Array.from(timers)

            if (type === "Tabata") {
            timersCopy[i] = {
                id: isEditing,
                type: type,
                status: i === 0 ? "running" : "ready",
                description: description,
                seconds: (rest + work)*rounds,
                rounds: rounds,
                work: work,
                rest: rest }
            }

            else {
                timersCopy[i] = {
                    id: isEditing,
                    type: type,
                    status: i === 0 ? "running" : "ready",
                    description: description,
                    minutes: minutes,
                    seconds: seconds,
                    rounds: rounds,
                    work: work,
                    rest: rest }

            }
            setTimers(timersCopy)
            setIsEditing(null)
        }

        else {
            if (type === "Tabata") {
            setTimers(
                [...timers, 
                {id: makeId(),
                type: type,
                status: timers.length === 0 ? "running" : "ready",
                description: description,
                seconds: (rest + work)*rounds,
                rounds: rounds,
                work: work,
                rest: rest }])
            }

            else {
                setTimers(
                    [...timers, 
                    {id: makeId(),
                    type: type,
                    status: timers.length === 0 ? "running" : "ready",
                    description: description,
                    minutes: minutes,
                    seconds: seconds,
                    rounds: rounds,
                    work: work,
                    rest: rest }])
            }
        }
        setTotalTime(0)
        setClicked(true)
    }

    return (
        <div className={displayStyle}>
            <Selector
                onChange={e => setType(e.target.value)}
                items={timersTypes}/>
            <div>
                <Input 
                    onChange={e => setDescription(e.target.value)}/>
            </div>
            
            {type === "Stopwatch" || type === "Countdown" ? 
                <div><Selector 
                    label="min"
                    onChange={e => setMinutes(e.target.value*6000)}
                    items={minNumbers}/>
                <Selector 
                    label="sec"
                    onChange={e => setSeconds(e.target.value*100)}
                    items={secNumbers}/></div> : ''
            }

            {type === "XY" ? 
                <div><Selector 
                    label="min"
                    onChange={e => setMinutes(e.target.value*6000)}
                    items={minNumbers}/>
                <Selector 
                    label="sec"
                    onChange={e => setSeconds(e.target.value*100)}
                    items={secNumbers}/>
                <Selector 
                    label="rounds"
                    onChange={e => setRounds(e.target.value)}
                    items={roundNumbers}/></div> : ''
            }

            {type === "Tabata" ? 
                <div><Selector 
                    label="sec"
                    onChange={e => setWork(e.target.value*100)}
                    items={secNumbers}/>
                <Selector 
                    label="sec"
                    onChange={e => setRest(e.target.value*100)}
                    items={secNumbers}/>
                <Selector 
                    label="rounds"
                    onChange={e => setRounds(e.target.value)}
                    items={roundNumbers}/></div> : ''
            }
            
            <Button 
                text={clicked ? "Added ✓" : (isEditing ? "Update" : "Add")}
                color={clicked ? "Default-button Button-go" : "Default-button"}
                onClick={handleTimer}/>
        </div>
    )
};

export default TimerForm;
