import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GoodDealsTab from './gooddealsTab/GoodDealsTab'
import GoodDealsDetailsScreen from './GoodDealsDetailsScreen'

const Stack = createNativeStackNavigator();

const GoodDealsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GoodDealsTab"
        component={GoodDealsTab}
        options={{headerShown: false}}
      />
      <Stack.Screen name="GoodDealsDetails" component={GoodDealsDetailsScreen} />
    </Stack.Navigator>
  );
};

export default GoodDealsScreen;
