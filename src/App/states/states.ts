import { create } from "zustand";
import { fetchSchema, fetchTable } from "./apis";
import type {
  CreateSchemaAction,
  CreateSchemaState,
  CurrentTableAction,
  CurrentTableState,
  Tables,
} from "./types";
import { parseTableDataFromCSV } from "./helpers";

export const useCurrentTable = create<CurrentTableState & CurrentTableAction>(
  (set) => ({
    table: "",
    isLoading: false,
    error: "",
    setTable: async (tableName: Tables, tableLocation: string) => {
      try {
        set({ isLoading: true, table: tableName, error: "" });
        const responseText = await fetchTable(tableLocation);
        parseTableDataFromCSV(responseText);
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
      }
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
