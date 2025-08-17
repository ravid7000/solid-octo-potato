import { delay } from "./helpers";

export function fetchSchema() {
  return fetch("/data/schema.json").then((res) => res.json());
}

export async function fetchTable(tableLocation: string) {
  await delay();
  return fetch(`/${tableLocation}`).then((res) => res.text());
}
