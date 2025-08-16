import { useEffect, useState } from "react";
import { Parser } from "node-sql-parser";
import { useCurrentTable, useSchema } from "../../states/states";
import type { Tables } from "../../states/types";

export function useQueryPanel() {
  const [query, setQuery] = useState("SELECT * from categories;");
  const [queryError, setQueryError] = useState("");

  const setCurrentTable = useCurrentTable((state) => state.setTable);
  const schema = useSchema((state) => state.schema);
  const getSchema = useSchema((state) => state.getSchema);

  function handleOnQueryRun() {
    if (!query) {
      return;
    }

    setQueryError("");

    try {
      const parser = new Parser();

      let ast = parser.astify(query);

      ast = Array.isArray(ast) ? ast[0] : ast;

      if (ast.type === "select") {
        const from = Array.isArray(ast.from) ? ast.from[0] : ast.from;

        if (from && "table" in from && schema?.tables) {
          const table = (from.table as Tables) ?? "categories";

          const tableLocation = schema.tables[table];

          setCurrentTable(table, tableLocation);
        }
      }
    } catch (err) {
      setQueryError((err as Error).message);
    }
  }

  function handleQueryChange(inputValue: string | undefined) {
    if (typeof inputValue === "string") {
      setQuery(inputValue);
    }
  }

  useEffect(() => {
    getSchema();
  }, [getSchema]);

  return {
    query,
    queryError,
    handleQueryChange,
    handleOnQueryRun,
  };
}
