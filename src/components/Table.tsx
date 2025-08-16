import { FixedSizeList as List } from "react-window";

type TableProps = React.HTMLAttributes<HTMLTableElement> & {
  grid: {
    headers: string[];
    body: string[][];
  };
  footer?: React.ReactNode;
};

type CellProps = React.HTMLAttributes<HTMLTableCellElement>;

function Cell({ children }: CellProps) {
  return <div className="px-2 text-start min-w-24">{children}</div>;
}

function Row({ children, ...rest }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <div {...rest}>{children}</div>;
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
        <div role="table" className="w-full">
          <div>
            <Row className="bg-slate-300 flex">
              {grid.headers.map((header, index) => (
                <Cell key={`${header}_${index}`}>{header}</Cell>
              ))}
            </Row>
          </div>
          <div className="flex">
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
                    className="hover:bg-blue-50 transition-colors duration-200 cursor-pointer flex"
                    style={style}
                  >
                    {row.map((cell, index) => (
                      <Cell key={`cell_${index}_${cell}`}>{cell}</Cell>
                    ))}
                  </Row>
                );
              }}
            </List>
          </div>
        </div>
      </div>
      {footer}
    </div>
  );
}

export default Table;
