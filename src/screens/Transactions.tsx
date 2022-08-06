/**
 * @format
 */

import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import Container from '../components/Container';
import useList from '../hooks/useList';
import getTransactions from '../services/getTransactions';
import convertToDate from '../utils/convertToDate';
import TransactionSnippet from '../components/Transaction/TransactionSnippet';

const reformatTransactionModel = (itemData: any) => {
  return {
    ...itemData,
    created_at: convertToDate(itemData.created_at),
    completed_at: convertToDate(itemData.completed_at),
    grand_total: itemData.amount + itemData.fee + itemData.unique_code,
  };
};

const Transactions = () => {
  const [data, isLoading, refresh] = useList({
    fetcher: getTransactions,
    model: 'Transaction',
    reformatModel: reformatTransactionModel,
  });

  const renderItem = useCallback(({item}: {item: string}) => {
    return <TransactionSnippet id={item} />;
  }, []);

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        onRefresh={refresh}
        refreshing={isLoading}
      />
    </Container>
  );
};

export default Transactions;
