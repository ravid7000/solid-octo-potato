import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import Layout from "../components/Layout";
import QueryPanel from "./components/QueryPanel";
import ResultPanel from "./components/ResultPanel";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <QueryPanel />
        <ResultPanel />
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
