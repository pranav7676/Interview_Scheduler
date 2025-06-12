import React from "react";
import { interviewData } from "../data";
import { motion, AnimatePresence } from "framer-motion";
const noInterviewImg = "/int_icon.png";


interface InterviewDetailsProps {
  selectedDate: string;
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({ selectedDate }) => {
  const interviews = interviewData[selectedDate] || [];

  return (
    <div className="bg-white rounded-md shadow p-4 w-full sm:w-[400px]">
      <h2 className="text-md font-medium text-gray-900 mb-5 flex items-center space-x-2">
        <span>
          {new Date(selectedDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </h2>

      <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
        {interviews.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 space-y-4 mt-10">
            <img
              src={noInterviewImg}
              alt="No interviews"
              className="w-24 h-24 opacity-70"
            />
            <p className="text-x1 font-medium">No Interviews Scheduled</p>git init  
          </div>
        )}

        <AnimatePresence>
          {interviews.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center justify-between bg-blue-50 rounded px-4 py-2"
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
