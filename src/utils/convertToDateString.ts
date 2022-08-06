const convertToDateString = (date: Date = new Date()) => {
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default convertToDateString;
