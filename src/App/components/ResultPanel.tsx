import Container from "../../components/Container";
import ResultPreviewControls from "./ResultPreviewControls";
import ResultPreviewTable from "./ResultPreviewTable";

function ResultPanel() {
  return (
    <div className="min-h-[50vh]">
      <Container>
        <ResultPreviewControls />
        <ResultPreviewTable />
      </Container>
    </div>
  );
}

export default ResultPanel;
