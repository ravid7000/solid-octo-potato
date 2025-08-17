import { parse } from "papaparse";

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
export function delay(time = Math.random() * 3000) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(time);
    }, time)
  );
}
