const formatMoney = (price, locale) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(price);
};

export { formatMoney };
