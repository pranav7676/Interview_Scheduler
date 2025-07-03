// import React, { useState } from "react";
// import { Search, Filter, X, MoreVertical } from "lucide-react";
// import mockData from "../constants/data.json";

// interface TopbarProps {
//   filters: Record<string, string>;
//   applyFilter: (key: string, value: string) => void;
//   removeFilter: (key: string) => void;
//   globalFilter: string;
//   onSearch: (value: string) => void;
// }

// const OPTIONS = {
//   interviewer: [...new Set(mockData.map((d: any) => d.interviewer))],
//   round: [...new Set(mockData.map((d: any) => d.round))],
//   mode: [...new Set(mockData.map((d: any) => d.mode))],
//   status: [...new Set(mockData.map((d: any) => d.status))],
// };

// export default function Topbar({
//   filters,
//   applyFilter,
//   removeFilter,
//   globalFilter,
//   onSearch,
// }: TopbarProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [submenuKey, setSubmenuKey] = useState<string | null>(null);
//   const [moreOpen, setMoreOpen] = useState(false);

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//     setSubmenuKey(null);
//   };

//   const toggleMore = () => {
//     setMoreOpen((prev) => !prev);
//   };

//   const clickOption = (key: string) => {
//     if (submenuKey === key) setSubmenuKey(null);
//     else setSubmenuKey(key);
//   };

//   return (
//     <>
//       <div className="flex justify-end items-center gap-3 mb-4 relative">
//         {/* Search Input */}
//         <div className="relative w-72">
//           <input
//             value={globalFilter}
//             onChange={(e) => onSearch(e.target.value)}
//             placeholder="Search by ID, Job ID, Candidate..."
//             className="w-full pl-10 pr-3 py-2 border rounded-md"
//           />
//           <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//         </div>

//         {/* Filter and More Buttons */}
//         <div className="relative flex items-center gap-2">
//           <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100">
//             <Filter size={20} />
//           </button>
//           <div className="relative">
//             <button onClick={toggleMore} className="p-2 rounded-md hover:bg-gray-100">
//               <MoreVertical size={20} />
//             </button>
//             {moreOpen && (
//               <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-20 min-w-[120px]">
//                 <button
//                   className="block w-full text-left px-4 py-2 hover:bg-blue-100"
//                   onClick={() => {
//                     setMoreOpen(false);
//                     alert("Export triggered");
//                   }}
//                 >
//                   Export
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Filter Dropdown with Submenus */}
//           {menuOpen && (
//             <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow-md z-20 min-w-[140px]">
//               {Object.keys(OPTIONS).map((key) => (
//                 <div key={key} className="relative group">
//                   <button
//                     onClick={() => clickOption(key)}
//                     className="w-full px-4 py-2 text-left hover:bg-blue-100"
//                   >
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </button>

//                   {submenuKey === key && (
//                     <div className="absolute left-full top-0 bg-white border rounded shadow-md z-30">
//                       {(OPTIONS as any)[key].map((val: string) => (
//                         <button
//                           key={val}
//                           onClick={() => {
//                             applyFilter(key, val);
//                             setMenuOpen(false);
//                             setSubmenuKey(null);
//                           }}
//                           className="block w-full px-4 py-2 text-left hover:bg-blue-100"
//                         >
//                           {val}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Active Filter Tags */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {Object.entries(filters).map(([k, v]) => (
//           <span
//             key={k}
//             className="bg-blue-100 px-3 py-1 rounded-full flex items-center text-sm"
//           >
//             {k.charAt(0).toUpperCase() + k.slice(1)}: {v}
//             <button onClick={() => removeFilter(k)} className="ml-2">
//               <X size={14} />
//             </button>
//           </span>
//         ))}
//       </div>
//     </>
//   );
// }





// import React, { useState } from "react";
// import { Search, Filter, X, MoreVertical } from "lucide-react";
// import mockData from "../constants/data.json";

// const OPTIONS = {
//   interviewer: [...new Set(mockData.map((d) => d.interviewer))],
//   round: [...new Set(mockData.map((d) => d.round))],
//   mode: [...new Set(mockData.map((d) => d.mode))],
//   status: [...new Set(mockData.map((d) => d.status))],
// };

// export default function Topbar({
//   filters,
//   applyFilter,
//   removeFilter,
//   globalFilter,
//   onSearch,
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [submenuKey, setSubmenuKey] = useState(null);

//   const toggleMenu = () => {
//     setMenuOpen((o) => !o);
//     setSubmenuKey(null);
//   };

//   const clickOption = (key) => {
//     if (submenuKey === key) setSubmenuKey(null);
//     else setSubmenuKey(key);
//   };

