type ProgressBarProps = {
  progress: number;
};

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div
      role="progressbar"
      className="relative h-3 w-full rounded-full bg-gray-200"
    >
      <div
        style={{
          width: `${progress}%`,
        }}
        className="h-full rounded-full bg-[#1d4878] transition-[width] duration-300 ease-in-out"
      />
    </div>
  );
}
export default ProgressBar;
