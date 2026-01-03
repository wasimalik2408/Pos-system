export function isBarcode(value: string) {
  return /^[0-9]{6,20}$/.test(value.trim());
}