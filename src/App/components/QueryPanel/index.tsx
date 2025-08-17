import { MdError } from "react-icons/md";
import Container from "../../../components/Container";
import QueryEditor from "../../../components/QueryEditor";
import QueryExecutionStatus from "../QueryExecutionStatus";
import { useQueryPanel } from "./hooks";

function QueryPanel() {
  const {
    query,
    queryError,
    handleQueryChange,
    handleOnQueryRun,
    handleMagicClick,
  } = useQueryPanel();

  return (
    <div className="py-4">
      <Container className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">SQL Runner</h1>
        <QueryEditor
          value={query}
          onValueChange={handleQueryChange}
          onRunClick={handleOnQueryRun}
          onMagicClick={handleMagicClick}
        />
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
