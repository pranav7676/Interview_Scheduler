// import React from "react";
// import {
//   ChevronsLeft,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsRight,
// } from "lucide-react";
// import type { Table } from "@tanstack/react-table";

// interface PaginationProps {
//   table: Table<any>;
// }

// export default function Pagination({ table }: PaginationProps) {
//   return (
//     <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
//       <div className="flex items-center">
//         <span className="mr-2">Items per page</span>
//         <select
//           className="border rounded-md p-1"
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => table.setPageSize(Number(e.target.value))}
//         >
//           {[5, 10, 20, 30].map((sz) => (
//             <option key={sz} value={sz}>
//               {sz}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => table.setPageIndex(0)}
//           disabled={!table.getCanPreviousPage()}
//         >
//           <ChevronsLeft size={20} />
//         </button>
//         <button
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           <ChevronLeft size={20} />
//         </button>
//         <span>
//           Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
//           {table.getPageCount()}
//         </span>
//         <button
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           <ChevronRight size={20} />
//         </button>
//         <button
//           onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//           disabled={!table.getCanNextPage()}
//         >
//           <ChevronsRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }






// import React from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   ChevronsLeft,
//   ChevronsRight,
// } from "lucide-react";

// export default function Pagination({ table }) {
//   return (
//     <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
//       <div className="flex items-center">
//         <span className="mr-2">Items per page</span>
//         <select
//           className="border border-gray-300 rounded-md shadow-sm p-2"
//           value={table.getState().pagination.pageSize}
//           onChange={(e) => table.setPageSize(Number(e.target.value))}
//         >
//           {[5, 10, 20, 30].map((size) => (
//             <option key={size} value={size}>{size}</option>
//           ))}
//         </select>
//       </div>

//       <div className="flex items-center space-x-2">
//         <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
//           <ChevronsLeft size={20} />
//         </button>
//         <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
//           <ChevronLeft size={20} />
//         </button>
//         <span>
//           Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of {table.getPageCount()}
//         </span>
//         <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//           <ChevronRight size={20} />
//         </button>
//         <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
//           <ChevronsRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }




// import React from "react";
// import {
//   ChevronsLeft,
//   ChevronLeft,
//   ChevronRight,
//   ChevronsRight,
// } from "lucide-react";

// export default function Pagination() {
//   // This will only show layout structure, logic must be connected via props or context
//   return (
//     <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
//       <div className="flex items-center">
//         <span className="mr-2">Items per page</span>
//         <select className="border rounded-md p-2">
//           {[5, 10, 20].map((n) => (
//             <option key={n}>{n}</option>
//           ))}
//         </select>
//       </div>
//       <div className="flex items-center gap-2">
//         <button><ChevronsLeft size={20} /></button>
//         <button><ChevronLeft size={20} /></button>
//         <span>Page 1 of 3</span>
//         <button><ChevronRight size={20} /></button>
//         <button><ChevronsRight size={20} /></button>
//       </div>
//     </div>
//   );
// }
