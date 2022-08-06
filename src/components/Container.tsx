import React, {PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import colors from '../constants/colors';

const Container = (props: PropsWithChildren<{noPadding?: boolean}>) => {
  return (
    <SafeAreaView
      style={[styles.container, props.noPadding && styles.noPadding]}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteMilky,
    padding: 8,
  },
  noPadding: {
    paddingHorizontal: 0,
  },
});

export default Container;
