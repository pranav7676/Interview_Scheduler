import React from "react";
import type { Requisition } from "../../constants/requisitions";

export default function ExpandedDetails({ data }: { data: Requisition }) {
  return (
    <div className="bg-gray-50 p-4 rounded animate-fade-in">
      {/* Basic Info Grid */}
      <div className="grid grid-cols-3 gap-4 text-sm text-gray-800">
        <Info label="Hiring Manager" value={data.hiringManager} />
        <Info label="Requisition Owner" value={data.requisitionOwner} />
        <Info label="Head Count" value={data.headCount} />
        <Info label="Contract Type" value={data.contractType} />
        <Info label="Location" value={data.location} />
        <Info label="Planned Start Date" value={data.plannedStartDate} />
        <Info label="Reason for request" value={data.reason} />
        <Info label="Experience" value={data.experience} />
        <Info label="Visa Requirements" value={data.visa} />
        <Info label="Certifications" value={data.certifications} />
        <Info label="Skills" value={data.skills} />
      </div>

      {/* Approval Group */}
      <div className="mt-6 text-sm">
        <div className="text-xs text-gray-500 font-medium mb-2">All From Group</div>

        <div className="flex items-center gap-6 flex-wrap">
          {data.approvers.map((person) => (
            <div key={person.name} className="flex flex-col items-center text-xs w-[64px]">
              <img
                className="w-10 h-10 rounded-full mb-1"
                src={person.image}
                alt={person.name}
              />
              <div className="font-medium text-[11px] text-center">{person.name}</div>
              <div
                className={`text-[11px] ${
                  person.status === "Approved"
                    ? "text-green-600"
                    : person.status === "Rejected"
                    ? "text-red-600"
                    : "text-orange-500"
                }`}
              >
                {person.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-gray-400 text-xs block">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}