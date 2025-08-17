import Table from "../../components/Table";
import { useCurrentTable } from "../states/states";

function ResultPreviewTable() {
  const isLoading = useCurrentTable((state) => state.isLoading);
  const isDataLoaded = useCurrentTable((state) => state.isDataLoaded);
  const tableData = useCurrentTable((state) => state.data);

  if (!tableData || isLoading || !isDataLoaded) {
    return null;
  }

  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      {!isLoading && tableData ? <Table grid={tableData} /> : null}
    </div>
  );
}

export default ResultPreviewTable;
