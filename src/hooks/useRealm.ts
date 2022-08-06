import Realm from 'realm';
import {useCallback, useEffect, useRef} from 'react';
import TransactionSchema from '../database/schemas/TransactionSchema';

const useRealm = () => {
  const realmInstance = useRef<Realm>();

  useEffect(() => {
    const getInstance = async () => {
      realmInstance.current = await Realm.open({
        schema: [TransactionSchema],
        schemaVersion: 1,
        deleteRealmIfMigrationNeeded: true,
      });
    };
    getInstance();
  }, [realmInstance]);

  const upsert = useCallback(({data, model}: {data: any; model: any}) => {
    realmInstance.current?.write(() => {
      realmInstance.current?.create(model, data, Realm.UpdateMode.Modified);
    });
  }, []);

  return {
    realm: realmInstance.current,
    upsert,
  };
};

export default useRealm;
