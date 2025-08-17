export type CellProps = React.HTMLAttributes<HTMLTableCellElement> & {
  as?: "th" | "td";
};

export function Cell({ children, as }: CellProps) {
  if (as === "th") {
    return (
      <th className="px-2 text-start border-x border-slate-200 min-w-12">
        {children}
      </th>
    );
  }

  return (
    <td className="px-2 text-nowrap border-x border-slate-200 min-w-12 overflow-hidden overflow-ellipsis">
      {children}
    </td>
  );
}
