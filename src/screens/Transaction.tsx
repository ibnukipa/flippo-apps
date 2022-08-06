import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Container from '../components/Container';
import {useRoute} from '@react-navigation/native';
import useTransaction from '../hooks/useTransaction';
import colors from '../constants/colors';
import {CopyAltIcon} from '../assets/icons';
import Clipboard from '@react-native-clipboard/clipboard';
import TransactionTransfer from '../components/Transaction/TransactionTransfer';
import convertToCurrencyString from '../utils/convertToCurrencyString';
import convertToDateString from '../utils/convertToDateString';

const Transaction = () => {
  const route = useRoute();
  const transaction = useTransaction(route.params?.id);
  const [detailOpen, setDetailOpen] = useState(true);

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(route.params?.id);
  }, [route.params?.id]);

  const togglePress = useCallback(() => {
    setDetailOpen(item => !item);
  }, []);

  const details = useMemo(() => {
    if (!transaction) {
      return [];
    }
    return [
      {
        key: 'name',
        title: transaction.beneficiary_name,
        value: transaction.account_number,
      },
      {
        key: 'nominal',
        title: 'Nominal',
        value: convertToCurrencyString(transaction.amount + transaction.fee),
      },
      {key: 'note', title: 'Berita Transfer', value: transaction.remark},
      {key: 'unique_code', title: 'Kode Unik', value: transaction.unique_code},
      {
        key: 'created_at',
        title: 'Waktu Dibuat',
        value: convertToDateString(transaction.created_at),
      },
    ];
  }, [transaction]);

  const renderDetailItem = useCallback(({item}: any) => {
    return (
      <View style={styles.detailItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.value}</Text>
      </View>
    );
  }, []);

  return (
    <Container noPadding>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>ID TRANSAKSI: #{transaction?.id} </Text>
        <TouchableOpacity onPress={copyToClipboard}>
          <CopyAltIcon width={18} height={18} color={colors.orange} />
        </TouchableOpacity>
      </View>
      <View style={[styles.sectionContainer, styles.sectionContainerSpaced]}>
        <Text style={styles.title}>DETAIL TRANSAKSI</Text>
        <TouchableOpacity onPress={togglePress}>
          <Text style={styles.label}>{detailOpen ? 'Tutup' : 'Buka'}</Text>
        </TouchableOpacity>
      </View>
      {detailOpen && (
        <View style={[styles.sectionContainer, styles.sectionContainerBlank]}>
          <TransactionTransfer id={route.params?.id} />
          <FlatList
            scrollEnabled={false}
            numColumns={2}
            data={details}
            renderItem={renderDetailItem}
          />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  subtitle: {
    fontSize: 18,
    color: colors.black,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionContainerSpaced: {
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  sectionContainerBlank: {
    borderBottomWidth: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  label: {
    color: colors.orange,
    fontSize: 16,
  },
  detailItem: {
    width: '50%',
    paddingVertical: 16,
  },
});

export default Transaction;
