export const rangeDate = (dateFrom: any, dateTo: any) => {
  const startTime = new Date(dateFrom)
  const endTime = new Date(dateTo)
  const timeDiff = endTime.getTime() - startTime.getTime();
  const date = timeDiff / (1000 * 60 * 60 * 24);
  return date
}