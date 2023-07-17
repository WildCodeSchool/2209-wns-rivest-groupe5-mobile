import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CreateActivityScreen from './CreateActivityScreen'
import MyActivitiesScreen from './MyActivitiesScreen'
import Ionicons from '@expo/vector-icons/Ionicons'

const Tab = createBottomTabNavigator()

const ActivitiesTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Mes Activités"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined

          if (route.name === 'Mes Activités') {
            iconName = focused ? 'car' : 'car-outline'
          } else if (route.name === 'Créer Activité') {
            iconName = focused ? 'add-circle' : 'add-circle-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Mes Activités"
        component={MyActivitiesScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="Créer Activité" component={CreateActivityScreen} />
    </Tab.Navigator>
  )
}

export default ActivitiesTab
