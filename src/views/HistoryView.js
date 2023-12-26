import React from "react";
import styled from "styled-components";

const Workouts = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto;
  justify-content: center;
`;

const Workout = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  width: 400px;
  overflow-wrap: break-word;
`;

const HistoryView = () => {

  const history = localStorage.getItem("history")

  return (
    <Workouts> 
      <h1>Half built history</h1><br></br>
      <Workout>{history}</Workout>
    </Workouts>
  );
};

export default HistoryView;
