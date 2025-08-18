import { useMemo, useState } from "react";
import { defaultCompare } from "./helpers";

type SortDirection = "asc" | "desc" | null;

type SortState = {
  columnIndex: number | null;
  direction: SortDirection;
};

type GridData = {
  headers: string[];
  body: string[][];
};

export function useTableSort(data: GridData) {
  const [sort, setSort] = useState<SortState>({ columnIndex: null, direction: null });

  function toggleSort(columnIndex: number) {
    setSort((prev) => {
      if (prev.columnIndex !== columnIndex) {
        return { columnIndex, direction: "asc" };
      }

      if (prev.direction === "asc") {
        return { columnIndex, direction: "desc" };
      }

      if (prev.direction === "desc") {
        return { columnIndex: null, direction: null };
      }

      return { columnIndex, direction: "asc" };
    });
  }

  const sortedBody = useMemo(() => {
    const { body } = data;
    if (!sort.direction || sort.columnIndex == null) return body;

    const columnIndex = sort.columnIndex;
    const compareFn = defaultCompare;

    // Stable sort: decorate with original index
    const decorated = body.map((row, index) => ({ row, index }));
    decorated.sort((left, right) => {
      const a = left.row[columnIndex] ?? "";
      const b = right.row[columnIndex] ?? "";
      const result = compareFn(a, b);
      if (result !== 0) return sort.direction === "asc" ? result : -result;
      return left.index - right.index;
    });
    return decorated.map((d) => d.row);
  }, [data, sort]);

  function getColumnDirection(columnIndex: number): SortDirection {
    return sort.columnIndex === columnIndex ? sort.direction : null
  }

  return {
    sortedBody,
    sort,
    setSort,
    toggleSort,
    getColumnDirection,
  } as const;
}


