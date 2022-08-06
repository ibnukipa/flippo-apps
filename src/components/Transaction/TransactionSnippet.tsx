import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import useTransaction from '../../hooks/useTransaction';
import colors from '../../constants/colors';
import {CircleSmallIcon} from '../../assets/icons';
import convertToCurrencyString from '../../utils/convertToCurrencyString';
import convertToDateString from '../../utils/convertToDateString';
import {TransferStatus} from '../../constants/transferStatuses';
import TransactionStatus from './TransactionStatus';
import {useNavigation} from '@react-navigation/native';
import TransactionTransfer from './TransactionTransfer';

const TransactionSnippet = ({id}: {id: string}) => {
  const navigation = useNavigation();
  const transaction = useTransaction(id);

  const grandTotal = useMemo(() => {
    return convertToCurrencyString(transaction?.grand_total);
  }, [transaction?.grand_total]);

  const date = useMemo(() => {
    return convertToDateString(transaction?.created_at);
  }, [transaction?.created_at]);

  const labelColor = useMemo(() => {
    switch (transaction?.status) {
      case TransferStatus.SUCCESS:
        return colors.green;
      case TransferStatus.PENDING:
        return colors.orange;
      default:
        return colors.black;
    }
  }, [transaction?.status]);

  const navigateToDetail = useCallback(() => {
    // ISSUE: https://stackoverflow.com/questions/68667766/react-native-typescript-string-is-not-assignable-to-parameter-of-type-never
    navigation.navigate('Transaction' as never, {id} as never);
  }, [navigation, id]);

  return (
    <TouchableOpacity
      onPress={navigateToDetail}
      style={[styles.container, {borderLeftColor: labelColor}]}>
      <TransactionTransfer id={id} />
      <View style={styles.transferReceiverContainer}>
        <Text style={styles.transferReceiverText}>
          {transaction?.beneficiary_name.toUpperCase()}
        </Text>
        <TransactionStatus status={transaction?.status} />
      </View>
      <View style={styles.transferDetailContainer}>
        <Text style={styles.transferDetailAmountText}>{grandTotal}</Text>
        <CircleSmallIcon
          width={12}
          height={12}
          color={colors.black}
          style={styles.transferDetailDivider}
        />
        <Text style={styles.transferDetailDateText}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginVertical: 4,
    padding: 16,
    borderRadius: 6,
    borderLeftWidth: 6,
  },
  transferReceiverContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  transferReceiverText: {
    fontSize: 18,
    color: colors.black,
  },
  transferDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferDetailAmountText: {
    fontSize: 18,
    color: colors.black,
  },
  transferDetailDateText: {
    fontSize: 18,
    color: colors.black,
  },
  transferDetailDivider: {
    marginHorizontal: 4,
  },
});

export default TransactionSnippet;
