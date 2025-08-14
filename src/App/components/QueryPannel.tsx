import Container from "../../components/Container";
import QueryEditor from "../../components/QueryEditor";

function QueryPannel() {
  return (
    <div className="py-4">
      <Container className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">SQL Runner</h1>
        <QueryEditor />
      </Container>
    </div>
  );
}

export default QueryPannel;
