import { parse } from "papaparse";

export function parseTableDataFromCSV(data: string) {
  const json = parse(data);

  console.log({ json });
}
