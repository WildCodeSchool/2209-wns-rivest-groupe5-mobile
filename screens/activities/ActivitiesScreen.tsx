import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ActivityDetailsScreen from './ActivityDetailsScreen'
import ActivitiesTab from './activitiesTab/ActivitiesTab'

const Stack = createNativeStackNavigator()

const ActivitiesScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ActivitiesTab"
        component={ActivitiesTab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Détails Activité" component={ActivityDetailsScreen} />
    </Stack.Navigator>
  )
}

export default ActivitiesScreen
