import React from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Mail,
  Phone,
  Building2,
  Clock,
} from "lucide-react";
import type { CandidateData } from "../types/CandidateData";

interface CandidateDetailsModalProps {
  data: CandidateData;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  disableNext: boolean;
  disablePrev: boolean;
}

export default function CandidateDetailsModal({
  data,
  onClose,
  onNext,
  onPrev,
  disableNext,
  disablePrev,
}: CandidateDetailsModalProps) {
  if (!data) return null;

  const processSteps = ["Screening", "Interview", "Offered", "Onboarding"];

  const currentStepIndex =
    data.status === "Completed"
      ? processSteps.indexOf(data.round) >= 0
        ? processSteps.indexOf(data.round)
        : 1
      : 0;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrev}
              disabled={disablePrev}
              className="disabled:text-gray-400 text-gray-800 hover:text-black flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={onNext}
              disabled={disableNext}
              className="disabled:text-gray-400 text-gray-800 hover:text-black flex items-center gap-1"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-gray-700 hover:text-gray-800">
              <FileText size={16} /> Resume
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row px-6 py-6 gap-6">
          {/* Left */}
          <div className="flex-[1.5]">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={data.candidate.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full border"
              />
              <div>
                <h2 className="text-xl font-semibold text-black">
                  {data.candidate.name}
                </h2>
                <p className="text-sm text-gray-600">{data.candidate.email}</p>
              </div>
            </div>

            <div className="bg-gray-100 rounded-md p-4">
              <div className="border-b pb-2 mb-4">
                <h3 className="text-md font-semibold text-blue-700">Overview</h3>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500">Job Details</p>
                <h4 className="font-semibold text-black">{data.jobTitle}</h4>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {data.jobType}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {data.jobLocation}
                  </span>
                  <span className="flex items-center gap-1">
                    <Building2 size={14} /> {data.workMode}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-700">
                <div>
                  <p className="text-xs text-gray-500">Years Of Experience</p>
                  <p className="font-medium">{data.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current Salary</p>
                  <p className="font-medium">{data.salary}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-blue-700 font-medium mb-2">
                  Current Process
                </p>
                <div className="flex gap-4">
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`text-sm border-b-2 pb-1 ${
                        index <= currentStepIndex
                          ? "border-blue-700 text-blue-700"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 bg-gray-100 rounded-md p-4">
            <div className="border-b pb-2 mb-4">
              <h3 className="text-md font-semibold text-blue-700">
                Profile Details
              </h3>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Phone size={14} /> {data.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} /> {data.candidate.email}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} /> {data.location}
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-700 mb-1">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-white border px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




// import React from "react";
// import {
//   X,
//   ChevronLeft,
//   ChevronRight,
//   FileText,
//   MapPin,
//   Mail,
//   Phone,
//   Briefcase,
//   Building2,
//   Clock
// } from "lucide-react";

// export default function CandidateDetailsModal({
//   data,
//   onClose,
//   onNext,
//   onPrev,
//   disableNext,
//   disablePrev
// }) {
//   if (!data) return null;

//   const processSteps = ["Screening", "Interview", "Offered", "Onboarding"];
//   const currentStepIndex = data.status === "Completed" ? 1 : 0; // 0 = Screening, 1 = Interview

//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg relative">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b px-6 py-4">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={onPrev}
//               disabled={disablePrev}
//               className="disabled:text-gray-400 text-gray-600 hover:text-black flex items-center gap-1"
//             >
//               <ChevronLeft size={16} /> Previous
//             </button>
//             <button
//               onClick={onNext}
//               disabled={disableNext}
//               className="disabled:text-gray-400 text-gray-600 hover:text-black flex items-center gap-1"
//             >
//               Next <ChevronRight size={16} />
//             </button>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
//               <FileText size={16} /> Resume
//             </button>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col md:flex-row px-6 py-6 gap-6">
//           {/* Left */}
//           <div className="flex-[1.5]">
//             <div className="flex items-center gap-4 mb-6">
//               <img
//                 src={data.candidate.avatar}
//                 alt="avatar"
//                 className="w-16 h-16 rounded-full border"
//               />
//               <div>
//                 <h2 className="text-xl font-semibold text-black">
//                   {data.candidate.name}
//                 </h2>
//                 <p className="text-sm text-gray-600">{data.candidate.email}</p>
//               </div>
//             </div>

//             <div className="bg-gray-100 rounded-md p-4">
//               <div className="border-b pb-2 mb-4">
//                 <h3 className="text-md font-semibold text-blue-700">Overview</h3>
//               </div>

//               <div className="mb-4">
//                 <p className="text-sm text-gray-500">Job Details</p>
//                 <h4 className="font-semibold text-black">{data.jobTitle}</h4>
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
//                   <span className="flex items-center gap-1">
//                     <Clock size={14} /> {data.jobType}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <MapPin size={14} /> {data.jobLocation}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Building2 size={14} /> {data.workMode}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-between text-sm text-gray-700">
//                 <div>
//                   <p className="text-xs text-gray-500">Years Of Experience</p>
//                   <p className="font-medium">{data.experience}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Current Salary</p>
//                   <p className="font-medium">{data.salary}</p>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <p className="text-sm text-blue-700 font-medium mb-2">Current Process</p>
//                 <div className="flex gap-4">
//                   {processSteps.map((step, index) => (
//                     <div
//                       key={index}
//                       className={`text-sm border-b-2 pb-1 ${
//                         index <= currentStepIndex
//                           ? "border-blue-700 text-blue-700"
//                           : "border-gray-300 text-gray-400"
//                       }`}
//                     >
//                       {step}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="flex-1 bg-gray-100 rounded-md p-4">
//             <div className="border-b pb-2 mb-4">
//               <h3 className="text-md font-semibold text-blue-700">Profile Details</h3>
//             </div>

//             <div className="space-y-4 text-sm text-gray-700">
//               <div className="flex items-center gap-2">
//                 <Phone size={14} /> {data.phone}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Mail size={14} /> {data.candidate.email}
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin size={14} /> {data.location}
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-blue-700 mb-1">Skills</p>
//                 <div className="flex flex-wrap gap-2">
//                   {data.skills.map((skill, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-white border px-2 py-1 rounded-full text-xs"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import React from "react";
// import {
//   X,
//   ChevronLeft,
//   ChevronRight,
//   FileText,
//   MapPin,
//   Mail,
//   Phone,
//   Briefcase,
//   Building2,
//   Clock
// } from "lucide-react";

// export default function CandidateDetailsModal({
//   data,
//   onClose,
//   onNext,
//   onPrev,
//   disableNext,
//   disablePrev
// }) {
//   if (!data) return null;

//   const processSteps = ["Screening", "Interview", "Offered", "Onboarding"];

//   return (
//     <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
//       <div className="bg-white w-full max-w-5xl rounded-xl shadow-lg relative">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b px-6 py-4">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={onPrev}
//               disabled={disablePrev}
//               className="disabled:text-gray-400"
//             >
//               <ChevronLeft /> Previous
//             </button>
//             <button
//               onClick={onNext}
//               disabled={disableNext}
//               className="disabled:text-gray-400"
//             >
//               Next <ChevronRight />
//             </button>
//           </div>
//           <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
//             <FileText size={16} /> Resume
//           </button>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col md:flex-row px-6 py-6 gap-6">
//           {/* Left */}
//           <div className="flex-[1.5]">
//             <div className="flex items-center gap-4 mb-6">
//               <img
//                 src={data.candidate.avatar}
//                 alt="avatar"
//                 className="w-16 h-16 rounded-full border"
//               />
//               <div>
//                 <h2 className="text-xl font-semibold text-black">
//                   {data.candidate.name}
//                 </h2>
//                 <p className="text-sm text-gray-600">{data.candidate.email}</p>
//               </div>
//             </div>

//             <div className="bg-gray-100 rounded-md p-4">
//               <div className="border-b pb-2 mb-4">
//                 <h3 className="text-md font-semibold text-blue-700">Overview</h3>
//               </div>

//               <div className="mb-4">
//                 <p className="text-sm text-gray-500">Job Details</p>
//                 <h4 className="font-semibold text-black">{data.jobTitle}</h4>
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
//                   <span className="flex items-center gap-1">
//                     <Clock size={14} /> {data.jobType}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <MapPin size={14} /> {data.jobLocation}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Building2 size={14} /> {data.workMode}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-between text-sm text-gray-700">
//                 <div>
//                   <p className="text-xs text-gray-500">Years Of Experience</p>
//                   <p className="font-medium">{data.experience}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Current Salary</p>
//                   <p className="font-medium">{data.salary}</p>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <p className="text-sm text-blue-700 font-medium mb-2">Current Process</p>
//                 <div className="flex gap-4">
//                   {processSteps.map((step, index) => (
//                     <div
//                       key={index}
//                       className={`text-sm border-b-2 pb-1 ${
//                         processSteps.indexOf(data.round) >= index
//                           ? "border-blue-700 text-blue-700"
//                           : "border-gray-300 text-gray-400"
//                       }`}
//                     >
//                       {step}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="flex-1 bg-gray-100 rounded-md p-4">
//             <div className="border-b pb-2 mb-4">
//               <h3 className="text-md font-semibold text-blue-700">Profile Details</h3>
//             </div>

//             <div className="space-y-4 text-sm text-gray-700">
//               <div className="flex items-center gap-2">
//                 <Phone size={14} /> {data.phone}
//               </div>
//               <div className="flex items-center gap-2">
//                 <Mail size={14} /> {data.candidate.email}
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin size={14} /> {data.location}
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-blue-700 mb-1">Skills</p>
//                 <div className="flex flex-wrap gap-2">
//                   {data.skills.map((skill, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-white border px-2 py-1 rounded-full text-xs"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import {
//   X,
//   ChevronLeft,
//   ChevronRight,
//   FileText,
//   MapPin,
//   Mail,
//   Phone,
//   Briefcase,
//   Clock,
//   Building2
// } from "lucide-react";

// export default function CandidateDetailsModal({
//   data,
//   onClose,
//   onNext,
//   onPrev,
//   disableNext,
//   disablePrev
// }) {
//   if (!data) return null;

//   const dtStr = new Date(data.datetime).toLocaleString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true
//   });

//   const processSteps = ["Screening", "Interview", "Offered", "Onboarding"];

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
//       <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-4">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={onPrev}
//               disabled={disablePrev}
//               className="disabled:text-gray-400"
//             >
//               <ChevronLeft />
//             </button>
//             <h2 className="text-xl font-semibold text-gray-800">Applicant Details</h2>
//             <button
//               onClick={onNext}
//               disabled={disableNext}
//               className="disabled:text-gray-400"
//             >
//               <ChevronRight />
//             </button>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="flex items-center text-gray-500 hover:text-gray-700">
//               <FileText size={16} className="mr-1" /> Resume
//             </button>
//             <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//               <X size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Body */}
//         <div className="mt-6 flex flex-col md:flex-row gap-6">
//           {/* Left Section */}
//           <div className="flex-[1.5]">
//             <div className="flex items-center gap-4">
//               <img
//                 src={data.candidate.avatar}
//                 alt="Avatar"
//                 className="w-16 h-16 rounded-full border"
//               />
//               <div>
//                 <h3 className="text-lg font-semibold">{data.candidate.name}</h3>
//                 <p className="text-sm text-gray-600">{data.candidate.email}</p>
//               </div>
//             </div>

//             <div className="bg-gray-50 p-4 mt-6 rounded-lg">
//               <h4 className="text-sm font-semibold text-blue-700 border-b pb-2 mb-4">
//                 Overview
//               </h4>
//               <div>
//                 <p className="text-sm text-gray-600 font-medium mb-1">Job Details</p>
//                 <h5 className="font-semibold">{data.jobTitle}</h5>
//                 <div className="flex gap-4 mt-2 text-sm text-gray-600">
//                   <div className="flex items-center gap-1">
//                     <Briefcase size={14} /> {data.jobType}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <MapPin size={14} /> {data.jobLocation}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Building2 size={14} /> {data.workMode}
//                   </div>
//                 </div>

//                 <div className="flex justify-between mt-4">
//                   <div>
//                     <p className="text-xs text-gray-500">Years Of Experience</p>
//                     <p className="font-medium">{data.experience}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">Current Salary</p>
//                     <p className="font-medium">{data.salary}</p>
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <p className="text-sm text-blue-700 font-medium mb-2">
//                     Current Process
//                   </p>
//                   <div className="flex gap-4">
//                     {processSteps.map((step, index) => (
//                       <div
//                         key={index}
//                         className={`text-sm border-b-2 pb-1 ${
//                           processSteps.indexOf(data.round) >= index
//                             ? "border-blue-700 text-blue-700"
//                             : "border-gray-300 text-gray-400"
//                         }`}
//                       >
//                         {step}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="flex-1 bg-gray-50 p-4 rounded-lg">
//             <h4 className="text-sm font-semibold text-blue-700 border-b pb-2 mb-4">
//               Profile Details
//             </h4>
//             <div className="text-sm text-gray-700 space-y-3">
//               <div className="flex items-center gap-2">
//                 <Phone size={14} /> <span>{data.phone}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Mail size={14} /> <span>{data.candidate.email}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin size={14} /> <span>{data.location}</span>
//               </div>
//               <div>
//                 <p className="font-semibold text-sm text-blue-700 mb-1">Skills</p>
//                 <div className="flex flex-wrap gap-2">
//                   {data.skills.map((skill, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-gray-200 px-2 py-1 rounded text-xs"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// import React from "react";
// import { X, ChevronLeft, ChevronRight, Mail, Phone, MapPin } from "lucide-react";

// export default function CandidateDetailsModal({
//   data,
//   onClose,
//   onNext,
//   onPrev,
//   disableNext,
//   disablePrev,
// }) {
//   if (!data) return null;

//   const dtStr = new Date(data.datetime).toLocaleString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });

//   const currentStage = ["Screening", "Interview", "Offered", "Onboarding"];
//   const currentStep = currentStage.findIndex((s) =>
//     s.toLowerCase().includes(data.status.toLowerCase().includes("completed") ? "interview" : "screening")
//   );

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
//       <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b pb-3 mb-4">
//           <div className="flex items-center gap-3">
//             <button onClick={onPrev} disabled={disablePrev}>
//               <ChevronLeft className={`text-gray-500 ${disablePrev ? "opacity-30" : "hover:text-black"}`} />
//             </button>
//             <button onClick={onNext} disabled={disableNext}>
//               <ChevronRight className={`text-gray-500 ${disableNext ? "opacity-30" : "hover:text-black"}`} />
//             </button>
//           </div>
//           <h2 className="text-xl font-semibold">Applicant Details</h2>
//           <button onClick={onClose}>
//             <X className="text-gray-500 hover:text-black" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Profile */}
//           <div className="flex flex-col items-center text-center gap-3 md:col-span-1">
//             <img
//               src={data.candidate.avatar}
//               alt="avatar"
//               className="w-24 h-24 rounded-full border"
//             />
//             <div>
//               <h3 className="text-lg font-bold">{data.candidate.name}</h3>
//               <p className="text-sm text-gray-600">{data.candidate.email}</p>
//             </div>

//             <div className="mt-4 w-full bg-gray-100 p-3 rounded-lg text-left text-sm space-y-2">
//               <h4 className="font-semibold text-gray-700">Profile Details</h4>
//               <div className="flex items-center gap-2 text-gray-700">
//                 <Phone size={14} /> {data.phone}
//               </div>
//               <div className="flex items-center gap-2 text-gray-700">
//                 <Mail size={14} /> {data.candidate.email}
//               </div>
//               <div className="flex items-center gap-2 text-gray-700">
//                 <MapPin size={14} /> {data.location}
//               </div>
//               <div>
//                 <h4 className="font-semibold mt-2">Skills</h4>
//                 <div className="flex flex-wrap gap-2 mt-1">
//                   {data.skills.map((skill, i) => (
//                     <span
//                       key={i}
//                       className="bg-gray-200 text-xs px-2 py-1 rounded"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Details */}
//           <div className="md:col-span-2 space-y-4">
//             <div className="border rounded-lg p-4">
//               <h4 className="font-semibold text-blue-600 mb-2">Job Details</h4>
//               <p className="font-medium">{data.jobTitle}</p>
//               <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
//                 <span>📌 {data.jobType}</span>
//                 <span>📍 {data.jobLocation}</span>
//                 <span>🏢 {data.workMode}</span>
//               </div>
//               <div className="flex justify-between mt-3 text-sm">
//                 <span>Years of Experience: <strong>{data.experience}</strong></span>
//                 <span>Current Salary: <strong>{data.salary}</strong></span>
//               </div>
//             </div>

//             <div className="border rounded-lg p-4">
//               <h4 className="font-semibold text-blue-600 mb-2">Current Process</h4>
//               <div className="flex justify-between text-sm font-medium text-gray-600">
//                 {currentStage.map((step, idx) => (
//                   <div
//                     key={step}
//                     className={`flex-1 text-center pb-1 border-b-2 ${
//                       idx <= currentStep ? "border-blue-600 text-blue-600" : "border-gray-300"
//                     }`}
//                   >
//                     {step}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div><strong>ID:</strong> {data.id}</div>
//               <div><strong>Job ID:</strong> {data.jobId}</div>
//               <div><strong>Interviewer:</strong> {data.interviewer}</div>
//               <div><strong>Date & Time:</strong> {dtStr}</div>
//               <div><strong>Round:</strong> {data.round}</div>
//               <div><strong>Mode:</strong> {data.mode}</div>
//               <div><strong>Status:</strong> {data.status}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

// export default function CandidateDetailsModal({
//   data,
//   onClose,
//   onNext,
//   onPrev,
//   disableNext,
//   disablePrev,
// }) {
//   if (!data) return null;

//   const dtStr = new Date(data.datetime).toLocaleString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });

//   return (
//     <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
//           <X size={20} />
//         </button>
//         <h2 className="text-xl font-semibold mb-4">Candidate Details</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
//           <div><strong>ID:</strong> {data.id}</div>
//           <div><strong>Job ID:</strong> {data.jobId}</div>
//           <div><strong>Name:</strong> {data.candidate.name}</div>
//           <div><strong>Email:</strong> {data.candidate.email}</div>
//           <div><strong>Interviewer:</strong> {data.interviewer}</div>
//           <div><strong>Date & Time:</strong> {dtStr}</div>
//           <div><strong>Round:</strong> {data.round}</div>
//           <div><strong>Mode:</strong> {data.mode}</div>
//           <div><strong>Status:</strong> {data.status}</div>
//         </div>
//         <div className="mt-6 flex justify-between">
//           <button
//             onClick={onPrev}
//             disabled={disablePrev}
//             className={`flex items-center gap-1 px-4 py-2 rounded ${
//               disablePrev ? "bg-gray-200 text-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"
//             }`}
//           >
//             <ChevronLeft size={16} /> Previous
//           </button>
//           <button
//             onClick={onNext}
//             disabled={disableNext}
//             className={`flex items-center gap-1 px-4 py-2 rounded ${
//               disableNext ? "bg-gray-200 text-gray-400" : "bg-blue-500 text-white hover:bg-blue-600"
//             }`}
//           >
//             Next <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
