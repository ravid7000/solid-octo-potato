import { BsArrowsFullscreen, BsDownload } from "react-icons/bs";
import Button from "../../components/Button";

function ResultPreviewControls() {
  return (
    <div className="flex items-end py-4">
      <div className="text-sm">39 rows</div>

      <div className="ml-auto flex gap-2">
        <Button>
          <BsDownload /> Export
        </Button>
        <Button>
          <BsArrowsFullscreen /> Fullscreen
        </Button>
      </div>
    </div>
  );
}

export default ResultPreviewControls;
