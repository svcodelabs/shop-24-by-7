export const getPriceAfterDiscount = (price: number, offerPercent: number): number => {
  const discount = price * (offerPercent / 100);
  return price - discount;
}