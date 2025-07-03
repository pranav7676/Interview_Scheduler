import React, { useState, useRef, useEffect } from "react";
import RequisitionToggle from "./RequisitionToggle";
import RequisitionCard from "./RequisitionCard";
import BlankView from "./BlankView";
import { requisitions } from "../../constants/requisitions";
import { Filter, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";

const ITEMS_PER_PAGE = 2;

export default function JobRequisitionPage() {
  const [selectedTab, setSelectedTab] = useState<"jobs" | "requisitions" | "myRequisitions">("requisitions");
  const [search, setSearch] = useState("");
  const [hiringManagerFilter, setHiringManagerFilter] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const uniqueHiringManagers = Array.from(new Set(requisitions.map(r => r.hiringManager)));

  const filtered = requisitions.filter((item) => {
    const matchesSearch = (
      (item.jobTitle || "") +
      " " +
      (item.hiringManager || "") +
      " " +
      (item.requisitionOwner || "")
    ).toLowerCase().includes(search.toLowerCase());

    const matchesHiringManager = hiringManagerFilter
      ? item.hiringManager === hiringManagerFilter
      : true;

    return matchesSearch && matchesHiringManager;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow relative">
      <div className="text-xl font-semibold mb-4">Job Requisition</div>
      <RequisitionToggle selected={selectedTab} onSelect={setSelectedTab} />

      {selectedTab === "requisitions" && (
        <>
          {/* Search + Filter */}
          <div className="flex items-center justify-between mt-6 mb-4 text-sm text-gray-500 relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search"
              className="border px-3 py-1 rounded text-sm w-60"
            />

            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="border p-2 rounded-md hover:bg-gray-100 transition"
              >
                <Filter className="w-4 h-4 text-gray-700" />
              </button>

              {filterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                  <div className="p-2 text-xs text-gray-500 border-b">Filter by Hiring Manager</div>
                  <ul className="max-h-64 overflow-y-auto">
                    {uniqueHiringManagers.map((hm, idx) => (
                      <li key={idx}>
                        <button
                          onClick={() => {
                            setHiringManagerFilter(hm);
                            setFilterOpen(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                            hiringManagerFilter === hm ? "bg-blue-100 text-blue-700" : ""
                          }`}
                        >
                          {hm}
                        </button>
                      </li>
                    ))}
                  </ul>
                  {hiringManagerFilter && (
                    <button
                      onClick={() => {
                        setHiringManagerFilter("");
                        setFilterOpen(false);
                        setCurrentPage(1);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Clear Filter
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Requisition Cards */}
          <div className="space-y-4">
            {paginated.map((req, idx) => (
              <RequisitionCard
                key={idx}
                data={req}
                isExpanded={expandedIndex === idx}
                onExpand={() => toggleExpand(idx)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-6 text-sm text-gray-700">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="disabled:text-gray-300"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="disabled:text-gray-300"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="font-medium">
              Page <span className="text-black">{currentPage}</span> of{" "}
              <span className="text-black">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="disabled:text-gray-300"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="disabled:text-gray-300"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </>
      )}

      {selectedTab === "jobs" && <BlankView text="Jobs View Coming Soon" />}
      {selectedTab === "myRequisitions" && (
        <BlankView text="My Requisitions View Coming Soon" />
      )}
    </div>
  );
}
