import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AngleDownIcon} from '../../assets/icons';
import colors from '../../constants/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  transactionSortOptions,
  transactionSortText,
} from '../../constants/transactionSort';

const TransactionSort = ({onSort}: {onSort: Function}) => {
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>('DEFAULT');

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const renderOptionItem = useCallback(
    ({item}: {item: string}) => {
      const text = transactionSortText[item];
      const onSelectItem = () => {
        onSort?.(item);
        setSelectedOption(item);
        closeModal();
      };
      const isSelected = item === selectedOption;

      return (
        <TouchableOpacity
          onPress={onSelectItem}
          style={styles.optionItemContainer}>
          <View style={styles.optionCircle}>
            {isSelected && <View style={styles.optionCircleFilled} />}
          </View>
          <Text style={styles.optionItemText}>{text}</Text>
        </TouchableOpacity>
      );
    },
    [onSort, closeModal, selectedOption],
  );

  const selectedOptionText = useMemo(() => {
    return transactionSortText[selectedOption] || 'URUTKAN';
  }, [selectedOption]);

  return (
    <TouchableOpacity onPress={openModal} style={styles.sortButtonContainer}>
      <Text style={styles.sortButtonText}>{selectedOptionText}</Text>
      <AngleDownIcon
        width={18}
        height={18}
        color={colors.orange}
        style={styles.sortButtonIcon}
      />
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}
        visible={isOpen}>
        <Pressable
          onPress={closeModal}
          style={[
            styles.contentContainer,
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}>
          <View style={styles.content}>
            <FlatList
              style={styles.optionContainer}
              contentContainerStyle={styles.optionContentContainer}
              data={transactionSortOptions}
              renderItem={renderOptionItem}
            />
          </View>
        </Pressable>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sortButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.orange,
  },
  sortButtonIcon: {
    marginLeft: 4,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black70,
  },
  content: {
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  optionContainer: {
    flexGrow: 0,
  },
  optionContentContainer: {
    paddingVertical: 8,
  },
  optionItemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    minWidth: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionItemText: {
    flex: 1,
    fontSize: 18,
    color: colors.black,
  },
  optionCircle: {
    padding: 2,
    borderColor: colors.orange,
    borderWidth: 2,
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 8,
  },
  optionCircleFilled: {
    width: 12,
    height: 12,
    borderRadius: 15,
    backgroundColor: colors.orange,
  },
});

export default TransactionSort;
