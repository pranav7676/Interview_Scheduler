// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar";
import InterviewSched from "./pages/InterviewSched";
import JobRequisitionPage from "./pages/JobRequisition/JobRequisitionPage";

// Optional placeholder pages:
const Candidates = () => <div className="p-6">Candidates Page</div>;
const Settings = () => <div className="p-6">Settings Page</div>;
const Calendar = () => <div className="p-6">Calendar Page</div>;
const Interviews = () => <div className="p-6">Interviews Page</div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Top navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 pt-4 px-6 overflow-auto">
          <Routes>
            <Route path="/" element={<InterviewSched />} />
            <Route path="/InterviewSched" element={<InterviewSched />} />
            <Route path="/jobs" element={<JobRequisitionPage />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;