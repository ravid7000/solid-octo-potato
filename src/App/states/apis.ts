export function fetchSchema() {
  return fetch("/data/schema.json").then((res) => res.json());
}

export function fetchTable(tableLocation: string) {
  return fetch(`/${tableLocation}`).then((res) => res.text());
}
