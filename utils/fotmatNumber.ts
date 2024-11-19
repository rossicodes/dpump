// utils/formatNumber.ts

export const formatNumber = (num?: number | null): string => {
  if (num === undefined || num === null || isNaN(num)) {
    return "0";
  }

  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  }).format(num);
};
