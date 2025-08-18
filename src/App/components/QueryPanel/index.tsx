import { Suspense, lazy } from "react";

import { MdError } from "react-icons/md";
import Container from "../../../components/Container";
import QueryExecutionStatus from "../QueryExecutionStatus";
import { useQueryPanel } from "./hooks";

const QueryEditor = lazy(
  () =>
    import(
      /* webpackChunkName: 'QueryEditor' */ "../../../components/QueryEditor"
    )
);

function QueryPanel() {
  const {
    query,
    queryError,
    isTableDataLoaded,
    isTableDataLoading,
    handleQueryChange,
    handleOnQueryRun,
    handleMagicClick,
    handleFormatClick,
  } = useQueryPanel();

  return (
    <div className="py-4">
      <Container className="flex flex-col gap-4">
        <div
          className={`transition-all duration-200 ${
            isTableDataLoaded ? "h-0" : "h-[150px]"
          }`}
        />
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <QueryEditor
            value={query}
            isRunning={isTableDataLoading}
            onValueChange={handleQueryChange}
            onRunClick={handleOnQueryRun}
            onMagicClick={handleMagicClick}
            onFormatClick={handleFormatClick}
          />
        </Suspense>
        {queryError ? (
          <div className="bg-red-100 text-red-900 px-4 py-3 rounded-lg flex gap-2 items-center border border-red-200">
            <MdError /> {queryError}
          </div>
        ) : null}

        <QueryExecutionStatus />
      </Container>
    </div>
  );
}

export default QueryPanel;
