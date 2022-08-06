const convertToCurrencyString = (amount: number = 0) => {
  return amount.toLocaleString('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export default convertToCurrencyString;
