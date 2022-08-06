/**
 * @format
 */

import Transactions from '../screens/Transactions';
import Transaction from '../screens/Transaction';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator();

const Routers = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name={'Transactions'} component={Transactions} />
        <RootStack.Screen name={'Transaction'} component={Transaction} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Routers;
