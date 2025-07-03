import React, { useEffect, useState } from "react";
import Calendar from "../pages/InterviewSched/Calendar";
import InterviewDetails from "../pages/InterviewSched/InterviewDetails";
// Update the import path if CandidateTable is in a different directory

import ScheduleInterviewModal from "./InterviewSched/ScheduleInterviewModal"; 
import CandidateTableSection from "../components/CandidateTableSection";


function InterviewSched() {
  const [selectedDate, setSelectedDate] = useState(() => {
    return localStorage.getItem("selectedDate") || "2025-05-19";
  });

  const [showModal, setShowModal] = useState(false); // 👈 Modal state

  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate);
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center px-9 py-6">
        <h1 className="text-xl font-bold">Interviews</h1>
        <button
          className="bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800 transition"
          onClick={() => setShowModal(true)} 
        >
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
       <CandidateTableSection />

      
      

      {/* Modal Component */}
      {showModal && (
        <ScheduleInterviewModal 
          onClose={() => setShowModal(false)} 
          onSchedule={(newInterview) => {
            // TODO: handle the scheduled interview (e.g., update state or make API call)
            setShowModal(false);
          }} 
        />
      )}
    </div>
  );
}

export default InterviewSched;
