import React from "react";
import styled from "styled-components";

import StopwatchSelect from "../components/selectors/StopwatchSelect";
import CountdownSelect from "../components/selectors/CountdownSelect";
import XYSelect from "../components/selectors/XYSelect";
import TabataSelect from "../components/selectors/TabataSelect";

const Selectors = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto auto;
  justify-content: center;
`;

const Selector = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const SelectorTitle = styled.div``;


const AddView = () => {

  const selectors = [
    { title: "Stopwatch", C: <StopwatchSelect /> },
    { title: "Countdown", C: <CountdownSelect /> },
    { title: "XY", C: <XYSelect /> },
    { title: "Tabata", C: <TabataSelect /> },
  ];

  return (
    <Selectors>
      {selectors.map((selectors) => (
        <Selector key={`timer-${selectors.title}`}>
          <SelectorTitle>{selectors.title}</SelectorTitle>
          {selectors.C}
        </Selector>
      ))}
    </Selectors>
  );
};

export default AddView;
