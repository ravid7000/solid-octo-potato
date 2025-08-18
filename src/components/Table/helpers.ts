
export function defaultCompare(a: string, b: string): number {
  const aNum = Number(a);
  const bNum = Number(b);

  const aIsNum = Number.isFinite(aNum) && a.trim() !== "";
  const bIsNum = Number.isFinite(bNum) && b.trim() !== "";

  if (aIsNum && bIsNum) {
    return aNum - bNum;
  }

  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}
