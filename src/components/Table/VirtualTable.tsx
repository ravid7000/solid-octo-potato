import React, { useRef, useState } from "react";
import { type FixedSizeListProps, FixedSizeList as List } from "react-window";
import { Inner } from "./Inner";
import { VirtualTableContext } from "./VirtualTableContext";

export function VirtualTable({
  row,
  header,
  ...rest
}: {
  header?: React.ReactNode;
  row: FixedSizeListProps["children"];
} & Omit<FixedSizeListProps, "children" | "innerElementType">) {
  const listRef = useRef<List | null>(null);
  const [top, setTop] = useState(0);

  return (
    <VirtualTableContext.Provider value={{ header, top, setTop }}>
      <List
        {...rest}
        ref={listRef}
        innerElementType={Inner}
        onItemsRendered={(props) => {
          const style =
            listRef.current &&
            // @ts-expect-error custom prop
            listRef.current._getItemStyle(props.overscanStartIndex);
          setTop((style && style.top) || 0);

          // Call the original callback
          if (rest.onItemsRendered) {
            rest.onItemsRendered(props);
          }
        }}
      >
        {row}
      </List>
    </VirtualTableContext.Provider>
  );
}
