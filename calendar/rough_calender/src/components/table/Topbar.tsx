import { useState, useRef, useEffect } from "react";
import { Search, Filter, X, MoreVertical } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import data from "../../constants/data.json";

interface TopbarProps {
  filters: Record<string, string>;
  filterOptions: Record<string, string[]>;
  applyFilter: (key: string, value: string) => void;
  removeFilter: (key: string) => void;
  globalFilter: string;
  onSearch: (value: string) => void;
}

export default function Topbar({
  filters,
  filterOptions,
  applyFilter,
  removeFilter,
  globalFilter,
  onSearch,
}: TopbarProps) {
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [showExportPopup, setShowExportPopup] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const exportRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (key: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
  };

  const handleApplyFilters = () => {
    Object.entries(selectedFilters).forEach(([key, val]) => {
      if (val) applyFilter(key, val);
    });
    setFilterModalOpen(false);
  };

  const handlePDFExport = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Candidate", "Role", "Date", "Time"]],
      body: data.map((item) => [
        item.candidate.name,
        item.jobTitle,
        new Date(item.datetime).toLocaleDateString(),
        new Date(item.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      ]),
    });
    doc.save("Interview_Data.pdf");
  };

  const handleExcelExport = () => {
    const formattedData = data.map((item) => ({
      Candidate: item.candidate.name,
      Role: item.jobTitle,
      Date: new Date(item.datetime).toLocaleDateString(),
      Time: new Date(item.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Interviews");
    XLSX.writeFile(workbook, "Interview_Data.xlsx");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setShowExportPopup(false);
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-6">
        {/* Search Box */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={globalFilter}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by ID, candidate..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm shadow-sm"
          />
        </div>

        {/* Filters and Export */}
        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <button
            onClick={() => setFilterModalOpen(true)}
            className="p-2 bg-white rounded-lg hover:bg-gray-100 shadow-sm"
          >
            <Filter size={22} />
          </button>

          {/* Export Menu */}
          <div className="relative" ref={exportRef}>
            <button
              onClick={() => {
                setMoreOpen((prev) => !prev);
                setShowExportPopup(false);
              }}
              className="p-2 bg-white rounded-lg hover:bg-gray-100 shadow-sm"
            >
              <MoreVertical size={22} />
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md w-48 z-30">
                <button
                  onClick={() => setShowExportPopup(true)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Export Data
                </button>
              </div>
            )}

            {showExportPopup && (
              <div className="absolute right-0 mt-16 bg-white border border-gray-300 rounded-md shadow-lg w-48 z-40">
                <button
                  onClick={handlePDFExport}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Export as PDF
                </button>
                <button
                  onClick={handleExcelExport}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Export as Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(filters).map(([k, v]) => (
            <span
              key={k}
              className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-blue-800"
            >
              {k.charAt(0).toUpperCase() + k.slice(1)}: {v}
              <button onClick={() => removeFilter(k)} className="hover:text-red-500">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Filter Modal */}
      {filterModalOpen && (
        <div className="fixed inset-0 bg-[#1a1a1a]/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-2xl relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Apply Filters</h2>

            {Object.entries(filterOptions).map(([key, opts]) => (
              <div key={key} className="mb-4">
                <label className="block font-medium mb-1 capitalize text-gray-700">{key}</label>
                <div className="flex flex-wrap gap-2">
                  {opts.map((opt) => (
                    <button
                      key={opt}
                      className={`px-3 py-1 border rounded-full text-sm transition-all ${
                        selectedFilters[key] === opt
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300"
                      }`}
                      onClick={() => toggleFilter(key, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setFilterModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply
              </button>
            </div>

            <button
              onClick={() => setFilterModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
