import { EntryResult, FHIRErrorResponse } from "@shared/models/result";
import {
  SortingState,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  FilterFn,
  getFilteredRowModel,
} from "@tanstack/react-table";
import React, { useRef, useState, useMemo } from "react";
import { useVirtual } from "react-virtual";
import { rankItem } from "@tanstack/match-sorter-utils";
import { useTranslation } from "react-i18next";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};


export const ErrorTable = ({
  groupedByStatus,
}: {
  groupedByStatus: {
    key: string;
    value: EntryResult[];
  };
}) => {
  const { t } = useTranslation("jobspage", { keyPrefix: "jobViewer" });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [globalFilter, setGlobalFilter] = useState<string>("");

  const columns = useMemo<ColumnDef<EntryResult>[]>(
    () => [
      {
        header: "Index",
        cell: (cellInfo) => cellInfo.row.index+1,
        size: 2,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 60,
      },
      {
        accessorKey: "fhirErrorResponse",
        header: "Error",
        cell: (cellInfo) => {
          let value = cellInfo.getValue<FHIRErrorResponse>();
          if (value != null) {
            return value.outcome?.issue?.map((issue, i) => (
              <div key={i}>
                <b className="mr-1">
                  {issue.severity} - {issue.code}
                </b>
                {issue.diagnostics}
              </div>
            ));
          } else {
            return "";
          }
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: groupedByStatus.value,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <React.Fragment>
      <div className="font-bold text-red-400">
        {groupedByStatus.key} ({table.getRowModel().rows.length})
      </div>
      <input
        placeholder={t("filter")}
        type="text"
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(value.currentTarget.value)}
      />
      <div ref={tableContainerRef} className="max-h-[400px] overflow-y-auto">
        <table className="table-style-1">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
