import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { interviewData } from "../data";

type Props = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

const Calendar: React.FC<Props> = ({ selectedDate, setSelectedDate }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [showDropdown, setShowDropdown] = useState(false);
  const [tempMonth, setTempMonth] = useState(month);
  const [tempYear, setTempYear] = useState(year);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  useEffect(() => {
    setSelectedDate(todayKey);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const getDateKey = (date: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

  const handlePrev = () => {
  if (month === 0) {
    setMonth(11);
    setYear(year - 1);
  } else {
    setMonth(month - 1);
  }
};

const handleNext = () => {
  if (month === 11) {
    setMonth(0);
    setYear(year + 1);
  } else {
    setMonth(month + 1);
  }
};
  return (
    <div className="bg-white rounded-md shadow p-4 w-full sm:w-[400px]">
      <div className="flex justify-between items-center mb-12">
        <button
          onClick={handlePrev}
          className="p-2 rounded-lg transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <h2
            onClick={() => {
              setTempMonth(month);
              setTempYear(year);
              setShowDropdown(!showDropdown);
            }}
            className="text-lg font-semibold cursor-pointer hover:text-blue-400 transition"
          >
            {monthNames[month]} {year}
          </h2>

          {showDropdown && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-10 bg-white text-black rounded-lg shadow-lg p-4 z-10 w-64">
              <h3 className="text-sm font-medium mb-2">Select Month & Year</h3>
              <div className="flex gap-2 mb-3">
                <select
                  value={tempMonth}
                  onChange={(e) => setTempMonth(parseInt(e.target.value))}
                  className="border rounded p-2 w-1/2"
                >
                  {monthNames.map((m, idx) => (
                    <option key={m} value={idx}>{m}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={tempYear}
                  onChange={(e) => setTempYear(parseInt(e.target.value))}
                  className="border rounded p-2 w-1/2"
                />
              </div>
              <div className="flex justify-end gap-2 text-sm">
                <button
                  onClick={() => setShowDropdown(false)}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setMonth(tempMonth);
                    setYear(tempYear);
                    setShowDropdown(false);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleNext}
          className="p-2 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-slate-400 mb-3 font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-sm text-center gap-2">
        {Array.from({ length: firstDay }, (_, i) => <div key={"blank" + i} />)}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const key = getDateKey(date);
          const count = interviewData[key]?.length || 0;
          const isToday = key === todayKey;
          const isSelected = key === selectedDate;

          return (
            <button
              key={key}
              onClick={() => setSelectedDate(key)}
              className={`p-2 rounded-full transition duration-150 hover:bg-white/10
                ${isSelected ? "bg-blue-50 ring-2 ring-blue-500" : ""}
              `}
            >
              <div
                className={`text-sm font-medium
                  ${isSelected ? "text-blue-600 font-semibold" : isToday ? "text-red-500 font-semibold" : "text-black"}
                `}
              >
                {date}
              </div>
              <div className="flex justify-center mt-1 space-x-0.5">
                {Array.from({ length: Math.min(count, 3) }).map((_, j) => (
                  <div key={j} className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                ))}
              </div>
            </button>
          );
        })}

        {Array.from({ length: (7 - (firstDay + daysInMonth) % 7) % 7 }, (_, i) => (
          <div key={"post-blank" + i} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
