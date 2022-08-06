import Realm from 'realm';
import {useCallback, useEffect, useState} from 'react';
import TransactionSchema from '../database/schemas/TransactionSchema';

const useRealm = (key?: any) => {
  const [realm, setRealm] = useState<Realm>();

  useEffect(() => {
    const getInstance = async () => {
      setRealm(
        await Realm.open({
          schema: [TransactionSchema],
          schemaVersion: 1,
          deleteRealmIfMigrationNeeded: true,
        }),
      );
    };
    getInstance();
  }, [key]);

  const upsert = useCallback(
    ({data, model}: {data: any; model: any}) => {
      realm?.write(() => {
        realm?.create(model, data, Realm.UpdateMode.Modified);
      });
    },
    [realm],
  );

  return {
    realm,
    upsert,
  };
};

export default useRealm;
