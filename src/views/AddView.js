import React from "react";
import styled from "styled-components";

import TimerForm from "../components/selectors/TimerForm";

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

const AddView = () => {

  return (
    <Selectors>
      <Selector>
      <TimerForm/>
      </Selector>
    </Selectors>
  );
};

export default AddView;