//   return (
//     <>
//       <div className="flex justify-end items-center gap-3 mb-4 relative">
//         {/* Search Box */}
//         <div className="relative w-72">
//           <input
//             value={globalFilter}
//             onChange={(e) => onSearch(e.target.value)}
//             placeholder="Search by ID, Job ID, Candidate..."
//             className="w-full pl-10 pr-3 py-2 border rounded-md"
//           />
//           <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//         </div>

//         {/* Filter + More Buttons */}
//         <div className="relative flex items-center gap-2">
//           {/* Filter Icon */}
//           <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100">
//             <Filter size={20} />
//           </button>

//           {/* More Icon */}
//           <button className="p-2 rounded-md hover:bg-gray-100">
//             <MoreVertical size={20} />
//           </button>

//           {/* Filter Dropdown */}
//           {menuOpen && (
//             <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow-md z-20 min-w-[140px]">
//               {Object.keys(OPTIONS).map((key) => (
//                 <div key={key} className="relative group">
//                   <button
//                     onClick={() => clickOption(key)}
//                     className="w-full px-4 py-2 text-left hover:bg-blue-100"
//                   >
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </button>

//                   {submenuKey === key && (
//                     <div className="absolute left-full top-0 bg-white border rounded shadow-md z-30">
//                       {OPTIONS[key].map((val) => (
//                         <button
//                           key={val}
//                           onClick={() => {
//                             applyFilter(key, val);
//                             setMenuOpen(false);
//                             setSubmenuKey(null);
//                           }}
//                           className="block w-full px-4 py-2 text-left hover:bg-blue-100"
//                         >
//                           {val}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Active Filter Tags */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {Object.entries(filters).map(([k, v]) => (
//           <span
//             key={k}
//             className="bg-blue-100 px-3 py-1 rounded-full flex items-center text-sm"
//           >
//             {k.charAt(0).toUpperCase() + k.slice(1)}: {v}
//             <button onClick={() => removeFilter(k)} className="ml-2">
//               <X size={14} />
//             </button>
//           </span>
//         ))}
//       </div>
//     </>
//   );
// }





// import React, { useState } from "react";
// import { Search, Filter, X, MoreVertical } from "lucide-react";

// import mockData from "../constants/data.json";

// const OPTIONS = {
//   interviewer: [...new Set(mockData.map((d) => d.interviewer))],
//   round: [...new Set(mockData.map((d) => d.round))],
//   mode: [...new Set(mockData.map((d) => d.mode))],
//   status: [...new Set(mockData.map((d) => d.status))],
// };

// export default function Topbar({
//   filters,
//   applyFilter,
//   removeFilter,
//   globalFilter,
//   onSearch,
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [submenuKey, setSubmenuKey] = useState(null);

//   const toggleMenu = () => {
//     setMenuOpen((o) => !o);
//     setSubmenuKey(null);
//   };

//   const clickOption = (key) => {
//     if (submenuKey === key) setSubmenuKey(null);
//     else setSubmenuKey(key);
//   };

//   return (
//     <>
//       <div className="flex justify-end items-center gap-3 mb-4 relative">
//         <div className="relative w-72">
//           <input
//             value={globalFilter}
//             onChange={(e) => onSearch(e.target.value)}
//             placeholder="Search by ID, Job ID, Candidate..."
//             className="w-full pl-10 pr-3 py-2 border rounded-md"
//           />
//           <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//         </div>

//         <div className="relative">
//           <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100">
//             <Filter size={20} />
//           </button>

//           {menuOpen && (
//             <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-20 min-w-[140px]">
//               {Object.keys(OPTIONS).map((key) => (
//                 <div key={key}>
//                   <button
//                     onClick={() => clickOption(key)}
//                     className="w-full px-4 py-2 text-left hover:bg-blue-100"
//                   >
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </button>

//                   {submenuKey === key && (
//                     <div className="bg-white border-l border-t border-b rounded-r shadow-md">
//                       {OPTIONS[key].map((val) => (
//                         <button
//                           key={val}
//                           onClick={() => {
//                             applyFilter(key, val);
//                             setMenuOpen(false);
//                             setSubmenuKey(null);
//                           }}
//                           className="block w-full px-4 py-2 text-left hover:bg-blue-100"
//                         >
//                           {val}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Active Filters Tags */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {Object.entries(filters).map(([k, v]) => (
//           <span
//             key={k}
//             className="bg-gray-200 px-3 py-1 rounded-full flex items-center text-sm"
//           >
//             {k.charAt(0).toUpperCase() + k.slice(1)}: {v}
//             <button onClick={() => removeFilter(k)} className="ml-2">
//               <X size={14} />
//             </button>
//           </span>
//         ))}
//       </div>
//     </>
//   );
// }




