import {useCallback, useEffect, useState} from 'react';
import useRealm from './useRealm';

const useList = ({
  fetcher,
  query,
  model,
  reformatModel,
}: {
  fetcher: Function;
  query?: any;
  model?: string;
  reformatModel?: Function;
}) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {upsert} = useRealm();

  const callApi = useCallback(async () => {
    const response = await fetcher?.({
      ...query,
    });

    if (!response) {
      setIsLoading(false);
      return;
    }

    for (let itemKey in response) {
      // TODO make sure the itemKey is always the ID
      const responseItemData = response[itemKey];
      const itemData = {
        ...(reformatModel ? reformatModel(responseItemData) : responseItemData),
        id: itemKey,
      };
      upsert({
        data: itemData,
        model,
      });
    }

    //list state update
    const dataKeys = Object.keys(response);
    setData(dataKeys);
    setIsLoading(false);
  }, [fetcher, model, query, reformatModel, upsert]);

  const refresh = useCallback(() => {
    setIsLoading(true);
    callApi();
  }, [callApi]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return [data, isLoading, refresh];
};

export default useList;
