const TransferStatus = {
  SUCCESS: 'SUCCESS',
  PENDING: 'PENDING',
};

const transferStatusText = {
  [TransferStatus.SUCCESS]: 'Berhasil',
  [TransferStatus.PENDING]: 'Pengecekan',
};

export {TransferStatus, transferStatusText};
