import React from "react";

interface CandidateCellProps {
  getValue: () => {
    name: string;
    email: string;
    avatar: string;
  };
}

export default function CandidateCell({ getValue }: CandidateCellProps) {
  const candidate = getValue();
  return (
    <div className="flex items-center space-x-3">
      <img
        src={candidate.avatar}
        alt={candidate.name}
        className="w-8 h-8 rounded-full"
      />
      <div>
        <div className="font-medium text-gray-900">{candidate.name}</div>
        <div className="text-sm text-gray-500">{candidate.email}</div>
      </div>
    </div>
  );
}

