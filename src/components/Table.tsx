import { FixedSizeList as List } from "react-window";

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  grid: {
    headers: string[];
    body: string[][];
  };
  footer?: React.ReactNode;
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

const ROW_HEIGHT = 24;

function Table({ grid, footer }: TableProps) {
  if (!grid.headers.length || !grid.body.length) {
    return null;
  }

  const tableBodyHeight = grid.body.length * ROW_HEIGHT;

  const listHeight = tableBodyHeight < 400 ? tableBodyHeight : 400;

  return (
    <div className="rounded-md overflow-hidden bg-white">
      <div className="flex flex-auto flex-col items-stretch pb-3">
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
            <List
              height={listHeight}
              itemSize={ROW_HEIGHT}
              itemCount={grid.body.length}
              width="100%"
            >
              {({ index, style }) => {
                const row = grid.body[index];
                return (
                  <Row
                    key={`row_${index}`}
                    className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                    style={style}
                  >
                    {row.map((cell, index) => (
                      <Cell key={`cell_${index}_${cell}`}>{cell}</Cell>
                    ))}
                  </Row>
                );
              }}
            </List>
          </tbody>
        </table>
      </div>
      {footer}
    </div>
  );
}

export default Table;
