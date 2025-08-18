import { useCallback, useMemo, useState } from "react";

export type SortDirection = "asc" | "desc" | null;

export type SortState = {
  columnIndex: number | null;
  direction: SortDirection;
};

export type GridData = {
  headers: string[];
  body: string[][];
};

export type UseTableSortOptions = {
  initialSort?: SortState;
};

function defaultCompare(a: string, b: string): number {
  const aNum = Number(a);
  const bNum = Number(b);

  const aIsNum = Number.isFinite(aNum) && a.trim() !== "";
  const bIsNum = Number.isFinite(bNum) && b.trim() !== "";

  if (aIsNum && bIsNum) {
    return aNum - bNum;
  }

  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

export function useTableSort(data: GridData, options: UseTableSortOptions = {}) {
  const { initialSort } = options;

  const [sort, setSort] = useState<SortState>(
    initialSort ?? { columnIndex: null, direction: null }
  );

  const toggleSort = useCallback(
    (columnIndex: number) => {
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
    },
    []
  );

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

  const getColumnDirection = useCallback(
    (columnIndex: number): SortDirection =>
      sort.columnIndex === columnIndex ? sort.direction : null,
    [sort]
  );

  return {
    sortedBody,
    sort,
    setSort,
    toggleSort,
    getColumnDirection,
  } as const;
}


