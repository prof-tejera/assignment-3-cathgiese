import React, { useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import styled from "styled-components";
import { TimerContext } from "../TimerProvider";
import { Link } from "react-router-dom";

import Button from "../components/generic/Button/Button";
import Timer from "../components/timers/Timer";

const Timers = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto;
  justify-content: center;
`;

const TimerDiv = styled.div`
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

const TimersView = () => { 
  const {timers, 
        setTimers,
        totalTime,
        isRunning,
        restart,
        startStop,
        nextTimer,
        isReset, 
        remove, 
        setTotalTime, 
        totalTimeCalc, 
        edit,
        isEditing} = useContext(TimerContext)


      useEffect(() => {
        const hash = window.location.hash;
        console.log('hash', hash)
        if(!hash) return;

        try {
          const timerFromHash = JSON.parse(decodeURIComponent(hash).substring(1));
        setTimers(timerFromHash)
        } catch(err) {
          console.log(err)
        }
      }, [])
    
    useEffect(() => {
  
      let intervalId;
      
      if (isRunning) {
          intervalId = setTimeout(() => {setTotalTime(totalTime - 1)}, 8);
      }
  
      else if (totalTime === 0 || isReset) {
          totalTimeCalc()
          return () => clearTimeout(intervalId);
      }

  }, [isRunning, totalTime, setTotalTime, totalTimeCalc, isReset]);

  // Minutes calculation
  const minutesCalc = Math.floor((totalTime % 360000) / 6000);
 
  // Seconds calculation
  const secondsCalc = Math.floor((totalTime % 6000) / 100);

  // console.log(timers)

  const handleOnDragEnd = (result) => {
    const items = timers
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTimers(items)
    restart()
  }
  
  return (
    <ControlButtons>
      <Link to="/add"><Button text="+ Add timer" color={"Default-button Button-add"} /></Link><br></br>
      <Button 
        text={"Save workout"}
        color={"Default-button Button-add"}
        onClick={e => {window.location.hash = encodeURIComponent(JSON.stringify(timers))}} />
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
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="timers">
        {(provided) => (
          <Timers {...provided.droppableProps} ref={provided.innerRef}>
            {timers.map((timer, index) => (
              <Draggable key={`drag-${timer.id}`} draggableId={`drag-${timer.id}`} index={index}>
                {(provided) => (
                  <TimerDiv key={`timer-${timer.id}`} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <Timer
                        id={timer.id}
                        type={timer.type}
                        description={timer.description}
                        rounds={timer.rounds}
                        minutes={timer.minutes} 
                        seconds={timer.seconds}
                        status={timer.status} 
                        isReset={isReset}
                        work={timer.work} 
                        rest={timer.rest}/>
                    <Button 
                        text={"Edit"}
                        color={isEditing || isRunning ? "hidden": "Default-button"}
                        onClick={() => edit({id:timer.id})}/>
                    <Button 
                        text={"Remove"}
                        color={isEditing || isRunning ? "hidden":"Default-button Button-danger"}
                        onClick={() => remove({id:timer.id})}/>
                  </TimerDiv>
                 )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Timers>
        )}
      </Droppable>
    </DragDropContext>
    </ControlButtons>
  );
};

export default TimersView;
