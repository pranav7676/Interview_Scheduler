import React from "react";
import { interviewData } from "../../data";
import { motion, AnimatePresence } from "framer-motion";

const noInterviewImg = "/int_svg.svg";

interface InterviewDetailsProps {
  selectedDate: string;
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({ selectedDate }) => {
  const selected = new Date(selectedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isPreviousMonth =
    selected.getFullYear() < today.getFullYear() ||
    (selected.getFullYear() === today.getFullYear() && selected.getMonth() < today.getMonth());

  const isPastInCurrentMonth =
    selected < today &&
    selected.getMonth() === today.getMonth() &&
    selected.getFullYear() === today.getFullYear();

  const interviews = isPreviousMonth ? [] : (interviewData[selectedDate] || []);

  return (
    // <div className="bg-white rounded-md shadow p-4 w-full sm:w-[400px]">
    <div className="bg-white rounded-md shadow p-4 w-full max-w-md">

      <h2 className="text-md font-medium text-gray-900 mb-5 flex items-center space-x-2">
        <span>
          {new Date(selectedDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </h2>

      <div className={`space-y-3 max-h-[320px] ${interviews.length > 0 ? "overflow-y-auto pr-1" : ""}`}>
        {interviews.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 space-y-5 mt-10">
            <img
              src={noInterviewImg}
              alt="No interviews"
              className="w-24 h-24 opacity-70"
            />
            <p className="text-sm font-medium">No Interviews Scheduled</p>
          </div>
        )}

        <AnimatePresence initial={false}>
          {interviews.length > 0 &&
            interviews.map((item, index) => (
              <motion.div
                key={item.name + index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`flex items-center justify-between rounded px-4 py-2 ${
                  isPastInCurrentMonth ? "bg-gray-100" : "bg-blue-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">For {item.role}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  At {item.time}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InterviewDetails;