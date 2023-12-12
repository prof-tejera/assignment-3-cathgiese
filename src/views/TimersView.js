import React, { useContext } from "react";
import styled from "styled-components";
import { TimerContext } from "../TimerProvider";
import { Link } from "react-router-dom";

import Button from "../components/generic/Button/Button";
import Stopwatch from "../components/timers/Stopwatch";
import Countdown from "../components/timers/Countdown";
import XY from "../components/timers/XY";
import Tabata from "../components/timers/Tabata";

const Timers = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto;
  justify-content: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const ControlButtons = styled.div`
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div``;

const TimersView = () => { 
  const {timers, totalTime, isRunning, restart, startStop, nextTimer, isReset, remove} = useContext(TimerContext)

  // Minutes calculation
  const minutesCalc = Math.floor((totalTime % 360000) / 6000);
 
  // Seconds calculation
  const secondsCalc = Math.floor((totalTime % 6000) / 100);

  // const handleRemoval = (id) => {
  //   setTimers(timers.filter(timer => timer.id !== id))
  // }

  return (
    <ControlButtons>
      <Link to="/add"><Button text="+ Add timer" color={"Default-button Button-add"} /></Link><br></br>
      <Button 
        text={isRunning ? "Pause workout" : "Start workout"}
        onClick={timers.length === 0 ? null : startStop}
        color={isRunning ? "Default-button Button-danger":"Default-button Button-go"} />
      <Button 
        text={"Skip timer >>"}
        color={"Default-button"}
        onClick={timers.length === 0 ? null : nextTimer} />
      <Button 
        text={"Restart workout"}
        color={"Default-button"}
        onClick={timers.length === 0 ? null : restart} />
    <h2>Total time: {minutesCalc}m{secondsCalc}s</h2>
    <Timers>
      {timers.map((timer) => (
        <Timer key={`timer-${timer.id}`}>
          <TimerTitle>{timer.title}</TimerTitle>
          {timer.type === "stopwatch" && <Stopwatch 
                                          id={timer.id}
                                          minutes={timer.minutes} 
                                          seconds={timer.seconds}
                                          status={timer.status} 
                                          isReset={isReset}/>}
          {timer.type === "countdown" && <Countdown 
                                          id={timer.id}
                                          minutes={timer.minutes} 
                                          seconds={timer.seconds}
                                          status={timer.status}
                                          isReset={isReset}/>}
          {timer.type === "xy" && <XY 
                                    id={timer.id}
                                    minutes={timer.minutes} 
                                    seconds={timer.seconds}
                                    rounds={timer.rounds}
                                    status={timer.status}
                                    isReset={isReset}/>}

          {timer.type === "tabata" && <Tabata 
                                        id={timer.id}
                                        work={timer.work} 
                                        rest={timer.rest}
                                        rounds={timer.rounds}
                                        status={timer.status}
                                        isReset={isReset}/>}
          <Button 
              text={"Remove"}
              color={"Default-button Button-danger"}
              onClick={() => remove({id:timer.id})}/>
        </Timer>
      ))}
    </Timers>
    </ControlButtons>
  );
};

export default TimersView;
