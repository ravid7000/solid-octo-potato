import Button from "./Button";

type PaginationProps = {
  total: number;
  page: number;
  onPageChange: (page: number) => void;
};

function Pagination({ total, page, onPageChange }: PaginationProps) {
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === total;

  function handlePrev() {
    if (page > 1) {
      onPageChange(page - 1);
    }
  }

  function handleNext() {
    if (page < total) {
      onPageChange(page + 1);
    }
  }

  return (
    <div className="flex justify-between items-center gap-2 p-3 bg-slate-100">
      <Button onClick={handlePrev} disabled={isPrevDisabled}>
        Prev
      </Button>
      <div className="font-bold text-sm">
        Page {page} / {total}
      </div>
      <Button onClick={handleNext} disabled={isNextDisabled}>
        Next
      </Button>
    </div>
  );
}

export default Pagination;
