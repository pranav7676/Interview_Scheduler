// import React, { useState } from "react";
// import {
//   MapPin,
//   Clock,
//   XCircle,
//   CircleCheck,
//   ChevronDown,
// } from "lucide-react";
// import type { Requisition } from "../../constants/requisitions";
// import ExpandedDetails from "./ExpandedDetails";

// type Props = {
//   data: Requisition;
//   isExpanded: boolean;
//   onExpand: () => void;
// };

// export default function RequisitionCard({ data, isExpanded, onExpand }: Props) {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [assignedTo, setAssignedTo] = useState("");

//   const statusColors: Record<string, string> = {
//     "Waiting for Approval": "bg-yellow-100 text-yellow-800",
//     Completed: "bg-green-100 text-green-800",
//     Rejected: "bg-red-100 text-red-800",
//   };

//   const statusIcons: Record<string, React.JSX.Element> = {
//     "Waiting for Approval": <Clock className="w-4 h-4 mr-1" />,
//     Completed: <CircleCheck className="w-4 h-4 mr-1" />,
//     Rejected: <XCircle className="w-4 h-4 mr-1" />,
//   };

//   const toggleDropdown = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleAssign = (name: string) => {
//     setAssignedTo(name);
//     setDropdownOpen(false);
//     // Optionally send this data to backend here
//   };

//   return (
//     <div
//       onClick={onExpand}
//       className="border rounded-md p-4 cursor-pointer transition-all relative bg-white"
//     >
//       {/* Top Section */}
//       <div className="flex justify-between items-start">
//         <div>
//           <div className="font-medium text-sm">{data.jobTitle}</div>
//           <div className="text-xs text-gray-500 flex items-center">
//             <MapPin className="w-3 h-3 mr-1" />
//             {data.location}
//           </div>
//         </div>
//         <div
//           className={`flex items-center text-xs font-medium px-2 py-1 rounded ${statusColors[data.status]}`}
//         >
//           {statusIcons[data.status]}
//           {data.status}
//         </div>
//       </div>

//       {/* Info Grid */}
//       <div className="grid grid-cols-4 mt-4 text-sm text-gray-700">
//         <div>
//           <span className="text-xs text-gray-400 block">Hiring Manager</span>
//           {data.hiringManager}
//         </div>
//         <div>
//           <span className="text-xs text-gray-400 block">Requisition Owner</span>
//           {data.requisitionOwner}
//         </div>
//         <div>
//           <span className="text-xs text-gray-400 block">Plan Date</span>
//           {data.planDate}
//         </div>
//         <div>
//           <span className="text-xs text-gray-400 block">Head Count</span>
//           {data.headCount}
//         </div>
//       </div>

//       {/* Assign Button */}
//       <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
//         <div className="relative">
//           <button
//             onClick={toggleDropdown}
//             className="flex items-center bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded"
//           >
//             {assignedTo ? `Assigned to: ${assignedTo}` : "Assign to"}
//             <ChevronDown className="w-4 h-4 ml-1" />
//           </button>

//           {dropdownOpen && (
//             <div
//               className="absolute left-0 mt-2 w-44 bg-white border shadow-md rounded-md z-20"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <ul className="py-2 text-sm text-gray-700">
//                 {data.hrList.map((hr) => (
//                   <li
//                     key={hr}
//                     onClick={() => handleAssign(hr)}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   >
//                     {hr}
//                   </li>
//                 ))}
//               </ul>
//               <button
//                 onClick={() => setDropdownOpen(false)}
//                 className="text-xs text-gray-500 underline w-full py-2"
//               >
//                 Close
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Expand Section */}
//       <div
//         className={`transition-all duration-300 ease-in-out overflow-hidden ${
//           isExpanded ? "max-h-[1000px] mt-6" : "max-h-0"
//         }`}
//       >
//         <ExpandedDetails data={data} />
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Clock,
  XCircle,
  CircleCheck,
  ChevronDown,
} from "lucide-react";
import type { Requisition } from "../../constants/requisitions";
import ExpandedDetails from "./ExpandedDetails";

type Props = {
  data: Requisition;
  isExpanded: boolean;
  onExpand: () => void;
};

export default function RequisitionCard({ data, isExpanded, onExpand }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // ref for dropdown

  const statusColors: Record<string, string> = {
    "Waiting for Approval": "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  const statusIcons: Record<string, React.JSX.Element> = {
    "Waiting for Approval": <Clock className="w-4 h-4 mr-1" />,
    Completed: <CircleCheck className="w-4 h-4 mr-1" />,
    Rejected: <XCircle className="w-4 h-4 mr-1" />,
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => setDropdownOpen(false);

  // 👇 Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div
      onClick={onExpand}
      className="border rounded-md p-4 cursor-pointer transition-all relative bg-white"
    >
      {/* Top: Title & Status */}
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium text-sm">{data.jobTitle}</div>
          <div className="text-xs text-gray-500 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {data.location}
          </div>
        </div>
        <div
          className={`flex items-center text-xs font-medium px-2 py-1 rounded ${statusColors[data.status]}`}
        >
          {statusIcons[data.status]}
          {data.status}
        </div>
      </div>

      {/* Grid Details */}
      <div className="grid grid-cols-4 mt-4 text-sm text-gray-700">
        <div>
          <span className="text-xs text-gray-400 block">Hiring Manager</span>
          {data.hiringManager}
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Requisition Owner</span>
          {data.requisitionOwner}
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Plan Date</span>
          {data.planDate}
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Head Count</span>
          {data.headCount}
        </div>
      </div>

      {/* Bottom: Assign Dropdown */}
      <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded"
          >
            Assign to <ChevronDown className="w-4 h-4 ml-1" />
          </button>

          {dropdownOpen && (
            <div
              className="absolute left-10 mt-2 w-56 bg-white border shadow-md rounded-md p-3 z-20"
            >
              <div className="grid grid-cols-2 gap-3">
                {data.approvers.map((person) => (
                  <div
                    key={person.name}
                    className="flex flex-col items-center text-xs"
                  >
                    <img
                      className="w-8 h-8 rounded-full mb-1"
                      src={person.image}
                      alt={person.name}
                    />
                    <div className="text-center text-[11px]">
                      {person.name}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={closeDropdown}
                className="mt-3 text-xs text-gray-500 underline w-full text-center"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Details */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[1000px] mt-6" : "max-h-0"
        }`}
      >
        <ExpandedDetails data={data} />
      </div>
    </div>
  );
}
