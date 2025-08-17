import type { QueryExecutionState } from "./types";

/**
 * Temporary indicators used for show progress on the query execution
 * Trying to simulate query status behavior, ideally status should be fetched from backend.
 */
export const QUERY_EXECUTION_STATE_PROGRESS: Record<
  QueryExecutionState["status"],
  number
> = {
  idle: 0,
  sending: 10,
  executing: 40,
  completed: 100,
};
