import ProgressBar from "../../components/ProgressBar";
import { useQueryExecution } from "../states/states";

function QueryExecutionStatus() {
  const status = useQueryExecution((state) => state.status);
  const progress = useQueryExecution((state) => state.progress);
  const hideProgress = useQueryExecution((state) => state.hideProgress);
  const header = useQueryExecution((state) => {
    if (state.status === "sending") {
      return "Sending Query to Backend";
    }

    if (state.status === "executing") {
      return "Executing Query";
    }

    if (state.status === "completed") {
      const timeDiff = Math.round((state.completedAt - state.startedAt) / 1000);

      return `Completed in ${timeDiff} sec`;
    }

    return "";
  });
  const date = useQueryExecution((state) => {
    const date = new Date(state.completedAt);

    const options: Intl.DateTimeFormatOptions = {
      month: "short", // "Jan", "Feb", etc
      day: "numeric", // "17"
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        {header ? <h5 className="text-sm font-bold">{header}</h5> : null}
        {status === "completed" ? (
          <h5 className="text-sm font-bold">Executed at {date}</h5>
        ) : null}
      </div>

      {!hideProgress ? <ProgressBar progress={progress} /> : null}
    </div>
  );
}

export default QueryExecutionStatus;
