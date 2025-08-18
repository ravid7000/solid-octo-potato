export type Tables =
  | "categories"
  | "categories"
  | "customers"
  | "employee_territories"
  | "employees"
  | "order_details"
  | "orders"
  | "products"
  | "suppliers";

type TableLocation<Table extends string> = `data/${Table}.csv`;

export type DBSchema = {
  tables: Record<Tables, TableLocation<Tables>>;
  columns: Record<Tables, string[]>;
};

export type CreateSchemaState = {
  schema: Partial<DBSchema>;
  isLoading: boolean;
  error: string;
};

export type CreateSchemaAction = {
  getSchema: () => Promise<void>;
};

export type CurrentTableState = {
  table: string;
  data: {
    headers: string[];
    body: string[][];
  } | null;
  isLoading: boolean;
  isDataLoaded: boolean;
  isDownloading: boolean;
  error: string;
};

export type CurrentTableAction = {
  setTable: (nextValue: Tables, tableLocation: string) => Promise<void>;
  download: (type: "json" | "csv") => Promise<void>;
};

export type QueryExecutionState = {
  status: "idle" | "sending" | "executing" | "completed";
  startedAt: number;
  completedAt: number;
  progress: number;
  hideProgress: boolean;
};

export type QueryExecutionAction = {
  setState: (nextValue: QueryExecutionState["status"]) => void;
};
