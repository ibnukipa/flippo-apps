import {useEffect, useState} from 'react';
import {TransactionSchemaName} from '../database/schemas/TransactionSchema';
import useRealm from './useRealm';

const useTransaction = (id: string) => {
  const [transaction, setTransaction] = useState<any>(null);

  const {realm} = useRealm();

  useEffect(() => {
    const item = realm?.objectForPrimaryKey(TransactionSchemaName, id);

    setTransaction(item);
    item?.addListener(() => {
      setTransaction(item);
    });

    return () => {
      item?.removeAllListeners();
    };
  }, [realm, id]);

  return transaction;
};

export default useTransaction;
