export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string,
  ENABLE_BARCODE: import.meta.env.VITE_ENABLE_BARCODE === "true"
};