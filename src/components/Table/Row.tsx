import type React from "react";

export function Row({
  children,
  ...rest
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...rest}>{children}</tr>;
}
