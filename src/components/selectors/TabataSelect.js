import React, { useContext, useState, useEffect } from 'react'
import Button from "../generic/Button/Button";
import Selector from "../generic/Selector/Selector";
import { TimerContext } from '../../TimerProvider';
import { makeId } from '../../utils/helpers';

const TabataSelect = () => { 

    const {timers, setTimers, totalTime, setTotalTime} = useContext(TimerContext)
    const [work, setWork] = useState(500)
    const [rest, setRest] = useState(500)
    const [rounds, setRounds] = useState(1)
    const [clicked, setClicked] = useState(null)

    useEffect(() => {
        let intervalId;
        
        if (clicked) {
            intervalId = setInterval(() => {setClicked(null)}, 1000);
        }
        return () => clearInterval(intervalId);

      }, [clicked, setClicked]);
    
    // Show numbers for seconds
    const secNumbersList = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
     const secNumbers = secNumbersList.map(number =>
            <option value={number} key={number}>{number}</option>)
    
    // Show max 30 rounds
    const roundNumbersList = [...Array(31).keys()]
    const roundNumbers = roundNumbersList.slice(1).map(number =>
        <option value={number} key={number}>{number}</option>)

    const handleTimer = () => {
        setTimers(
            [...timers, 
            {id: makeId(),
            work: work,
            rest: rest,
            rounds: rounds,
            type: "tabata",
            status: timers.length === 0 ? "running" : "ready"}])
        setTotalTime(totalTime+work+rest)
        setClicked(true)}

    return (
        <div className="grid-container">
            <Selector 
                label="sec"
                onChange={e => setWork(e.target.value*100)}
                numbers={secNumbers}/>
            <Selector 
                label="sec"
                onChange={e => setRest(e.target.value*100)}
                numbers={secNumbers}/>
            <Selector 
                label="rounds"
                onChange={e => setRounds(e.target.value*1)}
                numbers={roundNumbers}/>
            <Button 
                text={clicked ? "Added ✓" : "Add"}
                color={clicked ? "Default-button Button-go" : "Default-button"}
                onClick={handleTimer}/>
        </div>
    )
};

export default TabataSelect;