// import React, { useState } from "react";
// import { Search, Filter, MoreVertical, X } from "lucide-react";

// export default function Topbar({
//   globalFilter,
//   setGlobalFilter,
//   applyFilter,
//   filters,
//   removeFilter,
//   data,
// }) {
//   const [showMainMenu, setShowMainMenu] = useState(false);
//   const [submenu, setSubmenu] = useState(null);

//   const options = {
//     interviewer: [...new Set(data.map((d) => d.interviewer))],
//     round: [...new Set(data.map((d) => d.round))],
//     mode: [...new Set(data.map((d) => d.mode))],
//     status: [...new Set(data.map((d) => d.status))],
//   };

//   return (
//     <>
//       <div className="flex justify-end items-center gap-3 mb-4 relative">
//         <div className="relative w-72">
//           <input
//             value={globalFilter}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             placeholder="Search by ID, Job ID, Candidate..."
//             className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//         </div>

//         <div className="relative">
//           <Filter
//             className="text-gray-700 cursor-pointer"
//             onClick={() => {
//               setShowMainMenu(!showMainMenu);
//               setSubmenu(null);
//             }}
//           />
//           {showMainMenu && (
//             <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-30">
//               {Object.keys(options).map((key) => (
//                 <div
//                   key={key}
//                   className="hover:bg-blue-100 px-4 py-2 cursor-pointer"
//                   onMouseEnter={() => setSubmenu(key)}
//                 >
//                   {key.charAt(0).toUpperCase() + key.slice(1)}
//                 </div>
//               ))}
//             </div>
//           )}
//           {submenu && (
//             <div className="absolute right-40 top-0 mt-2 bg-white border rounded shadow-md z-40">
//               {options[submenu].map((val) => (
//                 <div
//                   key={val}
//                   onClick={() => {
//                     applyFilter(submenu, val);
//                     setShowMainMenu(false);
//                     setSubmenu(null);
//                   }}
//                   className="hover:bg-blue-100 px-4 py-2 cursor-pointer"
//                 >
//                   {val}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <MoreVertical className="text-gray-700" />
//       </div>

//       {/* Filter Tags */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         {Object.entries(filters).map(([key, value]) => (
//           <div
//             key={key}
//             className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
//           >
//             {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
//             <button onClick={() => removeFilter(key)}>
//               <X size={14} className="ml-2" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }



// import React, { useState } from "react";
// import { Search, Filter, MoreVertical } from "lucide-react";
// import mockData from "../constants/data.json";

// const filterOptions = {
//   interviewer: [...new Set(mockData.map((d) => d.interviewer))],
//   round: [...new Set(mockData.map((d) => d.round))],
//   mode: [...new Set(mockData.map((d) => d.mode))],
//   status: [...new Set(mockData.map((d) => d.status))],
// };

// export default function Topbar({ search, onSearchChange, onFilterApply }) {
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [submenu, setSubmenu] = useState(null);

//   return (
//     <div className="flex justify-end items-center gap-3 mb-4 relative">
//       <div className="relative w-72">
//         <input
//           value={search}
//           onChange={(e) => onSearchChange(e.target.value)}
//           placeholder="Search by ID, Job ID, Candidate..."
//           className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm"
//         />
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//       </div>

//       <div className="relative">
//         <Filter
//           className="text-gray-700 cursor-pointer"
//           onClick={() => {
//             setFilterOpen((prev) => !prev);
//             setSubmenu(null);
//           }}
//         />
//         {filterOpen && (
//           <div className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10">
//             {Object.keys(filterOptions).map((key) => (
//               <div
//                 key={key}
//                 onMouseEnter={() => setSubmenu(key)}
//                 onMouseLeave={() => setSubmenu(null)}
//                 className="relative group"
//               >
//                 <button className="w-full text-left px-4 py-2 hover:bg-blue-100">
//                   {key.charAt(0).toUpperCase() + key.slice(1)}
//                 </button>
//                 {submenu === key && (
//                   <div className="absolute left-full top-0 bg-white border rounded shadow-md z-20">
//                     {filterOptions[key].map((option) => (
//                       <button
//                         key={option}
//                         className="block px-4 py-2 w-full text-left hover:bg-blue-100"
//                         onClick={() => {
//                           onFilterApply(key, option);
//                           setFilterOpen(false);
//                           setSubmenu(null);
//                         }}
//                       >
//                         {option}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <MoreVertical className="text-gray-700" />
//     </div>
//   );
// }
