type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  grid: {
    headers: string[];
    body: string[][];
  };
};

type CellProps = React.HTMLAttributes<HTMLTableCellElement> & {
  as?: "td" | "th";
};

function Cell({ children, as }: CellProps) {
  if (as === "th") {
    return <th className="px-2 text-start">{children}</th>;
  }

  return <td className="px-2">{children}</td>;
}

function Row({ children, ...rest }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...rest}>{children}</tr>;
}

function Table({ grid }: TableProps) {
  if (!grid.headers.length || !grid.body.length) {
    return null;
  }

  return (
    <div className="rounded-md overflow-hidden bg-white pb-4">
      <div className="flex flex-auto flex-col items-stretch">
        <table className="w-full">
          <thead>
            <Row className="bg-slate-300">
              {grid.headers.map((header, index) => (
                <Cell as="th" key={`${header}_${index}`}>
                  {header}
                </Cell>
              ))}
            </Row>
          </thead>
          <tbody>
            {grid.body.map((row, index) => (
              <Row
                key={`row_${index}`}
                className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
              >
                {row.map((cell, index) => (
                  <Cell key={`cell_${index}_${cell}`}>{cell}</Cell>
                ))}
              </Row>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
