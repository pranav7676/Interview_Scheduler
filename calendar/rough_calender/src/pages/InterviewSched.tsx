import React, { useEffect, useState } from "react";
import Calendar from "../pages/InterviewSched/Calendar";
import InterviewDetails from "../pages/InterviewSched/InterviewDetails";
import CandidateTable from "./InterviewSched/CandidateTable";

function InterviewSched() {
  // Load initial date from localStorage or fallback to a default
  const [selectedDate, setSelectedDate] = useState(() => {
    return localStorage.getItem("selectedDate") || "2025-05-19";
  });

  // Store selectedDate in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center px-9 py-6">
        <h1 className="text-xl font-bold">Interviews</h1>
        <button className="bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800 transition">
          + Schedule Interview
        </button>
      </div>

      {/* Main content - Calendar and Details */}
      <main className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-4 p-9 max-w-[1100px] w-full">
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <InterviewDetails selectedDate={selectedDate} />
        </div>
      </main>

      {/* Candidate Table (aligned properly) */}
      <div className="flex justify-center">
        <div className="p-9 pt-0 max-w-[1100px] w-full">
          <CandidateTable />
        </div>
      </div>
    </div>
  );
}

export default InterviewSched;
