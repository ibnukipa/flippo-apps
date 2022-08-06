const TransactionSort = {
  DEFAULT: 'DEFAULT',
  NAME_ASC: 'NAME_ASC',
  NAME_DESC: 'NAME_DESC',
  LATEST: 'LATEST',
  OLDEST: 'OLDEST',
};

const transactionSortText = {
  DEFAULT: 'URUTKAN',
  [TransactionSort.NAME_ASC]: 'Nama A-Z',
  [TransactionSort.NAME_DESC]: 'Nama Z-A',
  [TransactionSort.LATEST]: 'Tanggal Terbaru',
  [TransactionSort.OLDEST]: 'Tanggal Terlama',
};

const transactionSortOptions = Object.keys(TransactionSort);

export {TransactionSort, transactionSortText, transactionSortOptions};
