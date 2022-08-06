const getTransactions = () => {
  return fetch('https://recruitment-test.flip.id/frontend-test').then(resp =>
    resp.json(),
  );
};

export default getTransactions;
