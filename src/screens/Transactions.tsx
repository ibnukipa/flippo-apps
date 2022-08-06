import React, {useCallback, useMemo, useState} from 'react';
import {FlatList} from 'react-native';
import Container from '../components/Container';
import useList from '../hooks/useList';
import getTransactions from '../services/getTransactions';
import convertToDate from '../utils/convertToDate';
import TransactionSnippet from '../components/Transaction/TransactionSnippet';
import TransactionFilter from '../components/Transaction/TransactionFilter';
import {TransactionSort} from '../constants/transactionSort';

const reformatTransactionModel = (itemData: any) => {
  return {
    ...itemData,
    created_at: convertToDate(itemData.created_at),
    completed_at: convertToDate(itemData.completed_at),
    grand_total: itemData.amount + itemData.fee + itemData.unique_code,
  };
};

const Transactions = () => {
  const [searchKey, setSearchKey] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>();

  const {isLoading, refresh, originalData} = useList({
    fetcher: getTransactions,
    model: 'Transaction',
    reformatModel: reformatTransactionModel,
  });

  const onSearch = useCallback((key: string) => {
    setSearchKey(key);
  }, []);

  const onSort = useCallback((key: string) => {
    setSortKey(key);
  }, []);

  const renderItem = useCallback(({item}: {item: string}) => {
    // Only pass the ID of entity instead rather than pass a whole object
    return <TransactionSnippet id={item} />;
  }, []);

  const renderHeader = useCallback(() => {
    return <TransactionFilter onSearch={onSearch} onSort={onSort} />;
  }, [onSearch, onSort]);

  // always use the memo when remapping a list
  const filteredData = useMemo(() => {
    let newData = [...originalData];
    newData = newData.filter(item => {
      return (
        item.beneficiary_name
          .toLowerCase()
          .includes(searchKey?.toLowerCase()) ||
        item.beneficiary_bank
          .toLowerCase()
          .includes(searchKey?.toLowerCase()) ||
        item.grand_total.toString().includes(searchKey) ||
        item.sender_bank.toLowerCase().includes(searchKey?.toLowerCase())
      );
    });

    switch (sortKey) {
      case TransactionSort.NAME_ASC:
        newData = newData.sort((a, b) =>
          a.beneficiary_name
            .toUpperCase()
            .localeCompare(b.beneficiary_name.toUpperCase()),
        );
        break;
      case TransactionSort.NAME_DESC:
        newData = newData.sort((a, b) =>
          b.beneficiary_name
            .toUpperCase()
            .localeCompare(a.beneficiary_name.toUpperCase()),
        );
        break;
      case TransactionSort.LATEST:
        newData = newData.sort(
          (a, b) =>
            (new Date(b.created_at) as any) - (new Date(a.created_at) as any),
        );
        break;
      case TransactionSort.OLDEST:
        newData = newData.sort(
          (a, b) =>
            (new Date(a.created_at) as any) - (new Date(b.created_at) as any),
        );
        break;
      default:
        break;
    }

    // only use the IDs for the list
    return newData.map(item => item.id);
  }, [originalData, searchKey, sortKey]);

  return (
    <Container>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        onRefresh={refresh}
        refreshing={isLoading}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Transactions;
