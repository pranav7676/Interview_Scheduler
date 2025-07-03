import React from "react";

type Props = {
  selected: "jobs" | "requisitions" | "myRequisitions";
  onSelect: (value: "jobs" | "requisitions" | "myRequisitions") => void;
};

export default function RequisitionToggle({ selected, onSelect }: Props) {
  const options = [
    { key: "jobs", label: "Jobs" },
    { key: "requisitions", label: "Job Requisitions" },
    { key: "myRequisitions", label: "My Requisitions" },
  ];

  return (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-md w-fit">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onSelect(opt.key as any)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium ${
            selected === opt.key ? "bg-white shadow text-blue-600" : "text-gray-600"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}