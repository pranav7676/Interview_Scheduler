// import React, { useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   flexRender,
//   createColumnHelper,
//   type ColumnDef,
// } from "@tanstack/react-table";
// import type { SortingState } from "@tanstack/react-table";
// import { ArrowUpDown } from "lucide-react";
// import Pagination from "./Pagination";
// import CandidateDetailsModal from "./CandidateDetailsModal";
// import type { CandidateData } from "../types/CandidateData";

// const columnHelper = createColumnHelper<CandidateData>();

// interface TableProps {
//   data: CandidateData[];
// }

// export default function Table({ data }: TableProps) {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

//   const columns: ColumnDef<CandidateData, any>[] = [
//     columnHelper.accessor("id", {
//       header: "ID",
//     }),
//     columnHelper.accessor((row) => row.candidate, {
//       id: "candidate",
//       header: () => (
//         <div className="flex items-center">
//           Candidate <ArrowUpDown className="ml-1 w-3 h-3" />
//         </div>
//       ),
//       cell: ({ getValue }) => {
//         const c = getValue();
//         return (
//           <div className="flex items-center space-x-3">
//             <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full" />
//             <div>
//               <div className="font-medium">{c.name}</div>
//               <div className="text-sm text-gray-500">{c.email}</div>
//             </div>
//           </div>
//         );
//       },
//       sortingFn: (a, b) =>
//         a.original.candidate.name.localeCompare(b.original.candidate.name),
//     }),
//     columnHelper.accessor("jobId", {
//       header: "Job ID",
//     }),
//     columnHelper.accessor("interviewer", {
//       header: "Interviewer",
//     }),
//     columnHelper.accessor("datetime", {
//       header: () => (
//         <div className="flex items-center">
//           Date & Time <ArrowUpDown className="ml-1 w-3 h-3 inline" />
//         </div>
//       ),
//       cell: (info) => {
//         const dt = new Date(info.getValue());
//         return dt.toLocaleString("en-GB", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });
//       },
//       sortingFn: (a, b) => {
//         const aTime = new Date(a.original.datetime).getTime();
//         const bTime = new Date(b.original.datetime).getTime();
//         return aTime - bTime;
//       },
//     }),
//     columnHelper.accessor("round", {
//       header: "Round",
//     }),
//     columnHelper.accessor("mode", {
//       header: "Mode",
//     }),
//     columnHelper.accessor("status", {
//       header: "Status",
//       cell: ({ getValue }) => {
//         const v = getValue();
//         const base = "inline-block px-2 py-1 text-xs font-semibold rounded-full";
//         const color =
//           v === "Completed"
//             ? "bg-green-100 text-green-800"
//             : "bg-red-100 text-red-800";
//         return <span className={`${base} ${color}`}>{v}</span>;
//       },
//     }),
//   ];
//     const table = useReactTable({
//     data,
//     columns,
//     state: { sorting },
//     onSortingChange: setSorting,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: { pagination: { pageSize: 5 } },
//   });

//   const rows = table.getRowModel().rows;

//   const openModal = (index: number) => setSelectedIndex(index);
//   const closeModal = () => setSelectedIndex(null);

//   const prev = () => {
//     if (selectedIndex !== null && selectedIndex > 0) {
//       setSelectedIndex(selectedIndex - 1);
//     }
//   };

//   const next = () => {
//     if (selectedIndex !== null && selectedIndex < rows.length - 1) {
//       setSelectedIndex(selectedIndex + 1);
//     }
//   };

//   return (
//     <div>
//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-blue-500 text-white">
//             {table.getHeaderGroups().map((hg) => (
//               <tr key={hg.id}>
//                 {hg.headers.map((h) => (
//                   <th
//                     key={h.id}
//                     className="px-6 py-3 text-left text-xs uppercase tracking-wider"
//                   >
//                     <div
//                       className={
//                         h.column.getCanSort() ? "cursor-pointer flex items-center" : ""
//                       }
//                       onClick={h.column.getToggleSortingHandler()}
//                     >
//                       {flexRender(h.column.columnDef.header, h.getContext())}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {rows.map((row, i) => (
//               <tr
//                 key={row.id}
//                 className="hover:bg-gray-50 cursor-pointer"
//                 onClick={() => openModal(i)}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Pagination table={table} />

