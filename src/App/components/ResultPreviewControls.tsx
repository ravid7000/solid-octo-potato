import { BsDownload } from "react-icons/bs";
import Button from "../../components/Button";
import { useCurrentTable } from "../states/states";

function ResultPreviewControls() {
  const table = useCurrentTable((state) => state.table);
  const isLoading = useCurrentTable((state) => state.isLoading);
  const isDataLoaded = useCurrentTable((state) => state.isDataLoaded);
  const rows = useCurrentTable((state) => state.data?.body?.length ?? 0);

  if (isLoading || !rows || !isDataLoaded) {
    return null;
  }

  return (
    <div className="flex items-end py-4">
      <h6 className="text-sm font-bold">
        {rows} row(s) in ({table}) table
      </h6>

      <div className="ml-auto flex gap-2">
        <Button>
          <BsDownload /> Export CSV
        </Button>
      </div>
    </div>
  );
}

export default ResultPreviewControls;
