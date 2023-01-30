export const formatDateToDDMMYY = (dateStr: string): string => {
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formattedDate;
};
