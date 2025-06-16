import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InterviewSched from "../src/pages/InterviewSched";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/InterviewSched" element={<InterviewSched />} />
        <Route path="/" element={<Navigate to="/InterviewSched" />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;