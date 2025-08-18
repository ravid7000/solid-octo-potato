import { parse } from "papaparse";
import type { CurrentTableState } from "./types";

export function parseTableDataFromCSV(data: string) {
  const json = parse(data);

  let headers: string[] = [];
  let body: string[][] = [];

  if (json.data.length > 0) {
    headers = json.data[0] as string[];
    body = json.data.slice(1) as string[][];
  }

  return {
    headers,
    body,
  };
}

/**
 * Function to add random async delay
 * This will be used to simulate any backend query execution action
 * @param time
 * @returns
 */
export function delay(time = Math.random() * 300) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(time);
    }, time)
  );
}

function download(data: string, filename: string, type = "application/json") {
  try {
    const blob = new Blob([data], {
      type,
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  } catch {
    // handle exception
  }
}

export function downloadDataAsJSON(
  data: CurrentTableState["data"],
  filename = ""
) {
  return new Promise((resolve) => {
    if (!data) {
      resolve(false);
      return;
    }

    const { headers, body } = data;
    const jsonData = body.map((row) => {
      const obj: Record<string, string> = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });

    download(JSON.stringify(jsonData, null, 2), filename);
    resolve(true);
  });
}

export function downloadDataAsCSV(
  data: CurrentTableState["data"],
  filename = ""
) {
  return new Promise((resolve) => {
    if (!data) {
      resolve(false);
      return;
    }

    const { headers, body } = data;

    let csvData = `${headers.join(",")}\n`;

    body.forEach((row) => {
      csvData += `${row.join(",")}\n`;
    });

    download(csvData, filename, "text/csv");
    resolve(true);
  });
}
