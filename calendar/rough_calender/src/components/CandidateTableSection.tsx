import { useState, useMemo } from "react";
import mockCandidates from "../constants/data.json"; 
import { candidateColumns } from "./column/candidateColumns";
import { DataTable } from "./table/datatable";
import Topbar from "./table/Topbar";
import CandidateDetailsModal from "./CandidateDetailsModal";
import type { CandidateData } from "../types/CandidateData";

export default function CandidateTableSection() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Available filter options
  const filterOptions = useMemo(() => {
    const keysToFilter: (keyof CandidateData)[] = ["mode", "round", "status"];
    return keysToFilter.reduce((options, key) => {
      options[key] = Array.from(
        new Set((mockCandidates as CandidateData[]).map((c) => c[key] as string))
      );
      return options;
    }, {} as Record<string, string[]>);
  }, []);

  // Filtered data list
  const filteredData = useMemo(() => {
    let data = [...(mockCandidates as CandidateData[])];

    Object.entries(filters).forEach(([key, value]) => {
      data = data.filter((item) => {
        const field = (item as CandidateData)[key as keyof CandidateData];
        return typeof field === "string" && field.toLowerCase() === value.toLowerCase();
      });
    });

    if (globalFilter.trim()) {
      const q = globalFilter.toLowerCase();
      data = data.filter(
        (item) =>
          item.id.toLowerCase().includes(q) ||
          item.jobId.toLowerCase().includes(q) ||
          item.candidate.name.toLowerCase().includes(q) ||
          item.round.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q)
      );
    }

    return data;
  }, [filters, globalFilter]);

  const applyFilter = (key: string, value: string) => setFilters((prev) => ({ ...prev, [key]: value }));
  const removeFilter = (key: string) => setFilters((prev) => {
    const next = { ...prev };
    delete next[key];
    return next;
  });

  const openCandidate = (index: number) => {
    setSelectedIndex(index);
    setSelectedCandidate(filteredData[index]);
  };
  const handleNext = () => {
    if (selectedIndex < filteredData.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedCandidate(filteredData[selectedIndex + 1]);
    }
  };
  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setSelectedCandidate(filteredData[selectedIndex - 1]);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mt-8 w-full max-w-5xl mx-auto overflow-x-auto">
      <h2 className="text-xl font-semibold text-[#05387D] mb-4">Interviews</h2>

      <Topbar
        filters={filters}
        filterOptions={filterOptions}
        applyFilter={applyFilter}
        removeFilter={removeFilter}
        globalFilter={globalFilter}
        onSearch={setGlobalFilter}
      />

      <DataTable
        columns={candidateColumns}
        data={filteredData}
        nextFunction={async () => {}}
        previousFunction={async () => {}}
        getCanPreviousPage={false}
        getCanNextPage={false}
        onRowClick={openCandidate}
      />

      {selectedCandidate && (
        <CandidateDetailsModal
          data={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          disableNext={selectedIndex >= filteredData.length - 1}
          disablePrev={selectedIndex <= 0}
        />
      )}
    </div>
  );
}
