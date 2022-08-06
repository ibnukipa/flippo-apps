import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useTransaction from '../../hooks/useTransaction';
import colors from '../../constants/colors';
import {ArrowRightIcon, CircleSmallIcon} from '../../assets/icons';
import convertToCurrencyString from '../../utils/convertToCurrencyString';
import convertToDateString from '../../utils/convertToDateString';
import {TransferStatus} from '../../constants/transferStatuses';
import TransactionStatus from './TransactionStatus';
import toStartCase from '../../utils/toStartCase';

const TransactionSnippet = ({id}: {id: string}) => {
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

  return (
    <View style={[styles.container, {borderLeftColor: labelColor}]}>
      <View style={styles.transferContainer}>
        <Text style={styles.transferText}>
          {toStartCase(transaction?.sender_bank)}
        </Text>
        <ArrowRightIcon
          width={20}
          height={20}
          color={colors.black}
          style={styles.transferDivider}
        />
        <Text style={styles.transferText}>
          {toStartCase(transaction?.beneficiary_bank)}
        </Text>
      </View>
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
    </View>
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
  transferContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferText: {
    fontWeight: '600',
    fontSize: 18,
  },
  transferDivider: {
    marginHorizontal: 4,
  },
  transferReceiverContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  transferReceiverText: {
    fontSize: 18,
  },
  transferDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferDetailAmountText: {
    fontSize: 18,
  },
  transferDetailDateText: {
    fontSize: 18,
  },
  transferDetailDivider: {
    marginHorizontal: 4,
  },
});

export default TransactionSnippet;
