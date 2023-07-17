import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GoodDealsDetailsScreen from './GoodDealsDetailsScreen'
import GoodDealsTab from './gooddealsTab/GoodDealsTab'

const Stack = createNativeStackNavigator()

const GoodDealsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GoodDealsTab"
        component={GoodDealsTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Détails Astuce" component={GoodDealsDetailsScreen} />
    </Stack.Navigator>
  )
}

export default GoodDealsScreen
