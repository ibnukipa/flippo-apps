import {useEffect, useState} from 'react';
import {TransactionSchemaName} from '../database/schemas/TransactionSchema';
import useRealm from './useRealm';

const useTransactions = () => {
  const [transactions, setTransactions] = useState<any>([]);

  const {realm} = useRealm();

  useEffect(() => {
    const items = realm?.objects(TransactionSchemaName);

    if (items) {
      setTransactions([...items]);
      items.addListener(() => {
        setTransactions([...items]);
      });
    }

    return () => {
      items?.removeAllListeners();
    };
  }, [realm]);

  return [transactions];
};

export default useTransactions;
