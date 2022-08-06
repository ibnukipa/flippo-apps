import {StyleSheet, Text, View} from 'react-native';
import toStartCase from '../../utils/toStartCase';
import {ArrowRightIcon} from '../../assets/icons';
import colors from '../../constants/colors';
import React from 'react';
import useTransaction from '../../hooks/useTransaction';

const TransactionTransfer = ({id}: {id: string}) => {
  const transaction = useTransaction(id);
  return (
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
  );
};

const styles = StyleSheet.create({
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
});

export default TransactionTransfer;
