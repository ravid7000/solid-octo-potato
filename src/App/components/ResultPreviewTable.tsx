import Table from "../../components/Table";

const data = {
  headers: ["ID", "Name"],
  body: [
    ["1", "John Doe"],
    ["2", "Jane Smith"],
    ["3", "Bob Johnson"],
  ],
};

function ResultPreviewTable() {
  return (
    <div>
      <Table grid={data} />
    </div>
  );
}

export default ResultPreviewTable;
