import React, {useMemo} from 'react';
import {
  TransferStatus,
  transferStatusText,
} from '../../constants/transferStatuses';
import colors from '../../constants/colors';
import {StyleSheet, Text, View} from 'react-native';

const TransactionStatus = ({status}: {status: string}) => {
  const statusText = useMemo(() => {
    return transferStatusText[status];
  }, [status]);

  const [containerStyle, textColor] = useMemo<any>(() => {
    switch (status) {
      case TransferStatus.SUCCESS:
        return [
          {
            backgroundColor: colors.green,
            borderColor: colors.green,
          },
          colors.white,
        ];
      case TransferStatus.PENDING:
        return [
          {
            backgroundColor: colors.white,
            borderColor: colors.orange,
          },
          colors.black,
        ];
      default:
        return [{}, null];
    }
  }, [status]);

  return (
    <View style={[styles.transferStatusContainer, containerStyle]}>
      <Text style={[styles.transferStatusText, {color: textColor}]}>
        {statusText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  transferStatusContainer: {
    borderRadius: 6,
    borderWidth: 1.5,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  transferStatusText: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export default TransactionStatus;
