import React, { useEffect, useRef } from "react";

type Props = {
  onClose: () => void;
};

const AssignToModal: React.FC<Props> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Close modal on outside click
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute z-50 bg-white shadow-md rounded-md p-4 flex flex-col items-center gap-4"
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="Vidhya"
              className="w-12 h-12 rounded-full"
            />
            <span>Vidhya</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/2.jpg"
              alt="Aparna"
              className="w-12 h-12 rounded-full"
            />
            <span>Aparna</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/men/3.jpg"
              alt="Indrajith"
              className="w-12 h-12 rounded-full"
            />
            <span>Indrajith</span>
          </div>
        </div>
        <button
          className="text-sm text-blue-600 underline mt-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AssignToModal;




// import React, { forwardRef } from "react";
// import type { ApprovalMember } from "../../constants/requisitions";

// interface Props {
//   members: ApprovalMember[];
//   onClose: () => void;
// }

// const AssignToModal = forwardRef<HTMLDivElement, Props>(({ members, onClose }, ref) => {
//   return (
//     <div
//       ref={ref}
//       className="bg-white rounded-lg shadow-lg p-4 w-[250px] border border-gray-200"
//     >
//       <div className="text-sm font-semibold text-gray-600 mb-4">All from Group</div>

//       <div className="space-y-4">
//         {members.map((person) => (
//           <div key={person.name} className="flex items-center gap-3">
//             <img
//               className="w-8 h-8 rounded-full"
//               src={person.image}
//               alt={person.name}
//             />
//             <div>
//               <div className="text-sm font-medium">{person.name}</div>
//               <div
//                 className={`text-xs ${
//                   person.status === "Approved"
//                     ? "text-green-600"
//                     : person.status === "Rejected"
//                     ? "text-red-600"
//                     : "text-orange-500"
//                 }`}
//               >
//                 {person.status}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={onClose}
//         className="mt-4 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm"
//       >
//         Close
//       </button>
//     </div>
//   );
// });

// export default AssignToModal;
