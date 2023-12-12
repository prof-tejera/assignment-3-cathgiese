import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import TimerProvider from "./TimerProvider";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import AddView from "./views/AddView";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Timers</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <TimerProvider>
      <Container>
        <Router>
          <Nav />
          <Routes>
            <Route path="/docs" element={<DocumentationView />} />
            <Route path="/" element={<TimersView />} />
            <Route path="/add" element={<AddView />} />
          </Routes>
        </Router>
      </Container>
    </TimerProvider>
  );
};

export default App;
