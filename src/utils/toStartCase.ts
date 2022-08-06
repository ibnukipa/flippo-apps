const toStartCase = (str: string) => {
  if (str.length > 4) {
    return str
      .split(' ')
      .map(w => w[0].toUpperCase() + w.substring(1).toLowerCase())
      .join(' ');
  } else {
    return str.toUpperCase();
  }
};

export default toStartCase;
