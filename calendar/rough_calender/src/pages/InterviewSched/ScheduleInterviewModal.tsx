import React, { useState, useRef, useEffect } from "react";
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  VideoCameraIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import data from "../../constants/data.json"; // Load existing data.json

// Extract unique candidates, interviewers, rounds, jobIds, and locations
const candidateNames = Array.from(
  new Set(
    (data as any[]).map((item) =>
      typeof item.candidate === "object" ? item.candidate.name : item.candidate
    )
  )
);
const interviewerNames = Array.from(
  new Set((data as any[]).map((item) => item.interviewer).filter(Boolean))
);
const roundNames = Array.from(
  new Set((data as any[]).map((item) => item.round).filter(Boolean))
);
const jobIdList = Array.from(
  new Set((data as any[]).map((item) => item.jobId).filter(Boolean))
);
const locationList = Array.from(
  new Set(
    (data as any[]).map((item) => item.location).filter(Boolean)
  )
);

type Props = {
  onClose: () => void;
  onSchedule: (newInterview: any) => void;
};

const ScheduleInterviewModal: React.FC<Props> = ({ onClose, onSchedule }) => {
  const [interviewMode, setInterviewMode] = useState<"inperson" | "online">(
    "inperson"
  );

  // Fields
  const [candidate, setCandidate] = useState("");
  const [candidates, setCandidates] = useState<string[]>(candidateNames);
  const [candidateSearch, setCandidateSearch] = useState("");
  const [showCandidateDropdown, setShowCandidateDropdown] = useState(false);

  const [interviewer, setInterviewer] = useState("");
  const [interviewers] = useState<string[]>(interviewerNames);
  const [interviewerSearch, setInterviewerSearch] = useState("");
  const [showInterviewerDropdown, setShowInterviewerDropdown] = useState(false);

  const [backupInterviewer, setBackupInterviewer] = useState("");
  const [round, setRound] = useState("");
  const [rounds] = useState<string[]>(roundNames);

  const [jobId, setJobId] = useState("");
  const [jobIds] = useState<string[]>(jobIdList);

  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState<string[]>(locationList);
  const [locationSearch, setLocationSearch] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const [meetingLink, setMeetingLink] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState(60);

  const modalRef = useRef<HTMLDivElement>(null);

  // Filters
  const filteredCandidates = candidates.filter((c) =>
    c.toLowerCase().includes(candidateSearch.toLowerCase())
  );
  const filteredInterviewers = interviewers.filter((i) =>
    i.toLowerCase().includes(interviewerSearch.toLowerCase())
  );
  const filteredLocations = locations.filter((l) =>
    l.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleAddCandidate = (newCandidate: string) => {
    if (newCandidate && !candidates.includes(newCandidate)) {
      setCandidates((prev) => [...prev, newCandidate]);
      setCandidate(newCandidate); // auto-select new one
    }
  };
  const handleAddLocation = (newLocation: string) => {
    if (newLocation && !locations.includes(newLocation)) {
      setLocations((prev) => [...prev, newLocation]);
      setLocation(newLocation); // auto-select new one
    }
  };

  // Adjust endTime when duration or startTime changes
  useEffect(() => {
    if (startTime) {
      const [hours, minutes] = startTime.split(":").map(Number);
      const start = new Date();
      start.setHours(hours, minutes, 0);
      start.setMinutes(start.getMinutes() + duration);
      const newEnd = start.toTimeString().slice(0, 5); // HH:MM
      setEndTime(newEnd);
    }
  }, [startTime, duration]);

  const handleSchedule = () => {
    if (
      candidate &&
      interviewer &&
      round &&
      jobId &&
      date &&
      endDate &&
      startTime &&
      endTime &&
      (interviewMode === "inperson" ? location : meetingLink)
    ) {
      const newInterview = {
        candidate,
        interviewer,
        backupInterviewer,
        round,
        jobId,
        interviewMode,
        date,
        endDate,
        location: interviewMode === "inperson" ? location : meetingLink,
        dateTime: new Date(`${date}T${startTime}:00`).toISOString(),
        endTime,
        duration,
      };
      onSchedule(newInterview);
      onClose();
    } else {
      alert("Please fill all required fields!");
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
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 font-inter">Schedule Interview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div>
            <h3 className="flex items-center gap-1 text-[#003087] mb-6 font-inter">
              <span className="text-lg font-extrabold text-[#003087]">|</span>
              <span className="text-lg font-semibold">Interview Details</span>
            </h3>

            {/* Candidate */}
            <div className="relative">
              <label className="block font-medium">Candidate *</label>
              <input
                type="text"
                value={candidateSearch}
                onChange={(e) => setCandidateSearch(e.target.value)}
                onFocus={() => setShowCandidateDropdown(true)}
                placeholder="Search or add candidate"
                className="w-full border rounded px-3 py-2 text-gray-700 mt-1"
              />
              {showCandidateDropdown && (
                <div className="absolute z-50 bg-white border mt-1 max-h-40 overflow-y-auto w-full shadow-md">
                  {filteredCandidates.slice(0, 5).map((c) => (
                    <div
                      key={c}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        setCandidate(c);
                        setCandidateSearch(c);
                        setShowCandidateDropdown(false);
                      }}
                    >
                      {c}
                    </div>
                  ))}
                  {candidateSearch &&
                    !candidates.includes(candidateSearch) && (
                      <div
                        className="px-3 py-2 cursor-pointer hover:bg-green-100"
                        onClick={() => {
                          handleAddCandidate(candidateSearch);
                          setShowCandidateDropdown(false);
                        }}
                      >
                        ➕ Add "{candidateSearch}"
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* Interviewers */}
            <div className="relative mt-4">
              <label className="block font-medium">Interviewer *</label>
              <input
                type="text"
                value={interviewerSearch}
                onChange={(e) => setInterviewerSearch(e.target.value)}
                onFocus={() => setShowInterviewerDropdown(true)}
                placeholder="Search interviewer"
                className="w-full border rounded px-3 py-2 text-gray-700 mt-1"
              />
              {showInterviewerDropdown && (
                <div className="absolute z-50 bg-white border mt-1 max-h-40 overflow-y-auto w-full shadow-md">
                  {filteredInterviewers.slice(0, 5).map((i) => (
                    <div
                      key={i}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        setInterviewer(i);
                        setInterviewerSearch(i);
                        setShowInterviewerDropdown(false);
                      }}
                    >
                      {i}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Backup Interviewer */}
            <div className="mt-4">
              <label className="block font-medium">Backup Interviewer</label>
              <select
                value={backupInterviewer}
                onChange={(e) => setBackupInterviewer(e.target.value)}
                className="w-full border rounded px-3 py-2 text-gray-700"
              >
                <option value="">Select Interviewer</option>
                {interviewers.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            {/* Round */}
            <div className="mt-4">
              <label className="block font-medium">Interview Round *</label>
              <select
                value={round}
                onChange={(e) => setRound(e.target.value)}
                className="w-full border rounded px-3 py-2 text-gray-700"
              >
                <option value="">Select Round</option>
                {rounds.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Interview Mode */}
            <div className="mt-4">
              <label className="block font-medium">Interview Mode *</label>
              <div className="flex gap-3 mt-2">
                <button
                  className={`flex items-center gap-2 px-4 py-2 border rounded ${
                    interviewMode === "inperson" ? "bg-blue-500 text-white" : "bg-white"
                  }`}
                  onClick={() => setInterviewMode("inperson")}
                >
                  <MapPinIcon className="h-4 w-4" /> In Person
                </button>
                <button
                  className={`flex items-center gap-2 px-4 py-2 border rounded ${
                    interviewMode === "online" ? "bg-blue-500 text-white" : "bg-white"
                  }`}
                  onClick={() => setInterviewMode("online")}
                >
                  <VideoCameraIcon className="h-4 w-4" /> Online
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-4 mt-12 md:mt-0">
            <div>
              <label className="block font-medium">Job ID *</label>
              <select
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="w-full border rounded px-3 py-2 text-gray-700"
              >
                <option value="">Select Job ID</option>
                {jobIds.map((j) => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Start Date *</label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                <CalendarDaysIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block font-medium">End Date *</label>
              <div className="relative">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
                <CalendarDaysIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>

            {interviewMode === "inperson" ? (
              <div className="relative">
                <label className="block font-medium">Location *</label>
                <input
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  onFocus={() => setShowLocationDropdown(true)}
                  placeholder="Search or add location"
                  className="w-full border rounded px-3 py-2 text-gray-700 mt-1"
                />
                {showLocationDropdown && (
                  <div className="absolute z-50 bg-white border mt-1 max-h-40 overflow-y-auto w-full shadow-md">
                    {filteredLocations.slice(0, 5).map((l) => (
                      <div
                        key={l}
                        className="px-3 py-2 cursor-pointer hover:bg-blue-50"
                        onClick={() => {
                          setLocation(l);
                          setLocationSearch(l);
                          setShowLocationDropdown(false);
                        }}
                      >
                        {l}
                      </div>
                    ))}
                    {locationSearch && !locations.includes(locationSearch) && (
                      <div
                        className="px-3 py-2 cursor-pointer hover:bg-green-100"
                        onClick={() => {
                          handleAddLocation(locationSearch);
                          setShowLocationDropdown(false);
                        }}
                      >
                        ➕ Add "{locationSearch}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block font-medium">Meeting Link *</label>
                <input
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder="Enter Meeting Link"
                  className="w-full border rounded px-3 py-2 text-gray-700"
                />
              </div>
            )}

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block font-medium">Start Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <ClockIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="w-1/2">
                <label className="block font-medium">End Time *</label>
                <div className="relative">
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                  <ClockIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-medium">Duration: {duration} mins</label>
              <input
                type="range"
                min={15}
                max={120}
                step={15}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                {[15, 30, 45, 60, 75, 90, 105, 120].map((m) => (
                  <span key={m}>{m}m</span>
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
          <button
            onClick={handleSchedule}
            className="px-5 py-2 rounded bg-blue-500 text-white flex items-center gap-2 hover:bg-blue-600"
          >
            <PaperAirplaneIcon className="h-4 w-4" /> Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
