import React, { useState, useRef } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  VideoCameraIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

type Props = {
  onClose: () => void;
};

const ScheduleInterviewModal: React.FC<Props> = ({ onClose }) => {
  const [interviewMode, setInterviewMode] = useState<"inperson" | "online">(
    "inperson"
  );

  // Modal ref to detect outside click
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-200/50 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-[90%] max-w-5xl p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 font-inter">
          Schedule Interview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div>
            <h3 className="flex items-center gap-1 text-[#003087] mb-6 font-inter">
              <span className="text-lg font-extrabold text-[#003087]">|</span>
              <span className="text-lg font-semibold">Interview Details</span>
            </h3>

            <div className="space-y-4">
              {/* Candidate */}
              <div>
                <label className="block font-medium">
                  Candidate <span className="text-red-600">*</span>
                </label>
                <select className="w-full border rounded px-3 py-2 text-gray-700">
                  <option>Select Candidate</option>
                </select>
              </div>

              {/* Interviewers */}
              <div>
                <label className="block font-medium">
                  Interviewers <span className="text-red-600">*</span>
                </label>
                <select className="w-full border rounded px-3 py-2 text-gray-700">
                  <option>Select Interviewer</option>
                </select>
              </div>

              {/* Backup Interviewer */}
              <div>
                <label className="block font-medium">Backup Interviewer</label>
                <select className="w-full border rounded px-3 py-2 text-gray-700">
                  <option>Select Interviewer</option>
                </select>
              </div>

              {/* Interview Round */}
              <div>
                <label className="block font-medium">
                  Interview Round <span className="text-red-600">*</span>
                </label>
                <select className="w-full border rounded px-3 py-2 text-gray-700">
                  <option>Select Interview Round</option>
                </select>
              </div>

              {/* Interview Mode */}
              <div>
                <label className="block font-medium">
                  Interview Mode <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-3 mt-2">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 border rounded ${
                      interviewMode === "inperson"
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => setInterviewMode("inperson")}
                  >
                    <MapPinIcon className="h-4 w-4" /> In Person
                  </button>
                  <button
                    className={`flex items-center gap-2 px-4 py-2 border rounded ${
                      interviewMode === "online"
                        ? "bg-blue-500 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => setInterviewMode("online")}
                  >
                    <VideoCameraIcon className="h-4 w-4" /> Online
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4 mt-[48px] md:mt-[52px]">
            {/* Job ID */}
            <div>
              <label className="block font-medium">
                Job ID <span className="text-red-600">*</span>
              </label>
              <select className="w-full border rounded px-3 py-2 text-gray-700">
                <option>Select Job ID</option>
              </select>
            </div>

            {/* Interview Date */}
            <div>
              <label className="block font-medium">
                Interview Date <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                />
                <CalendarDaysIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            {/* Location or Meeting Link */}
            {interviewMode === "inperson" ? (
              <div>
                <label className="block font-medium">
                  Location <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Location"
                  className="w-full border rounded px-3 py-2 text-gray-700"
                />
              </div>
            ) : (
              <div>
                <label className="block font-medium">
                  Meeting Link <span className="text-red-600">*</span>
                </label>
                <input
                  type="url"
                  placeholder="Enter Meeting Link"
                  className="w-full border rounded px-3 py-2 text-gray-700 mt-1"
                />
              </div>
            )}

            {/* Times */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block font-medium">
                  Start Time <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full border rounded px-3 py-2"
                  />
                  <ClockIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="w-1/2">
                <label className="block font-medium">
                  End Time <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    className="w-full border rounded px-3 py-2"
                  />
                  <ClockIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block font-medium">Duration: 60 minutes</label>
              <input
                type="range"
                min="15"
                max="120"
                step="15"
                className="w-full mt-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                {[15, 30, 45, 60, 75, 90, 105, 120].map((t) => (
                  <span key={t}>{t}m</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-7 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            Cancel
          </button>
          <button className="px-5 py-2 rounded bg-blue-500 text-white flex items-center gap-2 hover:bg-blue-600">
            <PaperAirplaneIcon className="h-4 w-4" /> Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