//       {selectedIndex !== null && (
//         <CandidateDetailsModal
//           data={rows[selectedIndex].original}
//           onClose={closeModal}
//           onNext={next}
//           onPrev={prev}
//           disableNext={selectedIndex >= rows.length - 1}
//           disablePrev={selectedIndex <= 0}
//         />
//       )}
//     </div>
//   );
// }







// import React, { useState } from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable
// } from "@tanstack/react-table";
// import CandidateDetailsModal from "./CandidateDetailsModal";
// import Pagination from "./Pagination";

// export default function Table({ columns, data }) {
//   const [sorting, setSorting] = useState([]);
//   const [filtering, setFiltering] = useState("");
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//       globalFilter: filtering
//     },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setFiltering,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel()
//   });

//   const allRows = table.getSortedRowModel().rows;
//   const visibleRows = table.getRowModel().rows;
//   const pageSize = table.getState().pagination.pageSize;

//   const handleNext = () => {
//     if (selectedIndex < allRows.length - 1) {
//       const nextIndex = selectedIndex + 1;
//       const newPage = Math.floor(nextIndex / pageSize);
//       table.setPageIndex(newPage);
//       setSelectedIndex(nextIndex);
//     }
//   };

//   const handlePrev = () => {
//     if (selectedIndex > 0) {
//       const prevIndex = selectedIndex - 1;
//       const newPage = Math.floor(prevIndex / pageSize);
//       table.setPageIndex(newPage);
//       setSelectedIndex(prevIndex);
//     }
//   };

//   return (
//     <>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="border p-2 rounded w-full"
//           value={filtering}
//           onChange={(e) => setFiltering(e.target.value)}
//         />
//       </div>

