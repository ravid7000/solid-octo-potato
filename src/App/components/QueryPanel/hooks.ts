import { useEffect, useState } from "react";
import { Parser } from "node-sql-parser";
import { format as sqlFormat } from "sql-formatter";
import { useCurrentTable, useSchema } from "../../states/states";
import type { Tables } from "../../states/types";
import { QUERY_EXAMPLES } from "./constants";

export function useQueryPanel() {
  const [query, setQuery] = useState("SELECT * from order_details;");
  const [queryError, setQueryError] = useState("");

  const setCurrentTable = useCurrentTable((state) => state.setTable);
  const isTableDataLoading = useCurrentTable((state) => state.isLoading);
  const isTableDataLoaded = useCurrentTable((state) => state.isDataLoaded);
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

        const { schema } = useSchema.getState();

        if (from && "table" in from && schema?.tables) {
          let table = from.table as Tables;
          let tableLocation = schema.tables[table];

          if (!tableLocation) {
            // default table
            table = "categories";
            tableLocation = schema.tables.categories;
          }

          setCurrentTable(table, tableLocation);
        }
      }
    } catch (err) {
      setQueryError(
        `Invalid query. Validation Error: ${(err as Error).message}`
      );
    }
  }

  function handleQueryChange(inputValue: string | undefined) {
    if (typeof inputValue === "string") {
      setQuery(inputValue);
    }
  }

  function handleMagicClick() {
    const randomQuery =
      QUERY_EXAMPLES[Math.floor(Math.random() * QUERY_EXAMPLES.length)];

    setQuery(randomQuery);
  }

  function handleFormatClick() {
    if (!query.length) {
      return;
    }

    setQuery(sqlFormat(query));
  }

  useEffect(() => {
    getSchema();
  }, [getSchema]);

  return {
    query,
    queryError,
    isTableDataLoaded,
    isTableDataLoading,
    handleOnQueryRun,
    handleMagicClick,
    handleQueryChange,
    handleFormatClick,
  };
}
