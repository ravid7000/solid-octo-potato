import React from "react";
import { Row } from "./Row";
import { Cell } from "./Cell";
import { VirtualTable } from "./VirtualTable";
import { useTableSort } from "./useTableSort";

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  grid: {
    headers: string[];
    body: string[][];
  };
  footer?: React.ReactNode;
};

const ROW_HEIGHT = 24;

function Table({ grid, footer }: TableProps) {
  const { sortedBody, toggleSort, getColumnDirection } = useTableSort(grid);

  if (!grid.headers.length || !grid.body.length) {
    return null;
  }

  const tableBodyHeight = sortedBody.length * ROW_HEIGHT;

  const listHeight = tableBodyHeight < 400 ? tableBodyHeight : 400;

  return (
    <div className="rounded-md overflow-hidden bg-white">
      <div className="flex flex-auto flex-col">
        <div className="overflow-x-auto pb-3">
          <VirtualTable
            height={listHeight}
            width="100%"
            itemCount={sortedBody.length}
            itemSize={ROW_HEIGHT}
            overscanCount={ROW_HEIGHT}
            header={
              <Row className="bg-slate-300">
                {grid.headers.map((header, index) => {
                  const dir = getColumnDirection(index);
                  return (
                    <Cell
                      as="th"
                      key={`${header}_${index}`}
                      onClick={() => toggleSort(index)}
                      className="cursor-pointer select-none"
                      title="Click to sort"
                    >
                      <span>{header}</span>
                      {dir && (
                        <span className="ml-1 text-slate-700">
                          {dir === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </Cell>
                  );
                })}
              </Row>
            }
            row={({ index }) => {
              const row = sortedBody[index];

              return (
                <Row
                  key={`row_${index}`}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  {row.map((cell, index) => (
                    <Cell key={`cell_${index}_${cell}`}>{cell}</Cell>
                  ))}
                </Row>
              );
            }}
          />
        </div>
      </div>
      {footer}
    </div>
  );
}

export default Table;
