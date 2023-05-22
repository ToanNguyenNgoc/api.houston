export const isDateFormat = (date: any): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return regex.test(date);
}
export const isDateDobFormat = (date: any): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}/;
  return regex.test(date);
}
export const formatPrice = (price: number | string) => {
  return price?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}