import Table from "../../components/Table";
import { useCurrentTable } from "../states/states";

const data = {
  headers: ["ID", "Name"],
  body: [
    ["1", "John Doe"],
    ["2", "Jane Smith"],
    ["3", "Bob Johnson"],
  ],
};

function ResultPreviewTable() {
  const currentTable = useCurrentTable((state) => state.table);

  console.log(currentTable);

  return (
    <div>
      <Table grid={data} />
    </div>
  );
}

export default ResultPreviewTable;
