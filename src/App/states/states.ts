import { create } from "zustand";
import { fetchSchema, fetchTable } from "./apis";
import type {
  CreateSchemaAction,
  CreateSchemaState,
  CurrentTableAction,
  CurrentTableState,
  QueryExecutionAction,
  QueryExecutionState,
  Tables,
} from "./types";
import {
  delay,
  downloadDataAsCSV,
  downloadDataAsJSON,
  parseTableDataFromCSV,
} from "./helpers";
import { QUERY_EXECUTION_STATE_PROGRESS } from "./constants";

export const useQueryExecution = create<QueryExecutionState>(() => ({
  status: "idle" as QueryExecutionState["status"],
  progress: 0,
  startedAt: 0,
  completedAt: 0,
  hideProgress: true,
}));

const setQueryExecutionState: QueryExecutionAction["setState"] = (
  nextState
) => {
  useQueryExecution.setState((prevState) => ({
    status: nextState,
    progress: QUERY_EXECUTION_STATE_PROGRESS[nextState],
    startedAt: nextState === "sending" ? Date.now() : prevState.startedAt,
    completedAt: nextState === "completed" ? Date.now() : prevState.completedAt,
    hideProgress: false,
  }));

  if (nextState === "completed") {
    // simulation: reset status to idle after sometime
    setTimeout(() => {
      useQueryExecution.setState({
        hideProgress: true,
      });
    }, 100);
  }
};

export const useCurrentTable = create<CurrentTableState & CurrentTableAction>(
  (set, get) => ({
    table: "",
    isLoading: false,
    isDataLoaded: false,
    isDownloading: false,
    data: null,
    error: "",
    setTable: async (tableName: Tables, tableLocation: string) => {
      try {
        set({ isLoading: true, table: tableName, error: "" });

        // simulating query status api
        setQueryExecutionState("sending");
        await delay(300);

        // simulating query status api
        setQueryExecutionState("executing");
        const csv = await fetchTable(tableLocation);
        const result = parseTableDataFromCSV(csv);

        set({
          data: result,
          isDataLoaded: true, // first time table data loaded indicator
        });
      } catch (err) {
        set({
          error: `Something went wrong!. Try again after sometime. Error: ${
            (err as Error).message
          }`,
        });
      } finally {
        set({
          isLoading: false,
        });

        setQueryExecutionState("completed");
      }
    },

    download: async (type) => {
      const { table, data } = get();

      set({
        isDownloading: true,
      });

      switch (type) {
        case "csv": {
          await downloadDataAsCSV(data, `${table}.csv`);
          break;
        }
        case "json": {
          await downloadDataAsJSON(data, `${table}.json`);
          break;
        }
        default: {
          // add more download types
        }
      }

      set({
        isDownloading: false,
      });
    },
  })
);

export const useSchema = create<CreateSchemaState & CreateSchemaAction>(
  (set) => ({
    schema: {},
    isLoading: false,
    error: "",
    getSchema: async () => {
      try {
        set({ isLoading: true });
        const response = await fetchSchema();

        set({
          schema: response,
        });
      } catch (err) {
        // handle error
        set({
          error: `Something went wrong while fetching the DB Schema. Error: ${
            (err as Error).message
          }`,
        });
      } finally {
        set({
          isLoading: false,
        });
      }
    },
  })
);
