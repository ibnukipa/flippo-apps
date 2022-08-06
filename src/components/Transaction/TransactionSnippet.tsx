import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useTransaction from '../../hooks/useTransaction';
import colors from '../../constants/colors';
import {ArrowRight, CircleSmall} from '../../assets/icons';
import convertToCurrencyString from '../../utils/convertToCurrencyString';
import convertToDateString from '../../utils/convertToDateString';

const TransactionSnippet = ({id}: {id: string}) => {
  const transaction = useTransaction(id);

  const grandTotal = useMemo(() => {
    return convertToCurrencyString(transaction?.grand_total);
  }, [transaction?.grand_total]);

  const date = useMemo(() => {
    return convertToDateString(transaction?.completed_at);
  }, [transaction?.completed_at])

  return (
    <View style={styles.container}>
      <View style={styles.transferContainer}>
        <Text style={styles.transferText}>
          {transaction?.sender_bank.toUpperCase()}
        </Text>
        <ArrowRight
          width={20}
          height={20}
          color={colors.black}
          style={styles.transferDivider}
        />
        <Text style={styles.transferText}>
          {transaction?.beneficiary_bank.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.transferReceiverText}>
        {transaction?.beneficiary_name.toUpperCase()}
      </Text>
      <View style={styles.transferDetailContainer}>
        <Text style={styles.transferDetailAmountText}>{grandTotal}</Text>
        <CircleSmall
          width={14}
          height={14}
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
    borderLeftColor: colors.orange,
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
  transferReceiverText: {
    fontSize: 18,
    marginVertical: 4,
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
