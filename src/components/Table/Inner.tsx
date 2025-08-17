import React, { useContext } from "react";
import { VirtualTableContext } from "./VirtualTableContext";

export const Inner = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function Inner({ children, ...rest }, ref) {
  const { header, top } = useContext(VirtualTableContext);
  return (
    <div {...rest} ref={ref}>
      <table
        className="w-full table-auto"
        style={{ top, position: "absolute", width: "100%" }}
      >
        <thead className="sticky top-0">{header}</thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
});
