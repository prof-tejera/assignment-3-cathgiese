import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import TimerProvider from "./TimerProvider";
import { ErrorBoundary } from "react-error-boundary";
import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import AddView from "./views/AddView";
import HistoryView from "./views/HistoryView";

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
    <ErrorBoundary fallback={<div>Something went wrong. Try reloading the page, or coming back later.</div>}>
      <TimerProvider>
        <Container>
          <Router>
            <Nav />
            <Routes>
              <Route path="/docs" element={<DocumentationView />} />
              <Route path="/" element={<TimersView />} />
              <Route path="/add" element={<AddView />} />
              <Route path="/history" element={<HistoryView />} />
            </Routes>
          </Router>
        </Container>
      </TimerProvider>
    </ErrorBoundary>
  );
};

export default App;
