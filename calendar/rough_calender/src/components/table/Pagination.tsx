import {
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";

interface PaginationProps<TData> {
    table: Table<TData>;
}

export default function Pagination<TData>({ table }: PaginationProps<TData>) {
    const {
        pagination: { pageIndex, pageSize },
    } = table.getState();

    const pageCount = table.getPageCount();
    const canPrevious = table.getCanPreviousPage();
    const canNext = table.getCanNextPage();

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-sm text-gray-700">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
                <label htmlFor="page-size">Items per page</label>
                <select
                    id="page-size"
                    className="border border-gray-300 rounded-md p-1"
                    value={pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                >
                    {[5, 10, 20, 30].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
                <button
                    className="disabled:opacity-40"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!canPrevious}
                    aria-label="First Page"
                >
                    <ChevronsLeft size={20} />
                </button>

                <button
                    className="disabled:opacity-40"
                    onClick={() => table.previousPage()}
                    disabled={!canPrevious}
                    aria-label="Previous Page"
                >
                    <ChevronLeft size={20} />
                </button>

                <span>
                    Page <strong>{pageIndex + 1}</strong> of <strong>{pageCount}</strong>
                </span>

                <button
                    className="disabled:opacity-40"
                    onClick={() => table.nextPage()}
                    disabled={!canNext}
                    aria-label="Next Page"
                >
                    <ChevronRight size={20} />
                </button>

                <button
                    className="disabled:opacity-40"
                    onClick={() => table.setPageIndex(pageCount - 1)}
                    disabled={!canNext}
                    aria-label="Last Page"
                >
                    <ChevronsRight size={20} />
                </button>
            </div>
        </div>
    );
}
