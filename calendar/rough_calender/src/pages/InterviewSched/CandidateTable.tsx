import React, { useState } from "react";
import { candidateData } from "./candidateDetails";
import type { Candidate } from "./candidateDetails";

const itemsPerPage = 10;

const CandidateTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const totalPages = Math.ceil(candidateData.length / itemsPerPage);

  const filteredData = candidateData.filter((c) => {
    const searchMatch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.jobId.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch =
      statusFilter === "All" ? true : c.status === statusFilter;
    return searchMatch && statusMatch;
  });

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const currentIds = currentData.map((c) => c.id);
      setSelectedIds([...new Set([...selectedIds, ...currentIds])]);
    } else {
      setSelectedIds(selectedIds.filter((id) => !currentData.map((c) => c.id).includes(id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPage(Number(e.target.value));
  };

  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const toggleFilterDropdown = () => setShowFilterDropdown((prev) => !prev);

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setShowFilterDropdown(false);
    setCurrentPage(1);
  };

  const softGradient = "from-blue-500 via-blue-400 to-indigo-400";

  return (
    <div className="mt-8 p-6 rounded-2xl border border-gray-200 bg-white shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Interviews</h2>
        <div className="relative flex gap-2">
          <input
            type="text"
            placeholder="Search by name or job ID"
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:shadow-md"
            onClick={toggleFilterDropdown}
          >
            Filter
          </button>

          {showFilterDropdown && (
            <div className="absolute top-10 right-0 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {["All", "Completed", "Pending"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilterChange(status)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    statusFilter === status ? "bg-gray-100 font-medium" : ""
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
          <thead className={`bg-gradient-to-r ${softGradient} text-white`}>
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={currentData.every((c) => selectedIds.includes(c.id))}
                  onChange={handleSelectAll}
                  className="accent-blue-600 w-4 h-4"
                />
              </th>
              {["ID", "Candidate", "Job ID", "Interviewer", "Date", "Round", "Mode", "Status"].map((heading) => (
                <th key={heading} className="px-4 py-3">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((candidate: Candidate) => (
              <tr
                key={candidate.id}
                className="bg-white hover:bg-blue-50 shadow-sm transition rounded-lg"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(candidate.id)}
                    onChange={() => toggleSelect(candidate.id)}
                    className="accent-blue-600 w-4 h-4"
                  />
                </td>
                <td className="px-4 py-3 font-semibold text-gray-700">{candidate.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://avatars.dicebear.com/api/initials/${candidate.name}.svg`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full bg-gray-100"
                    />
                    <div>
                      <div className="font-medium text-gray-800">{candidate.name}</div>
                      <div className="text-xs text-gray-500">{candidate.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{candidate.jobId}</td>
                <td className="px-4 py-3">{candidate.interviewer}</td>
                <td className="px-4 py-3">{candidate.date}</td>
                <td className="px-4 py-3">{candidate.round}</td>
                <td className="px-4 py-3">{candidate.mode}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-semibold ${
                      candidate.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={goToPrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90"
          }`}
        >
          Previous
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Page</span>
          <select
            value={currentPage}
            onChange={handlePageChange}
            className="rounded-md border-gray-300 shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-600">of {totalPages}</span>
        </div>

        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 text-sm font-medium rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CandidateTable;
