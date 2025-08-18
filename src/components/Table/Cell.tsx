export type CellProps = React.HTMLAttributes<HTMLTableCellElement> & {
  as?: "th" | "td";
};

export function Cell({ children, as, ...rest }: CellProps) {
  if (as === "th") {
    return (
      <th
        {...rest}
        className={
          "px-2 text-start border-x border-slate-200 min-w-12 " +
          (rest.className ? rest.className : "")
        }
      >
        {children}
      </th>
    );
  }

  return (
    <td
      {...rest}
      className={
        "px-2 text-nowrap border-x border-slate-200 min-w-12 overflow-hidden overflow-ellipsis " +
        (rest.className ? rest.className : "")
      }
    >
      {children}
    </td>
  );
}
