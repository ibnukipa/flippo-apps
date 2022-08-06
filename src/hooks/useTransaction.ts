import {useEffect, useState} from 'react';
import {TransactionSchemaName} from '../database/schemas/TransactionSchema';
import useRealm from './useRealm';

const useTransaction = (id: string) => {
  const [transaction, setTransaction] = useState<any>(null);

  const {realm} = useRealm(id);

  useEffect(() => {
    if (realm && id) {
      const item = realm.objectForPrimaryKey(TransactionSchemaName, id);
      setTransaction(item);
    }
  }, [realm, id]);

  return transaction;
};

export default useTransaction;
