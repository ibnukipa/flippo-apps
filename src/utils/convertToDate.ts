const convertToDate = (dateString: string) => {
  const [date, time] = dateString.split(' ');
  return `${date}T${time}+07:00`;
};

export default convertToDate;
