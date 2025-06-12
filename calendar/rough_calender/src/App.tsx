import React, { useState } from "react";
import Calendar from "./components/Calendar";
import InterviewDetails from "./components/InterviewDetails";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("2025-05-19");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center px-9 py-6">
        <h1 className="text-xl font-bold">Interviews</h1>
        <button className="bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm">
          + Schedule Interview
        </button>
      </div>

      {/* Main content - centered layout */}
      <main className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-10 p-9 max-w-[1200px] w-full">
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <InterviewDetails selectedDate={selectedDate} />
        </div>
      </main>
    </div>
  );
};

export default App;
