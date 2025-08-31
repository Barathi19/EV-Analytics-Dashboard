"use client";
import { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";

export interface Column<T> {
  key: keyof T;
  label: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  title?: string;
}

export default function Table<T extends Record<keyof T, T[keyof T]>>({
  data,
  columns,
  title = "Data Table",
}: TableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // --- Filtering ---
  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = String(a[sortKey] ?? "").toLowerCase();
      const bVal = String(b[sortKey] ?? "").toLowerCase();
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortOrder]);

  const totalPages = Math.ceil(sorted.length / rowsPerPage);
  const paged = sorted.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handleSort = (key: keyof T) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, page + 1);

    if (page === 1) end = Math.min(totalPages, 3);
    if (page === totalPages) start = Math.max(1, totalPages - 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="mt-10 bg-white border rounded-lg border-gray-100">
      {/* Section Heading */}
      <h2 className="text-xl font-semibold text-gray-800 p-3">{title}</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 ml-3 w-full md:w-1/3 border border-gray-300 p-2 rounded shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow border border-gray-200 max-h-[500px]">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 font-semibold cursor-pointer select-none text-left"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}{" "}
                  {sortKey === col.key && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length > 0 ? (
              paged.map((row, idx) => (
                <tr
                  key={idx}
                  className="border-t hover:bg-blue-50 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3">
                      {String(row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FiSearch className="text-gray-400" /> No results found
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination + Rows per page */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-3 px-4 pb-4">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            className="border rounded-md px-2 py-1 text-sm"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 25, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 rounded bg-gray-100 cursor-pointer hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </button>

          {getPageNumbers().map((num) => (
            <button
              key={num}
              className={`px-3 py-1 cursor-pointer rounded ${
                num === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </button>
          ))}

          <button
            className="px-3 py-1 cursor-pointer rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </button>
        </div>

        {/* Page info */}
        <p className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </p>
      </div>
    </div>
  );
}
