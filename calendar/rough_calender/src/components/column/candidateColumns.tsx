// candidateColumns.ts
import { ArrowUpDown } from "lucide-react";
import { createColumnHelper } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import type { CandidateData } from "../../types/CandidateData"; // Adjust path as per your folder structure

const columnHelper = createColumnHelper<CandidateData>();

export const candidateColumns: ColumnDef<CandidateData, any>[] = [
    columnHelper.accessor("id", {
        header: "ID",
    }),
    columnHelper.accessor((row) => row.candidate, {
        id: "candidate",
        header: () => (
            <div className= "flex items-center" >
            Candidate < ArrowUpDown className="ml-1 w-3 h-3" />
            </div>
    ),
    cell: ({ getValue }) => {
        const c = getValue();
        return (
            <div className= "flex items-center space-x-3" >
            <img src={ c.avatar } alt = { c.name } className = "w-8 h-8 rounded-full" />
                <div>
                <div className="font-medium" > { c.name } </div>
                    < div className = "text-sm text-gray-500" > { c.email } </div>
                        </div>
                        </div>
      );
    },
sortingFn: (a, b) =>
    a.original.candidate.name.localeCompare(b.original.candidate.name),
  }),
columnHelper.accessor("jobId", {
    header: "Job ID",
}),
    columnHelper.accessor("interviewer", {
        header: "Interviewer",
    }),
    columnHelper.accessor("datetime", {
        header: () => (
            <div className= "flex items-center" >
            Date & Time < ArrowUpDown className="ml-1 w-3 h-3 inline" />
            </div>
    ),
    cell: (info) => {
        const dt = new Date(info.getValue());
        return dt.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    },
        sortingFn: (a, b) => {
            const aTime = new Date(a.original.datetime).getTime();
            const bTime = new Date(b.original.datetime).getTime();
            return aTime - bTime;
        },
  }),
columnHelper.accessor("round", {
    header: "Round",
}),
    columnHelper.accessor("mode", {
        header: "Mode",
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ getValue }) => {
            const v = getValue();
            const base = "inline-block px-2 py-1 text-xs font-semibold rounded-full";
            const color =
                v === "Completed"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800";
            return <span className={ `${base} ${color}` }> { v } </span>;
        },
    }),
];
