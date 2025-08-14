import Container from "../../components/Container";
import ResultPreviewTable from "./ResultPreviewTable";

function ResultPannel() {
  return (
    <div className="min-h-[50vh]">
      <Container>
        <ResultPreviewTable />
      </Container>
    </div>
  );
}

export default ResultPannel;
