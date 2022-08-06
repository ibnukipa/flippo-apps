import React, {useCallback} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import colors from '../../constants/colors';
import {SearchIcon} from '../../assets/icons';
import TransactionSort from './TransactionSort';

const TransactionFilter = ({
  onSearch,
  onSort,
}: {
  onSearch: Function;
  onSort: Function;
}) => {
  const onSearchInputChange = useCallback(
    (text: string) => {
      if (text.length >= 3 || text === '') {
        onSearch?.(text);
      }
    },
    [onSearch],
  );

  return (
    <View style={styles.container}>
      <SearchIcon
        style={styles.searchIcon}
        width={18}
        height={18}
        color={colors.grey}
      />
      <TextInput
        style={styles.searchInput}
        placeholder={'Cari nama, bank atau nominal'}
        onChangeText={onSearchInputChange}
      />
      <TransactionSort onSort={onSort} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchIcon: {
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 18,
    paddingVertical: 16,
  },
});

export default TransactionFilter;
