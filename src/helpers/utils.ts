export const formatNumber = (number: any) => {
  return new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};
