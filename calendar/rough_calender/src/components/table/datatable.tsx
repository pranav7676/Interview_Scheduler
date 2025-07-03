import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./Table";
import { cn } from "../../lib/utils";
import Pagination from "./Pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterKey?: keyof TData;
    nextFunction: () => Promise<void>;
    previousFunction: () => Promise<void>;
    getCanPreviousPage: boolean;
    getCanNextPage: boolean;
    onRowClick?: (index: number) => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterKey,
    onRowClick
}: DataTableProps<TData, TValue>) {
    const [selectedFilter, setSelectedFilter] = useState<string>("");

    const filterOptions = useMemo(() => {
        if (!filterKey) return [];
        const unique = new Set<string>();
        data.forEach((item) => {
            const value = item[filterKey];
            if (value && typeof value === "string") unique.add(value);
        });
        return Array.from(unique);
    }, [data, filterKey]);

    const filteredData = useMemo(() => {
        if (!selectedFilter || !filterKey) return data;
        return data.filter((item) => item[filterKey] === selectedFilter);
    }, [data, selectedFilter, filterKey]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="space-y-4">
            {/* Filter Dropdown */}
            {filterOptions.length > 0 && (
                <div className="flex items-center gap-2">
                    <label htmlFor="filter" className="text-sm font-medium">
                        Filter:
                    </label>
                    <select
                        id="filter"
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        {filterOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Table */}
            <div className="bg-blue-50 rounded-lg border border-gray-200 w-full max-w-5xl mx-auto overflow-x-auto">
                <Table>
                    <TableHeader>
                          {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        onClick={
                                            header.column.getCanSort()
                                                ? header.column.getToggleSortingHandler()
                                                : undefined
                                        }
                                        className={cn(
                                            "px-4 py-2 text-left",
                                            header.column.getCanSort() && "cursor-pointer hover:underline"
                                        )}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
  key={row.id}
  onClick={() => onRowClick?.(i)}
  className={
    onRowClick
      ? "cursor-pointer hover:bg-white-500 transition-colors duration-20 hover:scale-[1.01]"
      : ""
  }
>
  {row.getVisibleCells().map((cell) => (
    <TableCell key={cell.id} className="py-2 px-4">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  ))}
</TableRow>

                            ))
                        ) : (
                            <TableRow><TableCell colSpan={columns.length} className="text-center">No results.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end gap-4">
                <Pagination table={table} />
            </div>
        </div>
    );
}
  