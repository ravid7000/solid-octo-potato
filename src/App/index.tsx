import { Suspense, lazy } from "react";
import Layout from "../components/Layout";
import QueryPanel from "./components/QueryPanel";

const ResultPanel = lazy(
  () => import(/* webpackChunkName: 'ResultPanel' */ "./components/ResultPanel")
);

function App() {
  return (
    <Layout>
      <QueryPanel />
      <Suspense fallback={null}>
        <ResultPanel />
      </Suspense>
    </Layout>
  );
}

export default App;
