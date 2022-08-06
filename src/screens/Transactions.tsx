/**
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Container from '../components/Container';

const Transactions = () => {
  return (
    <Container>
      <View style={styles.container}>
        <Text>Transactions</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Transactions;
