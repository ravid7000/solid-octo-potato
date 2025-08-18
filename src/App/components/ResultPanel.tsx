import Container from "../../components/Container";
import ResultPreviewControls from "./ResultPreviewControls";
import ResultPreviewTable from "./ResultPreviewTable";

function ResultPanel() {
  return (
    <Container>
      <ResultPreviewControls />
      <ResultPreviewTable />
    </Container>
  );
}

export default ResultPanel;
