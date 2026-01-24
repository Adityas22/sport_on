/**
 * Format harga ke format Rupiah
 */
export const formatPrice = (price: number): string => {
  return `Rp ${price.toLocaleString("id-ID")}`;
};
