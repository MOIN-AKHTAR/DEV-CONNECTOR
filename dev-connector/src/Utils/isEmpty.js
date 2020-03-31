export const isEmpty = Data =>
  Data === null ||
  Data === undefined ||
  (typeof Data === "object" && Object.keys(Data).length === 0) ||
  (typeof Data === "string" && Data.trim().length === 0);