//       <div className="overflow-x-auto rounded-lg shadow border">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={header.column.getToggleSortingHandler()}
//                   >
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                     {{ asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted()] ?? null}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {visibleRows.map((row) => {
//               const globalIndex = allRows.findIndex((r) => r.id === row.id);
//               return (
//                 <tr
//                   key={row.id}
//                   className="hover:bg-gray-50 cursor-pointer"
//                   onClick={() => setSelectedIndex(globalIndex)}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td
//                       key={cell.id}
//                       className="px-6 py-4 text-sm text-gray-700"
//                     >
//                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <Pagination table={table} />

//       {selectedIndex !== null && (
//         <CandidateDetailsModal
//           data={allRows[selectedIndex].original}
//           onClose={() => setSelectedIndex(null)}
//           onNext={handleNext}
//           onPrev={handlePrev}
//           disableNext={selectedIndex >= allRows.length - 1}
//           disablePrev={selectedIndex <= 0}
//         />
//       )}
//     </>
//   );
// }






// import React from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   flexRender,
//   createColumnHelper,
// } from "@tanstack/react-table";
// import Pagination from "./Pagination";
// import { ArrowUpDown } from "lucide-react";

// const columnHelper = createColumnHelper();

// export default function Table({ data }) {
//   const columns = [
//     columnHelper.accessor("id", {
//       header: "ID",
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor((row) => row.candidate, {
//       id: "candidate",
//       header: () => (
//         <div className="flex items-center">
//           Candidate <ArrowUpDown className="ml-1 w-3 h-3 inline" />
//         </div>
//       ),
//       cell: ({ getValue }) => {
//         const c = getValue();
//         return (
//           <div className="flex items-center space-x-3">
//             <span className="w-6 h-6 rounded-full bg-gray-300 inline-flex justify-center items-center">
//               👤
//             </span>
//             <div>
//               <div className="font-medium text-gray-900">{c.name}</div>
//               <div className="text-sm text-gray-500">{c.email}</div>
//             </div>
//           </div>
//         );
//       },
//       sortingFn: (a, b) =>
//         a.original.candidate.name.localeCompare(b.original.candidate.name),
//     }),
//     columnHelper.accessor("jobId", { header: "Job ID" }),
//     columnHelper.accessor("interviewer", { header: "Interviewer" }),
//     columnHelper.accessor("datetime", {
//       header: () => (
//         <div className="flex items-center">
//           Date & Time <ArrowUpDown className="ml-1 w-3 h-3 inline" />
//         </div>
//       ),
//       cell: (info) => {
//         const dt = new Date(info.getValue());
//         return dt.toLocaleString("en-GB", {
//           day: "2-digit", month: "2-digit", year: "numeric",
//           hour: "2-digit", minute: "2-digit", hour12: true,
//         });
//       },
//       sortingFn: (a, b) => new Date(a.getValue()) - new Date(b.getValue()),
//     }),
//     columnHelper.accessor("round", { header: "Round" }),
//     columnHelper.accessor("mode", { header: "Mode" }),
//     columnHelper.accessor("status", {
//       header: "Status",
//       cell: ({ getValue }) => {
//         const v = getValue();
//         const base = "inline-block px-2 py-1 text-xs font-semibold rounded-full";
//         const color = v === "Completed" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
//         return <span className={`${base} ${color}`}>{v}</span>;
//       },
//     }),
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     initialState: {
//       pagination: { pageSize: 5 },
//     },
//   });

//   return (
//     <>
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-blue-500 text-white">
//             {table.getHeaderGroups().map((group) => (
//               <tr key={group.id}>
//                 {group.headers.map((header) => (
//                   <th key={header.id} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
//                     <div
//                       className={header.column.getCanSort() ? "cursor-pointer flex items-center" : ""}
//                       onClick={header.column.getToggleSortingHandler()}
//                     >
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                     </div>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id} className="hover:bg-gray-50">
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Pagination table={table} />
//     </>
//   );
// }




// import React from "react";
// import {
//   createColumnHelper,
//   flexRender,
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
// } from "@tanstack/react-table";
// import CandidateCell from "./CandidateCell";
// import StatusCell from "./StatusCell";
// import { ArrowUpDown } from "lucide-react";

// const columnHelper = createColumnHelper();

// export default function Table({ data, search }) {
//   const columns = [
//     columnHelper.accessor("id", { header: "ID" }),
//     columnHelper.accessor("candidate", {
//       header: () => (
//         <div className="flex items-center">
//           Candidate <ArrowUpDown className="ml-1 w-3 h-3 inline" />
//         </div>
//       ),
//       cell: CandidateCell,
//       sortingFn: (a, b) =>
//         a.original.candidate.name.localeCompare(b.original.candidate.name),
//     }),
//     columnHelper.accessor("jobId", { header: "Job ID" }),
//     columnHelper.accessor("interviewer", { header: "Interviewer" }),
//     columnHelper.accessor("datetime", {
//       header: () => (
//         <div className="flex items-center">
//           Date & Time <ArrowUpDown className="ml-1 w-3 h-3 inline" />
//         </div>
//       ),
//       cell: (info) => {
//         const dt = new Date(info.getValue());
//         return dt.toLocaleString("en-GB", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });
//       },
//       sortingFn: (a, b) =>
//         new Date(a.getValue()).getTime() - new Date(b.getValue()).getTime(),
//     }),
//     columnHelper.accessor("round", { header: "Round" }),
//     columnHelper.accessor("mode", { header: "Mode" }),
//     columnHelper.accessor("status", {
//       header: "Status",
//       cell: StatusCell,
//     }),
//   ];

//   const table = useReactTable({
//     data,
//     columns,
//     state: { globalFilter: search },
//     globalFilterFn: (row, _, value) => {
//       const q = value.toLowerCase();
//       return (
//         row.original.id.toLowerCase().includes(q) ||
//         row.original.jobId.toLowerCase().includes(q) ||
//         row.original.candidate.name.toLowerCase().includes(q)
//       );
//     },
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//   });

//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-blue-500 text-white">
//           {table.getHeaderGroups().map((group) => (
//             <tr key={group.id}>
//               {group.headers.map((header) => (
//                 <th key={header.id} className="px-6 py-3 text-left">
//                   <div
//                     onClick={header.column.getToggleSortingHandler()}
//                     className={
//                       header.column.getCanSort()
//                         ? "cursor-pointer flex items-center"
//                         : ""
//                     }
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {table.getRowModel().rows.map((row) => (
//             <tr key={row.id} className="hover:bg-gray-50">
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
